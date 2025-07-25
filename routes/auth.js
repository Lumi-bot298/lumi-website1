const express = require('express');
const passport = require('passport');
const router = express.Router();

// Rota de login via Discord
router.get('/discord', (req, res, next) => {
  // Salvar onde o usuário queria ir após login
  if (req.query.returnTo) {
    req.session.returnTo = req.query.returnTo;
  }
  passport.authenticate('discord')(req, res, next);
});

// Callback do Discord OAuth
router.get('/discord/callback', 
  passport.authenticate('discord', { 
    failureRedirect: '/login?error=auth_failed' 
  }),
  (req, res) => {
    try {
      // Marcar tempo de login para controle de sessão
      req.session.loginTime = Date.now();
      
      // Sucesso no login - redirecionar para onde o usuário queria ir
      const returnTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo; // Limpar após usar
      
      // Validar URL de retorno para prevenir open redirect
      const allowedReturnPaths = ['/dashboard', '/premium', '/support', '/docs'];
      const isValidReturn = allowedReturnPaths.some(path => returnTo.startsWith(path));
      
      const redirectUrl = isValidReturn ? returnTo : '/dashboard';
      res.redirect(`${redirectUrl}?login=success`);
    } catch (error) {
      console.error('Erro no callback OAuth:', error);
      res.redirect('/login?error=callback_error');
    }
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Erro no logout:', err);
    }
    res.redirect('/');
  });
});

// Verificar autenticação com proteção adicional
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // Verificar se sessão não expirou (24 horas)
    const sessionAge = Date.now() - (req.session.loginTime || 0);
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    
    if (sessionAge > maxAge) {
      req.logout((err) => {
        if (err) console.error('Erro no logout automático:', err);
        return res.redirect('/auth/discord?expired=1');
      });
      return;
    }
    
    return next();
  }
  
  // Salvar URL atual para redirecionamento pós-login
  if (req.originalUrl && !req.originalUrl.includes('/auth/')) {
    req.session.returnTo = req.originalUrl;
  }
  
  res.redirect('/auth/discord');
}

router.ensureAuthenticated = ensureAuthenticated;

module.exports = router;
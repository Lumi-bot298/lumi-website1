const express = require('express');
const { ensureAuthenticated } = require('./auth');
const router = express.Router();

// Rota raiz premium - redireciona para planos
router.get('/', (req, res) => {
  res.redirect('/premium/plans');
});

// Página de planos premium
router.get('/plans', (req, res) => {
  res.render('premium/plans', {
    title: 'Planos Premium - Lumi',
    user: req.user || null,
    page: 'premium-plans'
  });
});

// Página de comparação detalhada
router.get('/compare', (req, res) => {
  res.render('premium/compare', {
    title: 'Comparação de Planos - Lumi',
    user: req.user || null,
    page: 'premium-compare'
  });
});

// Página de sucesso após pagamento
router.get('/success', (req, res) => {
  const demo = req.query.demo === '1';
  const method = req.query.method;
  
  res.render('premium/success', {
    title: 'Pagamento Realizado - Lumi',
    user: req.user || null,
    demo: demo,
    method: method
  });
});

// Página de gerenciamento de assinatura
router.get('/manage', ensureAuthenticated, (req, res) => {
  res.render('premium/manage', {
    title: 'Gerenciar Assinatura - Lumi',
    user: req.user,
    page: 'premium-manage'
  });
});

// Demo dos recursos premium
router.get('/demo', (req, res) => {
  res.render('premium/demo', {
    title: 'Demo Premium - Lumi',
    user: req.user || null,
    page: 'premium-demo'
  });
});

// Página Enterprise
router.get('/enterprise', (req, res) => {
  res.render('premium/enterprise', {
    title: 'Plano Enterprise - Lumi',
    user: req.user || null,
    page: 'premium-enterprise'
  });
});

// Rota para iniciar checkout Pro
router.post('/checkout/pro', ensureAuthenticated, (req, res) => {
  // Redirect to Stripe checkout for Pro plan
  res.redirect('/api/create-checkout-session?plan=pro');
});

// Rota para iniciar checkout Enterprise  
router.post('/checkout/enterprise', ensureAuthenticated, (req, res) => {
  // Redirect to Stripe checkout for Enterprise plan
  res.redirect('/api/create-checkout-session?plan=enterprise');
});

module.exports = router;
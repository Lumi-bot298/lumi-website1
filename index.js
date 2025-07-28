const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Lumi - Bot Discord', page: 'home', user: null });
});

app.get('/premium', (req, res) => {
  res.render('premium', { title: 'Premium - Lumi', page: 'premium', user: null });
});

app.post('/api/create-payment', (req, res) => {
  const { plan } = req.body;
  const prices = { premium: 9.90, vitalicio: 79.90 };
  res.json({
    success: true,
    init_point: `/payment?plan=${plan}&value=${prices[plan]}`,
    payment_id: 'DEMO_' + Date.now()
  });
});

app.get('/invite', (req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=1398433869212028938&permissions=8&scope=bot%20applications.commands');
});

app.listen(PORT, () => {
  console.log(`Lumi rodando na porta ${PORT}`);
});

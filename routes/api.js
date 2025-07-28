const express = require('express');
const router = express.Router();
const PaymentGatewayManager = require('../utils/paymentGateway');

const paymentGateway = new PaymentGatewayManager();

// Middleware para verificar autenticação
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Usuário não autenticado' });
}

// Endpoint para criar pagamento internacional
router.post('/create-international-payment', ensureAuthenticated, async (req, res) => {
    try {
        const { plan, country, currency, locale } = req.body;
        const user = req.user;
        
        console.log(`🌍 Solicitação de pagamento internacional:`, {
            plan,
            country,
            currency,
            locale,
            userId: user.id,
            userEmail: user.email
        });
        
        // Validar dados
        if (!plan || !country || !currency) {
            return res.status(400).json({
                success: false,
                error: 'Dados obrigatórios: plan, country, currency'
            });
        }
        
        if (!['premium', 'vitalicio'].includes(plan)) {
            return res.status(400).json({
                success: false,
                error: 'Plano inválido. Use: premium ou vitalicio'
            });
        }
        
        // Criar pagamento baseado no país/gateway
        const paymentResult = await paymentGateway.createPayment(
            plan,
            country,
            currency,
            user.id,
            user.email
        );
        
        if (paymentResult.success) {
            console.log(`✅ Pagamento criado com sucesso:`, {
                gateway: paymentResult.gateway,
                sessionId: paymentResult.session_id || paymentResult.preference_id
            });
            
            res.json({
                success: true,
                checkout_url: paymentResult.checkout_url,
                gateway: paymentResult.gateway,
                session_id: paymentResult.session_id || paymentResult.preference_id
            });
        } else {
            console.error(`❌ Erro ao criar pagamento:`, paymentResult.error);
            
            res.status(400).json({
                success: false,
                error: paymentResult.error,
                gateway: paymentResult.gateway
            });
        }
        
    } catch (error) {
        console.error('Erro interno no pagamento:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor'
        });
    }
});

// Endpoint para obter gateways disponíveis
router.get('/available-gateways/:country', (req, res) => {
    try {
        const { country } = req.params;
        const gateways = paymentGateway.getAvailableGateways(country);
        
        res.json({
            success: true,
            country: country,
            gateways: gateways
        });
        
    } catch (error) {
        console.error('Erro ao buscar gateways:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor'
        });
    }
});

// Endpoint para conversão de preços
router.get('/convert-prices/:currency', (req, res) => {
    try {
        const { currency } = req.params;
        
        const prices = {
            premium: paymentGateway.convertPrice('premium', currency),
            vitalicio: paymentGateway.convertPrice('vitalicio', currency)
        };
        
        res.json({
            success: true,
            currency: currency,
            prices: prices
        });
        
    } catch (error) {
        console.error('Erro na conversão de preços:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor'
        });
    }
});

// Webhook Stripe
router.post('/webhook/stripe', express.raw({type: 'application/json'}), (req, res) => {
    try {
        // TODO: Implementar webhook Stripe
        console.log('📥 Webhook Stripe recebido');
        res.json({ received: true });
        
    } catch (error) {
        console.error('Erro no webhook Stripe:', error);
        res.status(400).send('Webhook Error');
    }
});

// Webhook Mercado Pago
router.post('/webhook/mercadopago', (req, res) => {
    try {
        // TODO: Implementar webhook Mercado Pago
        console.log('📥 Webhook Mercado Pago recebido');
        res.json({ received: true });
        
    } catch (error) {
        console.error('Erro no webhook Mercado Pago:', error);
        res.status(400).send('Webhook Error');
    }
});

module.exports = router;
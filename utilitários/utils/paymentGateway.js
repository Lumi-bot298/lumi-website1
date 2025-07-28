// Sistema Multi-Gateway de Pagamentos Internacionais
const stripe = require('stripe');
const { MercadoPagoConfig, Preference } = require('mercadopago');

class PaymentGatewayManager {
    constructor() {
        // Inicializar gateways
        this.stripe = process.env.STRIPE_SECRET_KEY ? stripe(process.env.STRIPE_SECRET_KEY) : null;
        
        if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
            this.mercadoPagoClient = new MercadoPagoConfig({ 
                accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
            });
            this.mercadoPagoPreference = new Preference(this.mercadoPagoClient);
        }
    }

    // Detectar melhor gateway baseado no país/região
    selectGateway(country, currency = 'USD') {
        const countryGatewayMap = {
            // América Latina - Mercado Pago
            'BR': 'mercadopago',
            'AR': 'mercadopago', 
            'MX': 'mercadopago',
            'CL': 'mercadopago',
            'CO': 'mercadopago',
            'PE': 'mercadopago',
            'UY': 'mercadopago',
            
            // América do Norte e Europa - Stripe preferencial
            'US': 'stripe',
            'CA': 'stripe',
            'GB': 'stripe',
            'DE': 'stripe',
            'FR': 'stripe',
            'IT': 'stripe', 
            'ES': 'stripe',
            'NL': 'stripe',
            'BE': 'stripe',
            'AT': 'stripe',
            'CH': 'stripe',
            'SE': 'stripe',
            'NO': 'stripe',
            'DK': 'stripe',
            'FI': 'stripe',
            'IE': 'stripe',
            'PT': 'stripe',
            
            // Ásia-Pacífico - Stripe
            'AU': 'stripe',
            'NZ': 'stripe',
            'JP': 'stripe',
            'SG': 'stripe',
            'HK': 'stripe',
            
            // Fallback global - PayPal (a implementar)
            'default': 'paypal'
        };

        return countryGatewayMap[country] || countryGatewayMap['default'];
    }

    // Conversão de moedas com preços psicológicos
    convertPrice(plan, currency) {
        const basePrices = {
            premium: {
                BRL: 9.90,
                USD: 1.99,
                EUR: 1.79,
                GBP: 1.69,
                CAD: 2.49,
                AUD: 2.99,
                CHF: 1.89,
                SEK: 19.90,
                NOK: 19.90,
                DKK: 12.90,
                PLN: 7.90,
                CZK: 45.90,
                HUF: 690,
                RON: 8.90,
                BGN: 3.49,
                HRK: 13.49,
                MXN: 39.90,
                ARS: 1990,
                CLP: 1590,
                COP: 7990,
                PEN: 7.90,
                UYU: 79.90
            },
            vitalicio: {
                BRL: 79.90,
                USD: 15.99,
                EUR: 14.99,
                GBP: 13.99,
                CAD: 19.99,
                AUD: 23.99,
                CHF: 14.99,
                SEK: 159.90,
                NOK: 159.90,
                DKK: 109.90,
                PLN: 59.90,
                CZK: 369.90,
                HUF: 5590,
                RON: 69.90,
                BGN: 27.99,
                HRK: 107.99,
                MXN: 319.90,
                ARS: 15990,
                CLP: 12790,
                COP: 63990,
                PEN: 59.90,
                UYU: 639.90
            }
        };

        return basePrices[plan]?.[currency] || basePrices[plan]?.USD || 0;
    }

    // Criar sessão de pagamento Stripe
    async createStripeSession(plan, currency, country, userId, userEmail) {
        if (!this.stripe) {
            throw new Error('Stripe não configurado');
        }

        const price = this.convertPrice(plan, currency);
        const isRecurring = plan === 'premium';

        try {
            const sessionConfig = {
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: `Lumi ${plan === 'premium' ? 'Premium' : 'Vitalício'}`,
                            description: plan === 'premium' 
                                ? 'IA conversacional + Analytics avançados'
                                : 'Acesso premium PARA SEMPRE - Pagamento único'
                        },
                        unit_amount: Math.round(price * 100), // Centavos
                        recurring: isRecurring ? { interval: 'month' } : undefined
                    },
                    quantity: 1,
                }],
                mode: isRecurring ? 'subscription' : 'payment',
                success_url: `${process.env.BASE_URL || 'https://lumidiscord.xyz'}/premium/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
                cancel_url: `${process.env.BASE_URL || 'https://lumidiscord.xyz'}/premium/plans`,
                client_reference_id: userId,
                customer_email: userEmail,
                metadata: {
                    plan: plan,
                    country: country,
                    currency: currency,
                    userId: userId
                }
            };

            const session = await this.stripe.checkout.sessions.create(sessionConfig);
            return {
                success: true,
                checkout_url: session.url,
                session_id: session.id,
                gateway: 'stripe'
            };

        } catch (error) {
            console.error('Erro Stripe:', error);
            return {
                success: false,
                error: error.message,
                gateway: 'stripe'
            };
        }
    }

    // Criar pagamento Mercado Pago
    async createMercadoPagoPayment(plan, userId, userEmail) {
        if (!this.mercadoPagoPreference) {
            return {
                success: false,
                error: 'Mercado Pago não configurado',
                gateway: 'mercadopago'
            };
        }

        const price = this.convertPrice(plan, 'BRL');
        const isRecurring = plan === 'premium';

        try {
            const preferenceData = {
                items: [{
                    title: `Lumi ${plan === 'premium' ? 'Premium' : 'Vitalício'}`,
                    description: plan === 'premium' 
                        ? 'IA conversacional + Analytics mensais'
                        : 'Acesso premium VITALÍCIO - Pague uma vez só',
                    unit_price: price,
                    quantity: 1,
                    currency_id: 'BRL'
                }],
                payer: {
                    email: userEmail
                },
                external_reference: `${userId}_${plan}_${Date.now()}`,
                back_urls: {
                    success: `${process.env.BASE_URL || 'https://lumidiscord.xyz'}/premium/success?plan=${plan}&method=mercadopago`,
                    failure: `${process.env.BASE_URL || 'https://lumidiscord.xyz'}/premium/plans?error=payment_failed`,
                    pending: `${process.env.BASE_URL || 'https://lumidiscord.xyz'}/premium/plans?status=pending`
                },
                auto_return: 'approved',
                payment_methods: {
                    excluded_payment_types: [],
                    installments: plan === 'vitalicio' ? 12 : 1 // Parcelamento só no vitalício
                },
                metadata: {
                    plan: plan,
                    user_id: userId,
                    recurring: isRecurring
                }
            };

            const response = await this.mercadoPagoPreference.create({ body: preferenceData });
            
            return {
                success: true,
                checkout_url: response.init_point,
                preference_id: response.id,
                gateway: 'mercadopago'
            };

        } catch (error) {
            console.error('Erro Mercado Pago:', error);
            return {
                success: false,
                error: error.message,
                gateway: 'mercadopago'
            };
        }
    }

    // Método principal para criar pagamento
    async createPayment(plan, country, currency, userId, userEmail) {
        const gateway = this.selectGateway(country, currency);
        
        console.log(`🌍 Criando pagamento: ${plan} | ${country} | ${currency} | Gateway: ${gateway}`);
        
        switch (gateway) {
            case 'stripe':
                return await this.createStripeSession(plan, currency, country, userId, userEmail);
                
            case 'mercadopago':
                return await this.createMercadoPagoPayment(plan, userId, userEmail);
                
            case 'paypal':
                // TODO: Implementar PayPal
                return {
                    success: false,
                    error: 'PayPal em desenvolvimento. Use Stripe ou Mercado Pago.',
                    gateway: 'paypal'
                };
                
            default:
                return {
                    success: false,
                    error: 'Gateway de pagamento não suportado para sua região.',
                    gateway: 'unknown'
                };
        }
    }

    // Verificar suporte de gateway por país
    getAvailableGateways(country) {
        const gateways = [];
        
        // Mercado Pago países
        if (['BR', 'AR', 'MX', 'CL', 'CO', 'PE', 'UY'].includes(country)) {
            gateways.push({
                name: 'mercadopago',
                display: 'Mercado Pago',
                methods: ['PIX', 'Boleto', 'Cartão', 'Débito'],
                logo: '/images/mercadopago-logo.png'
            });
        }
        
        // Stripe países (mais amplo)
        const stripeCountries = ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'AU', 'NZ', 'JP', 'SG', 'HK'];
        if (stripeCountries.includes(country)) {
            gateways.push({
                name: 'stripe',
                display: 'Stripe',
                methods: ['Cartão', 'Apple Pay', 'Google Pay'],
                logo: '/images/stripe-logo.png'
            });
        }
        
        // PayPal (global - futuro)
        gateways.push({
            name: 'paypal',
            display: 'PayPal',
            methods: ['PayPal', 'Cartão'],
            logo: '/images/paypal-logo.png',
            coming_soon: true
        });
        
        return gateways;
    }
}

module.exports = PaymentGatewayManager;
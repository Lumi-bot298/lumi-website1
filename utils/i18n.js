// Sistema de Internacionalização (i18n) para Lumi
const fs = require('fs');
const path = require('path');

class I18nManager {
    constructor() {
        this.defaultLocale = 'pt-BR';
        this.supportedLocales = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE'];
        this.translations = {};
        this.loadTranslations();
    }

    // Carregar todas as traduções
    loadTranslations() {
        this.supportedLocales.forEach(locale => {
            try {
                const filePath = path.join(__dirname, '../locales', `${locale}.json`);
                if (fs.existsSync(filePath)) {
                    this.translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                }
            } catch (error) {
                console.error(`Erro ao carregar tradução ${locale}:`, error);
                this.translations[locale] = {};
            }
        });
    }

    // Detectar idioma baseado em headers/país
    detectLocale(acceptLanguage, country) {
        // Mapeamento país -> idioma preferido
        const countryLocaleMap = {
            'BR': 'pt-BR',
            'PT': 'pt-BR',
            'AO': 'pt-BR', // Angola
            'MZ': 'pt-BR', // Moçambique
            
            'US': 'en-US',
            'CA': 'en-US',
            'GB': 'en-US',
            'AU': 'en-US',
            'NZ': 'en-US',
            'IE': 'en-US',
            'ZA': 'en-US',
            'IN': 'en-US',
            'SG': 'en-US',
            'HK': 'en-US',
            
            'ES': 'es-ES',
            'MX': 'es-ES',
            'AR': 'es-ES',
            'CL': 'es-ES',
            'CO': 'es-ES',
            'PE': 'es-ES',
            'VE': 'es-ES',
            'EC': 'es-ES',
            'UY': 'es-ES',
            'PY': 'es-ES',
            'BO': 'es-ES',
            'CR': 'es-ES',
            'GT': 'es-ES',
            'HN': 'es-ES',
            'NI': 'es-ES',
            'PA': 'es-ES',
            'SV': 'es-ES',
            'DO': 'es-ES',
            'CU': 'es-ES',
            
            'FR': 'fr-FR',
            'BE': 'fr-FR',
            'CH': 'fr-FR',
            'LU': 'fr-FR',
            'MC': 'fr-FR',
            'CI': 'fr-FR', // Costa do Marfim
            'SN': 'fr-FR', // Senegal
            'ML': 'fr-FR', // Mali
            'BF': 'fr-FR', // Burkina Faso
            'NE': 'fr-FR', // Níger
            'TD': 'fr-FR', // Chade
            'CF': 'fr-FR', // República Centro-Africana
            'CM': 'fr-FR', // Camarões
            'GA': 'fr-FR', // Gabão
            'CG': 'fr-FR', // Congo
            'CD': 'fr-FR', // RD Congo
            'MG': 'fr-FR', // Madagascar
            
            'DE': 'de-DE',
            'AT': 'de-DE',
            'LI': 'de-DE' // Liechtenstein
        };

        // 1. Tentar por país primeiro
        if (country && countryLocaleMap[country]) {
            return countryLocaleMap[country];
        }

        // 2. Analisar Accept-Language header
        if (acceptLanguage) {
            const languages = acceptLanguage
                .split(',')
                .map(lang => {
                    const [locale, quality = '1'] = lang.trim().split(';q=');
                    return { locale: locale.trim(), quality: parseFloat(quality) };
                })
                .sort((a, b) => b.quality - a.quality);

            for (const { locale } of languages) {
                // Verificar match exato
                if (this.supportedLocales.includes(locale)) {
                    return locale;
                }
                
                // Verificar match por idioma base
                const baseLocale = locale.split('-')[0];
                const supportedMatch = this.supportedLocales.find(supported => 
                    supported.split('-')[0] === baseLocale
                );
                
                if (supportedMatch) {
                    return supportedMatch;
                }
            }
        }

        // 3. Fallback para padrão
        return this.defaultLocale;
    }

    // Traduzir texto
    translate(key, locale, params = {}) {
        if (!this.supportedLocales.includes(locale)) {
            locale = this.defaultLocale;
        }

        const translation = this.translations[locale] || this.translations[this.defaultLocale] || {};
        
        // Buscar tradução por chave aninhada (ex: "pricing.premium.title")
        let value = key.split('.').reduce((obj, k) => obj?.[k], translation);
        
        // Fallback para chave direta
        if (!value) {
            value = translation[key];
        }
        
        // Fallback para idioma padrão
        if (!value && locale !== this.defaultLocale) {
            const defaultTranslation = this.translations[this.defaultLocale] || {};
            value = key.split('.').reduce((obj, k) => obj?.[k], defaultTranslation) || defaultTranslation[key];
        }
        
        // Fallback para a própria chave
        if (!value) {
            value = key;
        }

        // Substituir parâmetros {{param}}
        return Object.keys(params).reduce((text, param) => {
            return text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        }, value);
    }

    // Formatação de moeda
    formatCurrency(amount, currency, locale) {
        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2
            }).format(amount);
        } catch (error) {
            // Fallback manual
            const symbols = {
                'BRL': 'R$',
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
                'CAD': 'CAD$',
                'AUD': 'AUD$'
            };
            
            const symbol = symbols[currency] || currency;
            return `${symbol} ${amount.toFixed(2)}`;
        }
    }

    // Formatação de data
    formatDate(date, locale) {
        try {
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            return date.toLocaleDateString();
        }
    }

    // Obter informações da moeda por país
    getCurrencyByCountry(country) {
        const currencyMap = {
            'BR': 'BRL',
            'US': 'USD',
            'CA': 'CAD',
            'GB': 'GBP',
            'DE': 'EUR',
            'FR': 'EUR',
            'IT': 'EUR',
            'ES': 'EUR',
            'NL': 'EUR',
            'BE': 'EUR',
            'AT': 'EUR',
            'PT': 'EUR',
            'IE': 'EUR',
            'LU': 'EUR',
            'FI': 'EUR',
            'EE': 'EUR',
            'LV': 'EUR',
            'LT': 'EUR',
            'SK': 'EUR',
            'SI': 'EUR',
            'MT': 'EUR',
            'CY': 'EUR',
            'CH': 'CHF',
            'SE': 'SEK',
            'NO': 'NOK',
            'DK': 'DKK',
            'PL': 'PLN',
            'CZ': 'CZK',
            'HU': 'HUF',
            'RO': 'RON',
            'BG': 'BGN',
            'HR': 'HRK',
            'AU': 'AUD',
            'NZ': 'NZD',
            'JP': 'JPY',
            'SG': 'SGD',
            'HK': 'HKD',
            'MX': 'MXN',
            'AR': 'ARS',
            'CL': 'CLP',
            'CO': 'COP',
            'PE': 'PEN',
            'UY': 'UYU'
        };

        return currencyMap[country] || 'USD';
    }

    // Middleware Express para detectar idioma
    middleware() {
        return (req, res, next) => {
            // Detectar país (de geolocalização ou header)
            const country = req.headers['cf-ipcountry'] || req.headers['x-country'] || 'US';
            
            // Detectar idioma
            const locale = this.detectLocale(req.headers['accept-language'], country);
            
            // Detectar moeda
            const currency = this.getCurrencyByCountry(country);
            
            // Adicionar helpers ao response
            res.locals.locale = locale;
            res.locals.country = country;
            res.locals.currency = currency;
            res.locals.t = (key, params) => this.translate(key, locale, params);
            res.locals.formatCurrency = (amount, curr = currency) => this.formatCurrency(amount, curr, locale);
            res.locals.formatDate = (date) => this.formatDate(date, locale);
            
            next();
        };
    }
}

module.exports = I18nManager;
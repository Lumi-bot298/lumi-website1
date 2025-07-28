// Teste de OAuth Discord
const https = require('https');
require('dotenv').config();

async function testDiscordOAuth() {
    console.log('🔍 Testando configuração Discord OAuth...');
    
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = 'https://ac9d1766-758d-46a5-a5d1-7c3902e58581-00-1pz0zvgkhy08i.kirk.replit.dev/auth/discord/callback';
    
    console.log('Client ID:', clientId ? `${clientId.substring(0, 8)}...` : 'MISSING');
    console.log('Client Secret:', clientSecret ? 'PRESENTE' : 'MISSING');
    console.log('Redirect URI:', redirectUri);
    
    // Testar se as credenciais são válidas
    try {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
                scope: 'identify'
            })
        });
        
        if (tokenResponse.ok) {
            console.log('✅ Credenciais Discord válidas');
        } else {
            const errorText = await tokenResponse.text();
            console.log('❌ Erro nas credenciais:', errorText);
        }
    } catch (error) {
        console.log('❌ Erro no teste:', error.message);
    }
    
    // Construir URL de autorização
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds`;
    console.log('\n🔗 URL de autorização:');
    console.log(authUrl);
}

testDiscordOAuth();
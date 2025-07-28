# Como Corrigir o Erro "redirect_uri de OAuth2 inválido"

## O Problema
O erro aparece porque a URL de callback do Discord OAuth precisa ser registrada no painel de desenvolvedores do Discord.

## Solução - Configurar Discord OAuth

### 1. Acesse o Discord Developer Portal
- Vá para: https://discord.com/developers/applications
- Faça login com sua conta Discord

### 2. Selecione sua Aplicação
- Clique na aplicação "Lumi" (ou crie uma nova se não existir)

### 3. Configure OAuth2
- No menu lateral, clique em **"OAuth2"**
- Na seção **"Redirects"**, adicione a URL:

```
https://ac9d1766-758d-46a5-a5d1-7c3902e58581-00-1pz0zvgkhy08i.kirk.replit.dev/auth/discord/callback
```

### 4. Salve as Configurações
- Clique em **"Save Changes"**
- Aguarde alguns minutos para a configuração ser aplicada

## URLs que Devem Estar Configuradas

### Para Desenvolvimento (Replit):
```
https://ac9d1766-758d-46a5-a5d1-7c3902e58581-00-1pz0zvgkhy08i.kirk.replit.dev/auth/discord/callback
```

### Para Produção (quando deployar):
```
https://lumibot.com.br/auth/discord/callback
```

## Verificar se Funcionou

1. Após configurar, teste clicando em "Login com Discord"
2. Deve abrir a página de autorização do Discord
3. Após autorizar, deve retornar para o dashboard da Lumi

## Informações Adicionais

- **Client ID**: Deve estar em `DISCORD_CLIENT_ID` nas variáveis de ambiente
- **Client Secret**: Deve estar em `DISCORD_CLIENT_SECRET` nas variáveis de ambiente
- **Scopes necessários**: `identify` e `email`

## Se o Problema Persistir

1. Verifique se as variáveis de ambiente estão corretas
2. Aguarde até 10 minutos após salvar no Discord Developer Portal
3. Limpe o cache do navegador
4. Tente em modo anônimo/incógnito

---

**Importante**: O Discord pode levar alguns minutos para aplicar as mudanças de configuração OAuth2.
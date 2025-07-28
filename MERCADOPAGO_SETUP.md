# Configuração do Mercado Pago - Lumi

## Como configurar pagamentos brasileiros

### 1. Criar conta no Mercado Pago

1. **Acesse:** https://www.mercadopago.com.br/developers
2. **Faça login** com sua conta Mercado Pago (ou crie uma)
3. **Crie uma aplicação** para seu bot

### 2. Obter credenciais

1. No painel do desenvolvedor, vá em **"Suas integrações"**
2. Selecione sua aplicação
3. Na aba **"Credenciais"**, você encontrará:
   - **Access Token** (para produção)
   - **Access Token de teste** (para testes)

### 3. Configurar no Replit

Adicione a variável de ambiente:
```
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
```

### 4. Para onde vai o dinheiro?

- **Produção:** O dinheiro vai direto para sua conta Mercado Pago
- **Conta bancária:** Você pode sacar para sua conta PicPay, Nubank, etc.
- **PIX automático:** Configure para receber via PIX automaticamente

### 5. Métodos aceitos

Com uma conta Mercado Pago, você aceita:
- ✅ **PIX** (instantâneo)
- ✅ **Cartão de crédito** (todas as bandeiras)
- ✅ **Cartão de débito**
- ✅ **Boleto bancário**
- ✅ **Dinheiro em conta Mercado Pago**
- ✅ **Parcelamento** (até 12x)

### 6. Taxas

- **PIX:** Grátis para receber
- **Cartão:** ~4.99% + R$ 0.39 por transação
- **Boleto:** ~R$ 3.49 por transação

### 7. Webhook (automático)

O sistema já está configurado para:
- Receber confirmação de pagamento
- Ativar premium automaticamente
- Enviar confirmação por email

### 8. Teste sem credenciais

Enquanto você não configura, o sistema funciona em modo demo:
- Mostra todas as opções de pagamento
- Simula o processo completo
- Não processa pagamento real

---

**Dúvidas?** O Mercado Pago tem suporte excelente para desenvolvedores!
# Guia de Deploy para Produção

Este documento descreve o processo completo de deploy para produção do ERC20Factory.

## 🔒 Pré-requisitos de Segurança

### Antes do Deploy

- [ ] **Auditoria de Código**: Contrato auditado por profissionais qualificados
- [ ] **Testes**: Todos os testes passando (unitários e de integração)
- [ ] **Review de Código**: Código revisado por múltiplos desenvolvedores
- [ ] **Variáveis de Ambiente**: Todas as variáveis necessárias configuradas
- [ ] **Backup de Chaves**: Chave privada segura e com backup
- [ ] **Verificação de Rede**: Confirmar que está deployando na rede correta
- [ ] **Saldo Suficiente**: Garantir ETH/BNB suficiente para gas fees

## 📋 Checklist de Deploy

### 1. Preparação

```bash
# Instalar dependências
npm install

# Compilar contratos
npm run compile
```

### 2. Configuração de Ambiente

Crie um arquivo `.env` com:

```env
# Chave privada da conta que fará o deploy
PRIVATE_KEY=your_private_key_here

# Configuração do optimizer (opcional)
OPTIMIZER_RUNS=1000000
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` com valores reais!

### 3. Deploy em Testnet

Sempre teste primeiro em testnet:

```bash
# Deploy em testnet
npm run deploy:tarc  # ou outra testnet

# Verificar o deploy
CONTRACT_ADDRESS=0x... npm run check --network testnet_arc

# Verificar no block explorer
CONTRACT_ADDRESS=0x... npm run verify --network testnet_arc
```

### 4. Deploy em Mainnet

⚠️ **ATENÇÃO**: Deploy em mainnet é permanente e custa dinheiro real!

```bash
# 1. Verificar rede no hardhat.config.js
# 2. Confirmar que está na rede correta
# 3. Deploy
npm run deploy:mainnet  # (após configurar)

# 4. Aguardar confirmações (recomendado: 5+ blocos)
# 5. Verificar deploy
CONTRACT_ADDRESS=0x... npm run check --network mainnet

# 6. Verificar no block explorer
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
```

### 5. Pós-Deploy

- [ ] Salvar endereço do contrato deployado
- [ ] Salvar hash da transação de deploy
- [ ] Verificar contrato no block explorer
- [ ] Testar funcionalidades básicas do contrato
- [ ] Documentar deployment (endereço, rede, data)
- [ ] Notificar equipe/stakeholders

## 🔍 Verificação de Contratos

### Verificação Automática via Hardhat

```bash
npx hardhat verify --network <network> <CONTRACT_ADDRESS>
```

### Verificação Manual

1. Acesse o block explorer da rede (Etherscan, BscScan, etc.)
2. Navegue até o endereço do contrato
3. Clique em "Verify and Publish"
4. Cole o código do contrato
5. Selecione as configurações de compilação
6. Submeta para verificação

## 📊 Monitoramento

Após o deploy, monitore:

- Transações do contrato
- Eventos emitidos
- Uso de gas
- Erros ou reverts
- Atividade suspeita

## 🚨 Troubleshooting

### Erro: "Insufficient funds"
- Verifique se tem saldo suficiente para gas fees
- Considere ajustar gas price no hardhat.config.js

### Erro: "Contract verification failed"
- Verifique se está usando as mesmas configurações de compilação
- Confirme que o código fonte corresponde ao bytecode deployado
- Verifique se todas as dependências estão corretas

### Erro: "Nonce too high"
- Aguarde alguns minutos e tente novamente
- Ou defina manualmente o nonce

## 📝 Documentação de Deployment

Mantenha um registro de cada deployment:

```json
{
  "network": "mainnet",
  "chainId": 1,
  "contractAddress": "0x...",
  "deployer": "0x...",
  "transactionHash": "0x...",
  "blockNumber": 12345678,
  "timestamp": "2024-01-01T00:00:00Z",
  "gasUsed": "123456",
  "gasPrice": "20000000000"
}
```

## 🔗 Links Úteis

- [Hardhat Deployment Guide](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- [OpenZeppelin Security Best Practices](https://docs.openzeppelin.com/contracts/security)
- [Ethereum Gas Tracker](https://etherscan.io/gastracker)


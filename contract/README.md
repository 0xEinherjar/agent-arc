# ERC20 Factory

Uma factory para criação de tokens ERC20 usando a biblioteca OpenZeppelin. Este projeto permite deploy fácil e seguro de tokens ERC20 customizados com nome, símbolo, decimais e supply inicial configuráveis.

## 📋 Características

- ✅ Factory pattern para criação de tokens ERC20
- ✅ Baseado em contratos auditados da OpenZeppelin
- ✅ Suporte a decimais customizados
- ✅ Supply inicial configurável
- ✅ Rastreamento de tokens criados por endereço
- ✅ Lista completa de todos os tokens deployados
- ✅ Eventos para rastreamento de criação

## 🛠️ Tecnologias

- **Solidity** ^0.8.20
- **Hardhat** ^2.20.1
- **OpenZeppelin Contracts** ^5.4.0
- **Hardhat Toolbox** ^4.0.0
- **Hardhat ABI Exporter** ^2.10.1

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto:

```env
# Chave privada da conta que fará o deploy
PRIVATE_KEY=sua_chave_privada_aqui

# API Keys para verificação de contratos (opcional)
ETHERSCAN_API_KEY=sua_chave_etherscan
BSCSCAN_API_KEY=sua_chave_bscscan
BASESCAN_API_KEY=sua_chave_basescan

# RPC URLs (opcional - padrões serão usados se não especificado)
RPC_URL_ARC=https://rpc.testnet.arc.network
RPC_URL_BSC=https://data-seed-prebsc-1-s1.binance.org:8545
RPC_URL_BASE=https://goerli.base.org

# Configuração do optimizer (opcional, padrão: 1000000)
OPTIMIZER_RUNS=1000000
```

2. Configure as redes no arquivo `hardhat.config.js` conforme necessário.

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` com valores reais!

## 🚀 Uso

### Compilar os contratos

```bash
npm run compile
```

### Exportar ABI

```bash
npm run abi
```

O ABI será exportado para o diretório `./abi`.

### Deploy

#### Deploy em Localhost

```bash
npm run deploy:localhost
```

#### Deploy em Testnet Arc

```bash
npm run deploy:tarc
```

#### Deploy em outras redes

Configure as redes no `hardhat.config.js` e crie scripts de deploy adicionais no `package.json`.

### Limpar artefatos

```bash
npm run clean
```

### Verificar contrato deployado

Após o deploy, você pode verificar o contrato no block explorer:

```bash
# Verificar status do deployment
CONTRACT_ADDRESS=0x... npm run check --network <network>

# Verificar contrato no block explorer
CONTRACT_ADDRESS=0x... npm run verify --network <network>

# Ou usar o comando direto do Hardhat
npx hardhat verify --network <network> <CONTRACT_ADDRESS>
```

### Iniciar node local

```bash
npm run node
```

## 📁 Estrutura do Projeto

```
contract/
├── contracts/
│   └── ERC20Factory.sol      # Contrato principal da factory
├── scripts/
│   └── deploy.js             # Script de deploy
├── abi/                      # ABIs exportados (gerado)
├── artifacts/                # Artefatos de compilação (gerado)
├── cache/                    # Cache do Hardhat (gerado)
├── hardhat.config.js         # Configuração do Hardhat
└── package.json              # Dependências do projeto
```

## 📄 Contratos

### ERC20Factory

Factory principal para criação de tokens ERC20.

**Funções principais:**

- `createToken(name, symbol, decimals, initialSupply, owner)`: Cria um novo token ERC20
- `allTokensLength()`: Retorna o número total de tokens criados
- `getTokensByCreator(creator)`: Retorna todos os tokens criados por um endereço

**Eventos:**

- `ERC20TokenDeployed`: Emitido quando um novo token é criado

### SimpleERC20

Contrato de token ERC20 que herda de `ERC20` da OpenZeppelin.

**Características:**

- Implementação segura e auditada via OpenZeppelin
- Suporte a decimais customizados
- Mint inicial configurável
- Totalmente compatível com padrão ERC20

## 💡 Exemplo de Uso

### Criar um token via Factory

```solidity
// Exemplo: Criar um token chamado "Meu Token" com símbolo "MTK"
// 18 decimais, supply inicial de 1000000 tokens

ERC20Factory factory = ERC20Factory(factoryAddress);
address tokenAddress = factory.createToken(
    "Meu Token",      // name
    "MTK",            // symbol
    18,               // decimals
    1000000 * 10**18, // initialSupply (em wei/tokens base)
    msg.sender        // owner
);
```

### Consultar tokens criados

```solidity
// Obter todos os tokens criados por um endereço
address[] memory tokens = factory.getTokensByCreator(creatorAddress);

// Obter o número total de tokens
uint256 total = factory.allTokensLength();
```

## 🔒 Segurança

Este projeto utiliza contratos da biblioteca OpenZeppelin, que são:

- ✅ Amplamente auditados pela comunidade
- ✅ Testados em produção
- ✅ Seguem as melhores práticas de segurança
- ✅ Atualizados regularmente

## 📝 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 🚀 Deploy para Produção

Para instruções detalhadas sobre deploy em produção, consulte o arquivo [DEPLOYMENT.md](./DEPLOYMENT.md).

**Checklist rápido:**
- ✅ Compilar contratos
- ✅ Configurar variáveis de ambiente
- ✅ Testar em testnet primeiro
- ✅ Verificar contrato no block explorer
- ✅ Monitorar após deploy

## 📚 Recursos Adicionais

- [OpenZeppelin Contracts Documentation](https://docs.openzeppelin.com/contracts)
- [Hardhat Documentation](https://hardhat.org/docs)
- [ERC20 Standard](https://eips.ethereum.org/EIPS/eip-20)
- [Deployment Guide](./DEPLOYMENT.md)

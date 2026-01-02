# ERC20 Factory

A factory for creating ERC20 tokens using the OpenZeppelin library. This project allows for easy and secure deployment of custom ERC20 tokens with configurable name, symbol, decimals, and initial supply.

## 📋 Features

- ✅ Factory pattern for ERC20 token creation
- ✅ Based on audited OpenZeppelin contracts
- ✅ Support for custom decimals
- ✅ Configurable initial supply
- ✅ Tracking of tokens created by address
- ✅ Complete list of all deployed tokens
- ✅ Events for creation tracking

## 🛠️ Technologies

- **Solidity** ^0.8.20
- **Hardhat** ^2.20.1
- **OpenZeppelin Contracts** ^5.4.0
- **Hardhat Toolbox** ^4.0.0
- **Hardhat ABI Exporter** ^2.10.1

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Create a `.env` file in the project root:

```env
# Private key of the account that will perform the deployment
PRIVATE_KEY=your_private_key_here

# API Keys for contract verification (optional)
ETHERSCAN_API_KEY=your_etherscan_key
BSCSCAN_API_KEY=your_bscscan_key
BASESCAN_API_KEY=your_basescan_key

# RPC URLs (optional - defaults will be used if not specified)
RPC_URL_ARC=https://rpc.testnet.arc.network
RPC_URL_BSC=https://data-seed-prebsc-1-s1.binance.org:8545
RPC_URL_BASE=https://goerli.base.org

# Optimizer configuration (optional, default: 1000000)
OPTIMIZER_RUNS=1000000
```

2. Configure the networks in the `hardhat.config.js` file as needed.

3. ⚠️ **IMPORTANT**: Never commit the `.env` file with real values!

## 🚀 Usage

### Compile the contracts

```bash
npm run compile
```

### Export ABI

```bash
npm run abi
```

The ABI will be exported to the `./abi` directory.

### Deploy

#### Deploy to Localhost

```bash
npm run deploy:localhost
```

#### Deploy to Testnet Arc

```bash
npm run deploy:tarc
```

#### Deploy to other networks

Configure the networks in `hardhat.config.js` and create additional deploy scripts in `package.json`.

### Clean artifacts

```bash
npm run clean
```

### Verify deployed contract

After deployment, you can verify the contract on the block explorer:

```bash
# Verify deployment status
CONTRACT_ADDRESS=0x... npm run check --network <network>

# Verify contract on block explorer
CONTRACT_ADDRESS=0x... npm run verify --network <network>

# Or use the direct Hardhat command
npx hardhat verify --network <network> <CONTRACT_ADDRESS>
```

### Start local node

```bash
npm run node
```

## 📁 Project Structure

```
contract/
├── contracts/
│   └── ERC20Factory.sol      # Main factory contract
├── scripts/
│   └── deploy.js             # Deploy script
├── abi/                      # Exported ABIs (generated)
├── artifacts/                # Build artifacts (generated)
├── cache/                    # Hardhat cache (generated)
├── hardhat.config.js         # Hardhat configuration
└── package.json              # Project dependencies
```

## 📄 Contracts

### ERC20Factory

Main factory for validating ERC20 tokens.

**Main Functions:**

- `createToken(name, symbol, decimals, initialSupply, owner)`: Creates a new ERC20 token
- `allTokensLength()`: Returns the total number of created tokens
- `getTokensByCreator(creator)`: Returns all tokens created by an address

**Events:**

- `ERC20TokenDeployed`: Emitted when a new token is created

### SimpleERC20

ERC20 token contract that inherits from `ERC20` of OpenZeppelin.

**Features:**

- Secure and audited implementation via OpenZeppelin
- Support for custom decimals
- Configurable initial mint
- Fully compatible with ERC20 standard

## 💡 Usage Example

### Create a token via Factory

```solidity
// Example: Create a token named "My Token" with symbol "MTK"
// 18 decimals, initial supply of 1000000 tokens

ERC20Factory factory = ERC20Factory(factoryAddress);
address tokenAddress = factory.createToken(
    "My Token",       // name
    "MTK",            // symbol
    18,               // decimals
    1000000 * 10**18, // initialSupply (in wei/base tokens)
    msg.sender        // owner
);
```

### Query created tokens

```solidity
// Get all tokens created by an address
address[] memory tokens = factory.getTokensByCreator(creatorAddress);

// Get the total number of tokens
uint256 total = factory.allTokensLength();
```

## 🔒 Security

This project uses contracts from the OpenZeppelin library, which are:

- ✅ Widely audited by the community
- ✅ Production tested
- ✅ Follow best security practices
- ✅ Updated regularly

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## 🚀 Deploy to Production

For detailed instructions on production deployment, consult the [DEPLOYMENT.md](./DEPLOYMENT.md) file.

**Quick Checklist:**
- ✅ Compile contracts
- ✅ Configure environment variables
- ✅ Test on testnet first
- ✅ Verify contract on block explorer
- ✅ Monitor after deploy

## 📚 Additional Resources

- [OpenZeppelin Contracts Documentation](https://docs.openzeppelin.com/contracts)
- [Hardhat Documentation](https://hardhat.org/docs)
- [ERC20 Standard](https://eips.ethereum.org/EIPS/eip-20)
- [Deployment Guide](./DEPLOYMENT.md)

# Production Deployment Guide

This document describes the complete process for deploying the ERC20Factory to production.

## 🔒 Security Prerequisites

### Before Deployment

- [ ] **Code Audit**: Contract audited by qualified professionals
- [ ] **Tests**: All tests passing (unit and integration)
- [ ] **Code Review**: Code reviewed by multiple developers
- [ ] **Environment Variables**: All necessary variables configured
- [ ] **Key Backup**: Private key secure and backed up
- [ ] **Network Verification**: Confirm you are deploying to the correct network
- [ ] **Sufficient Balance**: Ensure sufficient ETH/BNB for gas fees

## 📋 Deployment Checklist

### 1. Preparation

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile
```

### 2. Environment Configuration

Create a `.env` file with:

```env
# Private key of the account that will perform the deployment
PRIVATE_KEY=your_private_key_here

# Optimizer configuration (optional)
OPTIMIZER_RUNS=1000000
```

⚠️ **IMPORTANT**: Never commit the `.env` file with real values!

### 3. Deploy to Testnet

Always test first on testnet:

```bash
# Deploy to testnet
npm run deploy:tarc  # or other testnet

# Verify the deploy
CONTRACT_ADDRESS=0x... npm run check --network testnet_arc

# Verify on block explorer
CONTRACT_ADDRESS=0x... npm run verify --network testnet_arc
```

### 4. Deploy to Mainnet

⚠️ **WARNING**: Deploying to mainnet is permanent and costs real money!

```bash
# 1. Verify network in hardhat.config.js
# 2. Confirm you are on the correct network
# 3. Deploy
npm run deploy:mainnet  # (after configuring)

# 4. Wait for confirmations (recommended: 5+ blocks)
# 5. Verify deploy
CONTRACT_ADDRESS=0x... npm run check --network mainnet

# 6. Verify on block explorer
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
```

### 5. Post-Deploy

- [ ] Save deployed contract address
- [ ] Save deployment transaction hash
- [ ] Verify contract on block explorer
- [ ] Test basic contract functionalities
- [ ] Document deployment (address, network, date)
- [ ] Notify team/stakeholders

## 🔍 Contract Verification

### Automatic Verification via Hardhat

```bash
npx hardhat verify --network <network> <CONTRACT_ADDRESS>
```

### Manual Verification

1. Access the network's block explorer (Etherscan, BscScan, etc.)
2. Navigate to the contract address
3. Click on "Verify and Publish"
4. Paste the contract code
5. Select compliation settings
6. Submit for verification

## 📊 Monitoring

After deployment, monitor:

- Contract transactions
- Emitted events
- Gas usage
- Errors or reverts
- Suspicious activity

## 🚨 Troubleshooting

### Error: "Insufficient funds"
- Check if you have sufficient balance for gas fees
- Consider adjusting gas price in hardhat.config.js

### Error: "Contract verification failed"
- Verify you are using the same compilation settings
- Confirm source code matches deployed bytecode
- Check if all dependencies are correct

### Error: "Nonce too high"
- Wait a few minutes and try again
- Or manually set the nonce

## 📝 Deployment Documentation

Keep a record of each deployment:

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

## 🔗 Useful Links

- [Hardhat Deployment Guide](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- [OpenZeppelin Security Best Practices](https://docs.openzeppelin.com/contracts/security)
- [Ethereum Gas Tracker](https://etherscan.io/gastracker)

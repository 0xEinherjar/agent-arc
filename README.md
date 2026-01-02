# Einherjar Agent - Documentation and Tutorial

This guide serves as a tutorial to help you set up your account and interact with the agent.

## 🚀 Getting Started

### 1. Create Account
To interact with the system, you need to register:
- Log in to the project's web platform using your **X (Twitter)** account.
- The system will automatically create an account for you and generate a unique **wallet** associated with your profile.

### 2. Add Funds
To execute any interaction (transactions, token creation, gas fees), your wallet needs to have a balance.
- Add funds to your newly created wallet before attempting to execute commands.

---

## 🤖 How to Interact

Interaction with the agent is done directly through **X (Twitter)**, making blockchain usage simple and conversational.

**Step-by-step:**
1. Open X (Twitter).
2. Write a tweet or reply mentioning the agent's user: **@EinherjarAgent**.
3. Type the desired command along with the mention.

---

## 📜 Available Commands

Currently, the system supports the following commands:

### 💸 Send Tokens (USDC or ERC20)
Send values to external wallet addresses or directly to other Twitter users.

**Example:**
> "@EinherjarAgent send 50 usdc to @username"

> "@EinherjarAgent send 100 WBTC (contract 0x123...789) to address 0x456..."

**Sending Rules:**
- **Sender:** Must have an account in the system and sufficient funds.
- **Recipient:** 
    - If it is a wallet address: Receives directly.
    - If it is a Twitter user (e.g., @username): **Does not** need an account in the system to receive the sending notification.
- **Claiming:** For the Twitter user to move or claim the received 50 USDC, they will need to log in to the system (create an account) later.

### 🪙 Create ERC20 Tokens
Create your own ERC20 tokens in a simplified way through commands to the agent.

---

## 🔮 Future (Roadmap)
We are constantly working to expand the capabilities of the Einherjar Agent. Planned features include:

- **New Social Integrations**: Support for other social networks besides Twitter.
- **DeFi and DEX**: Automatic listing of created tokens on Decentralized Exchanges (DEX).
- **NFTs**: Commands for creating and managing NFTs.
- **Arc Ecosystem**: Native integrations with Arc network protocols.

---

## 🏗️ Project Structure

The project is organized into three main components:

### 1. Backend (`/backend`)
The brain of the system, responsible for managing agent logic, authentication, and blockchain interactions.
- **Technologies**: Node.js, Express
- **AI & Agents**: LangChain (Integration with LLMs), OpenAI
- **Database**: MongoDB (Data persistence and agent state)
- **Authentication**: Passport.js (Twitter Strategy)
- **Blockchain**: Viem (Interaction with EVM networks)

### 2. Frontend (`/frontend`)
The web interface for account management, wallet viewing, and fund top-up.
- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Web3**: Wagmi & Viem

### 3. Smart Contracts (`/contract`)
Smart contracts and deployment/verification scripts.
- **Framework**: Hardhat
- **Standards**: OpenZeppelin Contracts
- **Scripts**: Automated deploy for Arc testnet

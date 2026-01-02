# Arc Network Automation Agent 🤖💸

This project implements a **Blockchain Automation Agent** integrated with Twitter, designed to operate on the **Arc Network**. The bot interprets natural language commands received via Twitter mentions and executes on-chain transactions autonomously.

## 🎯 Purpose

Enable financial interactions and complex blockchain operations directly through Twitter, making crypto usage as simple as sending a tweet.

## 🚀 Key Features

### 1. Native Token Transfers (USDC)
*   **Command:** "Send 10 USDC to @friend" or "Transfer 5 USD to 0x123..."
*   **Intelligence:** The agent automatically identifies if the recipient is a Twitter user (handle) or a wallet address.
*   **Social Integration:** Automatically maps Twitter handles (`@username`) to wallet addresses registered in the system.

### 2. ERC-20 Token Transfers
*   **Command:** "Send 100 TOKENS from contract 0xABC... to @user"
*   **Support:** Works with any ERC-20 contract on the Arc network.

### 3. Token Creation
*   **Command:** "Create a token named MyCoin with symbol MC and supply of 1 million"
*   **Deploy:** Instantly deploys new ERC-20 contracts on the network.

## 🧠 AI Architecture

The system uses **LangChain** with LLM models (e.g., GPT-4) to:
*   Interpret user intent from free text.
*   Extract parameters (amounts, recipients, tokens).
*   Select the correct tool (`transferNative`, `transferNativeToUsername`, etc.) based on context.
*   **Security:** Strict restrictions in the system prompt prevent unauthorized actions and ensure concise and safe responses (transaction hash only, no external links).

## 🛠️ Tech Stack

*   **Backend:** Node.js (Express)
*   **AI/Agent:** LangChain, OpenAI API
*   **Blockchain:** Viem (EVM Interactions), Privy (Wallet Management)
*   **Data:** MongoDB (Persistence of users and processed tweets)
*   **Twitter:** Twitter API v2 (Streams/Mentions)

## 📋 Prerequisites

*   Node.js 18+
*   MongoDB
*   Twitter Developer Account (Elevated/Pro for mentions API access)
*   Privy Account (for embedded wallet creation)
*   OpenAI API Key

## 📦 Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the environment:**
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file with your API keys (Twitter, OpenAI, Privy, MongoDB).

4.  **Start the server:**
    ```bash
    # Development
    npm run dev
    
    # Production
    npm start
    ```

## 🔒 Security and Privacy

*   **Input Validation:** The agent uses Zod schemas to rigorously validate all transaction parameters.
*   **Secure Mapping:** The system maintains the mapping between Twitter ID and Wallet Address internally, without exposing sensitive data.
*   **Rate Limiting:** Protection against abuse in authentication and interaction APIs.

## 📄 License

ISC

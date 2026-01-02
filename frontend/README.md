# Web3 AI Frontend

Frontend for the Web3 AI application built with Vue 3 and Vite, providing a modern interface for Web3 wallet management, USDC transactions, and blockchain integration.

## 🚀 Features

- **Modern Interface**: Responsive and intuitive UI with Vue 3 Composition API
- **Wallet Connectors**: Support for MetaMask, Binance Wallet, and Coinbase Wallet via Wagmi
- **Wallet Management**: Import, export, and manage private keys
- **USDC Transactions**: Deposit and withdraw USDC tokens
- **Authentication**: Twitter OAuth integration via backend
- **State Management**: Pinia for global state
- **Data Caching**: Vue Query for data caching and synchronization
- **Responsive**: Adaptive design for mobile and desktop devices

## 🛠️ Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Ultra-fast build tool and dev server
- **Wagmi** - React Hooks for Ethereum (ported to Vue)
- **Viem** - TypeScript library to interact with Ethereum
- **Pinia** - State management for Vue
- **Vue Query** - Server state synchronization for Vue
- **Vue Router** - Official routing for Vue.js
- **Axios** - HTTP client for API communication

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Web3 AI Backend running (see [backend README](../backend/README.md))
- A Web3 wallet (MetaMask, Binance Wallet, or Coinbase Wallet)

## 🔧 Installation

1. Clone the repository (if you haven't already):
```bash
git clone <repository-url>
cd web3-ai/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with the backend URL:
```env
VITE_BASEURL=http://localhost:3000
```

## 🏃 Running

### Development
```bash
npm run dev
```

The development server will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

Optimized files will be generated in the `dist/` folder

### Preview Build
```bash
npm run preview
```

Preview the production build locally before deploying

## 📁 Project Structure

```
src/
├── assets/              # Images and static resources
├── components/          # Reusable Vue components
│   ├── connect-wallet.vue
│   ├── deposit.vue
│   ├── withdraw.vue
│   ├── export-private-key.vue
│   ├── import-private-key.vue
│   ├── copy.vue
│   ├── header.vue
│   ├── loading.vue
│   ├── logo.vue
│   └── toast.vue
├── composables/         # Vue composables (reusable logic)
│   ├── useGetBalance.js
│   ├── usePublicClient.js
│   └── useUtils.js
├── infra/               # Infrastructure and gateways
│   ├── axios.js
│   └── gateway/
│       └── user.js
├── routes/              # Route configuration
│   └── index.js
├── store/               # Pinia stores
│   ├── notification.js
│   └── user.js
├── views/               # Pages/views
│   ├── home.vue
│   └── login.vue
├── App.vue              # Root component
├── main.js              # Application entry point
├── wagmi.js             # Wagmi configuration
└── style.css            # Global styles
```

## 🎯 Features

### Authentication
- Login via Twitter OAuth (redirect to backend)
- Automatic session verification
- Logout

### Dashboard
- USDC balance display
- Wallet address with copy functionality
- Responsive interface

### Transactions
- **Deposit**: Add USDC to wallet
- **Withdraw**: Withdraw USDC from wallet
- Integration with smart contracts via Viem

### Wallet Management
- Import existing wallet via private key
- Export private key (securely)
- Connect with multiple Web3 wallets

### Notifications
- Toast notification system
- Visual feedback for user actions

## 🔌 Supported Wallet Connectors

- **MetaMask** - Via Wagmi Connector
- **Binance Wallet** - Via `@binance/w3w-wagmi-connector-v2`
- **Coinbase Wallet** - Via Wagmi Connector

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASEURL` | Backend API base URL | `http://localhost:3000` |

## 📱 Routes

- `/` - Login page
- `/home` - Main dashboard (requires authentication)

## 🚢 Production Deployment

1. Configure `VITE_BASEURL` in `.env` with the production backend URL

2. Generate production build:
```bash
npm run build
```

3. Static files will be in the `dist/` folder

4. Configure a web server (nginx, Apache, etc.) to serve files from the `dist/` folder

### Example with Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Deploy to Vercel/Netlify:
- Configure `VITE_BASEURL` as an environment variable on the platform
- Connect the repository and enable automatic deployment
- The build will run automatically

## 🔒 Security

- HTTP requests with credentials (cookies) for authentication
- Data validation before sending to backend
- Secure handling of private keys (export only when necessary)
- CORS configured on backend to accept only allowed origin

## 🐛 Troubleshooting

### Backend connection error
- Verify that `VITE_BASEURL` is configured correctly
- Make sure the backend is running
- Check CORS on the backend

### Wallet won't connect
- Verify that the wallet extension is installed
- Make sure you're using a supported network
- Check the browser console for errors

### Build fails
- Clean `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Verify you're using Node.js 18+

## 📄 License

ISC

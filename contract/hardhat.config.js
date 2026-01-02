require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");
require("dotenv").config();

// Helper function to get accounts from env
function getAccounts() {
  if (!process.env.PRIVATE_KEY) {
    return [];
  }
  // Support multiple private keys (comma-separated) or single key
  const keys = process.env.PRIVATE_KEY.split(',').map(key => key.trim()).filter(key => key);
  return keys.length > 0 ? keys : [];
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        // Higher runs = smaller code, higher gas cost per transaction
        // Lower runs = larger code, lower gas cost per transaction
        // 1000000 is recommended for production contracts
        runs: process.env.OPTIMIZER_RUNS ? parseInt(process.env.OPTIMIZER_RUNS) : 1000000,
      },
      viaIR: false, // Enable if needed for complex contracts
      metadata: {
        bytecodeHash: "none", // Disable metadata hash for deterministic builds
      },
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode", "evm.deployedBytecode", "evm.methodIdentifiers", "metadata"],
          "": ["ast"],
        },
      },
    },
  },
  networks: {
    testnet_arc: {
      url: process.env.RPC_URL_ARC || "https://rpc.testnet.arc.network",
      accounts: getAccounts(),
      chainId: 5042002,
      timeout: 120000,
      gasPrice: "auto",
    },
  },
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: [
      ":ERC20Factory$",
    ],
    spacing: 2,
    format: "json",
  },
  etherscan: {
    apiKey: {
      testnet_arc: process.env.ARC_TESTNET_API_KEY || "",
    },
    customChains: [
      {
        network: "testnet_arc",
        chainId: 5042002,
        urls: {
          apiURL: "https://testnet.arcscan.app/api",
          browserURL: "https://testnet.arcscan.app",
        },
      },
    ],
  },
  mocha: {
    timeout: 40000,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    gasPrice: 20,
    outputFile: "gas-report.txt",
    noColors: true,
  },
};

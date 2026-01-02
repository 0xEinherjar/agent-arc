const hre = require("hardhat");

/**
 * Script to verify contracts on block explorers
 * 
 * Usage:
 *   npx hardhat run scripts/verify.js --network <network>
 * 
 * Or use the direct command:
 *   npx hardhat verify --network <network> <CONTRACT_ADDRESS>
 */

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ Error: CONTRACT_ADDRESS environment variable is required");
    console.log("\nUsage:");
    console.log("  CONTRACT_ADDRESS=0x... npx hardhat run scripts/verify.js --network <network>");
    console.log("\nOr use Hardhat's verify command directly:");
    console.log("  npx hardhat verify --network <network> <CONTRACT_ADDRESS>");
    process.exit(1);
  }

  const network = await hre.ethers.provider.getNetwork();
  console.log("\n=== Contract Verification ===\n");
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());
  console.log("Contract Address:", contractAddress);
  console.log("\nVerifying contract...\n");

  try {
    // Check if the contract exists
    const code = await hre.ethers.provider.getCode(contractAddress);
    if (code === "0x") {
      throw new Error("Contract code is empty. Contract may not be deployed at this address.");
    }

    // The real verification should be done via hardhat verify command
    // This script serves mainly as documentation and preliminary validation
    console.log("✅ Contract code found at address");
    console.log("\nTo verify the contract, run:");
    console.log(`  npx hardhat verify --network ${network.name} ${contractAddress}`);
    console.log("\nFor constructor arguments (if any), use:");
    console.log(`  npx hardhat verify --network ${network.name} ${contractAddress} <constructor_arg1> <constructor_arg2> ...`);
    
  } catch (error) {
    console.error("\n❌ Verification failed:");
    console.error(error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Script failed:");
    console.error(error);
    process.exitCode = 1;
    process.exit(1);
  });


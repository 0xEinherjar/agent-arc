const hre = require("hardhat");

/**
 * Script to check the status of a deployed contract
 * 
 * Usage:
 *   CONTRACT_ADDRESS=0x... npx hardhat run scripts/check-deployment.js --network <network>
 */

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ Error: CONTRACT_ADDRESS environment variable is required");
    process.exit(1);
  }

  const network = await hre.ethers.provider.getNetwork();
  console.log("\n=== Contract Deployment Check ===\n");
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());
  console.log("Contract Address:", contractAddress);
  console.log("");

  try {
    // Check if the contract exists
    const code = await hre.ethers.provider.getCode(contractAddress);
    
    if (code === "0x") {
      console.log("❌ Contract not found at this address");
      console.log("   The address may not be a contract, or the contract was not deployed.");
      process.exit(1);
    }

    console.log("✅ Contract code found");
    console.log("   Code length:", code.length, "characters");
    console.log("");

    // Try to get contract information
    try {
      const factory = await hre.ethers.getContractAt("ERC20Factory", contractAddress);
      
      // Get basic information
      const tokenCount = await factory.allTokensLength();
      console.log("📊 Contract Information:");
      console.log("   Total tokens created:", tokenCount.toString());
      console.log("");

      // Get block information
      const blockNumber = await hre.ethers.provider.getBlockNumber();
      console.log("📦 Blockchain Information:");
      console.log("   Current block number:", blockNumber);
      
      const balance = await hre.ethers.provider.getBalance(contractAddress);
      console.log("   Contract balance:", hre.ethers.formatEther(balance), "ETH");
      console.log("");

      console.log("✅ Contract is deployed and operational\n");

    } catch (error) {
      console.log("⚠️  Could not interact with contract (it may not be ERC20Factory):");
      console.log("   Error:", error.message);
      console.log("");
      console.log("✅ Contract code exists at address\n");
    }

  } catch (error) {
    console.error("\n❌ Error checking deployment:");
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


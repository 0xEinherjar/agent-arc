const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("\n=== ERC20 Factory Deployment ===\n");
  console.log("Deploying contracts with the account:", deployer.address);

  // Check if we are on a production network (not hardhat/localhost)
  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString(), "\n");

  // Deploy the contract
  console.log("Deploying ERC20Factory...");
  const ERC20Factory = await hre.ethers.deployContract("ERC20Factory");
  
  console.log("Waiting for deployment confirmation...");
  await ERC20Factory.waitForDeployment();
  
  const factoryAddress = await ERC20Factory.target;
  console.log("✅ ERC20Factory deployed to:", factoryAddress);

  // Wait for some confirmations to ensure the deployment was processed
  if (network.chainId !== 31337n && network.chainId !== 1337n) {
    console.log("Waiting for block confirmations...");
    await ERC20Factory.deploymentTransaction()?.wait(5);
  }

  // Check if the contract was deployed correctly
  try {
    const code = await hre.ethers.provider.getCode(factoryAddress);
    if (code === "0x") {
      throw new Error("Contract code is empty. Deployment may have failed.");
    }
    console.log("✅ Contract code verified on chain\n");
  } catch (error) {
    console.error("❌ Error verifying contract:", error.message);
    throw error;
  }

  // Save deployment information
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    factoryAddress: factoryAddress,
    timestamp: new Date().toISOString(),
    transactionHash: ERC20Factory.deploymentTransaction()?.hash || "N/A"
  };

  console.log("=== Deployment Summary ===\n");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  console.log("\n=== Deployment Complete ===\n");

  // Post-deploy instructions
  if (network.chainId !== 31337n && network.chainId !== 1337n) {
    console.log("📝 Next steps:");
    console.log("1. Verify the contract on block explorer:");
    console.log(`   npx hardhat verify --network ${network.name} ${factoryAddress}`);
    console.log("\n2. Save this deployment information for your records.\n");
  }

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exitCode = 1;
    process.exit(1);
  });

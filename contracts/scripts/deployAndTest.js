const hre = require("hardhat");

async function main() {
    const functionSignature = "mint(address,uint256)";
    const [services, vendorOwner, user] = await hre.ethers.getSigners();

    // Corrected deployment and logging of contract addresses
    const Vendor = await hre.ethers.getContractFactory("VendorExample", vendorOwner);
    const vendor = await Vendor.deploy();
    await vendor.waitForDeployment();
    console.log("Vendor deployed to:", vendor.target);

    const BCS = await hre.ethers.getContractFactory("BCS");
    const bcs = await BCS.connect(services).deploy();
    await bcs.waitForDeployment();
    console.log("BCS deployed to:", bcs.target);

    const iface = new hre.ethers.Interface(["function mint(address to, uint256 amount)"]);

    const encodedFunctionCall = iface.encodeFunctionData("mint", [user.address, 3]);
    bcs.on("VendorCalled", (vendorAddr, success, data) => {
        console.log(`Vendor Called: success=${success} data=${data}`);
    });
    console.log('user address:', user.address);
    vendor.on("Mint", async (to, tokenId) => {
        let owner = await vendor.connect(user).ownerOf(tokenId);
        console.log(owner);

    });
    try {
        const txResponse = await bcs.connect(services).callBCSVendor(vendor.target, encodedFunctionCall);
        const txReceipt = await txResponse.wait();
    } catch (error) {
        console.error("Error calling BCS contract:", error);
    }

    // // Example of querying the token owner after minting
    // const tokenId = 1; // Assuming the token ID you're interested in is 1
    // const ownerOfToken = await vendor.ownerOf(tokenId);
    // console.log(`Owner of token ${tokenId}:`, ownerOfToken);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

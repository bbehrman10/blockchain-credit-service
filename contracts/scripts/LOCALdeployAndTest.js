const hre = require("hardhat");

async function main() {
    const functionSignature = "mint(address,uint256)";
    const [services, vendorOwner, user] = await hre.ethers.getSigners();

    // Corrected deployment and logging of contract addresses
    const Vendor = await hre.ethers.getContractFactory("VendorExample", vendorOwner);
    const vendor = await Vendor.deploy();
    await vendor.waitForDeployment();
    console.log("Vendor deployed to:", vendor.target);

    const Vault = await hre.ethers.getContractFactory("BCSVault");
    const vault = await Vault.connect(services).deploy();
    await vault.waitForDeployment();
    console.log("Vault deployed to:", vault.target);

    //send a bunch of eth to the vault
    const tx = await services.sendTransaction({
        to: vault.target,
        value: hre.ethers.parseEther("10.0")
    });

    console.log(`balances before minting - user ${await hre.ethers.provider.getBalance(user.address)} - vendorOwner ${await hre.ethers.provider.getBalance(vendor.target)}}`);

    const BCS = await hre.ethers.getContractFactory("BCS");
    const bcs = await BCS.connect(services).deploy(vault.target);
    await bcs.waitForDeployment();
    console.log("BCS deployed to:", bcs.target);

    const setContract = await vault.connect(services).setBCSContract(bcs.target);


    const iface = new hre.ethers.Interface(["function mint(address to, uint256 amount)"]);

    const encodedFunctionCall = iface.encodeFunctionData("mint", [user.address, 3]);
    // bcs.on("VendorCalled", (vendorAddr, success, data) => {
    //     console.log(`Vendor Called: success=${success} data=${data}`);
    // });
    console.log('user address:', user.address);
    vendor.on("Mint", async (to, tokenId) => {
        let owner = await vendor.connect(user).ownerOf(tokenId);
        console.log(owner);

    });
    try {
        const txResponse = await bcs.connect(services).callBCSVendor(vendor.target, encodedFunctionCall, hre.ethers.parseEther("2.1") );
        const txReceipt = await txResponse.wait();
    } catch (error) {
        console.error("Error calling BCS contract:", error);
    }
    console.log(`balances after minting - user ${await hre.ethers.provider.getBalance(user.address)} - vendorOwner ${await hre.ethers.provider.getBalance(vendor.target)} }`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

//deploy vendor
//take note of vendor address

const { ethers } = require("hardhat");
async function main() {
    deployVendor();
}

async function deployVendor(){
    [service] = await ethers.getSigners();
    const vendorContract = await ethers.getContractFactory("VendorExample");
    const vendor = await vendorContract.connect(service).deploy();
    await vendor.waitForDeployment();
    console.log("Vendor deployed to:", vendor.target);
}


main().catch((error) => {
    console.error(error);
    process.exit(1);
});
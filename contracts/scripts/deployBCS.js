//deploys Vault contract
//deploys BCS contract
//sets BCS contract in Vault
//sends eth to Vault
//returns all relevant contract addresses


const { ethers } = require("hardhat");

async function main() {
    vaultaddr = await deployVault();
    bcsaddr = await deployBCS(vaultaddr);
    await setAndFundBCSContract(bcsaddr, vaultaddr);
}

async function deployVault(){
    [service] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("BCSVault");
    const vault = await Vault.connect(service).deploy();
    await vault.waitForDeployment();
    console.log("Vault deployed to:", vault.target);
    return vault.target;
}

async function deployBCS(_vault){
    [service] = await ethers.getSigners();
    const BCS = await ethers.getContractFactory("BCS");
    const bcs = await BCS.connect(service).deploy(_vault);
    await bcs.waitForDeployment();
    console.log("BCS deployed to:", bcs.target);
    return bcs.target;
}

async function setAndFundBCSContract(bcs, vault){
    [service] = await ethers.getSigners();
    const getvault = await ethers.getContractAt("BCSVault", vault);
    const getbcs = await ethers.getContractAt("BCS", bcs);
    const setContract = await getvault.connect(service).setBCSContract(bcs);
    const tx = await service.sendTransaction({
        to: vault,
        value: ethers.parseEther("0.05")
    });
    console.log('ether sent to ', vault);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
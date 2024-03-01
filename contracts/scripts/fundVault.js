const {ethers} = require("hardhat");

async function main (){
fundVault('0.3', '0x5b76C6e6c0fF2416CF61c758E1f8760EC70c5d0e');
}

async function fundVault(amount, vaultAddr){
    [service] = await ethers.getSigners();
    const getvault = await ethers.getContractAt("BCSVault", vaultAddr);
    const tx = await service.sendTransaction({
        to: vaultAddr,
        value: ethers.parseEther(amount)
    });
    console.log('ether sent to ', vaultAddr);
}


main().catch((error) => {
    console.error(error);
    process.exit(1);
});
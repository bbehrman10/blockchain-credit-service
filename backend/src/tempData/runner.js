const director = require('../services/director');
const users = require('./users');
const vendors = require('./vendors');
const vendorclients = require('./vendorClients');
const cards = require('./cards');

async function seedUsers() {
    const user1 = await director.user.createUser(users[0].Username, users[0].Email, users[0].Password);
    const user2 = await director.user.createUser(users[1].Username, users[1].Email, users[1].Password);
    const user3 = await director.user.createUser(users[2].Username, users[2].Email, users[2].Password);
    console.log('Users created', user1, user2, user3);
}

async function seedVendors() {
    const vendor1 = await director.vendor.createVendor(vendors[0].name, vendors[0].email, vendors[0].password, vendors[0].description);
    console.log('Vendor created', vendor1);
}

async function seedVendorClients() {
    const vendorClient1 = await director.vendor.createVendorClient(vendorclients[0].Description, vendorclients[0].ContractAddress, vendorclients[0].FunctionSignature, vendorclients[0].WhiteListedURL, vendorclients[0].VendorID);
    console.log('Vendor client created', vendorClient1);
}

async function seedCard() {
    const card1 = await director.credit.createCard(cards[0].UserID);
    console.log('Card created', card1);

}


function main() {
    // seedUsers();
    // seedVendors();
    // seedVendorClients();
    // getVendor(1);
}

main();
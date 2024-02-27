const {Vendor, sequelize} = require('../../models');
const bcrypt = require('bcrypt');

async function createVendor(vendorName, vendorEmail, vendorPassword, vendorDescription ) {
    try {
        await sequelize.authenticate();
    
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
    const vendor = await Vendor.create({
        Name: vendorName,
        Email: vendorEmail,
        Password: await bcrypt.hash(vendorPassword, 10),
        Description: vendorDescription
    });
    return vendor;
}

createVendor('Vance Refridgeration', 'bob@vancefridge.com', 'password', 'We sell refridgerators');
const { Vendor, VendorClient, sequelize } = require('../../../models');
const bcrypt = require('bcrypt');

exports.createVendor = async (vendorData) => {
    try {
        await sequelize.authenticate();
        const { Name, Email, Password, Description } = vendorData;
        const vendor = await Vendor.create({
            Name: Name,
            Email: Email,
            PasswordHash: await bcrypt.hash(Password, 10),
            Description: Description
        });
        return vendor;
    } catch (error) {
        console.error('Error creating vendor', error);
        throw error;
    }
};

exports.getVendor = async (id) => {
    try {
        await sequelize.authenticate();
        const vendor = await Vendor.findOne({
            where: { VendorID: id }
        });
        return vendor;
    } catch (error) {
        console.error('Error getting vendor', error);
        throw error;
    }
};

exports.updateVendor = async (vendorData) => {
    try {
        await sequelize.authenticate();
        const { vendor } = vendorData;
        const [updatedCount] = await Vendor.update({
            Name: vendor.Name,
            Email: vendor.Email,
            Description: vendor.Description
        }, {
            where: { VendorID: vendor.VendorID }
        });
        return updatedCount > 0;
    } catch (error) {
        console.error('Error updating vendor', error);
        throw error;
    }
};

exports.createVendorClient = async (vendorClientData) => {
    try {
        await sequelize.authenticate();
        const client = await VendorClient.create({
            Description: vendorClientData.Description,
            ContractAddress: vendorClientData.ContractAddress,
            FunctionSignature: vendorClientData.FunctionSignature,
            WhiteListedURL: vendorClientData.WhiteListedURL,
            VendorID: vendorClientData.VendorID
        });
        return client;
    } catch (error) {
        console.error('Error creating vendor client', error);
        throw error;
    }
};

exports.getVendorClient = async (id) => {
    try {
        await sequelize.authenticate();
        const client = await VendorClient.findOne({
            where: { ClientID: id }
        });
        return client;
    } catch (error) {
        console.error('Error getting vendor client', error);
        throw error;
    }
};

exports.updateVendorClient = async (vendorClientData) => {
    try {
        await sequelize.authenticate();
        const { vendorClient } = vendorClientData;
        const [updatedCount] = await VendorClient.update({
            Description: vendorClient.Description,
            ContractAddress: vendorClient.ContractAddress,
            FunctionSignature: vendorClient.FunctionSignature,
            WhiteListedURL: vendorClient.WhiteListedURL
        }, {
            where: { ClientID: vendorClient.ClientID }
        });
        return updatedCount > 0;
    } catch (error) {
        console.error('Error updating vendor client', error);
        throw error;
    }
};

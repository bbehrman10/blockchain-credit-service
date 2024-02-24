//eventually import database connection
import vendorClients from "../tempData/vendorClients.js";

exports.retreiveVendorClientInfo = async(vendorId, clientId) => {
    // retrieve vendor client info from "database" file and return that info back
    const vendorClient = vendorClients.find(client => client.vendorId === vendorId && client.clientId === clientId);
    return vendorClient;
}

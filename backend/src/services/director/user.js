const userMgmt = require('../dataAccess/database/userMgmt');

exports.createUser = async (username, email, password) => {
    const user = {
        Username: username,
        Email: email,
        Password: password
    };
    try {
        const newUser = await userMgmt.createUser(user);
        return newUser;
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
}
exports.getUser = async (id) => { 
    const user = userMgmt.getUser(email)
    return user;
 }

exports.login = async (email, password) => {
    const user = userMgmt.checkLogin(email, password);
    return user;
}
    
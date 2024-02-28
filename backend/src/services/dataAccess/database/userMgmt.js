const { User, sequelize } = require('../../../models');
const bcrypt = require('bcrypt');

exports.createUser = async (_user) => {
    try {
        await sequelize.authenticate();
        const user = await User.create({
            Username: _user.Username,
            Email: _user.Email,
            PasswordHash: await bcrypt.hash(_user.Password, 10)
        });
        return user;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
};

exports.getUser = async (id) => {
    try {
        await sequelize.authenticate();
        const user = await User.findOne({
            where: {
                UserID: id
            }
        });
        return user;
    } catch (error) {
        console.error('Error getting user', error);
        throw error;
    }
};

exports.checkLogin = async (email, password) => {
    try {
        await sequelize.authenticate();
        const user = await User.findOne({
            where: {
                Email: email
            }
        });
        if (!user) {
            return null; // User not found
        }
        const validPassword = await bcrypt.compare(password, user.Password);
        if (validPassword) {
            return user; // Password is valid
        }
        return null; // Password is invalid
    } catch (error) {
        console.error('Error checking login', error);
        throw error;
    }
};

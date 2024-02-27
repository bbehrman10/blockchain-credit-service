const {User, sequelize} = require('../../models');
const bcrypt = require('bcrypt');

exports.createUser = async (username, email, password) => {
    try {
        await sequelize.authenticate();
    
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
    const user = await User.create({
        Username: username,
        Email: email,
        PasswordHash: await bcrypt.hash(password, 10)
    });
    return user;
};

exports.getUser = async (email) => {
    try {
        await sequelize.authenticate();
    
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
    const user = await User.findOne({
        where: {
            Email: email
        }
    });
    return user;
};

createUser('Robert California', 'robertcalifornia@dundermifflin.com', 'password');
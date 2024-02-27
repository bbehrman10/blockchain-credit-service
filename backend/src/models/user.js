const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class User extends Model { }

    User.init({
        UserID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PasswordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'User',

    });

    return User;
};

require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgrespw',
    database: 'postgres',
    host: '127.0.0.1',
    port: 55005,
    dialect: 'postgres',
  },
};

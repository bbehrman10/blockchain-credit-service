const credit = require('./credit');
const user = require('./user');
const vendor = require('./vendor');



const director = {
    credit,
    user,
    vendor
}

module.exports = director;
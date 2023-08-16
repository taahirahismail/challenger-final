const {sign, verify} = require('jsonwebtoken');
require("dotenv").config();

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    },
    process.env.secret_key,
    {
        expiresIn: '1h'
    })
}

module.exports = {
    createToken
}
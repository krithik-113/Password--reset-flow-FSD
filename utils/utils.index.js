const jwt = require("jsonwebtoken");
const generate = user => jwt.sign({ id: user[0]._id }, process.env.SECRET_KEY, { expiresIn: '2m' })

module.exports = generate 
const { check } = require('express-validator')

const registerRules = [
    check('username').notEmpty().isLength({ min: 3, max: 16 }),
    check('email').notEmpty().isEmail(),
    check('password').isStrongPassword()
]

module.exports = { registerRules }
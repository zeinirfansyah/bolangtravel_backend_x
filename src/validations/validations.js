const { check } = require('express-validator')

const registerRules = [
    check("fullname").notEmpty().withMessage("Full name is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("phone").notEmpty().withMessage("Phone is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("username").notEmpty().withMessage("Username is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

const createUserRules = [
    check("fullname").notEmpty().withMessage("Full name is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("phone").notEmpty().withMessage("Phone is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("username").notEmpty().withMessage("Username is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

module.exports = { registerRules, createUserRules }
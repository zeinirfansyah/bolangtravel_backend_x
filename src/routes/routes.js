const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authController");
const { registerRules } = require("../validations/authValidation");

router.post("/auth/register", registerRules, register);
router.post("/auth/login", login);

module.exports = router;

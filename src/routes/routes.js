const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/authController");
const { registerRules } = require("../validations/authValidation");

router.post("/auth/register", registerRules, register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

module.exports = router;

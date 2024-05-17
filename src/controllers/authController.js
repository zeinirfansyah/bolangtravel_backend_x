const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
require("dotenv").config();

async function register(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, phone, address, avatar, username, role, password } =
    req.body;

  const userExists = await db("users")
    .where("username", username)
    .orWhere("email", email)
    .first();

  if (userExists) {
    return res
      .status(409)
      .json({ message: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db("users")
    .insert({
      fullname,
      email,
      phone,
      address,
      avatar,
      username,
      role,
      password: hashedPassword,
    })
    .returning("id");

  const data = {
    id: user[0],
    fullname,
    email,
    phone,
    address,
    avatar,
    username,
    role,
  };

  return res.status(201).json({
    success: true,
    data,
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await db("users").where("username", username).first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const data = {
    id: user.id,
    username,
    accessToken,
  };

  return res.status(200).json({
    success: true,
    data,
  });
}

async function logout(req, res) {
  return res.status(200).json({
    success: true,
    message: "Logout success",
  });
}

module.exports = { register, login, logout };

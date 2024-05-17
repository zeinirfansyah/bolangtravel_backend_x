const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { validationResult } = require("express-validator");

async function register(req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, phone, address, avatar, username, role, password } = req.body;

  const exsistsUser = await db
    .select("*")
    .from("users")
    .where("username", username)
    .orWhere("email", email)
    .first();

  if (exsistsUser) {
    return res
      .status(409)
      .json({ message: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db("users").insert({
    fullname,
    email,
    phone,
    address,
    avatar,
    username,
    role,
    password: hashedPassword,
  });

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

  const user = await db
    .select("*")
    .from("users")
    .where("username", username)
    .first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
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

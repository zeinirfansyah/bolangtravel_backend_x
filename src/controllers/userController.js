const db = require("../database/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
require("dotenv").config();

async function getAllUsers(req, res) {
  const users = await db("users").select("*");
  return res.status(200).json({ success: true, data: users });
}

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await db("users").where("id", id).first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ success: true, data: user });
}

async function getAuthenticatedUser(req, res) {
  const userId = req.user.id;
  const user = await db("users").where("id", userId).first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ success: true, data: user });
}

async function createUser(req, res) {
  const { fullname, email, phone, address, avatar, username, role, password } =
    req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

  return res.status(201).json({ success: true, data });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { fullname, email, phone, address, avatar, username, role, password } =
    req.body;

  const account = await db("users").where("id", id).first();

  if (!account) {
    return res.status(404).json({ message: "User not found" });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (username && username !== account.username) {
    const usernameExists = await db("users")
      .where("username", username)
      .first();
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  }

  if (email && email !== account.email) {
    const emailExists = await db("users").where("email", email).first();
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedFields = {
    fullname: fullname || account.fullname,
    email: email || account.email,
    phone: phone || account.phone,
    address: address || account.address,
    avatar: avatar || account.avatar,
    username: username || account.username,
    role: role || account.role,
  };

  if (hashedPassword) {
    updatedFields.password = hashedPassword;
  }

  const updatedUser = await db("users")
    .where("id", id)
    .update(updatedFields)
    .returning("*");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ success: true, data: updatedUser[0] });
}

// async function deleteUser(req, res) {
//   const { id } = req.params;
//   await db("users").where("id", id).del();
//   return res.status(200).json({ success: true, message: "User deleted" });
// }

async function deleteUser(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const targetUser = await db("users").where("id", id).first();
  if (!targetUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (req.user.role === "superadmin" && targetUser.role !== "superadmin") {
    await db("users").where("id", id).del();
    return res.status(200).json({ success: true, message: "User deleted" });
  }

  return res.status(403).json({ success: false, message: "Forbidden" });
}

module.exports = {
  getAllUsers,
  getUserById,
  getAuthenticatedUser,
  createUser,
  updateUser,
  deleteUser,
};

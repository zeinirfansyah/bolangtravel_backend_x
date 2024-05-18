const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const { login, register, logout } = require("../controllers/authController");
const {
  registerRules,
  createUserRules,
} = require("../validations/validations");
const {
  getAllUsers,
  getUserById,
  getAuthenticatedUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// auth routes
router.post("/auth/register", registerRules, register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// user routes
router.get(
  "/users",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  getAllUsers
);

router.get(
  "/users/:id",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  getUserById
);

router.get("/profile", authenticateToken, getAuthenticatedUser);

router.post(
  "/users",
  authenticateToken,
  authorizeRoles("superadmin"),
  createUserRules,
  createUser
);

router.put(
  "/users/:id",
  authenticateToken,
  authorizeRoles("superadmin"),
  updateUser
);

router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles("superadmin"),
  deleteUser
);

module.exports = router;

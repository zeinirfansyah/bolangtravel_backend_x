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
  createTravelPackageRules,
  createDestinationRules,
} = require("../validations/validations");
const {
  getAllUsers,
  getUserById,
  getAuthenticatedUser,
  createUser,
  updateUser,
  deleteUser,
  updateAuthenticatedUser,
  deleteAuthenticatedUser,
} = require("../controllers/userController");

const {
  getAllTravelPackages,
  getTravelPackageById,
  createTravelPackage,
  createDestination,
} = require("../controllers/travelPackageController");

// auth routes
router.post("/auth/register", registerRules, register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// profile routes
router.get("/profile", authenticateToken, getAuthenticatedUser);
router.put("/profile", authenticateToken, updateAuthenticatedUser);
router.delete("/profile", authenticateToken, deleteAuthenticatedUser);

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

// travelPackages routes
router.get("/travel-packages", getAllTravelPackages);
router.get("/travel-packages/:id", getTravelPackageById);
router.post(
  "/travel-packages",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  createTravelPackageRules,
  createTravelPackage,
);

// destinations routes
router.post(
  "/destinations",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  createDestinationRules,
  createDestination
);

module.exports = router;

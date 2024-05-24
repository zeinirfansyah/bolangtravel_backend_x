const { check } = require("express-validator");

const registerRules = [
  check("fullname").notEmpty().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("phone").notEmpty().withMessage("Phone is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const createUserRules = [
  check("fullname").notEmpty().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("phone").notEmpty().withMessage("Phone is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const createTravelPackageRules = [
  check("package_category")
    .notEmpty()
    .withMessage("Package category is required"),
  check("package_title").notEmpty().withMessage("Package title is required"),
  check("package_location")
    .notEmpty()
    .withMessage("Package location is required"),
  check("package_duration")
    .notEmpty()
    .withMessage("Package duration is required"),
  check("package_price").notEmpty().withMessage("Package price is required"),
  check("package_description")
    .notEmpty()
    .withMessage("Package description is required"),
  check("package_thumbnail")
    .notEmpty()
    .withMessage("Package thumbnail is required"),
  check("rundown_title").notEmpty().withMessage("Rundown title is required"),
  check("rundown_agenda").notEmpty().withMessage("Rundown agenda is required"),
  check("travel_package_id")
    .notEmpty()
    .withMessage("Travel package id is required"),
  check("destination_id").notEmpty().withMessage("Destination id is required"),
];

const createDestinationRules = [
  check("destination_name")
    .notEmpty()
    .withMessage("Destination name is required"),
  check("destination_description")
    .notEmpty()
    .withMessage("Destination description is required"),
  check("destination_thumbnail")
    .notEmpty()
    .withMessage("Destination thumbnail is required"),
]

module.exports = { registerRules, createUserRules, createTravelPackageRules, createDestinationRules };

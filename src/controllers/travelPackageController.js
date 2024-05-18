const { validationResult } = require("express-validator");
const db = require("../database/db");

async function getAllTravelPackages(req, res) {
  const travelPackages = await db("travel_packages").select("*");
  return res.status(200).json({
    success: true,
    data: travelPackages,
  });
}

async function getTravelPackageById(req, res) {
  const { id } = req.params;
  const travel_packages = await db("travel_packages").where({ id }).first();

  if (!travel_packages) {
    return res.status(404).json({
      success: false,
      message: "Travel Package not found",
    });
  }
  return res.status(200).json({ success: true, data: travel_packages });
}

async function createTravelPackage(req, res) {
  const {
    package_category,
    package_title,
    package_location,
    package_duration,
    package_price,
    package_description,
    package_thumbnail
  } = req.body

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const newTravelPackage = await db("travel_packages").insert({
    package_category,
    package_title,
    package_location,
    package_duration,
    package_price,
    package_description,
    package_thumbnail
  })
  
  const data = {
    id: newTravelPackage[0],
    package_category,
    package_title,
    package_location,
    package_duration,
    package_price,
    package_description,
    package_thumbnail
  }

  return res.status(200).json({ success: true, data })
}

module.exports = {
  getAllTravelPackages,
  getTravelPackageById,
  createTravelPackage,
};

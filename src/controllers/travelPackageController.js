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

module.exports = {
  getAllTravelPackages,
  getTravelPackageById
};

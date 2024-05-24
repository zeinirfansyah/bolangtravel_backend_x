const { validationResult } = require("express-validator");
const db = require("../database/db");

async function getAllTravelPackages(req, res) {
  try {
    const travelPackages = await db("travel_packages")
      .select("*")
      .orderBy("id", "asc");

    const withDetails = await Promise.all(
      travelPackages.map(async (package) => {
        const destinations = await db("package_destinations")
          .where("travel_package_id", package.id)
          .join(
            "destinations",
            "package_destinations.destination_id",
            "=",
            "destinations.id"
          )
          .select("destinations.*");

        const rundowns = await db("rundowns")
          .where("travel_package_id", package.id)
          .select("*");

        return {
          ...package,
          destinations: destinations,
          rundowns: rundowns,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: withDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching travel packages",
    });
  }
}

async function getTravelPackageById(req, res) {
  try {
    const { id } = req.params;

    const travelPackage = await db("travel_packages")
      .select("*")
      .where({ id })
      .first();

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Travel Package not found",
      });
    }

    const destinations = await db("package_destinations")
      .where("travel_package_id", travelPackage.id)
      .join(
        "destinations",
        "package_destinations.destination_id",
        "=",
        "destinations.id"
      )
      .select("destinations.*");

    const rundowns = await db("rundowns")
      .where("travel_package_id", travelPackage.id)
      .select("*");

    const withDetails = {
      ...travelPackage,
      destinations: destinations,
      rundowns: rundowns,
    };

    return res.status(200).json({
      success: true,
      data: withDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching travel package",
    });
  }
}

async function createTravelPackage(req, res) {
  try {
    const {
      package_category,
      package_title,
      package_location,
      package_duration,
      package_price,
      package_description,
      package_thumbnail,
      rundowns, 
      destinations, 
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTravelPackage = await db("travel_packages").insert({
      package_category,
      package_title,
      package_location,
      package_duration,
      package_price,
      package_description,
      package_thumbnail,
    });

    const travelPackageId = newTravelPackage[0]; 

    const createdRundowns = await Promise.all(
      rundowns.map(async (rundown) => {
        return await db("rundowns").insert({
          rundown_title: rundown.rundown_title,
          rundown_agenda: rundown.rundown_agenda,
          travel_package_id: travelPackageId,
        });
      })
    );

    const attachedDestinations = await Promise.all(
      destinations.map(async (destinationId) => {
        return await db("package_destinations").insert({
          travel_package_id: travelPackageId,
          destination_id: destinationId,
        });
      })
    );

    const data = {
      id: travelPackageId,
      package_category,
      package_title,
      package_location,
      package_duration,
      package_price,
      package_description,
      package_thumbnail,
      rundowns: createdRundowns,
      destinations: attachedDestinations,
    };

    return res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating travel package",
    });
  }
}


module.exports = {
  getAllTravelPackages,
  getTravelPackageById,
  createTravelPackage,
};

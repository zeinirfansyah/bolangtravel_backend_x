const { faker } = require('@faker-js/faker');

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex('travel_packages').del();

  const travelPackages = [];
  for (let i = 0; i < 24; i++) {
    travelPackages.push({
      pacakage_category: "family",
      pacakage_title: faker.lorem.sentence(1),
      pacakage_location: faker.location.city(),
      pacakage_duration: faker.number.int({ min: 1, max: 4 }), 
      pacakage_price: faker.commerce.price(), 
      pacakage_description: faker.lorem.paragraph(2), 
      pacakage_thumbnail: faker.image.urlPicsumPhotos(640, 480, true),
    });
  }

  await knex('travel_packages').insert(travelPackages);
};

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
      package_category: faker.helpers.arrayElement(["family", "honeymoon", "solo"]),
      package_title: faker.music.songName(),
      package_location: faker.location.city(),
      package_duration: faker.number.int({ min: 1, max: 4 }), 
      package_price: faker.commerce.price(), 
      package_description: faker.lorem.paragraph(2), 
      package_thumbnail: faker.image.urlPicsumPhotos(640, 480, true),
    });
  }

  await knex('travel_packages').insert(travelPackages);
};

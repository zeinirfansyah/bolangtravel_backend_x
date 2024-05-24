const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('destinations').del();

  const destinations = [];
  for (let i = 0; i < 8; i++) {
    destinations.push({
      destination_name: faker.location.city(),
      destination_description: faker.lorem.paragraph(2),
      destination_thumbnail: faker.image.urlPicsumPhotos(640, 480, true)
    });
  }

  await knex('destinations').insert(destinations);
};

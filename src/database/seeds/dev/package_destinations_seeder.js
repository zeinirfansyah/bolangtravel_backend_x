const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('package_destinations').del();

  const package_destinations = [];
  for (let i = 0; i < 16; i++) {
    package_destinations.push({
      travel_package_id: faker.number.int({ min: 13, max: 16 }),
      destination_id: faker.number.int({ min: 145, max: 152 }),
    });
  }

  await knex('package_destinations').insert(package_destinations);
};

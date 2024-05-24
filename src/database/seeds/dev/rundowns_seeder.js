const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('rundowns').del();

  const rundowns = [];
  for (let i = 0; i < 12; i++) {
    rundowns.push({
      rundown_title: faker.helpers.arrayElement(["Day 1", "Day 2", "Day 3"]),
      rundown_agenda: faker.location.city(),
     travel_package_id: faker.number.int({ min: 13, max: 16 }),
    });
  }

  await knex('rundowns').insert(rundowns);
};

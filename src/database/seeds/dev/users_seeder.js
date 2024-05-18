const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex("users").del();

  const password = await bcrypt.hash("test123", 10);

  const users_array = [];
  for (let i = 0; i < 24; i++) {
    users_array.push({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      avatar: faker.image.urlPicsumPhotos(640, 480, true),
      username: faker.internet.userName(),
      password: password,
      role: faker.helpers.arrayElement(["superadmin", "admin", "user"]),
    });
  }

  await knex("users").insert(users_array);
};

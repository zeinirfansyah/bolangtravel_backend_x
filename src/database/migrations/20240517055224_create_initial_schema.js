/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("fullname");
      table.string("email");
      table.string("phone");
      table.string("address");
      table.string("avatar");
      table.string("username");
      table.string("password");
      table.enum("role", ["superadmin", "admin", "user"]).defaultTo("user");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();
    })
    .createTable("travel_packages", (table) => {
      table.increments("id").primary();
      table
        .enum("pacakage_category", ["family", "honeymoon", "solo"])
        .defaultTo("family");
      table.string("pacakage_title");
      table.string("pacakage_location");
      table.string("pacakage_duration");
      table.double("pacakage_price");
      table.text("pacakage_description");
      table.string("pacakage_thumbnail");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();
    })
    .createTable("destinations", (table) => {
      table.increments("id").primary();
      table.string("destination_name");
      table.string("destination_description");
      table.string("destination_thumbnail");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();

      table.integer("travel_package_id").unsigned();
      table.foreign("travel_package_id").references("travel_packages.id");
    })
    .createTable("rundowns", (table) => {
      table.increments("id").primary();
      table.string("rundown_title");
      table.text("rundown_agenda");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();

      table.integer("travel_package_id").unsigned();
      table.foreign("travel_package_id").references("travel_packages.id");
    })
    .createTable("bookings", (table) => {
      table.increments("id").primary();
      table.datetime("booking_date");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();

      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");

      table.integer("travel_package_id").unsigned();
      table.foreign("travel_package_id").references("travel_packages.id");
    })
    .createTable("checkouts", (table) => {
      table.increments("id").primary();
      table.string("bank_name");
      table.string("account_name");
      table.string("transfer_receipt");
      table.datetime("checkout_date");
      table.datetime("created_at").defaultTo(knex.fn.now());
      table.datetime("updated_at").nullable();

      table.integer("booking_id").unsigned();
      table.foreign("booking_id").references("bookings.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};

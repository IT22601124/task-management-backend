"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("Password123!", 12),
        role: "admin",
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        name: "Project User",
        email: "user@example.com",
        password: await bcrypt.hash("Password123!", 12),
        role: "user",
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      email: ["admin@example.com", "user@example.com"]
    });
  }
};

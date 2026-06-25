"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(120)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(160)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  }
};

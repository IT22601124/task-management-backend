"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(180)
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      priority: {
        allowNull: false,
        type: Sequelize.ENUM("low", "medium", "high"),
        defaultValue: "medium"
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("open", "in_progress", "testing", "done"),
        defaultValue: "open"
      },
      due_date: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      assigned_to: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
    await queryInterface.dropTable("tasks");
  }
};

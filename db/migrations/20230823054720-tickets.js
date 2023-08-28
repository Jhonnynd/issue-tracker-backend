"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
      submitter_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      assigned_user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      ticket_status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ticket_statuses",
          key: "id",
        },
      },
      ticket_priority_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ticket_priorities",
          key: "id",
        },
      },
      ticket_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ticket_types",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("tickets");
  },
};

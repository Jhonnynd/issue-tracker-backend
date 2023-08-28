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

    await queryInterface.createTable("ticket_reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      ticket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
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

    await queryInterface.createTable("ticket_review_attachments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      ticket_review_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ticket_reviews",
          key: "id",
        },
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.createTable("ticket_comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      ticket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
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

    await queryInterface.createTable("ticket_attachments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      ticket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable("ticket_reviews");
    await queryInterface.dropTable("ticket_review_attachments");
    await queryInterface.dropTable("ticket_attachments");
    await queryInterface.dropTable("ticket_comments");
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("user_roles", [
      { description: "Admin" },
      { description: "Project Manager" },
      { description: "Full Stack Developer" },
      { description: "Front-End Developer" },
      { description: "Back-End Developer" },
      { description: "DevOps Developer" },
      { description: "Cloud Developer" },
    ]);

    await queryInterface.bulkInsert("ticket_statuses", [
      { description: "New" },
      { description: "In Progress" },
      { description: "Resolved" },
      { description: "Additional Info Required" },
    ]);

    await queryInterface.bulkInsert("ticket_priorities", [
      { description: "Low" },
      { description: "Medium" },
      { description: "High" },
    ]);

    await queryInterface.bulkInsert("ticket_types", [
      { description: "Bugs/Errors" },
      { description: "Other Comments" },
      { description: "Feature Request" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

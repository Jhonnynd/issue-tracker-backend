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

    await queryInterface.bulkInsert("users", [
      {
        email: "newton@gmail.com",
        first_name: "New",
        last_name: "Ton",
        user_role_id: 1,
      },
    ]);
    await queryInterface.bulkInsert("projects", [
      {
        title: "National Library Website",
        description: "New website for the library",
        user_id: "1",
      },
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

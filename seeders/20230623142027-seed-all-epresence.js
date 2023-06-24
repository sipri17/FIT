'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
       const data = [{
      id_user:1,
      type:"IN",
      is_approve: true,
      waktu: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_user:1,
      type:"OUT",
      is_approve: false,
      waktu: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
     await queryInterface.bulkInsert('Epresences', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {
      truncate: true, restartIdentity: true, cascade: true
    });
  }
};

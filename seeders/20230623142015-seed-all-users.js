'use strict';

const { hashedPassword } = require('../helpers/bcrypt');

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
    const data = [{
      nama:"Ananda Bayu",
      email:"bayu@email.com",
      npp: "12345",
      npp_supervisor: "11111",
      password: hashedPassword("testtest"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama:"Supervisor",
      email:"spv@email.com",
      npp: "11111",
      npp_supervisor: null,
      password: hashedPassword("testtest"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama:"Supervisor2",
      email:"spv2@email.com",
      npp: "22222",
      npp_supervisor: null,
      password: hashedPassword("testtest"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama:"Sukoco",
      email:"sukoco@email.com",
      npp: "43212",
      npp_supervisor: "22222",
      password: hashedPassword("testtest"),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
     await queryInterface.bulkInsert('Users', data)

  },

  async down(queryInterface, Sequelize) {
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

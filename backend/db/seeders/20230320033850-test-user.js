'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'tester1@user.io',
        username: 'Tester-1',
        hashedPassword: bcrypt.hashSync('tester'),
        firstName: 'Tester',
        lastName: 'One'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Tester-1']}
    }, {});
  }
};

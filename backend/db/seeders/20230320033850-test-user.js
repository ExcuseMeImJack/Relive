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
        firstName: 'John',
        lastName: 'Smith'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        email: 'tester2@user.io',
        username: 'Tester-2',
        hashedPassword: bcrypt.hashSync('tester'),
        firstName: 'Jane',
        lastName: 'Doe'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        email: 'tester3@user.io',
        username: 'Tester-3',
        hashedPassword: bcrypt.hashSync('tester'),
        firstName: 'Barney',
        lastName: 'Willow'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Tester-1', 'Tester-2', 'Tester-3']}
    }, {});
  }
};

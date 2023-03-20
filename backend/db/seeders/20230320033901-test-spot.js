'use strict';
const {Op} = require('sequelize');
const {User}  = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let user = await User.findOne({where: {username: 'Tester-1'}});
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: user.id,
        address: '123 Test Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.0522,
        lng: 118.2437,
        name: 'Test House',
        description: 'A house we use to test our database with.',
        price: 123
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      address: {[Op.in]: ['123 Test Street']}
    }, {})
  }
};

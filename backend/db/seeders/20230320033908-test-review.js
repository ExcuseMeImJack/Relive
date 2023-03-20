'use strict';
const {User,Spot} = require('../models');
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let user = await User.findOne({where: {username: 'Tester-1'}});
    let spot = await Spot.findOne({where: {address: '123 Test Street'}});

    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spot.id,
        userId: user.id,
        review: 'The Good Place.',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      review: 'Good place.'
    }, {})
  }
};

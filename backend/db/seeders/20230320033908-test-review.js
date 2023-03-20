'use strict';
const {User,Spot} = require('../models');
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let user1 = await User.findOne({where: {username: 'Tester-1'}});
    let spot1 = await Spot.findOne({where: {address: '123 Test Street'}});
    let user2 = await User.findOne({where: {username: 'Tester-2'}});
    let spot2 = await Spot.findOne({where: {address: '123 Test Avenue'}});

    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spot1.id,
        userId: user1.id,
        review: 'The Good Place.',
        stars: 3
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot1.id,
        userId: user1.id,
        review: 'The Bad Place.',
        stars: 1
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot2.id,
        userId: user2.id,
        review: 'The Medium Place.',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      review: ['The Good Place.', 'The Medium Place.', 'The Bad Place.']
    }, {})
  }
};

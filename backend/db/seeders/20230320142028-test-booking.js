'use strict';

const {User,Spot} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'Bookings';

module.exports = {
  async up (queryInterface, Sequelize) {
    let user1 = await User.findOne({where: {username: 'Tester-1'}});
    let spot1 = await Spot.findOne({where: {address: '123 Test Street'}});

    let user2 = await User.findOne({where: {username: 'Tester-2'}});
    let spot2 = await Spot.findOne({where: {address: '123 Test Avenue'}});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot1.id,
        userId: user1.id,
        startDate: '2021-11-19',
        endDate: '2021-11-20'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot2.id,
        userId: user2.id,
        startDate: '2021-11-19',
        endDate: '2021-11-20'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot2.id,
        userId: user2.id,
        startDate: '2022-11-19',
        endDate: '2022-11-20'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, {
      startDate: ['2021-11-19', '2022-11-19']
    }, {})
  }
};

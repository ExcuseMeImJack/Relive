'use strict';

const {User,Spot} = require('../models');
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'Bookings';

module.exports = {
  async up (queryInterface, Sequelize) {


    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 4,
        startDate: new Date('2023-07-19'),
        endDate: new Date('2023-07-24')
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 5,
        startDate: new Date('2023-07-19'),
        endDate: new Date('2023-07-24')
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        userId: 6,
        startDate: new Date('2023-07-19'),
        endDate: new Date('2023-07-24')
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 4,
        startDate: new Date('2023-07-26'),
        endDate: new Date('2023-07-28')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, {
      spotId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};

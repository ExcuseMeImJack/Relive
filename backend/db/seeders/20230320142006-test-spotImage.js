'use strict';

const {User,Spot,Review} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'SpotImages';

module.exports = {
  async up (queryInterface, Sequelize) {

    let spot1 = await Spot.findOne({where: {address: '123 Test Street'}});
    let spot2 = await Spot.findOne({where: {address: '123 Test Avenue'}});
    let spot3 = await Spot.findOne({where: {address: '123 Test Drive'}});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot1.id,
        url: 'test.url',
        preview: true
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot2.id,
        url: 'test.url',
        preview: true
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: spot3.id,
        url: 'test.url',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: 'test.url'
    }, {})
  }
};

'use strict';

const {User,Spot,Review} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    let user = await User.findOne({where: {username: 'Tester-1'}});
    let spot = await Spot.findOne({where: {address: '123 Test Street'}});
    let review = await Review.findOne({where: {review: 'The Good Place.'}});

    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spot.id,
        url: 'test.url',
        preview: true
      }
    ], {});

    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: review.id,
        url: 'testReview.url'
      }
    ], {});

    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spot.id,
        userId: user.id,
        startDate: '2021-11-19',
        endDate: '2021-11-20'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: 'test.url'
    }, {})

    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, {
      url: 'testReview.url'
    }, {})

    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, {
      startDate: '2021-11-19'
    }, {})
  }
};

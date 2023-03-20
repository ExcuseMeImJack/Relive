'use strict';

const {User,Spot,Review} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    let user1 = await User.findOne({where: {username: 'Tester-1'}});
    let spot1 = await Spot.findOne({where: {address: '123 Test Street'}});
    let review1 = await Review.findOne({where: {review: 'The Good Place.'}});

    let user2 = await User.findOne({where: {username: 'Tester-2'}});
    let spot2 = await Spot.findOne({where: {address: '123 Test Avenue'}});
    let review2 = await Review.findOne({where: {review: 'The Bad Place.'}});

    let review3 = await Review.findOne({where: {review: 'The Medium Place.'}});


    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: spot1.id,
        url: 'test.url',
        preview: true
      }
    ], {});

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




    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: review1.id,
        url: 'testReview.url'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        reviewId: review2.id,
        url: 'testReview.url'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        reviewId: review3.id,
        url: 'testReview.url'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        reviewId: review3.id,
        url: 'testReview.url'
      }
    ], {});



    options.tableName = 'Bookings';
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
      startDate: ['2021-11-19', '2022-11-19']
    }, {})
  }
};

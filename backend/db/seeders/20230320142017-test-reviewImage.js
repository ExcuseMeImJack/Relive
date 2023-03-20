'use strict';

const {Review} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'ReviewImages';

module.exports = {
  async up (queryInterface, Sequelize) {

    let review1 = await Review.findOne({where: {review: 'The Good Place.'}});

    let review2 = await Review.findOne({where: {review: 'The Bad Place.'}});

    let review3 = await Review.findOne({where: {review: 'The Medium Place.'}});

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

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, {
      url: 'testReview.url'
    }, {})
  }
};

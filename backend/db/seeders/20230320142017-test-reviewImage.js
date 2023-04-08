'use strict';

const {Review} = require('../models');
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'ReviewImages';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/402ec6a5-07c0-447a-bccc-9300cf2d7df8.jpg?im_w=1200'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/df3ba0d9-cf2d-401e-b2a6-5d0c8b55f392.jpg?im_w=1440'
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/05f51ed6-93c7-4a30-9938-7d550a787cc7.jpg?im_w=1440'
      }
    ], {});


    await queryInterface.bulkInsert(options, [
      {
        reviewId: 5,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/55aeaa2c-3ff0-4401-8fa1-59d24ba2dffd?im_w=1440'
      }
    ], {});


  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, {
      reviewId: {[Op.in]: [1, 2, 3, 5]}
    }, {})
  }
};

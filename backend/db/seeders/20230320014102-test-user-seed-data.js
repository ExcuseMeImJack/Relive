'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');
const {User,Spot,Review,Booking,SpotImage,ReviewImage} = require('../models/user');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'tester1@user.io',
        username: 'Tester-1',
        hashedPassword: bcrypt.hashSync('tester')
      }
    ], {});

    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
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

    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'test.url',
        preview: true
      }
    ], {});

    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        review: 'Good place.',
        stars: 4
      }
    ], {});

    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'testReview.url'
      }
    ], {});

    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        startDate: '2021-11-19',
        endDate: '2021-11-20'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Tester-1']}
    }, {});

    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      address: {[Op.in]: ['123 Test Street']}
    }, {})

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: 'test.url'
    }, {})

    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      review: 'Good place.'
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

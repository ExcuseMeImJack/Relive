'use strict';
const {User,Spot} = require('../models');
const {Op} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 1,
        review: 'Great Place!',
        stars: 4
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 1,
        review: 'Beautiful home and stunning views!',
        stars: 5
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 2,
        review: "I mean it's alright...",
        stars: 2
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 2,
        review: 'Great views, big house.',
        stars: 3
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 3,
        review: "I mean... it's absolutely beautiful!",
        stars: 5
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 3,
        review: 'Really great views, very big house.',
        stars: 4
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 4,
        review: "Bleh",
        stars: 2
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 4,
        review: 'The host was very welcoming and communicative, and the apartment was clean, comfortable, and well-equipped with all the necessary amenities. The location was also great, with easy access to public transportation and plenty of restaurants and shops nearby.',
        stars: 5
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 5,
        review: " I would highly recommend this ReLive to anyone looking for a comfortable and convenient stay in this area.",
        stars: 5
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 5,
        review: 'I had a great stay at this ReLive!',
        stars: 4
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 5,
        spotId: 6,
        review: "The only minor issue I encountered was that the WiFi connection was a bit spotty at times,",
        stars: 3
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 6,
        review: 'I had a wonderful stay at this ReLive!',
        stars: 4
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 4,
        spotId: 7,
        review: "The location was also ideal - it was close to public transportation and within walking distance to some great restaurants and attractions.",
        stars: 4
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 7,
        review: 'Clean, comfortable, and well-equipped with everything I needed for my stay.',
        stars: 4
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        userId: 4,
        spotId: 8,
        review: "I highly recommend this Airbnb and would definitely stay here again in the future!",
        stars: 5
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        userId: 6,
        spotId: 8,
        review: 'The room was clean and comfortable, and the amenities provided were exactly what I needed.',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [4, 5, 6]}
    }, {})
  }
};

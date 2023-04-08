'use strict';
const {Op} = require('sequelize');
const {User}  = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    // SPOT 1
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 3,
        address: '123 Saddle Peak Rd',
        city: 'Topanga',
        state: 'California',
        country: 'United States',
        lat: 34.0919,
        lng: 118.6021,
        name: 'Saddle Peak',
        description: 'Luxury stay in Topanga, California, United States.',
        price: 1200
      }
    ], {});
    // SPOT 2
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '123 Pacific View Dr',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 34.0522,
        lng: 118.2437,
        name: 'Rouge Elite',
        description: 'Luxury stay in Los Angeles, California, United States.',
        price: 4550
      }
    ], {});
    // SPOT 3
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '123 Mt Lassen Ave',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 33.8734,
        lng: 115.9010,
        name: 'The Kellogg Doolittle House',
        description: 'Luxury stay in Joshua Tree, California, United States.',
        price: 7575
      }
    ], {});
    // SPOT 4
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '123 Lomas de Calafia',
        city: 'Rosarito',
        state: 'Baja California',
        country: 'Mexico',
        lat: 32.3661,
        lng: 117.0618,
        name: 'Las Olas Sunset and Oceanfront Paradise2',
        description: 'Entire condo hosted by Roch.',
        price: 195
      }
    ], {});
    // SPOT 5
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '123 Juniper St',
        city: 'Hildale',
        state: 'Utah',
        country: 'United States',
        lat: 37.0036,
        lng: 112.9669,
        name: 'Angels Landing A-Frame',
        description: 'Tiny home hosted by Mindy.',
        price: 361
      }
    ], {});
    // SPOT 6
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '123 Moss Brk Rd',
        city: 'Estes Park',
        state: 'Colorado',
        country: 'United States',
        lat: 40.3772,
        lng: 105.5217,
        name: 'Secluded cabin on 10 acres',
        description: 'Entire cabin hosted by Diane.',
        price: 232
      }
    ], {});
    // SPOT 7
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 5,
        address: '123 Mt Lassen Ave',
        city: 'Rockaway Beach',
        state: 'Oregon',
        country: 'United States',
        lat: 45.6134,
        lng: 123.9429,
        name: 'Beach Mansion',
        description: 'Entire home hosted by Jennifer.',
        price: 1215
      }
    ], {});
    // SPOT 8
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 5,
        address: '123 Mt Lassen Ave',
        city: 'West Vancouver',
        state: 'British Columbia',
        country: 'Canada',
        lat: 49.3286,
        lng: 123.1602,
        name: 'The Hills Mansion',
        description: 'Entire villa hosted by Ariana.',
        price: 892
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      ownerId: {[Op.in]: [3, 4, 5]}
    }, {})
  }
};

'use strict';

const {User,Spot,Review} = require('../models');
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

options.tableName = 'SpotImages';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/60d85131-b43f-4edb-8051-28c0e6bd377a.jpg',
        preview: true
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/4c69ab90-38f9-4713-a0b6-e9a57628ce13.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/60d85131-b43f-4edb-8051-28c0e6bd377a.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/4b4c77eb-11e4-46f0-b5df-72ce4c73db64.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/cf80a3fa-2138-4982-a067-faaa7327ca5b.jpg',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/660b9615-5b58-43f2-a6ad-c866056c8d62.jpg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/50838ceb-63d4-482a-8a89-9865c6f028ce.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/dad5344f-1e0f-439e-a937-9e1a531b2719.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/8b4f283b-a9f2-415e-a5aa-e5d36d1ce69f.jpg',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/6d19db42-aa39-436d-86fe-8ff36189d84d',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/c22b1299-558f-4f02-a26c-eada6d8be0fa',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/64f65389-96b3-4c5e-b8bf-7966dc16b55b',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/674b0211-8c44-4887-81f2-65b9c6e48b9b',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/259dd906-5ea4-4327-bb53-843d029d62b4.jpg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/e86c7de4-f888-49bb-886e-d5f501dabcb4.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/cacbc9d2-25e9-4dde-a846-cfd379a5e714.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/99546ec3-daca-4dd4-b31b-e399c23fa8bc.jpg',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/4844bc3c-c790-438b-bd82-705d987e0566.jpg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/68e9b93a-bc31-45ba-8942-6622c07d4aea.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/04777118-9855-48cb-b434-0446e76bed70.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/29d5c0c2-17c9-4348-bbbb-621de59da4b4.jpg',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/232ca83f-0c1f-44a1-97a8-3087a239392e.jpg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/ca50ad6b-56aa-4a20-b5ef-e7a29fdbd956.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/c7a034bd-fcb1-4343-9ee5-fdc2c4093ca0.jpg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/29d5c0c2-17c9-4348-bbbb-621de59da4b4.jpg',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50944616/original/7038f90d-056a-4b53-a3e1-768a032162c2.jpeg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50944616/original/fc1462e3-9dfd-4eec-b6ac-e10976cd9f99.jpeg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50944616/original/ed59a04a-1b2a-411d-a212-8c28103d7f1e.jpeg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50944616/original/8e9a8428-aa1f-4685-b23e-b8b829cf978a.jpeg0',
        preview: false
      }
    ], {});

    await queryInterface.bulkInsert(options, [
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-664627227433120109/original/aa298509-2ed4-4d51-aae2-c59c147b900c.jpeg',
        preview: true
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-664627227433120109/original/4aeb4340-1183-4521-9044-668344f18d49.jpeg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-664627227433120109/original/3b9559c2-a3fa-4970-9c65-eb3706afbea4.jpeg',
        preview: false
      }
    ], {});
    await queryInterface.bulkInsert(options, [
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-664627227433120109/original/a47ca16b-7765-4b6b-bfe8-62b888a81692.jpeg',
        preview: false
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      preview: {[Op.in]: [false, true]}
    }, {})
  }
};

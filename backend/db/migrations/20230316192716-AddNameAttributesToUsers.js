'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Users";

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(options, 'firstName', {type: Sequelize.STRING});
    await queryInterface.addColumn(options, 'lastName', {type: Sequelize.STRING});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(options, 'firstName');
    await queryInterface.removeColumn(options, 'lastName');
  }
};

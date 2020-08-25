'use strict';

const sample = require('../schema/sample/universities');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'universities',
      sample
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('universities', null, {})
  }
};

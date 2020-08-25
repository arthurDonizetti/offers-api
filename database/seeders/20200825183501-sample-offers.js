'use strict';

const sample = require('../schema/sample/offers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'offers',
      sample
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('offers', null, {})
  }
};

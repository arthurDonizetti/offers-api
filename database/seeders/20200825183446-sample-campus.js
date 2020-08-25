'use strict';

const sample = require('../schema/sample/campus');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'campus',
      sample
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('campus', null, {})
  }
};

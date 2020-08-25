'use strict';

const sample = require('../schema/sample/courses');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'courses',
      sample
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {})
  }
};

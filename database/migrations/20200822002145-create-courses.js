'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('courses', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        campus_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'campus', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        kind: {
          type: Sequelize.STRING,
          allowNull: false
        },
        level: {
          type: Sequelize.STRING,
          allowNull: false
        },
        shift: {
          type: Sequelize.STRING,
          allowNull: false
        },     
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        } });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};

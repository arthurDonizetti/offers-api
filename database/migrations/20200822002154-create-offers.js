'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('offers', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        course_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'courses', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        full_price: {
          type: Sequelize.DECIMAL(6,2),
          allowNull: false
        },
        price_with_discount: {
          type: Sequelize.DECIMAL(6,2),
          allowNull: false
        },
        discount_percentage: {
          type: Sequelize.DECIMAL(4,1),
          allowNull: false
        },
        start_date: {
          type: Sequelize.STRING,
          allowNull: false
        },
        enrollment_semester: {
          type: Sequelize.STRING,
          allowNull: false
        },
        enabled: {
          type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('offers');
  }
};

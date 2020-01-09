'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      material_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      material_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      farmer_ratio: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      factor_ratio: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      unit_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kg_ratio: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      farmer_commission: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      office_commission: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      driver_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('materials');
  }
};
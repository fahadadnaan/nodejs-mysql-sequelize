'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fridge_contents', {
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
      DriverId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fridge_contents');
  }
};
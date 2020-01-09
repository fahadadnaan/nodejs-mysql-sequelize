'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    material_name: DataTypes.STRING,
    material_type: DataTypes.STRING,
    farmer_ratio: DataTypes.DOUBLE,
    factor_ratio: DataTypes.DOUBLE,
    unit_price: DataTypes.INTEGER,
    kg_ratio: DataTypes.INTEGER,
    farmer_commission: DataTypes.INTEGER,
    office_commission: DataTypes.INTEGER,
    DriverId: {type: DataTypes.INTEGER, field: 'driver_id'},
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'}
  });
  Material.associate = function(models) {
    Material.belongsTo(models.Driver, {
      foreignKey: 'DriverId'
    });
  };
  return Material;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const fridge_contents = sequelize.define('fridge_contents', {
    material_name: DataTypes.STRING,
    material_type: DataTypes.STRING,
    farmer_ratio: DataTypes.DOUBLE,
    factor_ratio: DataTypes.DOUBLE,
    unit_price: DataTypes.INTEGER,
    kg_ratio: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER
  });
  fridge_contents.associate = function(models) {
    fridge_contents.belongsTo(models.Driver, {
      foreignKey: 'DriverId'
    });
  };
  return fridge_contents;
};
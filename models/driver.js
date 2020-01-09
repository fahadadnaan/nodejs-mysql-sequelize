'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    farmer_name: DataTypes.STRING,
    car_number: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {});
  Driver.associate = (models) => {
    Driver.hasMany(models.Material,{
      foreignKey: 'DriverId',
      as: 'materials'
    });
  };
  return Driver;
};
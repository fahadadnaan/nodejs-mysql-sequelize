'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    farmer_name: DataTypes.STRING,
    car_number: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {});
  Driver.associate = (models) => {
    Driver.hasMany(models.fridge_contents,{
      foreignKey: 'DriverId',
      as: 'fridge_contents'
    });
  };
  return Driver;
};
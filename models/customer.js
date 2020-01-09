'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Order,{
      foreignKey: 'customer_id',
      as: 'customer'
    });
  };
  return Customer;
};
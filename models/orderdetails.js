'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_details = sequelize.define('order_details', {
    weight: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    count: DataTypes.INTEGER,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {});
  order_details.associate = function(models) {
    order_details.hasOne(models.Order,{
      foreignKey: 'order_details_id',
      as: 'Order_details'
    });
  };
  return order_details;
};
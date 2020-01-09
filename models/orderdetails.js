'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    weight: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    count: DataTypes.INTEGER,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {});
  OrderDetails.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetails;
};
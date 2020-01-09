'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: DataTypes.BIGINT,
    customer_id: DataTypes.BIGINT,
    material_id: DataTypes.BIGINT,
    order_details_id: DataTypes.BIGINT,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
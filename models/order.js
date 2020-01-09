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
    Order.belongsTo(models.order_details, {
      foreignKey: 'order_details_id'
    });
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
  };
  return Order;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product,{through:models.OrderProduct})
    }
  }
  Order.init({
    name: DataTypes.STRING,
    price:DataTypes.INTEGER,
    image:DataTypes.STRING,
    description:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
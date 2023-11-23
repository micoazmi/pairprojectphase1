'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      discount.belongsTo(models.Product,{foreignKey:'productId'})
    }
    get percentage(){
      return this.amount + '%'
    }
  }
  discount.init({
    amount: DataTypes.INTEGER,
    productId: {type:DataTypes.INTEGER,
    allowNull:true
    }
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};
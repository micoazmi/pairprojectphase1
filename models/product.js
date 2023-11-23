'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasOne(models.discount,{foreignKey:"productId"})
    }
  
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Enter Your Product Name'
        },
        notEmpty: {
          msg: 'Please Enter Your Product Name'
        }
      } 
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Set Your Product Price'
        },
        notEmpty: {
          msg: 'Please Set Your Product Price'
        },
        min:{
          args:1000,
          msg:'Minimal price adalah 1000'
        }
      } 
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Insert Your Product Image'
        },
        notEmpty: {
          msg: 'Please Insert Your Product Image'
        }
      } 
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Give Your Product Description'
        },
        notEmpty: {
          msg: 'Please Give Your Product Description'
        }
      } 
    }

  },{
    hooks: {
      beforeCreate: (prod, options) => {
       if(prod.price>=2000000){
        prod.price=(prod.price-(prod.price*30/100))
       }
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
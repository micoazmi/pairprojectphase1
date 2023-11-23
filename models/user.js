'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your name'
        },
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        },
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let admin=user.name.split('-')
        if(admin[1]==='admin'){
          user.role='admin'
        }else{
          user.role='user'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
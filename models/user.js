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
      // define association here
    }
  }
  User.init({
    name: {type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter name'
        },
        notEmpty: {
          msg: 'Please enter name'
        },
      }
    },
    email: {type:DataTypes.STRING,
      allowNull: false,
    validate:{
      notNull: {
        msg: 'Please enter email'
      },
      notEmpty: {
        msg: 'Please enter email'
      }}
    },
    password: {type:DataTypes.STRING,
      allowNull: false,
    validate:{
      notNull: {
        msg: 'Please enter password'
      },
      notEmpty: {
        msg: 'Please enter password'
      },
      min:{
        args:8,
        msg:'Password minimal 8'
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
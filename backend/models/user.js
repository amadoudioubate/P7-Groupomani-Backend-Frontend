'use strict';
const {
  Model
} = require('sequelize');
//const { Hooks } = require('sequelize/dist/lib/hooks');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Un utilisateur à plusieurs posts 
      models.User.hasMany(models.Post, {
        onDelete: 'cascade', 
        hooks: true
      }); 

      // Un utilisateur à plusieurs commentaires
      models.User.hasMany(models.Comment, {
        onDelete: 'cascade',
        hooks: true
      }); 

      // Un utilisateur à plusieurs likes
      models.User.hasMany(models.Like, {
        onDelete: 'cascade',
        hooks: true
      }); 
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    job: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
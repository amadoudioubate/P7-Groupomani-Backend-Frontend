'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // chaque post appartient à un seul user
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'cascade'
      }); 

      // Un post a plusieurs commentaires
      models.Post.hasMany(models.Comment, {
        onDelete: 'cascade', 
        hooks: true
      });

      // Un post a plusieurs likes
      models.Post.hasMany(models.Like, {
        onDelete: 'cascade', 
        hooks: true
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    //userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
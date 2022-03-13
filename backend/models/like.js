'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relations entre User et Post qui va passer par la table de jonction Like
      models.User.belongsToMany(models.Post, { // User appartient à plusieurs posts via la table de jonction Like
        through: models.Like
      });
      models.Post.belongsToMany(models.User, { // Post appartient à plusieurs User via la table de jonction Like
        through: models.Like
      });

      // Chaque like appartient à un seul utilisateur
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'cascade'
      });

      // Chaque like appartient à un seul post
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'cascade'
      });
    }
  }
  Like.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
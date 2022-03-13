'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relations entre User et Post qui va passer par la table de jonction Comment
      models.User.belongsToMany(models.Post, { // User appartient à plusieurs Posts via la table de jonction Comment
        through: models.Comment
      });
      models.Post.belongsToMany(models.User, { // Post appartient à plusieurs User via la table de jonction Comment
        through: models.Comment
      });

      // Chaque commentaire appartient à un seul utilisateur
      models.Comment.belongsTo(models.User, { 
        foreignKey: {
          allowNull: false
        },
        //onDelete: 'cascade'
      });

      // Chaque commentaire appartient à un seul post
      models.Comment.belongsTo(models.Post, { 
        foreignKey: {
          allowNull: false
        },
        //onDelete: 'cascade'
      });
       
    }
  }
  Comment.init({
    //userId: DataTypes.INTEGER,
    //postId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
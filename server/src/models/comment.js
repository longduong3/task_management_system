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
      Comment.belongsTo(models.Task, { foreignKey: 'task_id' });
      Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  Comment.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'comment',
    modelName: 'Comment',
  });
  return Comment;
};
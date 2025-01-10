'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    name: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    priority: DataTypes.ENUM('low', 'normal', 'hight', 'urgent'),
    due_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
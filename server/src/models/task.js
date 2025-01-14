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
      Task.belongsTo(models.Project, { foreignKey: 'project_id' });
      Task.belongsTo(models.TaskStatus, { foreignKey: 'status_id' });
      Task.belongsTo(models.Task, { foreignKey: 'parent_id', as: 'parent' });
      Task.hasMany(models.Task, { foreignKey: 'parent_id', as: 'subtasks' });
      Task.belongsToMany(models.User, {
        through: models.RefTaskAssignees,
        foreignKey: 'task_id',
        otherKey: 'assignee_id',
        as: 'assignees'
      });
      Task.hasMany(models.Comment, { foreignKey: 'task_id' });
      Task.hasMany(models.Attachment, { foreignKey: 'task_id' });
      Task.hasMany(models.TimeTracking, { foreignKey: 'task_id' });
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
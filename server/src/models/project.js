'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Workspace, { foreignKey: 'workspace_id' });
      Project.hasMany(models.Task, { foreignKey: 'project_id' });
      Project.hasMany(models.TaskStatus, { foreignKey: 'project_id' });
    }
  };
  Project.init({
    name: DataTypes.STRING,
    workspace_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('active', 'archived'),
  }, {
    sequelize,
    tableName: 'project',
    modelName: 'Project',
  });
  return Project;
};
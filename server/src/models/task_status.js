'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TaskStatus.init({
    name: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TaskStatus',
  });
  return TaskStatus;
};
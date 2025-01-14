'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeTracking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TimeTracking.belongsTo(models.Task, { foreignKey: 'task_id' });
      TimeTracking.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  TimeTracking.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'time_tracking',
    modelName: 'TimeTracking',
  });
  return TimeTracking;
};
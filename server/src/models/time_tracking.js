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
      // define association here
    }
  };
  TimeTracking.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'TimeTracking',
  });
  return TimeTracking;
};
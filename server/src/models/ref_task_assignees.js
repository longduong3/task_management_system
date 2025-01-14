'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefTaskAssignees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefTaskAssignees.belongsTo(models.Task, { foreignKey: 'task_id' });
      RefTaskAssignees.belongsTo(models.User, { foreignKey: 'assignee_id' });
    }
  };
  RefTaskAssignees.init({
    task_id: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER,
    assigned_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'RefTaskAssignees',
  });
  return RefTaskAssignees;
};
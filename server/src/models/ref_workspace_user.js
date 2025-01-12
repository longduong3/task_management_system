'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefWorkspaceUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefWorkspaceUser.belongsTo(models.User, { foreignKey: 'user_id' });
      RefWorkspaceUser.belongsTo(models.Workspace, { foreignKey: 'workspace_id' });
    }
  };
  RefWorkspaceUser.init({
    workspace_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    role: DataTypes.ENUM('owner', 'admin', 'member'),
    joined_at: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'ref_workspace_user',
    modelName: 'RefWorkspaceUser',
  });
  return RefWorkspaceUser;
};
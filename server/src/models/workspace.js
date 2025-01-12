'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Thiết lập quan hệ belongsToMany với User thông qua RefWorkspaceUser
      Workspace.belongsToMany(models.User, {
        through: models.RefWorkspaceUser, // Sử dụng bảng phụ RefWorkspaceUser
        as: 'users',                      // Alias khi truy vấn
        foreignKey: 'workspace_id',       // Khoá ngoại từ bảng RefWorkspaceUser
        otherKey: 'user_id'               // Khoá ngoại từ bảng RefWorkspaceUser trỏ đến User
      });
    }
  };
  Workspace.init({
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'workspace',
    modelName: 'Workspace',
  });
  return Workspace;
};
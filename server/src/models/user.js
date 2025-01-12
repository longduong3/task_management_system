'use strict';
const { Model, DataTypes } = require('sequelize'); // Import Model và DataTypes từ sequelize

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Thiết lập quan hệ n-n giữa User và Workspace thông qua RefWorkspaceUser
      User.belongsToMany(models.Workspace, {
        through: models.RefWorkspaceUser, // Sử dụng bảng phụ RefWorkspaceUser
        as: 'workspaces',                 // Alias khi truy vấn
        foreignKey: 'user_id',            // Khoá ngoại từ bảng RefWorkspaceUser
        otherKey: 'workspace_id'          // Khoá ngoại từ bảng RefWorkspaceUser trỏ đến Workspace
      });
    }
  };

  // Khởi tạo model User với sequelize
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female', 'individual'),
    role: DataTypes.ENUM('owner', 'admin', 'member'),
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
  });

  return User;
};

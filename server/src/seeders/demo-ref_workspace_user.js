'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ref_workspace_user', [
      {
        workspace_id: 1, // ID của workspace
        user_id: 1, // ID của user
        role: 'owner',
        joined_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspace_id: 1,
        user_id: 2,
        role: 'admin',
        joined_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspace_id: 1,
        user_id: 3,
        role: 'member',
        joined_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspace_id: 2,
        user_id: 4,
        role: 'owner',
        joined_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workspace_id: 2,
        user_id: 5,
        role: 'admin',
        joined_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả các bản ghi trong bảng 'ref_workspace_user'
    return queryInterface.bulkDelete('ref_workspace_user', null, {});
  }
};

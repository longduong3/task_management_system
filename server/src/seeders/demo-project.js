'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project', [
      {
        name: 'Project Alpha',
        workspace_id: 1,
        description: 'Description for Project Alpha.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Beta',
        workspace_id: 2,
        description: 'Description for Project Beta.',
        status: 'archived',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Gamma',
        workspace_id: 1,
        description: 'Description for Project Gamma.',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả các bản ghi vừa thêm vào bảng 'project'
    return queryInterface.bulkDelete('project', null, {});
  }
};

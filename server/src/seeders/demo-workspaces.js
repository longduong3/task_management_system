'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('workspace', [
      {
        name: 'Project Alpha',
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Project Beta',
        owner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa dữ liệu từ bảng 'workspace'
    return queryInterface.bulkDelete('workspace', null, {});
  }
};

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('task_status', [
            {
                name: 'New',
                project_id: 1,
                color: '#ff0000',
                sequence: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'In Progress',
                project_id: 1,
                color: '#0000ff',
                sequence: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Completed',
                project_id: 1,
                color: '#00ff00',
                sequence: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'New',
                project_id: 2,
                color: '#ff8000',
                sequence: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'In Progress',
                project_id: 2,
                color: '#00ffcc',
                sequence: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Completed',
                project_id: 2,
                color: '#80ff00',
                sequence: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'New',
                project_id: 3,
                color: '#800080',
                sequence: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'In Progress',
                project_id: 3,
                color: '#ff00ff',
                sequence: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Completed',
                project_id: 3,
                color: '#ffff00',
                sequence: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả các bản ghi trong bảng 'task_status'
        return queryInterface.bulkDelete('task_status', null, {});
    }
};

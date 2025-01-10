'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ref_task_assignees', [
            {
                task_id: 1,
                assignee_id: 1,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 2,
                assignee_id: 2,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 3,
                assignee_id: 3,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 4,
                assignee_id: 1,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 5,
                assignee_id: 2,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 6,
                assignee_id: 3,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 7,
                assignee_id: 2,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 8,
                assignee_id: 1,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 9,
                assignee_id: 1,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 10,
                assignee_id: 3,
                assigned_at: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả các bản ghi trong bảng 'ref_task_assignees'
        return queryInterface.bulkDelete('ref_task_assignees', null, {});
    }
};

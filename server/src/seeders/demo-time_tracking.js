'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('time_tracking', [
            {
                task_id: 1,
                user_id: 1,
                start_time: new Date('2025-01-01T08:00:00Z'),
                end_time: new Date('2025-01-01T10:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 2,
                user_id: 2,
                start_time: new Date('2025-01-02T09:00:00Z'),
                end_time: new Date('2025-01-02T12:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 3,
                user_id: 3,
                start_time: new Date('2025-01-03T14:00:00Z'),
                end_time: new Date('2025-01-03T16:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 4,
                user_id: 1,
                start_time: new Date('2025-01-04T08:30:00Z'),
                end_time: new Date('2025-01-04T11:30:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 5,
                user_id: 2,
                start_time: new Date('2025-01-05T10:00:00Z'),
                end_time: new Date('2025-01-05T13:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 6,
                user_id: 3,
                start_time: new Date('2025-01-06T13:00:00Z'),
                end_time: new Date('2025-01-06T15:30:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 7,
                user_id: 1,
                start_time: new Date('2025-01-07T08:15:00Z'),
                end_time: new Date('2025-01-07T10:45:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 8,
                user_id: 2,
                start_time: new Date('2025-01-08T11:00:00Z'),
                end_time: new Date('2025-01-08T13:30:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 9,
                user_id: 3,
                start_time: new Date('2025-01-09T09:30:00Z'),
                end_time: new Date('2025-01-09T11:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 10,
                user_id: 1,
                start_time: new Date('2025-01-10T15:00:00Z'),
                end_time: new Date('2025-01-10T17:00:00Z'),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả các bản ghi trong bảng 'time_tracking'
        return queryInterface.bulkDelete('time_tracking', null, {});
    }
};

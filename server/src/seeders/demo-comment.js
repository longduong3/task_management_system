'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('comment', [
            {
                task_id: 1,
                user_id: 1,
                content: 'Đây là bình luận đầu tiên về nhiệm vụ 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 2,
                user_id: 2,
                content: 'Bình luận về tiến độ của nhiệm vụ 2, đang thực hiện',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 3,
                user_id: 3,
                content: 'Hoàn thành nhiệm vụ 3 và đợi phê duyệt',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 4,
                user_id: 1,
                content: 'Cần thêm thông tin về nhiệm vụ 4',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 5,
                user_id: 2,
                content: 'Đang gặp khó khăn trong việc thực hiện nhiệm vụ 5',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 6,
                user_id: 3,
                content: 'Hoàn thành nhiệm vụ 6, mọi thứ ổn định',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 7,
                user_id: 2,
                content: 'Cần phải thay đổi thời gian hoàn thành của nhiệm vụ 7',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 8,
                user_id: 1,
                content: 'Nhiệm vụ 8 đã được giao và đang tiến hành',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 9,
                user_id: 1,
                content: 'Đã hoàn thành tất cả công việc trong nhiệm vụ 9',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 10,
                user_id: 3,
                content: 'Nhiệm vụ 10 đang gặp một số trục trặc, cần trợ giúp',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả các bản ghi trong bảng 'comment'
        return queryInterface.bulkDelete('comment', null, {});
    }
};

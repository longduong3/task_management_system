'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('attachment', [
            {
                task_id: 1, // ID của nhiệm vụ
                file_url: 'https://example.com/file1.pdf', // URL của tệp đính kèm
                uploaded_by: 1, // ID của người tải lên tệp
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 2,
                file_url: 'https://example.com/file2.docx',
                uploaded_by: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 3,
                file_url: 'https://example.com/file3.jpg',
                uploaded_by: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 4,
                file_url: 'https://example.com/file4.png',
                uploaded_by: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 5,
                file_url: 'https://example.com/file5.zip',
                uploaded_by: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 6,
                file_url: 'https://example.com/file6.mp4',
                uploaded_by: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 7,
                file_url: 'https://example.com/file7.xlsx',
                uploaded_by: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 8,
                file_url: 'https://example.com/file8.txt',
                uploaded_by: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 9,
                file_url: 'https://example.com/file9.pptx',
                uploaded_by: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                task_id: 10,
                file_url: 'https://example.com/file10.pdf',
                uploaded_by: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả các bản ghi trong bảng 'attachment'
        return queryInterface.bulkDelete('attachment', null, {});
    }
};

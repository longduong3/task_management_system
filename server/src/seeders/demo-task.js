'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('task', [
      {
        name: 'Task 1 - Project 1',
        project_id: 1,
        assignee_id: 1,
        parent_id: null,
        status_id: 1,
        description: 'This is the first task for Project 1.',
        priority: 'urgent',
        due_date: new Date('2025-02-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 2 - Project 1',
        project_id: 1,
        assignee_id: 2,
        parent_id: 1,
        status_id: 2,
        description: 'This is a subtask for Task 1 in Project 1.',
        priority: 'hight',
        due_date: new Date('2025-02-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 3 - Project 2',
        project_id: 2,
        assignee_id: 3,
        parent_id: null,
        status_id: 1,
        description: 'This is the first task for Project 2.',
        priority: 'normal',
        due_date: new Date('2025-03-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 4 - Project 2',
        project_id: 2,
        assignee_id: 1,
        parent_id: null,
        status_id: 3,
        description: 'This is a task for Project 2 with a high priority.',
        priority: 'hight',
        due_date: new Date('2025-03-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 5 - Project 3',
        project_id: 3,
        assignee_id: 2,
        parent_id: null,
        status_id: 2,
        description: 'This is the first task for Project 3.',
        priority: 'urgent',
        due_date: new Date('2025-04-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 6 - Project 3',
        project_id: 3,
        assignee_id: 3,
        parent_id: 5,
        status_id: 1,
        description: 'This is a subtask for Task 5 in Project 3.',
        priority: 'normal',
        due_date: new Date('2025-04-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 7 - Project 1',
        project_id: 1,
        assignee_id: 2,
        parent_id: null,
        status_id: 1,
        description: 'This is another task for Project 1.',
        priority: 'low',
        due_date: new Date('2025-02-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 8 - Project 2',
        project_id: 2,
        assignee_id: 1,
        parent_id: null,
        status_id: 3,
        description: 'Task for Project 2, high priority.',
        priority: 'urgent',
        due_date: new Date('2025-03-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 9 - Project 3',
        project_id: 3,
        assignee_id: 1,
        parent_id: null,
        status_id: 2,
        description: 'This is a task for Project 3.',
        priority: 'hight',
        due_date: new Date('2025-04-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 10 - Project 1',
        project_id: 1,
        assignee_id: 3,
        parent_id: null,
        status_id: 1,
        description: 'Final task for Project 1.',
        priority: 'normal',
        due_date: new Date('2025-02-25'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả các bản ghi trong bảng 'task'
    return queryInterface.bulkDelete('task', null, {});
  }
};

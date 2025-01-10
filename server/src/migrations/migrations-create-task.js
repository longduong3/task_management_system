'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      project_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      assignee_id: {
        type: Sequelize.INTEGER
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      priority: {
        type: Sequelize.ENUM('low', 'normal', 'hight', 'urgent')
      },
      due_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('task');
  }
};

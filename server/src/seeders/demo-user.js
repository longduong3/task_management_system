'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password_1',
        gender: 'male',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'hashed_password_2',
        gender: 'female',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        password: 'hashed_password_3',
        gender: 'individual',
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        password: 'hashed_password_4',
        gender: 'female',
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob White',
        email: 'bob.white@example.com',
        password: 'hashed_password_5',
        gender: 'male',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Charlie Green',
        email: 'charlie.green@example.com',
        password: 'hashed_password_6',
        gender: 'male',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diana Black',
        email: 'diana.black@example.com',
        password: 'hashed_password_7',
        gender: 'female',
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eve White',
        email: 'eve.white@example.com',
        password: 'hashed_password_8',
        gender: 'female',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frank Blue',
        email: 'frank.blue@example.com',
        password: 'hashed_password_9',
        gender: 'male',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Grace Yellow',
        email: 'grace.yellow@example.com',
        password: 'hashed_password_10',
        gender: 'female',
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all records from 'user' table
    return queryInterface.bulkDelete('user', null, {});
  }
};

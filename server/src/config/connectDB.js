const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_hub_01', 'xuanlong', 'admin@123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối cơ sở dữ liệu thành công!');
    } catch (error) {
        console.error('Không thể kết nối cơ sở dữ liệu:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };

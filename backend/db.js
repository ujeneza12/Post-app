const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mobile', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
});

module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mobile', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
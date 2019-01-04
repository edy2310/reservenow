var Sequelize = require('sequelize');

let info = {
    'host': '',
    'username': '',
    'password': '',
    'database': '',
    'dialect': ''
}

const sequelize = new Sequelize(info.database,info.username, info.password, {
    host: info.host,
    dialect: info.dialect
});

module.exports = sequelize;
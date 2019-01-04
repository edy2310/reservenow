var sequelize = require('../bin/db_info');
var Sequelize = require('sequelize');

const Admin = sequelize.define('admin', {
    user: {
        type: Sequelize.STRING
    },
    pass:{
        type: Sequelize.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = Admin;
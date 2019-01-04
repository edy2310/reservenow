var sequelize = require('../bin/db_info');
var Sequelize = require('sequelize');

const Reservations = sequelize.define('reservation',{
        id:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING 
        },
        secondName:{
            type: Sequelize.STRING
        },
        numberPersons:{
            type: Sequelize.INTEGER
        },
        email:{
            type: Sequelize.STRING
        },
        phone:{
            type: Sequelize.STRING
        },
        date:{
            type: Sequelize.STRING
        },
        time:{
            type: Sequelize.STRING
        },
        specialRequest:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
);

module.exports = Reservations;
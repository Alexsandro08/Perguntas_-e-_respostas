const Sequelize = require('sequelize')
const connection = require('./db')

const Response = connection.define('responses',{
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    responseId:{
        type: Sequelize.INTEGER,
        allowNull:false

    }

})





module.exports = Response
const Sequelize = require('sequelize')
const connection = require('./db')


const Question = connection.define('question',{
    
    title:{
       type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    }

})



module.exports = Question
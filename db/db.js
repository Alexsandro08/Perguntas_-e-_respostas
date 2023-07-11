const Sequelize = require('sequelize')

const connection = new Sequelize('perguntas', 'root','ateofim0802',{
    host:'localhost',
    dialect:'mysql'
})















module.exports = connection
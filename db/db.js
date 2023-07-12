const Sequelize = require('sequelize')
require('dotenv').config()



const DATABASE_URL=`mysql://${process.env.DB_NAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`


const connection = new Sequelize(DATABASE_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true
    }
  }
})


module.exports = connection
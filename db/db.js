const Sequelize = require('sequelize')
require('dotenv').config()

const connection = new Sequelize(process.env.DATABASE_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true
    }
  }
})

//teste


module.exports = connection
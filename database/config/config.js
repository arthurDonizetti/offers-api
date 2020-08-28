require('dotenv').config()

module.exports = {
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

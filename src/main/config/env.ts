import { config } from 'dotenv'

config()

export default {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || '',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT
}

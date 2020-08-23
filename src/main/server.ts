import { SequelizeHelper } from '../infra/db/sequelize/helpers/sequelize-helper'
import env from './config/env'

SequelizeHelper.connect(env.databaseUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server online.\nRunning at http://localhost:${env.port}`))
  })

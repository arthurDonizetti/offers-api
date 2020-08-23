import app from './config/app'
import env from './config/env'

app.listen(env.port, () => console.log(`Server online.\nRunning at http://localhost:${env.port}`))

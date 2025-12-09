import express from 'express'
import cat from './routes/warhammer.ts'
import example from './routes/example.ts'
import account from './routes/account.ts'

const app = express()

app.use(express.json())

// middleware??


// routes
app.use('/cat', cat)
app.use('/example', example)
app.use('/account', account)

export default app

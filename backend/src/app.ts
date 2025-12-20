import express from 'express'
import cat from './routes/warhammer.ts'
import example from './routes/example.ts'
import account from './routes/account.ts'
import army from './routes/army.ts'
import unit from './routes/Unit.ts'

const app = express()

app.use(express.json())

// middleware??

// routes
app.use('/cat', cat)
app.use('/example', example)
app.use('/account', account)
app.use('/army', army)
app.use('/unit', unit)

export default app

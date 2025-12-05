import express from 'express'
import cat from './routes/warhammer.ts'

const app = express()

app.use(express.json())

// middleware??


// routes
app.use('/cat', cat)

export default app

import express from 'express'
import app from './src/app.ts'

const port = 3000

// start the app
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})

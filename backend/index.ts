import express from 'express'
import app from './src/app.ts'
import warhammerRoutes from './src/routes/warhammer.ts'
const port = 3000

app.use('/api/warhammer', warhammerRoutes)

// start the app
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})

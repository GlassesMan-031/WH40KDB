import express from 'express'
import { getWarhammerCatData } from '../controllers/warhammer.ts'

const cat = express.Router()


cat.get('/', async (req, res) => {
  let result = await getWarhammerCatData()
  res.json(result)
})

export default cat

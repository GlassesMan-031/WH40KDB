import express from 'express'
import { getExampleData } from '../controllers/example.ts'

const example = express.Router()

example.get('/:id', getExampleData)

export default example

import express from 'express'
import { editArmy, getArmy, newArmy, removeArmy } from '../controllers/army.ts'

const army = express.Router()

// if we have time we can choose to have a authentication middleware here
// ex:
// army.use(auth_middleware)

// get army "/army/:id" no body
army.get('/:id', getArmy)

// post army "/army/" {owner_id: number, name: string, max_points: number}
army.post('/', newArmy)

// post army "/army/:id" {username_or_email: string, password: string}
army.delete('/:id', removeArmy)

// post army "/army/:id" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
army.patch('/:id', editArmy)

export default army

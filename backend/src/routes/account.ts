import express from 'express'
import {
  findExisting,
  create,
  findAndDelete,
  editExisting,
} from '../controllers/account.ts'

const account = express.Router()

// if we have time we can choose to have a authentication middleware here
// ex:
// acccount.use(auth_middleware)

// get account "/account/" {username_or_email: string, password: string}
account.post('/login', findExisting)

// post account "/account/" {username: string, email: string, password: string}
account.post('/', create)

// post account "/account/" {username_or_email: string, password: string}
account.delete('/', findAndDelete)

// post account "/account/" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
account.patch('/', editExisting)

export default account

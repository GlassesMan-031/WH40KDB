import type { Request, Response } from 'express'
import { newAccount } from '../services/account.ts'
// get account "/account/" {username_or_email: string, password: string}
export function findExisting(req: Request<void, any, { username_or_email: string, password: string }, void>, res: Response) {
  const username_or_email = req.body.username_or_email
  const password = req.body.password

  const result = await getAccount(username_or_email, password)
}

// post account "/account/" {username: string, email: string, password: string}
export async function create(req: Request<void, any, { username: string, email: string, password: string }, void>, res: Response) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  const result = await newAccount(username, email, password)
  res.send(result)
}

// post account "/account/" {username_or_email: string, password: string}
export function findAndDelete(req: Request<void, any, { username_or_email: string, password: string }, void>, res: Response) {
  const username_or_email = req.body.username_or_email
  const password = req.body.password

  const result = await deleteAccount(username_or_email, password)

}

// post account "/account/" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
export function editExisting(req: Request<void, any, { username?: string, email?: string, password?: string }, void>, res: Response) {
  const username = req.body.username || null
  const email = req.body.email || null
  const password = req.body.password || null

  const editObject = { username: username, email: email, password: password }

  const result = await editAccount(editObject)

}

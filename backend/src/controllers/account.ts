import type { Request, Response } from 'express'
import { getAccount, newAccount, deleteAccount, editAccount } from '../services/account.ts'
// get account "/account/" {username_or_email: string, password: string}
export async function findExisting(req: Request<void, any, { username_or_email: string, password: string }, void>, res: Response) {
  console.log("finding")
  console.log(req.body)
  const username_or_email = req.body.username_or_email
  const password = req.body.password

  const result = await getAccount(username_or_email, password)
  res.send(result)
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
export async function findAndDelete(req: Request<void, any, { username_or_email: string, password: string }, void>, res: Response) {
  const username_or_email = req.body.username_or_email
  const password = req.body.password

  const result = await deleteAccount(username_or_email, password)
  res.send(result)

}

// post account "/account/" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
export async function editExisting(req: Request<void, any, { username?: string, email?: string, password?: string }, void>, res: Response) {
  const username = req.body.username || null
  const email = req.body.email || null
  const password = req.body.password || null

  const editObject = { username: username, email: email, password: password }

  const result = await editAccount(1, 'test3', 'email3', 'pass3')
  res.send(result)

}

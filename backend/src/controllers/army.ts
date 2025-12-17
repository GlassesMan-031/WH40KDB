import type { Request, Response } from 'express'
import {
  deleteArmy,
  findArmyById,
  insertArmy,
  updateArmy,
} from '../services/army.ts'

// get army "/army/" {username_or_email: string, password: string}
export async function getArmy(req: Request, res: Response) {
  const armyId = Number(req.params.id)
  console.log('armyid: ' + armyId)

  const result = await findArmyById(armyId)
  if (result) {
    res.status(200).send(result)
  } else {
    res.status(500).send("couldn't find the army")
  }
}

// post army "/army/" {username: string, email: string, password: string}

export async function newArmy(req: Request, res: Response) {
  const armyObject = req.body

  const result = await insertArmy(
    armyObject.owner_id,
    armyObject.name,
    armyObject.max_points,
  )

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(500).send('uh oh')
  }
}
// post army "/army/" {username_or_email: string, password: string}
export async function removeArmy(req: Request, res: Response) {
  const armyId = Number(req.params.id)

  const result = await deleteArmy(armyId)

  if (result) {
    res.status(200).send('army deleted')
  } else {
    res.status(500).send('army not deleted')
  }
}

// post army "/army/" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
export async function editArmy(req: Request, res: Response) {
  const armyId = Number(req.params.id)
  const armyObject = req.body
  const name = armyObject.name || ''
  const max_points = armyObject.max_points || 0

  const result = await updateArmy(armyId, name, max_points)

  if (result) {
    res.status(200).send('army edited')
  } else {
    res.status(500).send('army not edited')
  }
}

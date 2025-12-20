import express, { type Request, type Response } from 'express'
import { insertUnit, getUnits } from '../services/Unit.ts'

const router = express.Router()

router.post('/get', async (req: Request, res: Response) => {
  const { armyId, accountId } = req.body
  console.log('/get')
  console.log(req.body)
  if (!armyId) return res.status(400).send('theres no armyId')
  if (!accountId) return res.status(400).send('theres no accountId')

  console.log('POST /get', {
    armyId,
    accountId,
  })

  const result = await getUnits(armyId, accountId)
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(500).send('uh oh')
  }
})

router.post('/:armyId', async (req: Request, res: Response) => {
  const armyIdParam = req.params.armyId

  if (!armyIdParam) return res.status(400).json({ error: 'armyId is required' })

  const armyId = parseInt(armyIdParam, 10)
  if (isNaN(armyId))
    return res.status(400).json({ error: 'armyId must be a number' })
  console.log('POST /unit', {
    armyId,
    body: req.body,
  })

  const { name, xml_id, selection } = req.body

  try {
    const unit = await insertUnit(armyId, name, xml_id, selection)
    res.json(unit)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not insert unit' })
  }
})

export default router

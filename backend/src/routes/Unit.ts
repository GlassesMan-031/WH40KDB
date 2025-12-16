import express, { type Request, type Response } from 'express'
import { insertUnit } from '../services/Unit.ts'

const router = express.Router()

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

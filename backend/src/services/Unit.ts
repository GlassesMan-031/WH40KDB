import db from '../db/db.ts'

export async function insertUnit(
  army_id: number,
  name: string,
  xml_id: string,
  selection: string,
) {
  return await db.one(
    `INSERT INTO unit (army_id, name, xml_id, selection)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [army_id, name, xml_id, selection],
  )
}

export async function getUnits(armyId: number, accountId: number) {
  const validate = await db
    .one('SELECT * FROM army WHERE id = $1 AND owner_id = $2', [
      armyId,
      accountId,
    ])
    .then((data) => {
      return true
    })
    .catch((err) => {
      return false
    })
  if (validate) {
    return await db
      .any('SELECT * FROM unit WHERE army_id = $1', [armyId])
      .then((data) => {
        return data
      })
      .catch((err) => {
        return false
      })
  } else {
    return false
  }
}

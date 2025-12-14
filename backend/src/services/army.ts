import db from '../db/db.ts'

// get army "/army/" {username_or_email: string, password: string}
export async function findArmyById(id: number) {
  const result = await db
    .one(`SELECT * FROM army WHERE army.id = $1`, [id])
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
      return false
    })

  console.log(result)
  return result
}

// post army "/army/" {username: string, email: string, password: string}

export async function insertArmy(
  owner_id: number,
  name: string,
  max_points: number,
) {
  const result = await db
    .one(
      `INSERT INTO army(owner_id, name, max_points) VALUES($1, $2, $3) RETURNING *`,
      [owner_id, name, max_points],
    )
    .then((data) => {
      return data
    })
  console.log(result)
  return result
}
// post army "/army/" {username_or_email: string, password: string}
export async function deleteArmy(id: number) {
  const result = await db
    .one(`DELETE FROM army WHERE army.id = $1`, [id])
    .then((data) => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })

  return result
}

// update army "/army/" {username?: string, email?: string, password?: string} NOTE that body keys are optional!!
export async function updateArmy(
  id: number,
  name?: string,
  max_points?: number,
) {
  let setValues = []

  let set = 'SET '
  if (name) {
    setValues.push(name)
    set += `name = $${setValues.length}, `
  }
  if (max_points) {
    setValues.push(max_points)
    set += `max_points = $${setValues.length}, `
  }

  if (set.length > 4) {
    set = set.slice(0, -2)
    set += ' '
  } else {
    set = ''
  }

  setValues.push(id)
  const result = await db
    .none(`UPDATE army ${set} WHERE army.id = $${setValues.length}`, setValues)
    .then((data) => {
      console.log(data)
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })

  return result
}

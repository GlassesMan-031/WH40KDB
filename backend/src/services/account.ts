import db from './../db/db.ts'

export async function getAccount(username_or_email: string, password: string) {
  const result = await db
    .one(
      'SELECT id, username, email FROM account WHERE (email = $1 OR username = $1) AND password=$2;',
      [username_or_email, password],
    )
    .then((data) => {
      console.log('succes')
      console.log(data)
      return data
    })
    .catch((error) => {
      console.log(error)
      return false
    })

  return result
}

export async function newAccount(
  username: string,
  email: string,
  password: string,
) {
  const result = await db
    .none(
      'INSERT INTO account(username, email, password) VALUES($1, $2, $3);',
      [username, email, password],
    )
    .then((data) => {
      console.log('succes')
      console.log(data)
      return { status: 'succes' }
    })
    .catch((error) => {
      console.log(error)
      return false
    })

  return result
}

export async function deleteAccount(
  username_or_email: string,
  password: string,
) {
  const result = await db
    .none(
      'DELETE FROM account WHERE (email = $1 OR username = $1) AND password=$2;',
      [username_or_email, password],
    )
    .then((data) => {
      console.log('succes')
      console.log(data)
      return true
    })
    .catch((error) => {
      console.log(error)
      return false
    })

  return result
}

export async function editAccount(
  id: number,
  username?: string,
  email?: string,
  password?: string,
) {
  let setValues = []

  let set = 'SET '
  if (username) {
    setValues.push(username)
    set += `username = $${setValues.length}, `
  }
  if (email) {
    setValues.push(email)
    set += `email = $${setValues.length}, `
  }
  if (password) {
    setValues.push(password)
    set += `password = $${setValues.length}, `
  }

  if (set.length > 4) {
    set = set.slice(0, -2)
    set += ' '
  } else {
    set = ''
  }

  setValues.push(id)

  const result = await db
    .one(
      `UPDATE account ${set} WHERE id = $${setValues.length} RETURNING id, username, email, password`,
      setValues,
    )
    .then((data) => {
      console.log('succes')
      console.log(data)
      return true
    })
    .catch((error) => {
      console.log(error)
      return false
    })

  return result
}

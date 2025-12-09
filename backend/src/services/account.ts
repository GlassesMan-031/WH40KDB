import db from './../db/db.ts'

export async function newAccount(username: string, email: string, password: string) {
  const result = await db.none('INSERT INTO account(username, email, password) VALUE($1, $2, $3);', [username, email, password])
    .then(data => {
      console.log('succes')
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

  return result
}

import pgPromise from 'pg-promise'

const initOptions = {}
const pgp = pgPromise(initOptions)

const connectionString = 'postgres://postgres@localhost/postgres' // should come from a env file
const db = pgp(connectionString)

export default db

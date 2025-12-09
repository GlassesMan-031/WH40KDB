import pgPromise from 'pg-promise'

const initOptions = {}
const pgp = pgPromise(initOptions)

const connectionString = "postgres://username:password@host:port/database" // should come from a env file
const db = pgp(connectionString)

export default db

import { Pool } from 'pg'

const { DB_HOST_DEV, DB_NAME_DEV, DB_PASS_DEV, DB_PORT_DEV, DB_USER_DEV } = process.env

export default new Pool({
    host: DB_HOST_DEV,
    user: DB_USER_DEV,
    password: DB_PASS_DEV,
    port: DB_PORT_DEV,
    database: DB_NAME_DEV
})

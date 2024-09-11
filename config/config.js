import { createPool } from "mysql2";
import 'dotenv/config'

const connection = createPool({
    host: process.env.host,
    database: process.env.dbName,
    user: process.env.userDb,
    password: process.env.pwdDb,
    multipleStatements: false,
    connectionLimit: 50
})

connection.on('connection', (pool) => {
    if (!pool) throw new Error('Couldn\'t connect to the database, please try again later')
})
export {
    connection
}

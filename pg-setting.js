let options = {
  // initialization options;
}

let pgp = require('pg-promise')(options)

let connection = {
  host: process.env.DB_DATABASE,
  user: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_USER_NAME,
  port: 5432,
  ssl: true
}

let db = pgp(connection)

module.exports = db

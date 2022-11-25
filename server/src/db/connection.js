const pg = require("pg");

//was new pg.Client before
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = pool;



// // PG database client/connection setup
// const { Pool } = require('pg');

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// };

// const db = new Pool(dbParams);

// db.connect();

// module.exports = db;
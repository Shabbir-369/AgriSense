const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool.promise();


// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   uri: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// module.exports = pool.promise();
// import mysql from "mysql2"


// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'test_database_saif'
// }).promise()

import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// db.connect(err => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.message);
//     return;
//   }
//   console.log("✅ Connected to MySQL database");
// });

export default db;

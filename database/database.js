// import mysql from "mysql2"


// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'test_database_saif'
// }).promise()

import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ROOT2018",
  database: "management_db"
});

// db.connect(err => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.message);
//     return;
//   }
//   console.log("✅ Connected to MySQL database");
// });

export default db;

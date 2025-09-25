// import express from 'express'
// const app = express()

// const PORT = process.env.PORT 



// app.get('/',(req,res)=>{
//     res.send("hello from homepage")
// })


// app.listen(PORT,()=>{
//     console.log(`server running on ${PORT}`)
// })

import express from "express";
import db from "../database/database.js";

const app = express();

const PORT = process.env.PORT

app.use(express.json());




// Example: test database connection
app.get("/test-db", (req, res) => {
  db.query("SELECT NOW() AS now", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.get("/",(req,res)=>{
    res.send("hello from home page")
})

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

import express from "express";
import db from "../database/database.js";

import clients from './routes/clients.js'

const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/clients",clients)


app.get("/",(req,res)=>{
    res.send("hello from home page")
})

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



import express from "express";
import db from "../database/database.js";
import customers from './routes/customers.js'
import products from "./routes/products.js"
import quote from "./routes/quote.js"
import salesOrders from "./routes/salesOrders.js"



const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/customers",customers)
app.use("/api/products",products)
app.use('/api/quote', quote);
app.use('/api/salesOrders',salesOrders);


app.get("/",(req,res)=>{
    res.send("hello from home page")
})




app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


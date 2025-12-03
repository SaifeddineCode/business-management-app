
import express from "express";
import db from "../database/database.js";
import customers from './routes/customers.js'
import products from "./routes/products.js"
import quote from "./routes/quote.js"
import quote_item from "./routes/quote_item.js"
import salesOrders from "./routes/salesOrders.js"
import invoice from "./routes/invoice.js"
import sales_orders_items from "./routes/sales_orders_items.js"


const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/customers",customers)
app.use("/api/products",products)
app.use('/api/quote', quote);
app.use('/api/quote_item', quote_item);
app.use('/api/salesOrders',salesOrders);
app.use('/api/invoice',invoice);
app.use('/api/sales_orders_items',sales_orders_items);


app.get("/",(req,res)=>{
    res.send("hello from home page")
})




app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


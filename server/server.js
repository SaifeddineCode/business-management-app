import express from "express";
import customers from './routes/customers.js'
import products from "./routes/products.js"
import quoteRoute from "./routes/quoteRoute.js"
import quote_item from "./routes/quote_item.js"
import salesOrders from "./routes/salesOrders.js"
import invoiceRoute from "./routes/invoiceRoute.js"
import sales_orders_items from "./routes/sales_orders_items.js"
import authRoutes from "./routes/authRoutes.js"
import suppliersRoutes from "./routes/suppliersRoutes.js"


const app = express();

const PORT = process.env.PORT



// app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use("/api/customers",customers)
app.use("/api/products",products)
app.use('/api/quote', quoteRoute);
app.use('/api/quote_item', quote_item);
app.use('/api/salesOrders',salesOrders);
app.use('/api/invoice',invoiceRoute);
app.use('/api/sales_orders_items',sales_orders_items);
app.use('/api/suppliers',suppliersRoutes);


app.get("/",(req,res)=>{
    res.send("hello from home page")
})




app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


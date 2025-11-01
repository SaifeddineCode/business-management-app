// import express from "express"
// import db from "../../database/database.js";
// const router = express.Router()


// router.post("/", async (req, res) => {
//   try {
//     const {
//       quote_id,
//       client_id,
//       order_number,
//       order_date,
//       delivery_date,
//       delivery_address,
//       vendor_id,
//       total_ht,
//       tva,
//       total_ttc,
//       status,
//       items  // Array of products
//     } = req.body;

//     // 1. First insert into sales_orders table
//     const orderQuery = `
//       INSERT INTO sales_orders 
//       (quote_id, client_id, order_number, order_date, delivery_date, delivery_address, vendor_id, total_ht, tva, total_ttc, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
    
//     const [orderResult] = await db.execute(orderQuery, [
//       quote_id, client_id, order_number, order_date, delivery_date, 
//       delivery_address, vendor_id, total_ht, tva, total_ttc, status
//     ]);

//     const salesOrderId = orderResult.insertId;

//     // 2. Then insert all items into sales_order_items table
//     if (items && items.length > 0) {
//       for (const item of items) {
//         const itemQuery = `
//           INSERT INTO sales_order_items 
//           (sales_order_id, product_id, quantity, unit_price, discount, total)
//           VALUES (?, ?, ?, ?, ?, ?)
//         `;
        
//         await db.execute(itemQuery, [
//           salesOrderId,
//           item.product_id,
//           item.quantity,
//           item.unit_price,
//           item.discount,
//           item.total
//         ]);
//       }
//     }

//     // 3. Return the created order
//     res.status(201).json({
//       success: true,
//       message: "Sales order created successfully",
//       orderId: salesOrderId
//     });

//   } catch (error) {
//     console.error("Error creating sales order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create sales order",
//       error: error.message
//     });
//   }
// });

// export default router




import express from "express"
import db from "../../database/database.js"

const router = express.Router()

router.post("/", async(req,res)=>{

  try{

    const {
    quoteID ,
    clientID ,
    orderNumber,
    orderDate,
    deliveryDate,
    deliveryAdress,
    vendorId,
    totalHt,
    tva,
    tvaAmount,
    disountAmount,
    totalTTC,
    status,
    paymentMethod,
    notes
  } = req.body

  const query = `
  INSERT INTO sales_orders
  (quote_id, client_id, order_number, order_date, delivery_date, delivery_address, vendor_id, total_ht, tva, total_ttc, status)
  VALUES(?,?,?,?,?,?,?,?,?,?,?)
  `

  const result = await db.query(query,[quoteID, clientID, orderNumber, orderDate, deliveryDate, deliveryAdress, vendorId, totalHt, tva, totalTTC, status])
  
  if(result.insertId){
    res.status(201).json({ message: "Order created successfully" })
  } else {
    
  }


  }catch (err){
    console.log(err.message)
    console.log(err.sqlMessage)
  }

})


export default router

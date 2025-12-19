import db from "../config/database.js";


export const getSalesOrders = async (req,res)=>{

  try{
    const query = `
      SELECT so.*,
      c.name as customer_name 
      FROM sales_orders as so
      JOIN customers as c
      ON so.client_id = c.id
      ORDER BY so.id desc
    `

    const [rows] = await db.execute(query)


    return res.status(200).json({
      success:true,
      message:"Sales Orders was fetched successefully",
      data :rows
    })



  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }

}


export const postSaleOrder = async(req,res)=>{

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
      totalTTC,
      status,
      orderItems = []
    } = req.body



    if(!quoteID || !orderDate || !status ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields"
      });
    }

    if(!orderItems){
      return res.status(400).json({
        success: false,
        message: "No Order Items Detected"
      });
    }

    //  2. DUPLICATE CHECK 
    const [existingOrders] = await db.execute(
      'SELECT id FROM sales_orders WHERE quote_id = ?',
      [quoteID]
    );

    if (existingOrders.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An order already exists for this quote"
      });
    }

    const queryOrder = `
    INSERT INTO sales_orders
    (quote_id, client_id, order_number, order_date, delivery_date, delivery_address, vendor_id, total_ht, tva, total_ttc, status)
    VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `

  

    const [result] = await db.execute(queryOrder,
    [quoteID, clientID, orderNumber, orderDate, deliveryDate, deliveryAdress, vendorId, totalHt, tva, totalTTC, status])

 


    const saleOrderId = result.insertId

      console.log(saleOrderId)
      for (const orderItem of orderItems) {
        const queryItem = `
        INSERT INTO sales_order_items (sales_order_id,product_id,quantity,unit_price,discount,total)
        VALUES(?,?,?,?,?,?)
        `
      await db.query(queryItem,[saleOrderId,orderItem.product_ID,orderItem.quantity,orderItem.unit_price,0,orderItem.total])
    
      }


      
        res.status(201).json({
        success: true,
        message: 'sales order created successfuly'
      });
   
  

  } catch (err){
      res.status(500).json({
      success: false,
      err:err.message
    });
  }

}
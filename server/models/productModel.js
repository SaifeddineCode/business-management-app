import db from "../config/database.js";


export const postSingleProduct = async (productData) =>{

    try{
        const postQuery = `INSERT INTO products 
    (product_name,product_price,description,category,status,stock,sku)
    VALUES(?,?,?,?,?,?,?)
    `
    const 
    {product_name,
    product_price,
    description,
    category,
    status,
    stock,
    sku
    } = productData

    const [result] = await db.execute(postQuery,
        [product_name,product_price,description,category,status,stock,sku]
        
    )

    return result
    }catch(err){
        console.log(err)
    }

}
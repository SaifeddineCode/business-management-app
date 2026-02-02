import db from "../config/database.js";




// Get single product model 


export const getSingleProductModel = async(id) =>{

    try{

        const getSingleQuery = `SELECT * FROM products WHERE id = ? `
        const [row] = await db.execute(getSingleQuery,[id])

        return row

    }catch(err){
        console.log(err)
    }
}





// Post single product model

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



//Editing single product 


export const editSingleProductModel = async(productData,id) =>{

    console.log(productData)

    const {
        product_name,
        product_price,
        description,
        category,
        status,
        stock,
        sku,
    } = productData


    const [row] = await db.execute(`
        UPDATE products
        SET product_name = ? ,
        product_price = ?,
        description = ?,
        category = ?,
        status = ?,
        stock = ?,
        sku = ? 
        WHERE id = ?
        `,[product_name,product_price,description,category,status,stock,sku,id])


    return row


}
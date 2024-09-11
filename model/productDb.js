import {pool} from '../config/config.js'

const getProductsDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM Products')
    return data
}

const getProductDb = async (id)=>{
    let [[data]] = await pool.query(`
        SELECT *
        FROM Products
        WHERE prodID =? `,[id])
    return data
}

const addProductDb = async (prodName,quantity,amount,category,prodUrl,prodDesc)=>{
    await pool.query(`
        INSERT INTO Products(prodName,quantity,amount,category,prodUrl,prodDesc)
        VALUES (?,?,?,?,?,?)`,[prodName,quantity,amount,category,prodUrl,prodDesc])
}

const deleteProductDb = async (id)=>{
    await pool.query(`
        DELETE
        FROM Products
        WHERE prodID = ?`,[id])
}

const recentProductsDb = async()=>{
    let [data] = await pool.query(`
    SELECT *
    FROM Products
    ORDER BY prodID desc
    LIMIT 5`)
    return data
}

// console.log(await recentProductsDb())

const editProductsDb = async (id,prodName,quantity,amount,category,prodUrl,prodDesc)=>{
    await pool.query(`
        UPDATE Products
        SET prodName = ?,quantity =? ,amount=?,category=?,prodUrl=?,prodDesc=?
        WHERE prodID = ?`,[prodName,quantity,amount,category,prodUrl,prodDesc,id])
}

export {getProductsDb, getProductDb, addProductDb, deleteProductDb, recentProductsDb, editProductsDb}

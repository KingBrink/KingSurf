
import { json } from "express";
import { getProductsDb, getProductDb, addProductDb, deleteProductDb , editProductsDb , recentProductsDb } from "../model/productDb.js";


const fetchProducts = async (req,res)=>{
    try{
        
        res.status(202).json(await getProductsDb())
    }catch (err){
        res.status(404).json({err:'There was an issue with fetching Products'})
        throw err
    }
}

const fetchProduct = async (req,res)=>{
    try{
        
        res.status(202).json(await getProductDb(req.params.id))
    }catch(err){
        res.status(404).json({err:'There was an issue with fetching single Product'})
        throw err
    }
}

const fetchRecentProducts = async (req,res)=>{ 
    try{
        await recentProductsDb()
    }catch(err){
        res.status(404).json({err:'There was an issue with fetching Recent Products'})
        throw err
    }
}


const addProduct = async (req,res)=>{
    let {prodName,quantity,amount,category,prodUrl,prodDesc} = req.body
    if (!prodName || !quantity || !amount || !category || !prodUrl || !prodDesc) {
        return res.status(400).json({err:"Missing required fields" });
    }
    try{
        await addProductDb(prodName,quantity,amount,category,prodUrl,prodDesc)
        res.status(202).json({message: 'Product Added Successfully'})
    }catch(err){
        res.status(404).json({err:'There was an issue with adding Product'})
        throw err
    }
}

const removeProduct = async (req,res)=>{
    try{
        await deleteProductDb(req.params.id)
        res.status(202).json({message:'Product has been deleted'})
    } catch(err){
        res.status(404).json({err:'There was an issue with removing Product'})
        throw err
    }
}


const updateProducts = async (req,res)=>{
    let {prodName,quantity,amount,category,prodUrl,prodDesc} = req.body
    try{

        let products = await getProductDb(req.params.id)
        console.log(products)
        prodName? prodName=prodName : prodName = products.prodName
        
        quantity? quantity=quantity : quantity = products.quantity
        amount? amount=amount : amount = products.amount
        category? category=category : category = products.category
        prodUrl? prodUrl=prodUrl : prodUrl = products.prodUrl
        prodDesc? prodDesc=prodDesc : prodDesc = products.prodDesc
        await editProductsDb(req.params.id,prodName,quantity,amount,category,prodUrl,prodDesc)
        res.status(202).json({message:"Product was updated successfully"})
    }catch (err){
        res.status(404).json({err:'There was an issue with updating Product'})
        throw err
    }

}
export {fetchProducts, fetchProduct, addProduct, removeProduct , updateProducts, fetchRecentProducts}
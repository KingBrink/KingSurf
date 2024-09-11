import express from 'express'

import { fetchProducts, fetchProduct, addProduct, removeProduct, fetchRecentProducts, updateProducts } from '../controller/productsController.js'

const router = express.Router()

router.get('/',fetchProducts)
router.get('/recent', fetchRecentProducts)
router.get('/:id',fetchProduct)
router.post('/addProduct',addProduct)
router.delete('/delete/:id',removeProduct)
router.patch('/update/:id',updateProducts)

export default router 
import express from 'express';
import controller from '../Controllers/cartController.js'


const router = express.Router()

router.route('/')
    .get(controller.allCartItems)
    
    
    router.route('/:id')
    .get(controller.itemsInCart)
    .post(controller.addToCartTable)
    .delete(controller.deleteFromCart)
    .patch(controller.editCart)


export default router;
import express from 'express';
import cartController from '../Controllers/cartController.js';
import authenticate from '../Middleware/signToken.js'; // Authentication middleware

const router = express.Router();

// Ensure users are authenticated to access cart functionality
router.use(authenticate);

// Define the cart routes that are accessible by registered users
router.get('/user/:id/carts', cartController.allCartItems);
router.post('/user/:id/cart', cartController.addToCartTable);
router.patch('/user/:id/cart/:cartItemId', cartController.editCart);
router.delete('/user/:id/cart', cartController.deleteFromCart);
router.delete('/user/:id/cart/:cartItemId', cartController.deleteSpecificItem);

export default router;

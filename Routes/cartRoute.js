import express from 'express';
import cartController from '../Controllers/cartController.js';
import isRoleEqualToAdmin from '../Middleware/roleStatus.js';

const router = express.Router();

// Apply the role-check middleware (auth already applied in index.js)
router.use(isRoleEqualToAdmin);

// Define the route to fetch all carts (for admins)
router.get('/', cartController.allCarts); // New: Fetch all carts for admins

// Define the cart routes that are accessible only by Admin users
router.get('/user/:id/carts', cartController.allCartItems);
router.post('/user/:id/cart', cartController.addToCartTable);
router.patch('/user/:id/cart/:cartItemId', cartController.editCart);
router.delete('/user/:id/cart', cartController.deleteFromCart);
router.delete('/user/:id/cart/:cartItemId', cartController.deleteSpecificItem);

export default router;

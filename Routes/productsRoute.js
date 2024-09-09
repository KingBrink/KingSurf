import express from 'express';
import controller from '../Controllers/productController.js';
import { auth } from '../Middleware/verifyJwt.js'; // Correct case and import as named export
const router = express.Router();
// Public route to view all products (no authentication required)
router.route('/')
    .get(controller.allProducts); // Get all products (public access)
// Routes that require authentication (add, edit, delete)
router.use(auth); // Apply authentication middleware for the following routes
router.route('/')
    .post(controller.addProductToDB); // Add new product (requires authentication)
router.route('/:id')
    .get(controller.prodByID) // Get product by ID (requires authentication)
    .delete(controller.delProductByID) // Delete product (requires authentication)
    .patch(controller.editProductByID); // Edit product (requires authentication)
export default router;
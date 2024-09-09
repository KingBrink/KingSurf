import express from 'express';
import controller from '../Controllers/productController.js';
import { auth } from '../Middleware/verifyJwt.js'; // Correct case and import as named export

const router = express.Router();

// Protect all routes under '/products' with JWT verification middleware
router.use(auth);

router.route('/')
    .get(controller.allProducts) // Get all products (requires authentication)
    .post(controller.addProductToDB) // Add new product (requires authentication)

router.route('/:id')
    .get(controller.prodByID) // Get product by ID (requires authentication)
    .delete(controller.delProductByID) // Delete product (requires authentication, no admin required)
    .patch(controller.editProductByID); // Edit product (requires authentication)

export default router;

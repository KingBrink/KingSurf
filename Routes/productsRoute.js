import express from 'express';
import controller from '../Controllers/productController.js';
import { auth } from '../Middleware/verifyJwt.js'; // Correct case and import as named export
import isRoleEqualToAdmin from '../Middleware/roleStatus.js'; // Middleware for checking admin role

const router = express.Router();

// Public route to view all products (no authentication required)
router.route('/')
    .get(controller.allProducts); // Get all products (public access)

// Routes that require authentication
router.use(auth); // Apply authentication middleware for the following routes

router.route('/')
    .post(isRoleEqualToAdmin, controller.addProductToDB); // Add new product (requires admin role)

// Routes for product by ID
router.route('/:id')
    .get(controller.prodByID) // Get product by ID (requires authentication)
    .delete(controller.delProductByID) // Delete product (requires authentication)
    .patch(isRoleEqualToAdmin, controller.editProductByID); // Edit product (requires admin role)

export default router;

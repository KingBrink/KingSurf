import { 
    getCart, 
    insert, 
    removeFromCart, 
    getProductByID, 
    addedInCart, 
    editCart, 
    checkProfile, 
    deleteSpecificItem, 
    getAllCarts
} from "../Model/db.js";

const cartController = {
    // Admin can fetch all carts
    allCarts: async (req, res) => {
        try {
            console.log(`Fetching all carts for Admin user: ${req.user.user_email}`);
            const carts = await getAllCarts();
            return res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching all carts:', error);
            return res.status(500).json({ msg: "Unable to retrieve carts. Please try again later." });
        }
    },

    // All users can access their cart items
    allCartItems: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.user_email);
            const cartItems = await getCart(userProfile.user_id);
            return res.status(200).json({ products: cartItems });
        } catch (error) {
            return res.status(500).json({ msg: "Unable to retrieve cart items. Please try again later." });
        }
    },

    // Users can add items to their cart
    addToCartTable: async (req, res) => {
        try {
            const { quantity } = req.body;
            const product = await getProductByID(+req.params.product_id);
            const userProfile = await checkProfile(req.user.user_email);

            await insert(product.product_id, userProfile.user_id, quantity);
            const updatedCart = await addedInCart(userProfile.user_id);
            return res.status(201).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to add item to cart. Please try again later." });
        }
    },

    // Users can remove items from their cart
    deleteFromCart: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.user_email);
            await removeFromCart(+req.params.product_id, userProfile.user_id);
            const updatedCart = await getCart(userProfile.user_id);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to remove item from cart. Please try again later." });
        }
    },

    // Users can edit their cart
    editCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;
            const cartID = +req.params.cartItemId;
            const userProfile = await checkProfile(req.user.user_email);

            await editCart(product_id, userProfile.user_id, quantity, cartID);
            const updatedCart = await getCart(userProfile.user_id);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: error.message || "Unable to update cart item. Please try again later." });
        }
    },

    deleteSpecificItem: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.user_email);
            await deleteSpecificItem(+req.params.cartItemId, userProfile.user_id);
            const updatedCart = await getCart(userProfile.user_id);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to delete item from cart. Please try again later." });
        }
    }
};

export default cartController;

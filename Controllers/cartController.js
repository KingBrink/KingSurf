import {
  getCart,
  addToCart,
  insert,
  removeFromCart,
  getProductByID,
  addedInCart,
  deleteSpecificItem,
  editCart,
  checkProfile,
  
} from "../Model/db.js";

export default {
  allCartItems: async (req, res) => {
    try {
      const userProfile = await checkProfile(req.user.emailAdd);
      if (!userProfile) {
        return res.status(403).json({ msg: "Unauthorized access" });
      }
      const cartItems = await getCart();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({
        msg: "Unable to retrieve cart items. Please try again later.",
      });
    }
  },
  itemsInCart: async (req, res) => {
    try {
      const { userID } = req.query;
      const userProfile = await checkProfile(req.user.emailAdd);
      if (userProfile && req.user.emailAdd === userID) {
        const data = await addedInCart(+req.params.id);
        res.status(200).json({ products: data });
      } else {
        res.status(403).json({ msg: "Unauthorized access" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Unable to retrieve cart items. Please try again later.",
      });
    }
  },
  addToCartTable: async (req, res) => {
    try {
      const { quantity } = req.body;
      const product = await getProductByID(+req.params.id);
      const { userID } = req.query;
      const userProfile = await checkProfile(req.user.emailAdd);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      if (userProfile && req.user.emailAdd === userID) {
        await insert(+req.params.id, userID, quantity);
        const updatedCart = await addedInCart(userID);
        res.status(201).json(updatedCart);
      } else {
        res.status(403).json({ msg: "Unauthorized access" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Unable to add item to cart. Please try again later.",
      });
    }
  },
  deleteFromCart: async (req, res) => {
    try {
      const { userID } = req.query;
      const userProfile = await checkProfile(req.user.emailAdd);
      if (userProfile && req.user.emailAdd === userID) {
        await removeFromCart(+req.params.id, userID);
        const updatedCart = await getCart();
        res.status(200).json(updatedCart);
      } else {
        res.status(403).json({ msg: "Unauthorized access" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Unable to remove item from cart. Please try again later.",
      });
    }
  },
  editCart: async (req, res) => {
    try {
      const { productID, quantity } = req.body;
      const cartID = +req.params.id;
      const { userID } = req.query;
      const userProfile = await checkProfile(req.user.emailAdd);
      if (userProfile && req.user.emailAdd === userID) {
        await editCart(productID, userID, quantity, cartID);
        const updatedCart = await getCart();
        res.status(200).json(updatedCart);
      } else {
        res.status(403).json({ msg: "Unauthorized access" });
      }
    } catch (error) {
      res.status(500).json({
        msg:
          error.message ||
          "Unable to update cart item. Please try again later.",
      });
    }
  },
  deleteSpecificItem: async (req, res) => {
    try {
      const { userID } = req.query;
      const { itemID } = req.params;
      const userProfile = await checkProfile(req.user.emailAdd);
      if (userProfile && req.user.emailAdd === userID) {
        await deleteSpecificItem(itemID, userID);
        const updatedCart = await getCart();
        res.status(200).json(updatedCart);
      } else {
        res.status(403).json({ msg: "Unauthorized access" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Unable to delete item from cart. Please try again later.",
      });
    }
  },
};

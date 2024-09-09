import { getProducts, getProductByID, editProduct, deleteProduct, addProduct } from "../Model/db.js";

export default {
    allProducts: async (req, res) => {
        console.log("Fetching all products...");
        try {
            const products = await getProducts(req.body.product_name);
            console.log("Products fetched successfully:", products);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ msg: "Unable to retrieve products. Please try again later." });
        }
    },

    prodByID: async (req, res) => {
        console.log("Fetching product by ID:", req.params.id);
        try {
            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found with ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }
            console.log("Product fetched successfully:", product);
            res.status(200).json(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).json({ msg: "Unable to retrieve the product. Please try again later." });
        }
    },

    addProductToDB: async (req, res) => {
        console.log("Attempting to add new product:", req.body);
        try {
            const { product_name, product_desc, product_price, product_img, product_category } = req.body;

            if (!product_name || !product_price) {
                console.log("Validation failed: Product name or product_price missing.");
                return res.status(400).json({ msg: "Product name and product_price are required" });
            }

            await addProduct(product_name, product_desc, product_price, product_img, product_category);
            console.log("Product added successfully. Fetching updated product list...");
            const products = await getProducts();
            res.status(201).json(products);
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ msg: "Unable to add a new product. Please try again later." });
        }
    },

    editProductByID: async (req, res) => {
        console.log("Attempting to edit product with ID:", req.params.id, "Data:", req.body);
        try {
            const { product_name, product_desc, product_price, product_img, product_category } = req.body;

            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found with ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }

            const updatedProduct = {
                product_name: product_name || product.product_name,
                product_desc: product_desc || product.product_desc,
                product_price: product_price || product.product_price,
                product_img: product_img || product.product_img,
                product_category: product_category || product.product_category,
            };

            console.log("Updating product with data:", updatedProduct);
            await editProduct(updatedProduct, +req.params.id);
            console.log("Product updated successfully. Fetching updated product list...");
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ msg: "Unable to update the product. Please try again later." });
        }
    },

    delProductByID: async (req, res) => {
        try {
            console.log("Attempting to delete product with ID:", req.params.id);

            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found, ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }

            await deleteProduct(+req.params.id);
            console.log("Product deleted, ID:", req.params.id);

            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error during product deletion:", error.message);
            res.status(500).json({ msg: "Unable to delete the product. Please try again later." });
        }
    },
};

import { pool } from '../config/config.js';
import { encryptPassword } from '../Middleware/hashPass.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Product settings ===============

const getProducts = async () => {
    const [products] = await pool.query(`
        SELECT * FROM products
    `);
    return products;
};

const getProductByID = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product ID");
    }

    const [product] = await pool.query(`
        SELECT * FROM products WHERE product_id = ?
    `, [id]);

    if (product.length === 0) {
        throw new Error("Product not found");
    }

    return product;
};

const editProduct = async (product_name, product_desc, product_price, product_img, product_category, product_id) => {
    if (!product_id || isNaN(product_id)) {
        throw new Error("Invalid product ID");
    }

    const [result] = await pool.query(`
        UPDATE products SET product_name = ?, product_desc = ?, product_price = ?, product_img = ?, product_category = ? WHERE product_id = ?
    `, [product_name, product_desc, product_price, product_img, product_category, product_id]);

    if (result.affectedRows === 0) {
        throw new Error("Product update failed");
    }

    return result;
};

const deleteProduct = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product ID");
    }

    const [result] = await pool.query(`
        DELETE FROM products WHERE product_id = ?
    `, [id]);

    if (result.affectedRows === 0) {
        throw new Error("Product deletion failed");
    }

    return result;
};

const addProduct = async (product_name, product_desc, product_price, product_img, product_category) => {
    const [result] = await pool.query(`
        INSERT INTO products (product_name, product_desc, product_price, product_img, product_category) VALUES (?, ?, ?, ?, ?)
    `, [product_name, product_desc, product_price, product_img, product_category]);

    if (result.affectedRows === 0) {
        throw new Error("Failed to add product");
    }

    return getProducts(result.insertId);
};



// Cart settings ===============

// Fetch all carts for admins
const getAllCarts = async () => {
    const [carts] = await pool.query(`
        SELECT 
        cart.cartID, 
            cart.user_id, 
            cart.quantity,
            products.product_name,
            products.product_price,
            (cart.quantity * products.product_price) AS total_price,
            products.product_img
            FROM cart
            JOIN products ON cart.product_id = products.product_id
            `);
    return carts;
};

// Add an item to cart
const insert = async (product_id, user_id, quantity) => {
    const [existingProduct] = await pool.query(`
                SELECT * FROM cart
                WHERE product_id = ? AND user_id = ?
            `, [product_id, user_id]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity + quantity;
        await pool.query(`
                    UPDATE cart
                    SET quantity = ?
                    WHERE product_id = ? AND user_id = ?
                `, [updatedQuantity, product_id, user_id]);
    } else {
        await pool.query(`
                    INSERT INTO cart (product_id, user_id, quantity)
                    VALUES (?, ?, ?)
                `, [product_id, user_id, quantity]);
    }
};

// Define removeFromCart function if it's missing
const removeFromCart = async (product_id, user_id) => {
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE product_id = ? AND user_id = ?
    `, [product_id, user_id]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity - 1;

        if (updatedQuantity <= 0) {
            await pool.query(`
                DELETE FROM cart
                WHERE product_id = ? AND user_id = ?
            `, [product_id, user_id]);
        } else {
            await pool.query(`
                UPDATE cart
                SET quantity = ?
                WHERE product_id = ? AND user_id = ?
            `, [updatedQuantity, product_id, user_id]);
        }
    }
};


// Fetch a specific cart for a user
const getCart = async (user_id) => {
    const [cart] = await pool.query(`
        SELECT 
            cart.cartID,
            cart.quantity,
            products.product_name,
            products.product_price,
            (cart.quantity * products.product_price) AS total_price,
            products.product_img
        FROM 
            cart
        JOIN 
            products ON cart.product_id = products.product_id
        WHERE 
            cart.user_id = ?
    `, [user_id]);
    return cart;
};

// New function to fetch all cart items (for admins)
const addedInCart = async (user_id) => {
    const [cartItems] = await pool.query(`
        SELECT 
            cart.quantity,
            products.product_price,
            (cart.quantity * products.product_price) AS totalPrice,
            products.product_img,
            products.product_name,
            products.product_id
        FROM 
            cart
        JOIN 
            products ON cart.product_id = products.product_id
        WHERE 
            cart.user_id = ?
    `, [user_id]);
    return cartItems;
};

// Add an item to cart
const addToCart = async (product_id, user_id) => {
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE product_id = ? AND user_id = ?
    `, [product_id, user_id]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity + 1;
        await pool.query(`
            UPDATE cart
            SET quantity = ?
            WHERE product_id = ? AND user_id = ?
        `, [updatedQuantity, product_id, user_id]);
    } else {
        await pool.query(`
            INSERT INTO cart (product_id, user_id, quantity)
            VALUES (?, ?, 1)
        `, [product_id, user_id]);
    }
};

// Update cart item
const editCart = async (product_id, user_id, quantity, cartID) => {
    const [result] = await pool.query(`
        UPDATE cart 
        SET product_id = ?, quantity = ? 
        WHERE cartID = ? AND user_id = ?
    `, [product_id, quantity, cartID, user_id]);

    return result;
};

// Delete a specific cart item by cartID
const deleteSpecificItem = async (cartID, user_id) => {
    await pool.query(`
        DELETE FROM cart
        WHERE cartID = ? AND user_id = ?
    `, [cartID, user_id]);
};



// const generateJWT = (user) => {
//     console.log("User object before JWT generation:", user);
//     const payload = {
//         user_email: user.user_email,
//         user_role: user.user_role,
//         user_id: user.user_id, // Ensure user_id is included in the payload
//     };

//     try {
//         return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
//     } catch (error) {
//         throw new Error('Error generating JWT: ' + error.message);
//     }
// };






const getUsers = async () => {
    try {
        const [users] = await pool.query(`
            SELECT * FROM users
        `);
        console.log("getUsers query result:", users);
        return users;
    } catch (error) {
        console.error("Error fetching users from DB:", error);
        throw new Error("Database error. Unable to retrieve users.");
    }
};


const addUser = async ({ user_profile, user_email, user_password, user_role, user_image }) => {
    try {
        const query = `INSERT INTO users (user_profile, user_email, user_password, user_role, user_image)
                       VALUES (?, ?, ?, ?, ?)`;
        await pool.execute(query, [user_profile, user_email, user_password, user_role, user_image]);

        return { user_profile, user_email, user_role, user_image };
    } catch (error) {
        throw new Error('Error inserting user into the database: ' + error.message);
    }
};


const getUserByID = async (user_id) => {
    if (!user_id || isNaN(user_id)) {
        throw new Error("Invalid user ID");
    }

    const [user] = await pool.query(`
        SELECT * FROM users WHERE user_id = ?
        `, [user_id]);

    if (user.length === 0) {
        throw new Error("User not found");
    }

    return user[0];
};

const updateUser = async (user_profile, user_email, user_password, user_role, user_image, user_id) => {
    console.log('Received user_id:', user_id); // Log the received user_id

    if (!user_id || isNaN(user_id)) {
        console.error("Invalid user ID:", user_id); // Log the invalid user_id
        throw new Error("Invalid user ID");
    }

    try {
        const [result] = await pool.query(`
            UPDATE users SET user_profile = ?, user_email = ?, user_password = ?, user_role = ?, user_image = ? WHERE user_id = ?
        `, [user_profile, user_email, user_password, user_role, user_image, user_id]);

        if (result.affectedRows === 0) {
            console.error("User update failed, no rows affected."); // Log if the update failed
            throw new Error("User update failed");
        }

        console.log('User update successful, affected rows:', result.affectedRows); // Log success
        return result;
    } catch (error) {
        console.error('Error during user update query:', error); // Log any errors during the query
        throw new Error('User update failed: ' + error.message);
    }
};





const deleteUser = async (user_id) => {
    if (!user_id || isNaN(user_id)) {
        throw new Error("Invalid user ID");
    }

    const [result] = await pool.query(`
        DELETE FROM users WHERE user_id = ?
        `, [user_id]);

    if (result.affectedRows === 0) {
        throw new Error("User deletion failed");
    }

    return result;
};

const loginUser = async (user_email, user_password) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM users WHERE user_email = ?
            `, [user_email]);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        const isuser_passwordordValid = await bcrypt.compare(user_password, user.user_password);

        if (!isuser_passwordordValid) {
            return null;
        }

        return user; // Ensure 'user_id' is included in the returned user object
    } catch (error) {
        throw new Error('Error during login process: ' + error.message);
    }
};



const registerUser = async ({ user_profile, user_email, user_password, user_role = 'user', user_image = null }) => {
    try {
        // Encrypt the user_passwordord using the function from hashPass.js
        const encryptedPass = await encryptPassword(user_password);

        // Add the user to the database
        const user = await addUser({ user_profile, user_email, user_password: encryptedPass, user_role, user_image });

        // Generate a JWT token
        const token = generateJWT(user);

        return { user, token };
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};


const checkRoleStatus = async (user_role) => {
    try {
        console.log("Checking user role in the database:", user_role);
        const [[{ user_role: role }]] = await pool.query(`
            SELECT user_role FROM users WHERE user_role = ?
        `, [user_role]);

        if (!role) {
            throw new Error('Role not found in the database.');
        }

        console.log("Fetched role from DB:", role);
        return role;
    } catch (error) {
        console.error('Error fetching user role:', error.message);
        throw new Error('Error fetching user role: ' + error.message);
    }
};

const checkProfile = async (user_email) => {
    try {
        console.log("Checking user profile for:", user_email);
        const [userProfile] = await pool.query(`
            SELECT * FROM users WHERE user_email = ?
        `, [user_email]);

        if (!userProfile || userProfile.length === 0) {
            throw new Error('User profile not found.');
        }

        console.log("Fetched user profile:", userProfile);
        return userProfile[0]; // Assuming only one profile per email
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        throw new Error('Error fetching user profile: ' + error.message);
    }
};

const checkUser = async (user_email) => {
    try {
        console.log("Checking user user_passwordord for:", user_email);
        const [[{ user_password }]] = await pool.query(`
            SELECT user_password FROM users WHERE user_email = ?
        `, [user_email]);

        if (!user_password) {
            throw new Error('user_passwordord not found for this user.');
        }

        console.log("Fetched user_passwordord from DB for", user_email, ":", user_password);
        return user_password;
    } catch (error) {
        console.error('Error fetching user user_passwordord:', error.message);
        throw new Error('Error fetching user user_passwordord: ' + error.message);
    }
};



export {
    getProducts,
    getProductByID,
    editProduct,
    deleteProduct,
    addProduct,
    getCart,
    addedInCart,
    addToCart,
    getAllCarts,
    insert,
    removeFromCart,
    editCart,
    checkUser,
    getUsers,
    addUser,
    deleteUser,
    getUserByID,
    checkRoleStatus,
    updateUser,
    checkProfile,
    encryptPassword,
    deleteSpecificItem,
    loginUser,
    registerUser
};

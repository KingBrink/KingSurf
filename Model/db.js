import { pool } from "../config/config.js";

const getProducts = async () => {
  const [products] = await pool.query(`
     SELECT * FROM products
    `);
  return products;
};

// returns product by an id
const getProductByID = async (id) => {
  const [product] = await pool.query(
    `
        SELECT * FROM products WHERE product_id = ?
    `,
    [id]
  );

  if (!id || isNaN(id) || id > product) {
    throw error();
  }

  return product;
};

const editProduct = async (
  product_name,
  product_desc,
  product_price,
  prooduct_img,
  product_category,
  product_id
) => {
  const [product] = await pool.query(
    `
        UPDATE products SET product_name = ?, product_desc = ?, product_price = ?, product_img = ?, product_category = ? WHERE product_id = ?
    `,
    [
      product_name,
      product_desc,
      product_price,
      prooduct_img,
      product_category,
      product_id,
    ]
  );
};

const deleteProduct = async (id) => {
  const [product] = await pool.query(
    `
    DELETE FROM products WHERE product_id =?
    `,
    [id]
  );
  if (!id || isNaN(id) || id > product) {
    throw error();
  }
};

const addProduct = async (
  product_name,
  product_desc,
  product_price,
  product_img,
  product_category
) => {
  const [product] = await pool.query(
    `
    INSERT INTO products (product_name, product_desc, product_price, product_img, product_category) VALUES (?, ?, ?, ?, ?)
    `,
    [product_name, product_desc, product_price, product_img, product_category]
  );
  return getProducts(product.insertId);
};

// Cart settings ===============
const getCart = async (user_id) => {
  const [cart] = await pool.query(
    `
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
    `,
    [user_id]
  );
  return cart;
};
const addedInCart = async (user_id) => {
  const [cartItems] = await pool.query(
    `
        SELECT
            cart.quantity,
            products.product_price,
            (cart.quantity * products.product_price) AS totalPrice,
            products.product_img AS product_img,
            products.product_name AS product_name,
            products.product_id AS product_id
        FROM
            cart
        JOIN
            products ON cart.product_id = products.product_id
        WHERE
            cart.user_id = ?
    `,
    [user_id]
  );
  return cartItems;
};
const addToCart = async (product_id, user_id) => {
  const [existingProduct] = await pool.query(
    `
        SELECT * FROM cart
        WHERE product_id = ? AND user_id = ?
    `,
    [product_id, user_id]
  );
  if (existingProduct.length > 0) {
    const updatedQuantity = existingProduct[0].quantity + 1;
    await pool.query(
      `
            UPDATE cart
            SET quantity = ?
            WHERE product_id = ? AND user_id = ?
        `,
      [updatedQuantity, product_id, user_id]
    );
  } else {
    await pool.query(
      `
            INSERT INTO cart (product_id, user_id, quantity)
            VALUES (?, ?, 1)
        `,
      [product_id, user_id]
    );
  }
};
const insert = async (product_id, user_id) => {
  await addToCart(product_id, user_id);
};
const editCart = async (product_id, user_id, quantity, cartID) => {
  if (!cartID || isNaN(cartID)) {
    throw new Error("Invalid cart ID");
  }
  const [result] = await pool.query(
    `
        UPDATE cart
        SET product_id = ?, quantity = ?
        WHERE cartID = ? AND user_id = ?
    `,
    [product_id, quantity, cartID, user_id]
  );
  if (result.affectedRows === 0) {
    throw new Error(
      "Update failed, possibly due to an invalid cart ID or no changes made"
    );
  }
  return result;
};
const removeFromCart = async (product_id, user_id) => {
  const [existingProduct] = await pool.query(
    `
        SELECT * FROM cart
        WHERE product_id = ? AND user_id = ?
    `,
    [product_id, user_id]
  );
  if (existingProduct.length > 0) {
    const updatedQuantity = existingProduct[0].quantity - 1;
    if (updatedQuantity <= 0) {
      await pool.query(
        `
                DELETE FROM cart
                WHERE product_id = ? AND user_id = ?
            `,
        [product_id, user_id]
      );
    } else {
      await pool.query(
        `
                UPDATE cart
                SET quantity = ?
                WHERE product_id = ? AND user_id = ?
            `,
        [updatedQuantity, product_id, user_id]
      );
    }
  }
};
// New function to delete a specific item
const deleteSpecificItem = async (itemID, user_id) => {
  await pool.query(
    `
        DELETE FROM cart
        WHERE cartID = ? AND user_id = ?
    `,
    [itemID, user_id]
  );
};

// user verification ============

const checkUser = async (user_email, user_role) => {
  const [[{ user_password }]] = await pool.query(
    `
        SELECT user_password FROM users WHERE user_email = ? AND user_role = ?
    `,
    [user_email, user_role]
  );
  return user_password;
};

// user settings

const getUsers = async () => {
  const [users] = await pool.query(`
        SELECT * FROM users
    `);
  return users;
};

const addUser = async (
  user_profile,
  user_email,
  user_password,
  user_role,
  user_image
) => {
  const [user] = await pool.query(
    `
       INSERT INTO users (user_profile, user_email, user_password, user_role, user_image) 
       VALUES(?, ?, ?, ?, ?)
    `,
    [user_profile, user_email, user_password, user_role, user_image]
  );
  return getUsers(user.insertId);
};

const getUserByID = async (user_id) => {
  const [user] = await pool.query(
    `
        SELECT * FROM users WHERE user_id = ?
    `,
    [user_id]
  );

  if (!user_id || isNaN(user_id) || user_id > user) {
    throw error();
  }

  return user;
};

const editUser = async (
  user_profile,
  user_email,
  user_password,
  user_role,
  user_image,
  user_id
) => {
  const [users] = await pool.query(
    `
    UPDATE users SET user_profile = ?, user_email = ?, user_password = ?, user_role = ?, user_image = ? WHERE user_id = ?
    `,
    [user_profile, user_email, user_password, user_role, user_image, user_id]
  );

  if (!user_id || isNaN(user_id) || user_id > users) {
    throw error();
  }
};

const deleteUser = async (user_id) => {
  const [users] = await pool.query(
    `
        DELETE FROM users WHERE user_id = ?
    `,
    [user_id]
  );

  if (!user_id || isNaN(user_id) || user_id > users) {
    throw error();
  }
};

// admin check
const checkRoleStatus = async (user) => {
  const [[{ user_role }]] = await pool.query(
    `
    SELECT * FROM users WHERE user_role = ?
 `,
    [user]
  );
  return user_role;
};

const checkProfile = async (user_email) => {
  const [validUser] = await pool.query(
    `
    SELECT * FROM users WHERE user_email = ?
    `,
    [user_email]
  );
  return validUser;
};

export {
  getProducts,
  getProductByID,
  editProduct,
  deleteProduct,
  addProduct,
  getCart,
  addedInCart,
  insert,
  addToCart,
  removeFromCart,
  checkUser,
  getUsers,
  addUser,
  deleteUser,
  getUserByID,
  checkRoleStatus,
  editUser,
  checkProfile,
  editCart,
  deleteSpecificItem,
};

// const addToCart = async (product_id) => {
//     const [addToCart] = await pool.query(`
//         SELECT * FROM products
//         INNER JOIN cart ON products.product_id = cart.product_id
//         WHERE cart.user_id = ?
//     `, [product_id]);
//     return addToCart
// }
// // console.log(await addToCart(1))

// const insert = async(product_id, user_id, quantity) => {
//     const [result] = await pool.query(`
//       INSERT INTO cart (product_id, user_id, quantity) VALUES (?,?,?)
//     `,[product_id, user_id, quantity])
//     return addToCart()
// }

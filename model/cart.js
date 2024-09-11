import { connection as db } from '../config/config.js';

class Cart {

    fetchAllCarts(req, res) {
        try {
            const strQry = `SELECT DISTINCT u.user_id, u.user_profile, u.user_email,
                                GROUP_CONCAT(p.product_id) AS product_ids,
                                GROUP_CONCAT(p.product_name) AS product_names,
                                SUM(p.product_price) AS totalproduct_price, 
                                COUNT(p.product_id) AS quantity
                            FROM Cart c
                            JOIN users u ON c.user_id = u.user_id
                            JOIN products p ON c.product_id = p.product_id
                            GROUP BY u.user_id, u.user_profile, u.user_email
                            ORDER BY totalproduct_price DESC;`;

            db.query(strQry, (err, results) => {
                if (err) throw new Error(err.message);
                res.json({
                    status: res.statusCode,
                    results: results
                });
            });
        } catch (error) {
            res.json({
                status: 404,
                msg: error.message
            });
        }
    }

    fetchCartByID(req, res) {
        try {
            const user_id = db.escape(req.params.id); // Escape to prevent SQL injection
            const strQry = `SELECT DISTINCT u.user_id, u.user_profile, u.user_email,
                                GROUP_CONCAT(p.product_id) AS product_ids,
                                GROUP_CONCAT(p.product_name) AS product_names,
                                SUM(p.product_price) AS totalproduct_price, 
                                COUNT(p.product_id) AS quantity
                            FROM Cart c
                            JOIN users u ON c.user_id = u.user_id
                            JOIN products p ON c.product_id = p.product_id
                            WHERE u.user_id = ${user_id}
                            GROUP BY u.user_id, u.user_profile, u.user_email
                            ORDER BY totalproduct_price DESC;`;

            db.query(strQry, (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    results: results
                });
            });
        } catch (error) {
            res.json({
                status: 404,
                msg: error.message
            });
        }
    }

    addCart(req, res) {
        try {
            const { user_id, product_id, quantity, product_price } = req.body;
            const strQry = `INSERT INTO Cart (user_id, product_id, quantity, product_price) 
                            VALUES (?, ?, ?, ?)`;

            db.query(strQry, [user_id, product_id, quantity, product_price], (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    message: 'Cart item added successfully',
                    results: results
                });
            });
        } catch (error) {
            res.json({
                status: 404,
                msg: error.message
            });
        }
    }

    updateCart(req, res) {
        try {
            const { user_id, product_id, quantity, product_price } = req.body;
            const strQry = `UPDATE Cart 
                            SET quantity = ?, product_price = ?
                            WHERE user_id = ? AND product_id = ?`;

            db.query(strQry, [quantity, product_price, user_id, product_id], (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    message: 'Cart item updated successfully',
                    results: results
                });
            });
        } catch (error) {
            res.json({
                status: 404,
                msg: error.message
            });
        }
    }

    deleteCart(req, res) {
        try {
            const { user_id, product_id } = req.params;
            const strQry = `DELETE FROM Cart 
                            WHERE user_id = ? AND product_id = ?`;

            db.query(strQry, [user_id, product_id], (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    message: 'Cart item deleted successfully',
                    results: results
                });
            });
        } catch (error) {
            res.json({
                status: 404,
                msg: error.message
            });
        }
    }
}

export {
    Cart
}

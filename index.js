import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productsRoute from './Routes/productsRoute.js';
import cartRoute from './Routes/cartRoute.js';
import { router as userRoute } from './Routes/userRoute.js';
import authenticate from './Middleware/signToken.js'; // Import token sign middleware
const app = express();
const PORT = process.env.PORT || 1738;
app.use(express.static('./Static'));
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Public route for login
app.post('/login', authenticate);
// Public route for logout
app.delete('/logout', (req, res) => {
    res.clearCookie('jwt');
    console.log("User logged out, cookies cleared.");
    res.json({
        msg: 'Logged out successfully'
    });
});
// Apply routes
app.use('/products', productsRoute); // No global auth middleware for products
app.use('/carts', cartRoute);
app.use('/users', userRoute);
// 404 Catcher - After all routes
app.use((req, res, next) => {
    res.status(404).send({ msg: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
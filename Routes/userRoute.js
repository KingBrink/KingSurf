import express from 'express';
import {
    getAllUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUserController
} from '../Controllers/userController.js';

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        console.log('User route hit: GET /users');
        next();
    }, getAllUsers);

router.post('/register', registerUser);

router.post('/login', loginUserController);

router.route('/:id')
    .patch((req, res, next) => {
        console.log(`PATCH /users/${req.params.id} hit`);
        next();
    }, updateUser)
    .get(getUser)
    .delete(deleteUser);

export { router };

import { 
    getUsers, 
    getUserByID, 
    addUser, 
    deleteUser as removeUser, 
    updateUser as editUser, 
    encryptPassword,  
    loginUser 
} from '../Model/db.js';

import { generateJWT } from '../Middleware/verifyJwt.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    console.log('Controller: getAllUsers executed');
    try {
        const users = await getUsers(req.body.user_profile);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error.message);
        res.status(500).json({ msg: "Server error. Unable to retrieve users." });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await getUserByID(+req.params.user_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided user_id" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error. Unable to retrieve user." });
    }
};

const registerUser = async (req, res) => {
    try {
        const { user_profile, user_email, user_password, user_role, user_image } = req.body;

        const encryptedPassword = await encryptPassword(user_password);
        await addUser({ 
            user_profile, 
            user_email, 
            user_password: encryptedPassword, 
            user_role, 
            user_image 
        });

        const token = generateJWT({ user_profile, user_email, user_role }); 
        res.status(201).json({ msg: 'Registration successful', token });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ msg: "Unable to register user. Please try again later." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { user_profile, user_email, password, user_role } = req.body;
        const user_id = +req.params.user_id; 
        
        console.log('Update request for user_id:', user_id); 

        const user = await getUserByID(user_id);
        if (!user) {
            console.log('User not found with user_id:', user_id); 
            return res.status(404).json({ msg: "User not found with the provided user_id" });
        }

        const updatedUser = {
            user_profile: user_profile || user.user_profile,
            user_email: user_email || user.user_email,
            user_password: password ? await encryptPassword(password) : user.user_password,
            user_role: user_role || user.user_role,
        };

        console.log('Updated user data:', updatedUser); 

        await editUser(updatedUser.user_profile, updatedUser.user_email, updatedUser.user_password, updatedUser.user_role, user.user_image, user_id);
        res.status(200).json({ msg: 'User successfully updated' });
    } catch (error) {
        console.error('Error during user update:', error.message);
        res.status(500).json({ msg: "Unable to update user. Please try again later." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await getUserByID(+req.params.user_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided user_id" });
        }

        await removeUser(+req.params.user_id);
        res.status(200).json({ msg: 'User was successfully deleted' });
    } catch (error) {
        res.status(500).json({ msg: "Unable to delete user. Please try again later." });
    }
};

const loginUserController = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await loginUser(user_email, user_password);
        if (!user) {
            return res.status(403).json({ msg: "Invalid email or password" });
        }

        console.log("User object from loginUser:", user);

        const token = generateJWT({ user_id: user.user_id, user_email: user.user_email, user_role: user.user_role });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ msg: "Login failed. Please try again later." });
    }
};

export {
    getAllUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUserController
};

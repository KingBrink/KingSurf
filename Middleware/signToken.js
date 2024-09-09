import bcrypt from 'bcrypt';
import { generateJWT } from '../Middleware/verifyJwt.js'; // Ensure correct import
import jwt from 'jsonwebtoken';
import { checkUser, checkProfile } from '../Model/db.js'; // Assuming these functions are defined

const authenticate = async (req, res, next) => {
    const { user_email, user_password } = req.body;

    console.log("Starting authentication process...");

    try {
        const hashedPassw = await checkUser(user_email);
        console.log(`Fetched hashed password for ${user_email}: ${hashedPassw}`);

        if (!hashedPassw) {
            console.log("User not found.");
            return res.status(401).send({ msg: 'User not found' });
        }

        const validUserIsLoggedIn = await checkProfile(user_email);
        console.log("User profile details:", validUserIsLoggedIn);

        const result = await bcrypt.compare(user_password, hashedPassw);
        console.log(`Password comparison result for ${user_email}: ${result}`);

        if (result) {
            const user_role = validUserIsLoggedIn.user_role;
            const user_id = validUserIsLoggedIn.user_id;
            const user_profile = validUserIsLoggedIn.user_profile;

            if (!user_id) {
                console.log("user_id is missing in user profile");
                return res.status(400).send({ msg: "user_id is missing in user profile" });
            }

            console.log("Generating JWT with user_id:", user_id);
            const token = generateJWT({ user_email, user_role, user_id }); // Generate JWT with user_id
            const refreshToken = jwt.sign({ user_email, user_role, user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

            console.log(`Generated JWT for ${user_email}:`, token);
            console.log(`Generated refresh token for ${user_email}:`, refreshToken);

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 86400000 });

            return res.send({
                token,
                refreshToken,
                role: user_role,
                email: user_email,
                name: user_profile,
                isLogged: validUserIsLoggedIn,
                msg: 'You are logged in'
            });
        } else {
            console.log("Password does not match.");
            return res.status(401).send({ msg: 'Password does not match' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).send({ msg: 'Internal server error' });
    }
};

export default authenticate;

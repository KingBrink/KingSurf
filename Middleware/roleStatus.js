// Middleware to check if the user's role is 'Admin'
const isRoleEqualToAdmin = (req, res, next) => {
    const { user_id, user_role } = req.user; // Fetch user_id and user_role from req.user

    if (!user_id) {
        console.log("UserID is missing in req.user");
        return res.status(400).send({ msg: 'UserID is missing' });
    }

    console.log("Verifying role for user with ID:", user_id, "and role:", user_role);

    if (user_role && user_role.toLowerCase() === 'admin') {
        console.log("User is an Admin. Proceeding...");
        next(); // Allow the request to proceed
    } else {
        console.log("Access denied for user role:", user_role);
        return res.status(403).json({ msg: 'Forbidden: Admin access required' });
    }
};

export default isRoleEqualToAdmin;

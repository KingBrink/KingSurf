// Middleware to check if the user's role is 'Admin'
const isRoleEqualToAdmin = (req, res, next) => {
    const { user_id, user_role } = req.user;

    if (!user_id || !user_role) {
        console.log("UserID or user_role is missing in req.user");
        return res.status(400).json({ msg: 'UserID or role is missing' });
    }

    if (user_role.toLowerCase() !== 'admin') {
        console.log("Access denied for user role:", user_role);
        return res.status(403).json({ msg: 'Admin access required' });
    }

    next();
};


export default isRoleEqualToAdmin;

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        // Step 1 - get token from request headers
        const token = req.headers.authorization;

        // Step 2 - check if token exists
        if (!token) {
            return res.json({ message: "No token, please login first" });
        }

        // Step 3 - verify token is genuine
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Step 4 - attach user info to request
        req.userId = decoded.userId;

        // Step 5 - move on to the actual route
        next();

    } catch (error) {
        res.json({ message: "Invalid token, please login again" });
    }
};

module.exports = protect;
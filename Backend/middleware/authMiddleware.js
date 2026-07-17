const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(400).json({
            message: "Token not present please login"
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error in middleware",
            error: error.message 
        });
    }
}

module.exports = { authUser };

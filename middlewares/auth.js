const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

function auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token available, authorization denied!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            console.log("No User Found");
        }

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
}

module.exports = auth;
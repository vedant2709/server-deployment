// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;

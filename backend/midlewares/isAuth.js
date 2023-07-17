const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({message: "invalid or expired token"});
  try {
    const info = jwt.verify(token.split(" ")[1], process.env.AUTH_SECRET);
    req.user_id = info.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token or expired" });
  }
};

module.exports = isAuth;

const jwt = require("jsonwebtoken");

const JWT_KEY = "jwt-key";

const verifyJWT = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send("Sorry. No Token Available");
  }
  try {
    const payload = jwt.verify(token, JWT_KEY);
    if (!payload) {
        return res.status(403).send("Sorry not verified")
    }
    const user = await User.findById(verified.id);
    if (!user) {
        return res.status(403).send("No User Found")
    }
    return res.json(true);
  } catch (err) {
    return res.status(401).send("Sorry. Wrong Token");
  }
};

const getNewToken = (req, res) => {
    
}

module.exports = verifyToken;

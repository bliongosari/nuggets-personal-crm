const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: function (req, res, next) {
    let tokenPassed =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (tokenPassed) {
      const token = tokenPassed.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token invalid" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: "No Token" });
    }
  },
  generateToken: function (payload) {
    const token = jwt.sign({ id: payload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  },
};

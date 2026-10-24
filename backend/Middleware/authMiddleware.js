const jwt = require("jsonwebtoken");

const authToken = (role) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json("No Token Providedd");
      }
      console.log(authHeader);

      const spilttedToken = authHeader.split(" ")[1];

      if (!spilttedToken) {
        return res.status(400).json("Invalid Token");
      }
      console.log(spilttedToken);

      const decoded = jwt.verify(spilttedToken, process.env.SECRET_KEY);

      if (!role.includes(decoded.role)) {
        return res.status(400).json({ message: "You Are Not Authorized" });
      }
      console.log(decoded);
      console.log(decoded.role);
      //
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  };
};

module.exports = authToken;

const jwt = require("jsonwebtoken");
const User = require("../module&schema/module.schema");

const verifiedToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401).json({ message: "Token Missing" });
    }
    const token = authHeaders.split(" ")[1];   

  jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
    if (err) return res.status(403).json({ message: "Password Expired" });
    try {
      const user = await User.find({ _id: decode.id });
      if (!user) return res.status(404).json({ message: "User Not Found" });
      req.user = user[0];
      next();
    } catch (err) {
      console.log(err.message);
    }
  });
};

module.exports = verifiedToken;

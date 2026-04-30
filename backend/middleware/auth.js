const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ msg: "No token" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    console.log("TOKEN RECEIVED:", token);
console.log("JWT SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err){
      console.log("JWT ERROR:", err.message);
  res.status(401).json({ msg: "Invalid token" });
}
};
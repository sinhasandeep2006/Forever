import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
  
  if (!token) {
    return res.json({ message: "Not authorized. Please log in again." });
  }
  
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId =token_decode.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};
export default authUser
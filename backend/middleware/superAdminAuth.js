// middlewares/superAdminAuth.ts
import jwt from "jsonwebtoken";

 const superAdminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }

  req.user = decoded;
  next();
};
export default superAdminAuth;
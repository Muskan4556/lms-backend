import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, envConfig.jwt_secret_key);

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

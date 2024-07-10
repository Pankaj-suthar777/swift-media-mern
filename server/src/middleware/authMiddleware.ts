const jwt = require("jsonwebtoken");
import { RequestHandler } from "express";
export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(409).json({ error: "Please Login First" });
  } else {
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);

      req.user = req.user || {};

      req.user.role = decodeToken.role;
      req.user.id = decodeToken.id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(409).json({ error: "Please Login" });
    }
  }
};

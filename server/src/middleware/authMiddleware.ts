// const jwt = require("jsonwebtoken");
// import { RequestHandler } from "express";
// export const authMiddleware: RequestHandler = async (req, res, next) => {
//   const { authorization } = req.headers;
//   const token = authorization?.split("Bearer ")[1];

//   if (!token) {
//     return res.status(409).json({ error: "Please Login First" });
//   } else {
//     try {
//       const decodeToken = await jwt.verify(token, process.env.SECRET);

//       req.user as User = req.user as User || {};

//       req.user as User.role = decodeToken.role;
//       req.user as User.id = decodeToken.id;
//       req.user as User.name = decodeToken.name;
//       req.user as User.avatar = decodeToken.avatar;
//       req.user as User.backgroundImage = decodeToken.backgroundImage;

//       next();
//     } catch (error) {
//       console.log(error);
//       return res.status(409).json({ error: "Please Login" });
//     }
//   }
// };
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../custom";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Please login first" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET!) as {
      id: string;
      name: string;
      role: string;
      avatar?: string;
      email:string;
      backgroundImage?: string;
    };

    // Initialize user object with proper typing
    req.user = {
      id: decodeToken.id,
      name: decodeToken.name,
      email: decodeToken.email,
      role: decodeToken.role,
      avatar: decodeToken.avatar,
      backgroundImage: decodeToken.backgroundImage
    } ;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
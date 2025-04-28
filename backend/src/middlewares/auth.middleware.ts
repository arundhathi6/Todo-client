import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isBlacklisted } from "../utils/blacklist";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    // Check if token is blacklisted (optional)
    if (isBlacklisted(token)) {
      res.status(401).json({ message: "Token is revoked" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

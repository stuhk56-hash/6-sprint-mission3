import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";
import prisma from "../lib/prisma-client.js";
import { ACCESS_TOKEN_COOKIE_NAME } from "../constants/index.js";

export interface AuthRequest extends Omit<Request, "user"> {
  user?: {
    id: number;
    email: string;
    nickname: string;
  };
}

export default function authenticate() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = verifyAccessToken(accessToken);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

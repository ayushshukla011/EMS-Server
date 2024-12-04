import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/http";
import prisma from "../database/index";

enum UserRole {
  // FACULTY = "faculty",
  CLUB = "club",
}

// Middleware to authenticate bearer token from request headers.

export const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.sendStatus(401).json({
      errors: ["Token not found"],
      data: {},
    });
  }

  // Verify the token using the provided secret
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("Failed to authenticate token:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    // Attach the decoded payload to the request object
    req.user = decoded as IUser;
    next();
  });
};

// Middleware to check if the user is a valid User.

export const isUserValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as IUser;
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
      select: { role: true, customerId: true },
    });
    if (!user) {
      return res.status(403).json({
        errors: ["Forbidden"],
        data: {},
      });
    }
    const userId = id;
    const currentPermission = user.role.permissions;
    const customerId = user.customerId;
    req.body = { ...req.body, userId, customerId, currentPermission };

    next();
  } catch (error) {
    console.log("Failed to check if user is valid", {
      id,
      error,
    });
    return res.status(500).json({
      errors: ["Internal server error"],
      data: {},
    });
  }
};

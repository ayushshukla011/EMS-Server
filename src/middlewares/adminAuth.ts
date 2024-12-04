import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/http";
import prisma from "../database/index";

enum AdminRole {
	ADMIN = "admin",
}

/**
 * Middleware to authenticate bearer token from request headers.
 * Decodes the token using the provided secret and attaches the decoded payload to the request object.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function.
 * @returns If authentication fails, sends an HTTP status code 401 or 403. Otherwise, proceeds to the next middleware.
 */
export const isAdminAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	
	// Check if token exists
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	// Verify the token using the provided secret
	jwt.verify(token, process.env.Admin_JWT_SECRET as string, (err:any, decoded:any) => {
		if (err) {
			console.error("Failed to authenticate token:", err);
			if (err.name === "TokenExpiredError") {
				return res.status(401).json({ error: "Token expired" });
			}
			return res.status(403).json({ error: "Failed to authenticate token" });
		}

		// Attach the decoded payload to the request object
		req.user = decoded ;
		next();
	});
};


export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.user as IUser;
	try {
		const findRole = await prisma.admin.findFirst({
			where: { id: id },
			select: { role: true },
		});
		if (!findRole) {
			return res.status(403).json({
				errors: ["Forbidden"],
				data: {},
			});
		}
		if (findRole.role !== AdminRole.ADMIN) {
			return res.status(403).json({
				errors: ["Forbidden"],
				data: {},
			});
		}
		next();
	} catch (error) {
		console.log("Failed to check if user is admin", {
			id,
			error,
		});
		return res.status(500).json({
			errors: ["Internal server error"],
			data: {},
		});
	}
};

export const isAdminValid = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.user as IUser;
	try {
		const admin = await prisma.admin.findFirst({
			where: { id: id },
		});
		if (!admin) {
			return res.status(403).json({
				errors: ["Forbidden"],
				data: {},
			});
		}

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

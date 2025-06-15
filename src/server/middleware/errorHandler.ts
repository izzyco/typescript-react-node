import { Request, Response, NextFunction } from "express";
import { config } from "../config";

export interface AppError extends Error {
	statusCode?: number;
	isOperational?: boolean;
}

export const errorHandler = (
	err: AppError,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	// Log error in development
	if (config.isDevelopment) {
		console.error("Error:", err);
	}

	// Send error response
	res.status(statusCode).json({
		error: {
			message,
			...(config.isDevelopment && { stack: err.stack }),
		},
	});
};

export const notFoundHandler = (
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	res.status(404).json({
		error: {
			message: "Route not found",
		},
	});
};
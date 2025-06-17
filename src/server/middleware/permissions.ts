import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
	user?: {
		id: string;
		role: string;
		permissions: string[];
	};
}

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
	GUEST = "guest",
}

export enum Permission {
	READ_USERS = "read:users",
	WRITE_USERS = "write:users",
	DELETE_USERS = "delete:users",
	READ_SYSTEM = "read:system",
	WRITE_SYSTEM = "write:system",
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
	[UserRole.ADMIN]: [
		Permission.READ_USERS,
		Permission.WRITE_USERS,
		Permission.DELETE_USERS,
		Permission.READ_SYSTEM,
		Permission.WRITE_SYSTEM,
	],
	[UserRole.USER]: [Permission.READ_USERS, Permission.READ_SYSTEM],
	[UserRole.GUEST]: [Permission.READ_SYSTEM],
};

export const mockAuthMiddleware = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void => {
	// Mock user data - in a real app, this would come from JWT token or session
	const mockUser = {
		id: "user123",
		role: UserRole.USER,
		permissions: ROLE_PERMISSIONS[UserRole.USER],
	};

	req.user = mockUser;
	next();
};

export const requirePermission = (requiredPermission: Permission) => {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
		if (!req.user) {
			res.status(401).json({
				error: {
					message: "Authentication required",
				},
			});
			return;
		}

		const hasPermission = req.user.permissions.includes(requiredPermission);

		if (!hasPermission) {
			res.status(403).json({
				error: {
					message: "Insufficient permissions",
					required: requiredPermission,
					userRole: req.user.role,
				},
			});
			return;
		}

		next();
	};
};

export const requireRole = (requiredRole: UserRole | UserRole[]) => {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
		if (!req.user) {
			res.status(401).json({
				error: {
					message: "Authentication required",
				},
			});
			return;
		}

		const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
		const hasRole = allowedRoles.includes(req.user.role as UserRole);

		if (!hasRole) {
			res.status(403).json({
				error: {
					message: "Insufficient role",
					required: allowedRoles,
					userRole: req.user.role,
				},
			});
			return;
		}

		next();
	};
};
import { Router } from "express";
import * as os from "os";
import {
	mockAuthMiddleware,
	requirePermission,
	requireRole,
	Permission,
	UserRole,
	AuthenticatedRequest,
} from "../middleware/permissions";

const router = Router();

// GET /api/getUsername - Public endpoint
router.get("/getUsername", (_req, res) => {
	try {
		const username = os.userInfo().username;
		res.json({ username });
	} catch (error) {
		res.status(500).json({
			error: {
				message: "Failed to get username",
			},
		});
	}
});

// GET /api/searchUser - Public endpoint
router.get("/users/search", (req, res) => {
	const { query } = req;
	const username =
		typeof query.username === "string" ? query.username : undefined;
	const email = typeof query.email === "string" ? query.email : undefined;

	try {
		// Mock search results
		const mockResults = [
			{ id: "1", name: "John Doe", email: "john@example.com" },
			{ id: "2", name: "Jane Admin", email: "jane@example.com" },
		].filter(user => 
			(!username || user.name.toLowerCase().includes(username.toLowerCase())) &&
			(!email || user.email.toLowerCase().includes(email.toLowerCase()))
		);

		res.json({
			query: { username, email },
			results: mockResults,
			total: mockResults.length,
		});
	} catch (error) {
		res.status(500).json({
			error: {
				message: "Failed to search users",
			},
		});
	}
});

// GET /api/users - Requires user read permission
router.get(
	"/users",
	mockAuthMiddleware,
	requirePermission(Permission.READ_USERS),
	(req: AuthenticatedRequest, res) => {
		const mockUsers = [
			{ id: "1", name: "John Doe", role: UserRole.USER },
			{ id: "2", name: "Jane Admin", role: UserRole.ADMIN },
			{ id: "3", name: "Guest User", role: UserRole.GUEST },
		];

		res.json({
			users: mockUsers,
			requestedBy: req.user,
		});
	}
);

// DELETE /api/users/:id - Requires admin role
router.delete(
	"/users/:id",
	mockAuthMiddleware,
	requireRole(UserRole.ADMIN),
	(req: AuthenticatedRequest, res) => {
		const userId = req.params.id;

		res.json({
			message: `User ${userId} would be deleted`,
			deletedBy: req.user,
		});
	}
);

// Health check endpoint
router.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

export default router;

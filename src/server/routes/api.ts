import { Router } from "express";
import * as os from "os";

const router = Router();

// GET /api/getUsername
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

// Health check endpoint
router.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

export default router;
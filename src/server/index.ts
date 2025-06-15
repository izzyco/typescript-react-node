import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import * as path from "path";

import { config } from "./config";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import apiRoutes from "./routes/api";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Performance middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", apiRoutes);

// Serve React static assets in production
if (config.isProduction) {
	app.use(
		express.static(path.join(__dirname, "../"), {
			maxAge: "1d",
			etag: false,
		})
	);

	// Catch-all handler: send back React's index.html file for client-side routing
	app.get("*", (_req, res) => {
		res.sendFile(path.join(__dirname, "../index.html"));
	});
} else {
	app.use(express.static("dist"));
}

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
	console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
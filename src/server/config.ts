// Server configuration with validation
export interface Config {
	port: number;
	nodeEnv: string;
	isProduction: boolean;
	isDevelopment: boolean;
}

export const config: Config = {
	port: parseInt(process.env.PORT || "3002", 10),
	nodeEnv: process.env.NODE_ENV || "development",
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV !== "production",
};

// Validate configuration
if (isNaN(config.port) || config.port < 1 || config.port > 65535) {
	throw new Error(`Invalid port: ${process.env.PORT}`);
}
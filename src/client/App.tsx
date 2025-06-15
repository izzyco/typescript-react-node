import { useEffect, useState } from "react";
import "./app.css";
import { apiClient } from "./client";

export default function App(): JSX.Element {
	const [username, setUsername] = useState<string | null>("Guest");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadUsername();
	}, []);

	const loadUsername = async () => {
		try {
			setLoading(true);
			setError(null);
			const user = await apiClient.getUsername();
			setUsername(user.username);
		} catch (error) {
			console.error("Failed to load username:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to load username";

			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="app">
				<div className="content">
					<h1>Loading...</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
			<div className="content">
				<h1>Hello{username ? ` ${username}` : " Guest"}!</h1>
				{error && <p className="error">Error: {error}</p>}
			</div>
		</div>
	);
}

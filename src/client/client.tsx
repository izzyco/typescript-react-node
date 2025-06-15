// API Client - Centralized fetch calls for the application

export interface User {
	username: string;
}

export interface ApiError {
	message: string;
	status?: number;
}

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = "") {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		const config: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				throw new ApiError({
					message: `HTTP ${response.status}: ${response.statusText}`,
					status: response.status,
				});
			}

			return await response.json();
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			// Network or other errors
			throw new ApiError({
				message:
					error instanceof Error
						? error.message
						: "Unknown error occurred",
			});
		}
	}

	// User API methods
	async getUsername(): Promise<User> {
		return this.request<User>("/api/getUsername");
	}

	// Future API methods can be added here
	// async createUser(userData: CreateUserRequest): Promise<User> {
	//   return this.request<User>('/api/users', {
	//     method: 'POST',
	//     body: JSON.stringify(userData),
	//   });
	// }

	// async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
	//   return this.request<User>(`/api/users/${id}`, {
	//     method: 'PUT',
	//     body: JSON.stringify(userData),
	//   });
	// }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export the class for testing or custom instances
export default ApiClient;

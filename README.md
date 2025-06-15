# Modern Full-Stack React TypeScript Boilerplate

A production-ready boilerplate for building full-stack web applications with React 18, TypeScript, Vite, Express, and modern tooling.

## 🚀 Features

### Frontend
- **React 18** with modern hooks and concurrent features
- **TypeScript** with strict type checking
- **Vite** for lightning-fast development and builds
- **CSS** with responsive design patterns
- **Centralized API client** with error handling

### Backend
- **Express.js** with TypeScript
- **Modular architecture** with routes and middleware separation
- **Security middleware** (Helmet, CORS)
- **Performance optimization** (compression, caching)
- **Error handling** with proper HTTP status codes
- **Health check endpoint** for monitoring

### Development Experience
- **ESLint + Prettier** for code quality
- **Hot Module Replacement** with Vite
- **Type checking** across the entire stack
- **Environment configuration** management
- **Docker** and **Fly.io** deployment ready

## 📁 Project Structure

```
├── src/
│   ├── client/                 # Frontend React application
│   │   ├── App.tsx            # Main React component
│   │   ├── client.tsx         # API client with error handling
│   │   ├── index.tsx          # React entry point
│   │   └── app.css            # Styles
│   └── server/                # Backend Express application
│       ├── index.ts           # Main server file
│       ├── config.ts          # Configuration management
│       ├── routes/
│       │   └── api.ts         # API route handlers
│       └── middleware/
│           └── errorHandler.ts # Error handling middleware
├── dist/                      # Build output
├── public/                    # Static assets (if needed)
├── .env.example              # Environment variables template
├── Dockerfile                # Container configuration
├── fly.toml                  # Fly.io deployment config
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config (client)
├── tsconfig.server.json      # TypeScript config (server)
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
└── package.json              # Dependencies and scripts
```

## 🛠 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone or download this boilerplate**
   ```bash
   git clone <your-repo-url>
   cd simple-react-full-stack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment (optional)**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3002
   - API: http://localhost:3002/api

## 📜 Available Scripts

### Development
- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start only the Vite development server
- `npm run server` - Start only the Express server with nodemon

### Building
- `npm run build` - Build the client for production
- `npm run build:server` - Compile TypeScript server code
- `npm run build:all` - Build both client and server
- `npm run preview` - Preview the production build locally

### Production
- `npm start` - Build and start the production server
- `npm run start:prod` - Start the server in production mode

### Code Quality
- `npm run lint` - Lint and fix TypeScript files
- `npm run lint:check` - Check linting without fixing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changing
- `npm run type-check` - Type check client code
- `npm run type-check:server` - Type check server code

### Utilities
- `npm run clean` - Clean build artifacts and cache
- `npm test` - Run tests (placeholder)

## 🏗 Architecture Patterns

### API Client Pattern
The boilerplate includes a centralized API client (`src/client/client.tsx`) that:
- Handles all HTTP requests
- Provides consistent error handling
- Includes TypeScript interfaces for responses
- Supports easy extension for new endpoints

```typescript
// Usage example
import { apiClient } from './client';

const user = await apiClient.getUsername();
```

### Server Architecture
The server follows a modular pattern:
- **Routes**: API endpoints grouped by feature
- **Middleware**: Reusable request processing logic
- **Config**: Centralized configuration with validation
- **Error Handling**: Consistent error responses

### Environment Configuration
Configuration is managed through:
- `.env` files for environment-specific values
- `src/server/config.ts` for validation and defaults
- TypeScript interfaces for type safety

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Add your configuration as needed
DATABASE_URL=
API_BASE_URL=
JWT_SECRET=
```

### TypeScript Configuration
- `tsconfig.json` - Client and build tools (Vite)
- `tsconfig.server.json` - Server-specific settings

### Vite Configuration
Located in `vite.config.ts`:
- React plugin with fast refresh
- Proxy for API calls during development
- Production build optimization

## 🚀 Deployment

### Docker
Build and run with Docker:
```bash
docker build -t my-app .
docker run -p 8080:8080 my-app
```

### Fly.io
Deploy to Fly.io:
```bash
flyctl launch
flyctl deploy
```

### Manual Deployment
1. Build the application:
   ```bash
   npm run build:all
   ```

2. Set environment variables:
   ```bash
   export NODE_ENV=production
   export PORT=8080
   ```

3. Start the server:
   ```bash
   npm run start:prod
   ```

## 📚 API Documentation

### Health Check
- **GET** `/api/health` - Server health status

### User Endpoints
- **GET** `/api/getUsername` - Get current system username

### Error Responses
All errors follow this format:
```json
{
  "error": {
    "message": "Error description",
    "stack": "..." // Only in development
  }
}
```

## 🧪 Testing

This boilerplate is test-ready. Add your preferred testing framework:

### Frontend Testing
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Backend Testing
```bash
npm install --save-dev jest supertest @types/jest @types/supertest
```

## 🔄 Extending the Boilerplate

### Adding New API Endpoints

1. **Add route in `src/server/routes/api.ts`**:
   ```typescript
   router.get('/users', getUsersHandler);
   ```

2. **Add method to API client**:
   ```typescript
   async getUsers(): Promise<User[]> {
     return this.request<User[]>('/api/users');
   }
   ```

3. **Use in React components**:
   ```typescript
   const users = await apiClient.getUsers();
   ```

### Adding Database Support

1. Install your preferred ORM/database client
2. Add database configuration to `src/server/config.ts`
3. Create database connection in `src/server/database/`
4. Add database middleware to `src/server/index.ts`

### Adding Authentication

1. Install authentication libraries (JWT, Passport, etc.)
2. Add auth middleware to `src/server/middleware/`
3. Protect routes with authentication
4. Add auth state management to React client

## 🛡 Security Considerations

The boilerplate includes basic security measures:
- **Helmet.js** for security headers
- **CORS** protection
- **Request size limits**
- **Input validation** (add as needed)

For production, consider adding:
- Rate limiting
- Authentication and authorization
- Input sanitization
- Logging and monitoring
- HTTPS enforcement

## 📦 Dependencies

### Production Dependencies
- `react` & `react-dom` - Frontend framework
- `express` - Backend framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `compression` - Response compression

### Development Dependencies
- `typescript` - Type checking
- `vite` - Build tool
- `eslint` & `prettier` - Code quality
- `nodemon` & `ts-node` - Development servers
- `concurrently` - Run multiple scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TypeScript team for type safety
- All open source contributors

---

**Happy coding! 🎉**

For questions or issues, please check the documentation or create an issue in the repository.
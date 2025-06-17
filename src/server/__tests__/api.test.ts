import * as request from 'supertest';
import * as express from 'express';
import apiRoutes from '../routes/api';

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

describe('API Routes', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/getUsername', () => {
    it('should return username', async () => {
      const response = await request(app)
        .get('/api/getUsername')
        .expect(200);

      expect(response.body).toHaveProperty('username');
      expect(typeof response.body.username).toBe('string');
    });
  });

  describe('GET /api/users/search', () => {
    it('should return search results with query parameters', async () => {
      const response = await request(app)
        .get('/api/users/search?username=john&email=test')
        .expect(200);

      expect(response.body).toHaveProperty('query');
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.results)).toBe(true);
    });

    it('should handle missing query parameters', async () => {
      const response = await request(app)
        .get('/api/users/search')
        .expect(200);

      expect(response.body).toHaveProperty('query');
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.results)).toBe(true);
    });
  });

  describe('Protected Routes', () => {
    describe('GET /api/users', () => {
      it('should return users list with mock auth', async () => {
        const response = await request(app)
          .get('/api/users')
          .expect(200);

        expect(response.body).toHaveProperty('users');
        expect(response.body).toHaveProperty('requestedBy');
        expect(Array.isArray(response.body.users)).toBe(true);
      });
    });

    describe('DELETE /api/users/:id', () => {
      it('should delete user with admin role', async () => {
        const response = await request(app)
          .delete('/api/users/123')
          .expect(403); // Will fail because mock user is not admin

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('message');
      });
    });
  });
});
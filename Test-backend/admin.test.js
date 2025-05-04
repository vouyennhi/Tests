process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/admin', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/admin');
    expect(response.statusCode).toBe(200);
  });

  test('should return admin data (array or object)', async () => {
    const response = await request(app).get('/api/admin');

    // Nếu trả về mảng:
    // expect(Array.isArray(response.body)).toBe(true);

    // Nếu trả về object:
    expect(typeof response.body).toBe('object');

    // Kiểm tra có trường cụ thể không (ví dụ: name, email...)
    expect(response.body).toHaveProperty('name'); // tùy vào API thực tế
  });
});

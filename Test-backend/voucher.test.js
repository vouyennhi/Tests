process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/voucher', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/voucher');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of vouchers', async () => {
    const response = await request(app).get('/api/voucher');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

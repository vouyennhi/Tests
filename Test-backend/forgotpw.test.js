process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('POST /api/forgotpw', () => {
  test('should send recovery email successfully', async () => {
    const response = await request(app)
      .post('/api/forgotpw')
      .send({ email: "user@example.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Email khôi phục đã được gửi');
  });

  test('should return 400 if missing email', async () => {
    const response = await request(app)
      .post('/api/forgotpw')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Thiếu email');
  });

  test('should return 404 if email not found', async () => {
    const response = await request(app)
      .post('/api/forgotpw')
      .send({ email: "notfound@example.com" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Email không tồn tại');
  });
});

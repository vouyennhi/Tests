process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('API /api/notification', () => {
  test('GET should return 200 and array of notifications', async () => {
    const res = await request(app).get('/api/notification');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST should create new notification', async () => {
    const newNotify = { message: "Test notify", type: "info" };
    const res = await request(app).post('/api/notification').send(newNotify);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.message).toBe(newNotify.message);
  });
});

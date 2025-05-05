process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('API /api/pay', () => {
  test('GET should return status 200 and an array', async () => {
    const res = await request(app).get('/api/pay');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST should create a new payment', async () => {
    const newPay = { method: "ZaloPay", amount: 200000, status: "processing" };
    const res = await request(app).post('/api/pay').send(newPay);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.method).toBe(newPay.method);
    expect(res.body.amount).toBe(newPay.amount);
  });

  test('DELETE should remove a payment by ID', async () => {
    const res = await request(app).delete('/api/pay/p1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 'p1');
  });

  test('DELETE with invalid ID should return 404', async () => {
    const res = await request(app).delete('/api/pay/invalid-id');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Payment not found');
  });
});

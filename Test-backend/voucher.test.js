process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app'); // Sửa đường dẫn nếu khác

describe('Voucher API', () => {
  let createdVoucherId;

  test('GET /api/voucher should return status 200', async () => {
    const res = await request(app).get('/api/voucher');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/voucher should create a new voucher', async () => {
    const newVoucher = { code: "NEW2025", discount: 15 };
    const res = await request(app).post('/api/voucher').send(newVoucher);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.code).toBe("NEW2025");
    createdVoucherId = res.body.id;
  });

  test('DELETE /api/voucher/:id should delete the voucher', async () => {
    const res = await request(app).delete(`/api/voucher/${createdVoucherId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdVoucherId);
  });
});

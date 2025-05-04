process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../../Distenda-backend/app'); 

// Nhóm các test liên quan đến /api/voucher
describe('GET /api/voucher', () => {

  // Một test case: kiểm tra response trả về status 200 (OK)
  test('should return status 200', async () => {
    const response = await request(app).get('/api/voucher');

    // Mong muốn kết quả trả về status HTTP 200
    expect(response.statusCode).toBe(200);
  });

  // Dữ liệu trả về phải là mảng (danh sách voucher)
  test('should return an array of vouchers', async () => {
    const response = await request(app).get('/api/voucher');

    // 7. Mong muốn kiểu dữ liệu trả về là mảng
    expect(Array.isArray(response.body)).toBe(true);
  });
});

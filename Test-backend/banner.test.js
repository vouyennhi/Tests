process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/banner', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/banner');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of banners', async () => {
    const response = await request(app).get('/api/banner');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('image');
  });
});

describe('POST /api/banner/create', () => {
  test('should create banner successfully', async () => {
    const newBanner = {
      title: "Mừng khai giảng",
      image: "banner3.jpg"
    };

    const response = await request(app)
      .post('/api/banner/create')
      .send(newBanner);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Banner created successfully');
    expect(response.body.banner).toMatchObject(newBanner);
  });
});

describe('DELETE /api/banner/:id', () => {
  test('should delete banner successfully', async () => {
    const response = await request(app).delete('/api/banner/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Đã xóa');
    expect(response.body.banner).toHaveProperty('id', '2');
  });

  test('should return 404 if banner not found', async () => {
    const response = await request(app).delete('/api/banner/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Banner không tồn tại');
  });
});

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/category', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/category');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of categories', async () => {
    const response = await request(app).get('/api/category');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('name');
  });
});

describe('POST /api/category/create', () => {
  test('should create category successfully', async () => {
    const newCategory = { name: "Kinh doanh" };

    const response = await request(app)
      .post('/api/category/create')
      .send(newCategory);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Category created successfully');
    expect(response.body.category).toMatchObject(newCategory);
  });

  test('should return 400 if missing name', async () => {
    const response = await request(app)
      .post('/api/category/create')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Thiếu tên category');
  });
});

describe('DELETE /api/category/:id', () => {
  test('should delete category successfully', async () => {
    const response = await request(app).delete('/api/category/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Đã xóa');
    expect(response.body.category).toHaveProperty('id', '2');
  });

  test('should return 404 if category not found', async () => {
    const response = await request(app).delete('/api/category/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Category không tồn tại');
  });
});

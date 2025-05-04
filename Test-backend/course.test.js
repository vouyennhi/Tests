process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/course', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/course');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of courses', async () => {
    const response = await request(app).get('/api/course');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('price');
  });
});

describe('POST /api/course/create', () => {
  test('should create course successfully', async () => {
    const newCourse = {
      title: "Khóa học Node.js",
      description: "Backend thực chiến với Express",
      price: 600000
    };

    const response = await request(app)
      .post('/api/course/create')
      .send(newCourse);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Course created successfully');
    expect(response.body.course).toMatchObject(newCourse);
  });

  test('should return 400 if missing fields', async () => {
    const response = await request(app)
      .post('/api/course/create')
      .send({
        title: "Thiếu mô tả"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Thiếu thông tin khóa học');
  });
});

describe('DELETE /api/course/:id', () => {
  test('should delete course successfully', async () => {
    const response = await request(app).delete('/api/course/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Đã xóa');
    expect(response.body.course).toHaveProperty('id', '2');
  });

  test('should return 404 if course not found', async () => {
    const response = await request(app).delete('/api/course/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Course không tồn tại');
  });
});

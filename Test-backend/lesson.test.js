process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('API /api/lesson', () => {
  test('GET should return status 200 and an array', async () => {
    const res = await request(app).get('/api/lesson');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST should create a new lesson', async () => {
    const newLesson = { title: "Node.js nâng cao", duration: 45 };
    const res = await request(app).post('/api/lesson').send(newLesson);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newLesson.title);
    expect(res.body.duration).toBe(newLesson.duration);
  });

  test('DELETE should remove a lesson by ID', async () => {
    const res = await request(app).delete('/api/lesson/l1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 'l1');
  });

  test('DELETE with invalid ID should return 404', async () => {
    const res = await request(app).delete('/api/lesson/invalid-id');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Lesson not found');
  });
});

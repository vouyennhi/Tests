process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/exercise', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/exercise');
    expect(response.statusCode).toBe(200);
  });

  test('should return an array of exercises', async () => {
    const response = await request(app).get('/api/exercise');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('question');
    expect(response.body[0]).toHaveProperty('answer');
    expect(response.body[0]).toHaveProperty('level');
  });
});

describe('POST /api/exercise/create', () => {
  test('should create exercise successfully', async () => {
    const newExercise = {
      question: "10 / 2 = ?",
      answer: "5",
      level: "easy"
    };

    const response = await request(app)
      .post('/api/exercise/create')
      .send(newExercise);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Exercise created successfully');
    expect(response.body.exercise).toMatchObject(newExercise);
  });

  test('should return 400 if missing fields', async () => {
    const response = await request(app)
      .post('/api/exercise/create')
      .send({ question: "Thiếu answer" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Thiếu thông tin bài tập');
  });
});

describe('DELETE /api/exercise/:id', () => {
  test('should delete exercise successfully', async () => {
    const response = await request(app).delete('/api/exercise/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Đã xóa');
    expect(response.body.exercise).toHaveProperty('id', '2');
  });

  test('should return 404 if exercise not found', async () => {
    const response = await request(app).delete('/api/exercise/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Exercise không tồn tại');
  });
});

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/message', () => {
  test('should return status 200', async () => {
    const res = await request(app).get('/api/message');
    expect(res.statusCode).toBe(200);
  });

  test('should return an array of messages', async () => {
    const res = await request(app).get('/api/message');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('from');
    expect(res.body[0]).toHaveProperty('to');
    expect(res.body[0]).toHaveProperty('content');
  });
});

describe('POST /api/message', () => {
  test('should create a new message', async () => {
    const res = await request(app)
      .post('/api/message')
      .send({
        from: 'user3',
        to: 'teacher3',
        content: 'New question here.'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toBe('New question here.');
  });
});

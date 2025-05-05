process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/role', () => {
  test('should return status 200', async () => {
    const res = await request(app).get('/api/role');
    expect(res.statusCode).toBe(200);
  });

  test('should return an array of roles', async () => {
    const res = await request(app).get('/api/role');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('POST /api/role', () => {
  test('should create a new role', async () => {
    const res = await request(app)
      .post('/api/role')
      .send({ name: 'student' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('student');
  });
});

describe('DELETE /api/role/:id', () => {
  test('should delete a role by ID', async () => {
    const getRes = await request(app).get('/api/role');
    const roleIdToDelete = getRes.body[0].id;

    const res = await request(app).delete(`/api/role/${roleIdToDelete}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toBe(roleIdToDelete);
  });
});

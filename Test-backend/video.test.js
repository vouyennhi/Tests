process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('API /api/video', () => {
  test('GET should return 200 and array of videos', async () => {
    const res = await request(app).get('/api/video');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST should create new video', async () => {
    const newVideo = { title: "New Tutorial", url: "https://youtube.com/new" };
    const res = await request(app).post('/api/video').send(newVideo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newVideo.title);
  });

  test('DELETE should remove a video by ID', async () => {
    const res = await request(app).delete('/api/video/v1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 'v1');
  });

  test('DELETE invalid ID returns 404', async () => {
    const res = await request(app).delete('/api/video/invalid-id');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Video not found');
  });
});

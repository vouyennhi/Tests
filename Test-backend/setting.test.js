process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../Distenda-backend/app');

describe('GET /api/setting', () => {
  test('should return status 200', async () => {
    const res = await request(app).get('/api/setting');
    expect(res.statusCode).toBe(200);
  });

  test('should return an object with site settings', async () => {
    const res = await request(app).get('/api/setting');
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('siteName');
    expect(res.body).toHaveProperty('maintenanceMode');
  });
});

describe('POST /api/setting', () => {
  test('should update settings and return updated object', async () => {
    const newSettings = {
      siteName: "Distenda Test",
      maintenanceMode: false,
    };

    const res = await request(app)
      .post('/api/setting')
      .send(newSettings);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(newSettings);
  });
});

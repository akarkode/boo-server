const request = require('supertest');
const app = require('../app');
const { close } = require('../db/mongo');

let pid;

afterAll(async () => { await close(); });

describe('Profile API', () => {
  test('POST /api/profiles → create profile', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .send({ name: 'Elon Musk', bio: 'CEO of SpaceX' })
      .expect(201);
    pid = res.body._id;
    expect(res.body.name).toBe('Elon Musk');
  });

  test('GET /api/profiles/:id → get JSON', async () => {
    const res = await request(app).get(`/api/profiles/${pid}`).expect(200);
    expect(res.body._id).toBe(pid);
  });

  test('GET /profiles/:id → render HTML', async () => {
    const res = await request(app).get(`/profiles/${pid}`).expect(200);
    expect(res.text).toContain('Elon Musk');
  });
});

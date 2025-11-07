const request = require('supertest');
const app = require('../app');
const { close } = require('../db/mongo');

let uid;

afterAll(async () => { await close(); });

describe('User API', () => {
  test('POST /api/users → create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'James' })
      .expect(201);
    uid = res.body._id;
    expect(res.body.name).toBe('James');
  });

  test('GET /api/users → list users', async () => {
    const res = await request(app).get('/api/users').expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

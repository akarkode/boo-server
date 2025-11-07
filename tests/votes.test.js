const request = require('supertest');
const app = require('../app');
const { close } = require('../db/mongo');

let pid, uid;

afterAll(async () => { await close(); });

beforeAll(async () => {
  const p = await request(app).post('/api/profiles').send({ name: 'Vote Tester' });
  pid = p.body._id;
  const u = await request(app).post('/api/users').send({ name: 'Alex' });
  uid = u.body._id;
});

describe('Voting API', () => {
  test('POST /api/votes/:profileId → cast MBTI vote', async () => {
    const res = await request(app)
      .post(`/api/votes/${pid}`)
      .send({ userId: uid, system: 'mbti', value: 'INTP' })
      .expect(200);
    expect(res.body.ok).toBe(true);
  });

  test('POST /api/votes/:profileId → cast Enneagram vote', async () => {
    await request(app)
      .post(`/api/votes/${pid}`)
      .send({ userId: uid, system: 'enneagram', value: '5w6' })
      .expect(200);
  });

  test('POST /api/votes/:profileId → cast Zodiac vote', async () => {
    await request(app)
      .post(`/api/votes/${pid}`)
      .send({ userId: uid, system: 'zodiac', value: 'Cancer' })
      .expect(200);
  });

  test('GET /api/votes/:profileId → aggregated votes', async () => {
    const res = await request(app).get(`/api/votes/${pid}`).expect(200);
    expect(res.body.mbti.INTP).toBe(1);
    expect(res.body.enneagram['5w6']).toBe(1);
    expect(res.body.zodiac.Cancer).toBe(1);
  });

  test('POST /api/votes/:profileId → update MBTI vote', async () => {
    await request(app)
      .post(`/api/votes/${pid}`)
      .send({ userId: uid, system: 'mbti', value: 'ENTP' })
      .expect(200);
    const res = await request(app).get(`/api/votes/${pid}`).expect(200);
    expect(res.body.mbti.ENTP).toBe(1);
  });
});

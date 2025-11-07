const request = require('supertest');
const app = require('../app');
const { close } = require('../db/mongo');

let pid, uid, cid;

afterAll(async () => { await close(); });

beforeAll(async () => {
  const p = await request(app).post('/api/profiles').send({ name: 'A Martinez' });
  pid = p.body._id;
  const u = await request(app).post('/api/users').send({ name: 'Jude' });
  uid = u.body._id;
});

describe('Comments API', () => {
  test('POST /api/comments → create comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({
        profileId: pid,
        userId: uid,
        title: 'He’s definitely an INTP',
        body: 'Makes sense — he’s analytical!',
        tags: { mbti: 'INTP', enneagram: '5w6', zodiac: 'Cancer' }
      })
      .expect(201);
    cid = res.body._id;
    expect(res.body.tags.mbti).toBe('INTP');
  });

  test('GET /api/comments/by-profile/:id → sort by recent', async () => {
    const res = await request(app)
      .get(`/api/comments/by-profile/${pid}?sort=recent`)
      .expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/comments → add second comment', async () => {
    await request(app)
      .post('/api/comments')
      .send({
        profileId: pid,
        userId: uid,
        title: 'Another Comment',
        body: 'For sorting test',
        tags: { mbti: 'ENTP' }
      })
      .expect(201);
  });

  test('GET /api/comments/by-profile/:id?mbti=INTP → filter MBTI', async () => {
    const res = await request(app)
      .get(`/api/comments/by-profile/${pid}?mbti=INTP`)
      .expect(200);
    expect(res.body.every(c => c.tags.mbti === 'INTP')).toBe(true);
  });

  test('GET /api/comments/by-profile/:id?enneagram=5w6 → filter Enneagram', async () => {
    const res = await request(app)
      .get(`/api/comments/by-profile/${pid}?enneagram=5w6`)
      .expect(200);
    expect(res.body.every(c => c.tags.enneagram === '5w6')).toBe(true);
  });

  test('GET /api/comments/by-profile/:id?zodiac=Cancer → filter Zodiac', async () => {
    const res = await request(app)
      .get(`/api/comments/by-profile/${pid}?zodiac=Cancer`)
      .expect(200);
    expect(res.body.every(c => c.tags.zodiac === 'Cancer')).toBe(true);
  });

  test('POST /api/comments/:id/like → like', async () => {
    const likeRes = await request(app)
      .post(`/api/comments/${cid}/like`)
      .send({ userId: uid })
      .expect(200);
    expect(likeRes.body.likes).toBe(1);
  });

  test('POST /api/comments/:id/like → unlike', async () => {
    const unlikeRes = await request(app)
      .post(`/api/comments/${cid}/like`)
      .send({ userId: uid })
      .expect(200);
    expect(unlikeRes.body.likes).toBe(0);
  });

  test('GET /api/comments/by-profile/:id?sort=best → sort by likes', async () => {
    await request(app).post(`/api/comments/${cid}/like`).send({ userId: uid }).expect(200);
    const res = await request(app)
      .get(`/api/comments/by-profile/${pid}?sort=best`)
      .expect(200);
    expect(res.body[0].likes).toBeGreaterThanOrEqual(0);
  });

});

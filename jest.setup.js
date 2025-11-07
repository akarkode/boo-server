const { connect } = require('./db/mongo');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  const { close } = require('./db/mongo');
  await close();
});

process.env.NODE_ENV = 'test';
jest.setTimeout(20000);

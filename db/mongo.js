const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

async function connect() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, { dbName: 'boo_app' });
  return uri;
}

async function close() {
  try {
    if (mongoose.connection.readyState !== 1) return; // 0: disconnected, 1: connected
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongod) await mongod.stop();
    console.log('🧹 MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err.message);
  }
}


module.exports = { connect, close };

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;
// Setup an in memory mongo data base before all tests
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Delete everything in the DB
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Remove the DB connection and clean up memory after all tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

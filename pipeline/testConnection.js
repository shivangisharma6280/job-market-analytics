require('dotenv').config();
const { MongoClient } = require('mongodb');

const dns = require('dns');
dns.setServers(['0.0.0.0','8.8.8.8'])

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('jobmarket');
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB Atlas');

    const result = await db.collection('test').insertOne({ hello: 'world', createdAt: new Date() });
    console.log('Inserted test document:', result.insertedId.toString());

    await db.collection('test').deleteOne({ _id: result.insertedId });
    console.log('Cleaned up the test document');
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    await client.close();
  }
}

main();
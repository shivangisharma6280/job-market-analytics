require('dotenv').config();
const mongoose = require('mongoose');

const dns = require('dns')
dns.setServers(['0.0.0.0', '8.8.8.8'])

async function connectDb() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing in .env');
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'jobmarket' });
}
async function closeDb() { await mongoose.disconnect(); }

module.exports = { connectDb, closeDb };
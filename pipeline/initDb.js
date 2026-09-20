const { connectDb, closeDb } = require('./db');
const Posting = require('./models/Posting');
const DailyStat = require('./models/DailyStat');
const SkillDictionary = require('./models/SkillDictionary');
const FetchRun = require('./models/FetchRun');

const MODELS = [Posting, DailyStat, SkillDictionary, FetchRun];

async function main() {
  await connectDb();

  for (const M of MODELS) {
    await M.createCollection().catch(() => {});  // fine if it already exists
    await M.syncIndexes();                       // creates the indexes from the schema
    console.log('Ready:', M.collection.name);
  }

  // Upsert the same test posting twice: it should NOT create a duplicate
  const key = { source: 'adzuna', sourceId: 'test-123' };
  const firstSeen = new Date();
  for (let i = 1; i <= 2; i++) {
    const res = await Posting.updateOne(
      key,
      { $set: { title: 'Test Analyst', lastSeenAt: new Date() }, $setOnInsert: { firstSeenAt: firstSeen } },
      { upsert: true }
    );
    console.log(`Run ${i}: upserted=${res.upsertedCount}, modified=${res.modifiedCount}`);
  }
  console.log('Documents with this key:', await Posting.countDocuments(key));
  await Posting.deleteOne(key);

  for (const M of MODELS) {
    const idx = await M.collection.indexes();
    console.log(M.collection.name, '->', idx.map(i => i.name).join(', '));
  }
  await closeDb();
}

main().catch(err => { console.error('Failed:', err.message); process.exit(1); });
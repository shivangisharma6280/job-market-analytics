const mongoose = require('mongoose');
const { connectDb } = require('./db');
const Posting = require('./models/Posting');
const FetchRun = require('./models/FetchRun');
const { fetchPage, mapJob } = require('./fetchers/adzuna');

const ROLES = ['data analyst'];   // start with one, add more once it works
const PAGES = 1;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await connectDb();
  const startedAt = new Date();
  let fetched = 0, inserted = 0, updated = 0;
  const errorMessages = [];

  for (const role of ROLES) {
    for (let page = 1; page <= PAGES; page++) {
      await sleep(3000);   // stay under 25 calls a minute
      try {
        const jobs = (await fetchPage(role, page)).map(mapJob);
        if (jobs.length === 0) continue;
        fetched += jobs.length;

        const now = new Date();
        const res = await Posting.bulkWrite(
          jobs.map((p) => ({
            updateOne: {
              filter: { source: p.source, sourceId: p.sourceId },
              update: { $set: { ...p, lastSeenAt: now }, $setOnInsert: { firstSeenAt: now } },
              upsert: true,
            },
          }))
        );
        inserted += res.upsertedCount;
        updated += res.modifiedCount;
      } catch (err) {
        errorMessages.push(`${role} page ${page}: ${err.message}`);
      }
    }
  }

  await FetchRun.create({
    source: 'adzuna',
    startedAt,
    finishedAt: new Date(),
    fetched, inserted, updated, errorMessages,
    status: errorMessages.length === 0 ? 'ok' : fetched > 0 ? 'partial' : 'failed',
  });

  console.log({ fetched, inserted, updated, errors: errorMessages.length });
  await mongoose.disconnect();
}

main().catch((err) => { console.error('Failed:', err.message); process.exit(1); });
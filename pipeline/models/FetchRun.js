const { Schema, model } = require('mongoose');

const FetchRunSchema = new Schema({
  source: String,
  startedAt: Date,
  finishedAt: Date,
  fetched: Number,
  inserted: Number,
  updated: Number,
  errorMessages: [String],
  status: { type: String, enum: ['ok', 'partial', 'failed'] },
}, { collection: 'fetch_runs', versionKey: false });

module.exports = model('FetchRun', FetchRunSchema);
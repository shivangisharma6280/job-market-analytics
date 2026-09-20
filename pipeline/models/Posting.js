const { Schema, model } = require('mongoose');

const PostingSchema = new Schema({
  // where it came from
  source: { type: String, required: true, enum: ['adzuna', 'himalayas'] },
  sourceId: { type: String, required: true },
  url: String,

  // basics (cleaned on Day 6)
  title: { type: String, required: true },
  titleNorm: String,
  company: String,
  companyNorm: String,
  location: { display: String, country: String, area: [String] },
  workMode: { type: String, enum: ['onsite', 'hybrid', 'remote', 'unknown'], default: 'unknown' },
  employmentType: String,     // e.g. permanent / contract, if the source gives it
  sourceSeniority: String,    // only if the source gives it (check your Himalayas sample)

  // salary exactly as the source gave it (converted to LPA on Day 12)
  salary: {
    min: Number, max: Number, currency: String,
    period: { type: String, enum: ['year', 'month', 'unknown'], default: 'unknown' },
    isEstimate: Boolean,
  },
  salaryLPA: { min: Number, max: Number },

  // text
  description: String,
  descriptionIsSnippet: { type: Boolean, default: false },
  contentHash: String,

  // dates
  postedAt: Date,
  firstSeenAt: { type: Date, required: true },
  lastSeenAt: { type: Date, required: true },

  // filled by the extraction step (Days 8-11)
  extracted: {
    extractorVersion: String,
    extractedAt: Date,
    roleNorm: String,
    skills: [String],
    expMin: Number,
    expMax: Number,
    expLevel: { type: String, enum: ['fresher', 'junior', 'mid', 'senior', 'unknown'] },
    listedLevel: String,      // what the posting calls itself, e.g. "fresher"
  },

  // filled by the No-Cap Detector (Day 22)
  flags: { experienceMismatch: Boolean, capLevel: Number, isRepost: Boolean },

  // the original API response, so you can re-process later
  raw: Schema.Types.Mixed,
}, { versionKey: false });

PostingSchema.index({ source: 1, sourceId: 1 }, { unique: true });
PostingSchema.index({ contentHash: 1 });
PostingSchema.index({ 'extracted.roleNorm': 1, postedAt: -1 });
PostingSchema.index({ 'extracted.skills': 1 });
PostingSchema.index({ postedAt: -1 });

module.exports = model('Posting', PostingSchema);
const { Schema, model } = require('mongoose');

const DailyStatSchema = new Schema({
  date: { type: String, required: true },        // '2026-09-20'
  metric: { type: String, required: true },      // 'topSkills', 'hiringVolume', ...
  role: { type: String, default: 'all' },
  level: { type: String, default: 'all' },       // fresher / junior / mid / senior / all
  rangeDays: { type: Number, default: 90 },
  data: Schema.Types.Mixed,                      // the numbers a chart needs
  sampleSize: Number,
  computedAt: { type: Date, default: Date.now },
}, { collection: 'daily_stats', versionKey: false });

DailyStatSchema.index({ metric: 1, role: 1, level: 1, rangeDays: 1, date: -1 }, { unique: true });

module.exports = model('DailyStat', DailyStatSchema);
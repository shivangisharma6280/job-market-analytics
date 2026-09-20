const { Schema, model } = require('mongoose');

const SkillSchema = new Schema({
  canonical: { type: String, required: true, unique: true },   // 'React'
  aliases: [String],                                           // ['ReactJS', 'React.js']
  category: { type: String, enum: ['language', 'framework', 'cloud', 'database', 'tool', 'other'], default: 'other' },
  active: { type: Boolean, default: true },
  addedAt: { type: Date, default: Date.now },
}, { collection: 'skills_dictionary', versionKey: false });

module.exports = model('SkillDictionary', SkillSchema);
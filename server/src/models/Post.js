const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String }, // simple string for tests
    author: { type: String },   // tests just use fake IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);


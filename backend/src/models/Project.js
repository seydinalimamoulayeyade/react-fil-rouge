const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    libelle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    details: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);

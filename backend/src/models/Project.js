const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    libelle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    details: { type: String },
    technologies: [{ type: String, trim: true }],
    lienGithub: { type: String, trim: true },
    lienDemo: { type: String, trim: true },
    categorie: { type: String, trim: true },
    statut: { type: String, trim: true, default: 'En cours' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Project', projectSchema);

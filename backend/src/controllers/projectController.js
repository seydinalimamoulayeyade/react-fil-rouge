const mongoose = require('mongoose');
const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Identifiant de projet invalide' });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ message: 'Projet non trouvé' });
  }

  res.json(project);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  const saved = await project.save();
  res.status(201).json(saved);
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Identifiant de projet invalide' });
  }

  const project = await Project.findByIdAndUpdate(id, req.body, { new: true });

  if (!project) {
    return res.status(404).json({ message: 'Projet non trouvé' });
  }

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Identifiant de projet invalide' });
  }

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return res.status(404).json({ message: 'Projet non trouvé' });
  }

  res.json({ message: 'Projet supprimé' });
};

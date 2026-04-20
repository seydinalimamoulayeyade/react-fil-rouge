const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
  res.json(project);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  const saved = await project.save();
  res.status(201).json(saved);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
  res.json({ message: 'Projet supprimé' });
};

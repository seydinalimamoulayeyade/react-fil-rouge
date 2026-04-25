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
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const project = new Project({
      ...req.body,
      image: imagePath,
    });

    const saved = await project.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du projet' });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Identifiant de projet invalide' });
  }

  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour' });
  }
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

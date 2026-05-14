const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const protect = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', getProjects);
router.get('/:id', getProjectById);

router.post('/', protect, requireAdmin, upload.single('image'), createProject);
router.put('/:id', protect, requireAdmin, upload.single('image'), updateProject);
router.delete('/:id', protect, requireAdmin, deleteProject);

module.exports = router;

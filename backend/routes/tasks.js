// routes/tasks.js
const express = require('express');
const Task = require('../models/Task'); // Assuming you have a Task model
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected route example
router.get('/', authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});



module.exports = router;

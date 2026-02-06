const Task = require('../models/Task');
const User = require('../models/User');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, frequency, priority, assignedTo, dueDate, tags } = req.body;

    const task = new Task({
      title,
      description,
      frequency,
      priority,
      assignedTo,
      createdBy: req.userId,
      dueDate,
      tags: tags || [],
    });

    await task.save();
    await task.populate('assignedTo createdBy', 'name email picture');

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(400).json({ error: 'Failed to create task' });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, frequency, assignedTo } = req.query;
    let query = {};

    if (status) query.status = status;
    if (frequency) query.frequency = frequency;
    if (assignedTo) query.assignedTo = assignedTo;

    const tasks = await Task.find(query)
      .populate('assignedTo createdBy', 'name email picture')
      .sort({ createdAt: -1 });

    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(400).json({ error: 'Failed to fetch tasks' });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo createdBy', 'name email picture');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true, task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(400).json({ error: 'Failed to fetch task' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, dueDate, tags } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) {
      task.status = status;
      if (status === 'completed') task.completedAt = new Date();
      if (status === 'cancelled') task.cancelledAt = new Date();
    }
    if (priority) task.priority = priority;
    if (assignedTo) task.assignedTo = assignedTo;
    if (dueDate) task.dueDate = dueDate;
    if (tags) task.tags = tags;

    task.updatedAt = new Date();
    await task.save();
    await task.populate('assignedTo createdBy', 'name email picture');

    res.json({ success: true, task });
  } catch (error) {
    console.error('Task update error:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Task delete error:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};

// Get Task History (completed/cancelled tasks)
exports.getTaskHistory = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;
    let query = { status: { $in: ['completed', 'cancelled'] } };

    if (startDate || endDate) {
      query.updatedAt = {};
      if (startDate) query.updatedAt.$gte = new Date(startDate);
      if (endDate) query.updatedAt.$lte = new Date(endDate);
    }

    if (userId) query.assignedTo = userId;

    const tasks = await Task.find(query)
      .populate('assignedTo createdBy', 'name email picture')
      .sort({ updatedAt: -1 });

    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Task history error:', error);
    res.status(400).json({ error: 'Failed to fetch task history' });
  }
};

// Complete Task
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = 'completed';
    task.completedAt = new Date();
    task.updatedAt = new Date();

    await task.save();
    await task.populate('assignedTo createdBy', 'name email picture');

    res.json({ success: true, task });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(400).json({ error: 'Failed to complete task' });
  }
};

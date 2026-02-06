const User = require('../models/User');

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(400).json({ error: 'Failed to fetch users' });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(400).json({ error: 'Failed to fetch user' });
  }
};

// Update User Profile
exports.updateUser = async (req, res) => {
  try {
    const { name, department, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, department, role, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(400).json({ error: 'Failed to update user' });
  }
};

// Get Online Users
exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ isOnline: true }).select('name email picture department');
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get online users error:', error);
    res.status(400).json({ error: 'Failed to fetch online users' });
  }
};

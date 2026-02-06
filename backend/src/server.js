const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orgta');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Socket.IO Events
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('user_online', (userData) => {
    onlineUsers.set(socket.id, userData);
    io.emit('online_users', Array.from(onlineUsers.values()));
    socket.broadcast.emit('user_joined', userData);
  });

  socket.on('send_message', (message) => {
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    const userData = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    io.emit('online_users', Array.from(onlineUsers.values()));
    if (userData) {
      io.emit('user_left', userData);
    }
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('task_created', (task) => {
    io.emit('task_update', { action: 'created', task });
  });

  socket.on('task_updated', (task) => {
    io.emit('task_update', { action: 'updated', task });
  });

  socket.on('task_completed', (task) => {
    io.emit('task_update', { action: 'completed', task });
  });

  socket.on('task_deleted', (taskId) => {
    io.emit('task_update', { action: 'deleted', taskId });
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };

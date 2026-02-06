import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

let socket = null;

export const connectSocket = (userData) => {
  if (!socket) {
    socket = io(SOCKET_URL);
    socket.emit('user_online', userData);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const emitMessage = (message) => {
  if (socket) {
    socket.emit('send_message', message);
  }
};

export const emitTaskUpdate = (action, data) => {
  if (socket) {
    socket.emit(`task_${action}`, data);
  }
};

export const onMessage = (callback) => {
  if (socket) {
    socket.on('receive_message', callback);
  }
};

export const onTaskUpdate = (callback) => {
  if (socket) {
    socket.on('task_update', callback);
  }
};

export const onOnlineUsers = (callback) => {
  if (socket) {
    socket.on('online_users', callback);
  }
};

export const onUserJoined = (callback) => {
  if (socket) {
    socket.on('user_joined', callback);
  }
};

export const onUserLeft = (callback) => {
  if (socket) {
    socket.on('user_left', callback);
  }
};

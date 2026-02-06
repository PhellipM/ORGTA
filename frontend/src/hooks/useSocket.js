import { useEffect, useState } from 'react';
import { getSocket, onOnlineUsers, onUserJoined, onUserLeft, onMessage } from '../services/socket';

export function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    onOnlineUsers(setOnlineUsers);
    onUserJoined(() => {
      // Refetch online users when someone joins
    });
    onUserLeft(() => {
      // Refetch online users when someone leaves
    });
  }, []);

  return onlineUsers;
}

export function useChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  return { messages, setMessages };
}

export function useTaskUpdates() {
  const [updates, setUpdates] = useState(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('task_update', (update) => {
      setUpdates(update);
    });
  }, []);

  return updates;
}

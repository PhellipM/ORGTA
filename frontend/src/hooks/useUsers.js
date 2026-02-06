import { useState, useEffect } from 'react';
import { userService } from '../services/api';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers();
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const response = await userService.getOnlineUsers();
      setOnlineUsers(response.data.users);
    } catch (err) {
      console.error('Failed to fetch online users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOnlineUsers();
  }, []);

  return {
    users,
    onlineUsers,
    loading,
    error,
    fetchUsers,
    fetchOnlineUsers,
  };
}

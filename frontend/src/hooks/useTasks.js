import { useState } from 'react';
import { taskService } from '../services/api';
import { emitTaskUpdate } from '../services/socket';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getTasks(filters);
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data) => {
    try {
      setError(null);
      const response = await taskService.createTask(data);
      setTasks((prev) => [response.data.task, ...prev]);
      emitTaskUpdate('created', response.data.task);
      return response.data.task;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, data) => {
    try {
      setError(null);
      const response = await taskService.updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data.task : task))
      );
      emitTaskUpdate('updated', response.data.task);
      return response.data.task;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      throw err;
    }
  };

  const completeTask = async (id) => {
    try {
      setError(null);
      const response = await taskService.completeTask(id);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data.task : task))
      );
      emitTaskUpdate('completed', response.data.task);
      return response.data.task;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      emitTaskUpdate('deleted', id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      throw err;
    }
  };

  const fetchTaskHistory = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getTaskHistory(filters);
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch task history');
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    fetchTaskHistory,
  };
}

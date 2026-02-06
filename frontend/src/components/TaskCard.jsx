import { Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { pt } from 'date-fns/locale';

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' },
  in_progress: { label: 'Em Progresso', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
  completed: { label: 'Concluída', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
};

const frequencyConfig = {
  daily: { label: 'Diária', icon: '⟳' },
  monthly: { label: 'Mensal', icon: '📅' },
};

const priorityConfig = {
  low: { label: 'Baixa', color: 'text-gray-600 dark:text-gray-400' },
  medium: { label: 'Média', color: 'text-yellow-600 dark:text-yellow-400' },
  high: { label: 'Alta', color: 'text-red-600 dark:text-red-400' },
};

export default function TaskCard({ task, onEdit, onComplete, onDelete, onStatusChange, isHistory = false }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusInfo = statusConfig[task.status];
  const frequencyInfo = frequencyConfig[task.frequency];
  const priorityInfo = priorityConfig[task.priority];

  return (
    <div className="glass rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {task.description || 'Sem descrição'}
          </p>
        </div>

        {/* Actions */}
        {!isHistory && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 transition-colors"
              title="Editar tarefa"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 dark:text-red-400 transition-colors"
              title="Deletar tarefa"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {isHistory && (
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 dark:text-red-400 transition-colors"
            title="Deletar tarefa"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Task Info */}
      <div className="space-y-3 mb-4">
        {/* Assigned To */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {task.assignedTo.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {task.assignedTo.name}
          </span>
        </div>

        {/* Status, Frequency, Priority */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {frequencyInfo.icon} {frequencyInfo.label}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
            {priorityInfo.label}
          </span>
        </div>

        {/* Dates */}
        {task.dueDate && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              Vencimento:{' '}
              {formatDistanceToNow(new Date(task.dueDate), {
                addSuffix: true,
                locale: pt,
              })}
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      {!isHistory && (
        <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative flex-1">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium transition-colors"
            >
              Mudar Status
            </button>

            {showStatusMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onStatusChange(key);
                      setShowStatusMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {task.status !== 'completed' && task.status !== 'cancelled' && (
            <button
              onClick={onComplete}
              className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-700 dark:text-green-300 font-medium transition-colors flex items-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Concluir</span>
            </button>
          )}
        </div>
      )}

      {isHistory && (
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          {task.status === 'completed' && task.completedAt && (
            <p>
              Concluída{' '}
              {formatDistanceToNow(new Date(task.completedAt), {
                addSuffix: true,
                locale: pt,
              })}
            </p>
          )}
          {task.status === 'cancelled' && task.cancelledAt && (
            <p>
              Cancelada{' '}
              {formatDistanceToNow(new Date(task.cancelledAt), {
                addSuffix: true,
                locale: pt,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

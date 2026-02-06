import { GoogleLogin } from '@react-oauth/google';
import { CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      await login(credentialResponse.credential);
      navigate('/tasks');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="glass rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckSquare className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent mb-2">
            ORGTA
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organizador de Tarefas Interno
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
              <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Gerencie tarefas diárias e mensais</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
              <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Chat ao vivo com sua equipe</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
              <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Histórico completo de tarefas</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
              <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Tema escuro e claro</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
          Faça login com sua conta do Google para começar
        </p>
      </div>
    </div>
  );
}

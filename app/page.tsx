'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'enpack2026') {
      localStorage.setItem('auth', 'true');
      router.push('/dashboard');
    } else {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏭</div>
          <h1 className="text-2xl font-bold text-white">Enpack Plastik</h1>
          <p className="text-gray-400 text-sm mt-1">Üretim İzlenebilirlik Sistemi</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
        <p className="text-center text-gray-600 text-xs mt-6">Demo: admin / enpack2026</p>
      </div>
    </div>
  );
}

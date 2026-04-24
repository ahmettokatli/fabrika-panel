'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/uretim', label: 'Günlük Üretim', icon: '⚙️' },
  { href: '/hammadde', label: 'Hammadde', icon: '📦' },
  { href: '/stok', label: 'Ürün Stoku', icon: '🏗️' },
  { href: '/paletler', label: 'Palet Takibi', icon: '🎯' },
  { href: '/sevkiyat', label: 'Sevkiyat', icon: '🚚' },
  { href: '/firmalar', label: 'Firma Analizi', icon: '🏢' },
  { href: '/arizalar', label: 'Arıza & Duruş', icon: '🔧' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/');
  };

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="text-2xl mb-1">🏭</div>
        <h1 className="text-white font-bold text-lg leading-tight">Enpack Plastik</h1>
        <p className="text-gray-500 text-xs">İzlenebilirlik Sistemi</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <div>
            <p className="text-white text-sm font-medium">Admin</p>
            <p className="text-gray-500 text-xs">Yönetici</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-gray-400 hover:text-red-400 text-sm transition-colors"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

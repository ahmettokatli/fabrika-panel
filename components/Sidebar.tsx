'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/isemirleri', label: 'İş Emirleri', icon: '📋' },
  { href: '/uretim', label: 'Günlük Üretim', icon: '⚙️' },
  { href: '/makineler', label: 'Makine Performansı', icon: '🏭' },
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
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/');
  };

  const NavContent = () => (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
    </>
  );

  return (
    <>
      {/* Mobil header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏭</span>
          <span className="text-white font-bold text-sm">Enpack Plastik</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-white p-1"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobil drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-gray-900 flex flex-col pt-14">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-900 min-h-screen flex-col">
        <div className="px-6 py-6 border-b border-gray-800">
          <div className="text-2xl mb-1">🏭</div>
          <h1 className="text-white font-bold text-lg leading-tight">Enpack Plastik</h1>
          <p className="text-gray-500 text-xs">İzlenebilirlik Sistemi</p>
        </div>
        <NavContent />
      </aside>
    </>
  );
}

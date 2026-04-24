'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('auth')) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

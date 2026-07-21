"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('pj_partner_token');
    if (!token) {
      router.push('/');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 gap-4">
      <div className="w-12 h-12 border-4 border-neutral-200 border-t-brand-customer-red rounded-full animate-spin"></div>
      <p className="font-black uppercase text-[10px] tracking-widest text-neutral-400">Authenticating Access...</p>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-neutral-900 font-sans relative">
      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between p-6 border-b border-neutral-100 bg-white z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-customer-red rounded-lg flex items-center justify-center text-white font-black text-xs">PJ</div>
          <h2 className="text-sm font-black uppercase tracking-tighter italic">Partner<span className="text-brand-customer-red">Node</span></h2>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-neutral-50 rounded-xl text-neutral-900"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR WRAPPER */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-y-auto h-screen scrollbar-hide w-full">
        {children}
      </main>
    </div>
  );
}

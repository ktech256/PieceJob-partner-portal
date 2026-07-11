"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
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
    <div className="flex min-h-screen bg-white text-neutral-900 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen scrollbar-hide">
        {children}
      </main>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Statements', href: '/dashboard/statements' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 border-r border-neutral-100 min-h-screen p-10 flex flex-col gap-12 bg-neutral-50/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-customer-red rounded-xl flex items-center justify-center text-white font-black">PJ</div>
        <h2 className="text-xl font-black uppercase tracking-tighter italic">Partner<span className="text-brand-customer-red">Node</span></h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                isActive
                  ? "bg-neutral-900 text-white shadow-xl"
                  : "text-neutral-400 hover:text-neutral-900 hover:bg-white"
              )}
            >
              <item.icon size={18} strokeWidth={ isActive ? 3 : 2 } />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-10 border-t border-neutral-100 space-y-6">
        <div className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm space-y-4">
           <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Support Sector</p>
           <button className="w-full py-3 bg-neutral-50 rounded-xl text-[9px] font-black uppercase hover:bg-neutral-100 transition-colors">Open Ticket</button>
        </div>

        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          className="flex items-center gap-4 px-6 py-4 w-full rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Terminate
        </button>
      </div>
    </aside>
  );
}

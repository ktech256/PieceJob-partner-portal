import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className={`${color} p-8 rounded-[40px] border border-black/5 flex flex-col gap-4 group hover:scale-[1.02] transition-all`}>
       <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-neutral-900">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest">{label}</p>
          <p className="text-2xl font-black text-neutral-900 mt-1">{value}</p>
       </div>
    </div>
  );
}

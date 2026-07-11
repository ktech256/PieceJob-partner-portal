"use client";

import React, { useEffect, useState } from 'react';
import { Bell, Info, ShieldCheck, Gift, Clock } from 'lucide-react';
import api from '@/lib/api';

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/affiliate/notifications');
        setNotifications(res.data.data.map((n: any) => ({
          id: n._id,
          type: n.type,
          title: n.title,
          message: n.body,
          time: new Date(n.createdAt).toLocaleString(),
          icon: n.type === 'PAYOUT' ? <ShieldCheck className="text-green-600" /> : <Info className="text-blue-600" />
        })));
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="p-8 md:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-900">Signal <span className="text-brand-customer-red">Center</span></h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Critical system updates and acquisition alerts</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {loading ? (
           <div className="py-20 flex flex-col items-center gap-6">
              <div className="w-12 h-12 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300">Awaiting encrypted signals...</p>
           </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className="bg-white border border-neutral-100 rounded-[32px] p-8 flex gap-6 hover:shadow-lg transition-all group">
               <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {n.icon}
               </div>
               <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-start">
                     <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{n.type}</p>
                     <div className="flex items-center gap-2 text-neutral-300">
                        <Clock size={12} />
                        <span className="text-[9px] font-bold uppercase">{n.time}</span>
                     </div>
                  </div>
                  <h3 className="text-lg font-black uppercase text-neutral-900">{n.title}</h3>
                  <p className="text-neutral-500 text-xs font-bold leading-relaxed italic">"{n.message}"</p>
               </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <button className="w-full max-w-4xl py-5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 rounded-[24px] text-[10px] font-black uppercase tracking-widest text-neutral-400 transition-all">Clear Oracle History</button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  BarChart3,
  Users,
  CheckCircle2,
  DollarSign,
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ReferralSection from '@/components/dashboard/ReferralSection';
import BalanceMatrix from '@/components/dashboard/BalanceMatrix';
import { PartnerData } from '@/types';

export default function PartnerDashboard() {
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/affiliate/dashboard');
        setData(res.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 gap-4">
      <div className="w-12 h-12 border-4 border-neutral-200 border-t-brand-customer-red rounded-full animate-spin"></div>
      <p className="font-black uppercase text-[10px] tracking-widest text-neutral-400">Synchronizing Protocol...</p>
    </div>
  );

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans p-8 md:p-16">
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Partner<span className="text-brand-customer-red">Protocol</span></h1>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Encrypted Session Active • {data.name}
            </p>
          </div>
          <button
            onClick={() => { localStorage.clear(); router.push('/'); }}
            className="p-4 bg-neutral-50 rounded-2xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<BarChart3 />} label="Total Clicks" value={data.stats.clicks} color="bg-neutral-50" />
          <StatCard icon={<Users />} label="Registrations" value={data.stats.registrations} color="bg-blue-50" />
          <StatCard icon={<CheckCircle2 />} label="Qualified" value={data.stats.qualifiedUsers} color="bg-green-50" />
          <StatCard icon={<DollarSign />} label="Earnings" value={`${data.balance.available} R`} color="bg-yellow-50" />
        </div>

        {/* ACTION CENTER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <ReferralSection referralCode={data.referralCode} />
           <BalanceMatrix balance={data.balance} />
        </div>

        {/* RECENT ACTIVITY */}
        <div className="space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <Activity size={20} className="text-neutral-400" />
                Real-time Conversions
              </h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-2 group">
                View Full Oracle <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           <div className="bg-white border border-neutral-100 rounded-[40px] overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-neutral-50 text-[10px] font-black uppercase text-neutral-400 tracking-widest">
                       <th className="px-10 py-6">Reference</th>
                       <th className="px-10 py-6">Node Signature</th>
                       <th className="px-10 py-6">Status</th>
                       <th className="px-10 py-6">Commission</th>
                       <th className="px-10 py-6 text-right">Timestamp</th>
                    </tr>
                 </thead>
                 <tbody className="text-[10px] font-bold uppercase text-neutral-600">
                    <tr className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                       <td className="px-10 py-6">#PJ-REF-9021</td>
                       <td className="px-10 py-6 font-black text-neutral-900">USR_8821...</td>
                       <td className="px-10 py-6"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[8px] font-black">Registered</span></td>
                       <td className="px-10 py-6">--</td>
                       <td className="px-10 py-6 text-right text-neutral-400">2 mins ago</td>
                    </tr>
                    <tr className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                       <td className="px-10 py-6">#PJ-REF-8910</td>
                       <td className="px-10 py-6 font-black text-neutral-900">USR_7712...</td>
                       <td className="px-10 py-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[8px] font-black">Qualified</span></td>
                       <td className="px-10 py-6 text-green-600">50.00 R</td>
                       <td className="px-10 py-6 text-right text-neutral-400">1 hour ago</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}

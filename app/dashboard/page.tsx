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
import ReferralPerformance from '@/components/dashboard/ReferralPerformance';
import YieldChart from '@/components/dashboard/YieldChart';
import { PartnerData } from '@/types';

export default function PartnerDashboard() {
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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
    <div className="min-h-screen bg-white text-neutral-900 font-sans p-6 md:p-16">
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Partner<span className="text-brand-customer-red">Protocol</span></h1>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Encrypted Session Active • {data.name}
            </p>
          </div>

          <nav className="flex bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100">
             <button onClick={() => setActiveTab('overview')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-white text-neutral-900 shadow-xl shadow-neutral-100' : 'text-neutral-400 hover:text-neutral-600'}`}>Overview</button>
             <button onClick={() => setActiveTab('acquisitions')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'acquisitions' ? 'bg-white text-neutral-900 shadow-xl shadow-neutral-100' : 'text-neutral-400 hover:text-neutral-600'}`}>Acquisitions</button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* TOP STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard icon={<BarChart3 />} label="Total Clicks" value={data.stats.clicks} color="bg-neutral-50" />
              <StatCard icon={<Users />} label="Registrations" value={data.stats.registrations} color="bg-blue-50" />
              <StatCard icon={<CheckCircle2 />} label="Qualified Leads" value={data.stats.qualifiedUsers} color="bg-green-50" />
              <StatCard icon={<TrendingUp />} label="Conversion Rate" value={`${data.stats.conversionRate?.toFixed(1) || 0}%`} color="bg-brand-customer-red/5 text-brand-customer-red" />
            </div>

            {/* FINANCIAL YIELD MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-neutral-900 rounded-[32px] p-8 text-white shadow-2xl shadow-neutral-200">
                  <p className="text-[8px] font-black uppercase text-white/40 tracking-widest">Today's Protocol Yield</p>
                  <p className="text-2xl font-black mt-1">{data.earnings?.today || 0} R</p>
               </div>
               <div className="bg-white border border-neutral-100 rounded-[32px] p-8 shadow-sm">
                  <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">This Week</p>
                  <p className="text-2xl font-black mt-1">{data.earnings?.weekly || 0} R</p>
               </div>
               <div className="bg-white border border-neutral-100 rounded-[32px] p-8 shadow-sm">
                  <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">This Month</p>
                  <p className="text-2xl font-black mt-1">{data.earnings?.monthly || 0} R</p>
               </div>
               <div className="bg-white border border-neutral-100 rounded-[32px] p-8 shadow-sm">
                  <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">Lifetime Total</p>
                  <p className="text-2xl font-black mt-1 text-green-600">{data.earnings?.lifetime || 0} R</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* HIGHLIGHTS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 flex flex-col gap-3">
                        <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest italic">Top Performing Signal</p>
                        {data.highlights?.topReferral ? (
                            <div>
                                <p className="text-xl font-black">{data.highlights.topReferral.commission.toFixed(2)} R</p>
                                <p className="text-[8px] text-neutral-400 font-bold uppercase">{data.highlights.topReferral.jobs} Jobs Generated</p>
                            </div>
                        ) : <p className="text-xs font-bold text-neutral-300">Insufficient Data</p>}
                     </div>
                     <div className="p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 flex flex-col gap-3">
                        <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest italic">Latest Acquisition</p>
                        {data.highlights?.latestReferral ? (
                            <div>
                                <p className="text-xl font-black truncate">{data.highlights.latestReferral.name}</p>
                                <p className="text-[8px] text-neutral-400 font-bold uppercase">{new Date(data.highlights.latestReferral.date).toLocaleDateString()} Signature</p>
                            </div>
                        ) : <p className="text-xs font-bold text-neutral-300">Awaiting Signal...</p>}
                     </div>
                     <div className="p-8 bg-neutral-50 rounded-[32px] border border-neutral-100 flex flex-col gap-3">
                        <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest italic">Recent Protocol Yield</p>
                        {data.highlights?.latestCommission ? (
                            <div>
                                <p className="text-xl font-black">{data.highlights.latestCommission.amount.toFixed(2)} R</p>
                                <p className="text-[8px] text-neutral-400 font-bold uppercase">{new Date(data.highlights.latestCommission.date).toLocaleTimeString()} Decrypted</p>
                            </div>
                        ) : <p className="text-xs font-bold text-neutral-300">0.00 R</p>}
                     </div>
                  </div>

                  <ReferralSection referralCode={data.referralCode} />
                  <YieldChart />
               </div>
               <div className="space-y-6">
                  <BalanceMatrix balance={data.balance} />
                  <div className="bg-neutral-50 rounded-[40px] p-10 border border-neutral-100 space-y-8">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-200 pb-4">Signal Attribution</h4>
                     <div className="space-y-6">
                        <AttributionItem label="Verified Registrations" value={data.stats.verifiedRegistrations || 0} color="bg-brand-customer-red" />
                        <AttributionItem label="Total Customers" value={data.stats.customerSignups || 0} color="bg-blue-500" />
                        <AttributionItem label="Total Providers" value={data.stats.providerSignups || 0} color="bg-green-500" />
                        <AttributionItem label="Total Businesses" value={data.stats.businessSignups || 0} color="bg-orange-500" />
                     </div>
                  </div>
               </div>
            </div>
          </>
        )}

        {activeTab === 'acquisitions' && (
          <ReferralPerformance />
        )}
      </div>
    </div>
  );
}

function AttributionItem({ label, value, color }: any) {
    return (
        <div className="flex justify-between items-center group">
           <div className="flex items-center gap-3">
              <div className={`w-2 h-2 ${color} rounded-full`}></div>
              <span className="text-xs font-bold uppercase text-neutral-500 group-hover:text-neutral-900 transition-colors">{label}</span>
           </div>
           <span className="text-sm font-black">{value}</span>
        </div>
    )
}
  );
}

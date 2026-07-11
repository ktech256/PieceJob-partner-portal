"use client";

import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Target, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import api from '@/lib/api';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/affiliate/reports');
        const { totalReferrals, qualifiedCount, monthlyStats } = res.data.data;

        // Map monthly stats to campaign-like cards for UI display
        setCampaigns(monthlyStats.map((ms: any) => ({
          id: `PRD-${ms._id.year}-${ms._id.month}`,
          name: `${new Date(2000, ms._id.month - 1).toLocaleString('en-us', { month: 'long' })} ${ms._id.year} Activity`,
          clicks: 'N/A', // Clicks not aggregated monthly yet
          regs: ms.count,
          qualified: 'TBD',
          conv: 'Live'
        })));
      } catch (err) {
        console.error('Failed to fetch reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-8 md:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-900">Performance <span className="text-brand-customer-red">Intelligence</span></h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Acquisition velocity and conversion matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <ReportMiniCard icon={<TrendingUp />} label="Growth Velocity" value="+12.4%" sub="Versus previous period" color="text-green-600" />
         <ReportMiniCard icon={<Target />} label="Efficiency Rank" value="Tier 1" sub="Authorized elite status" color="text-indigo-600" />
         <ReportMiniCard icon={<Users />} label="Acquisition Cost" value="0.00 R" sub="Organic partner spread" color="text-neutral-900" />
      </div>

      <div className="space-y-8">
         <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
           <BarChart3 className="text-neutral-400" size={20} />
           Campaign Analysis
         </h3>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {campaigns.map(c => (
             <div key={c.id} className="bg-white border border-neutral-100 rounded-[40px] p-10 space-y-8 shadow-sm hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">{c.id}</p>
                      <h4 className="text-lg font-black uppercase text-neutral-900">{c.name}</h4>
                   </div>
                   <button className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 transition-colors"><ChevronRight size={20} /></button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <CampaignStat label="Clicks" value={c.clicks} />
                   <CampaignStat label="Conversions" value={c.regs} />
                   <CampaignStat label="Qualified" value={c.qualified} color="text-green-600" />
                   <CampaignStat label="Rate" value={c.conv} color="text-brand-customer-red" />
                </div>

                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                   <div className="h-full bg-neutral-900 w-[65%] group-hover:w-[75%] transition-all duration-1000"></div>
                </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

function ReportMiniCard({ icon, label, value, sub, color }: any) {
  return (
    <div className="bg-neutral-50 p-10 rounded-[40px] border border-neutral-100 space-y-4">
       <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-neutral-900">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest">{label}</p>
          <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
          <p className="text-[8px] font-bold text-neutral-400 uppercase mt-1">{sub}</p>
       </div>
    </div>
  );
}

function CampaignStat({ label, value, color = "text-neutral-900" }: any) {
  return (
    <div>
       <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{label}</p>
       <p className={`text-xl font-black mt-1 ${color}`}>{value}</p>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { FileText, Download, Filter, Search, Calendar } from 'lucide-react';
import api from '@/lib/api';

export default function StatementsPage() {
  const [loading, setLoading] = useState(true);
  const [statements, setStatements] = useState<any[]>([]);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const res = await api.get('/affiliate/statements');
        setStatements(res.data.data.map((entry: any) => ({
          id: entry.transactionId,
          period: new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          amount: entry.amount.toFixed(2),
          status: entry.status === 'COMPLETED' ? 'PAID' : 'PENDING',
          date: entry.createdAt.split('T')[0]
        })));
      } catch (err) {
        console.error('Failed to fetch statements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, []);

  return (
    <div className="p-8 md:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-900">Financial <span className="text-brand-customer-red">Statements</span></h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Audit-grade earning reports and payout history</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-neutral-50 bg-neutral-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
                <input type="text" placeholder="Search Period..." className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-bold outline-none focus:border-black transition-all" />
             </div>
             <button className="p-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-400 hover:text-black transition-all shadow-sm"><Filter size={16} /></button>
          </div>
          <button className="w-full md:w-auto px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg">Download All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-[10px] font-black uppercase text-neutral-400 tracking-widest">
                <th className="px-10 py-6">Statement ID</th>
                <th className="px-10 py-6">Billing Period</th>
                <th className="px-10 py-6">Total Yield</th>
                <th className="px-10 py-6">Fulfillment</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[10px] font-bold uppercase text-neutral-600 divide-y divide-neutral-50">
              {loading ? (
                <tr><td colSpan={5} className="px-10 py-20 text-center text-neutral-400 animate-pulse tracking-widest">Synchronizing Ledger...</td></tr>
              ) : statements.length === 0 ? (
                <tr><td colSpan={5} className="px-10 py-20 text-center text-neutral-400">No statements identified in protocol.</td></tr>
              ) : statements.map(s => (
                <tr key={s.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-10 py-6 font-mono text-neutral-400">{s.id}</td>
                  <td className="px-10 py-6 text-neutral-900 font-black">{s.period}</td>
                  <td className="px-10 py-6 text-neutral-900 font-black">{s.amount} R</td>
                  <td className="px-10 py-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[8px] font-black">{s.status}</span></td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-2 bg-neutral-50 rounded-lg text-neutral-400 hover:text-black transition-all hover:bg-neutral-100"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 flex flex-col gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-neutral-900"><Calendar size={24} /></div>
            <div>
               <h3 className="text-xl font-black uppercase tracking-tight">Report Interval</h3>
               <p className="text-neutral-500 text-xs font-bold leading-relaxed mt-2">Statements are generated automatically on the last day of each calendar month. Payouts are initiated within 48 hours of statement generation.</p>
            </div>
         </div>
         <div className="p-10 bg-neutral-900 text-white rounded-[40px] flex flex-col justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">Request Correction</h3>
            <p className="text-neutral-400 text-xs font-bold leading-relaxed mt-2">Detected an anomaly in your yield? Open a priority forensic ticket for immediate review.</p>
            <button className="mt-8 py-4 w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Establish Support Tunnel</button>
         </div>
      </div>
    </div>
  );
}

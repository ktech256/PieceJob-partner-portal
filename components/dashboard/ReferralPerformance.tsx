"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Users, CheckCircle, TrendingUp, Calendar, Zap } from 'lucide-react';

export default function ReferralPerformance() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get('/affiliate/reports');
                setData(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="p-12 text-center text-[10px] font-black uppercase text-neutral-400">Syncing Acquisition Stream...</div>;
    if (!data) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center px-4">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                    <Zap size={20} className="text-brand-customer-red" />
                    Acquisition performance Ledger
                </h3>
                <div className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">
                    {data.referrals.length} Signals Decrypted
                </div>
            </div>

            <div className="bg-white border border-neutral-100 rounded-[48px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-neutral-50 text-[10px] font-black uppercase text-neutral-400 tracking-widest">
                                <th className="px-10 py-6">Participant Identity</th>
                                <th className="px-10 py-6">Operational lifecycle</th>
                                <th className="px-10 py-6">Yield contribution</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="text-[10px] font-bold uppercase text-neutral-600">
                            {data.referrals.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-10 py-20 text-center text-neutral-400">No acquisition signals detected in this sector.</td>
                                </tr>
                            ) : (
                                data.referrals.map((r: any) => {
                                    const ageDays = Math.floor((Date.now() - new Date(r.user.joinedAt).getTime()) / (1000 * 60 * 60 * 24));
                                    return (
                                        <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-black text-base italic shadow-lg shadow-neutral-200">
                                                        {r.user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-neutral-900 font-black">{r.user.name}</p>
                                                        <p className="text-[8px] text-neutral-400">{r.user.role} • Node Age: {ageDays}d</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="space-y-1">
                                                    <p className="text-neutral-900">{r.jobsCompleted} Completed Jobs</p>
                                                    <p className="text-[8px] text-neutral-400">{r.rewardsIssued} Rewards Triggered</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="space-y-1">
                                                    <p className="text-green-600 font-black">{r.commissionGenerated.toFixed(2)} R Yield</p>
                                                    <p className="text-[8px] text-neutral-400">Volume: {r.lifetimeSpend?.toFixed(2) || 0} R</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-black ${r.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="space-y-1">
                                                    <p className="text-neutral-900">{new Date(r.user.joinedAt).toLocaleDateString()}</p>
                                                    <p className="text-[8px] text-neutral-400 italic">Acquisition Signal</p>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

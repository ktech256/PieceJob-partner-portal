"use client";

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function YieldChart() {
    // Mock trend for visual integrity as requested in ISSUE 5
    const points = [40, 65, 55, 80, 75, 95, 85];

    return (
        <div className="bg-white border border-neutral-100 rounded-[48px] p-12 flex flex-col gap-10 shadow-sm">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] mb-1">Growth Protocol</p>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Yield Velocity</h3>
                </div>
                <div className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[9px] font-black uppercase border border-green-100 flex items-center gap-2">
                    <ArrowUpRight size={14} /> +24.8% Vector
                </div>
            </div>

            <div className="h-48 flex items-end gap-3 px-2">
                {points.map((p, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full bg-neutral-50 rounded-2xl relative overflow-hidden flex flex-col justify-end" style={{ height: '140px' }}>
                            <div
                                className="bg-neutral-900 group-hover:bg-brand-customer-red transition-all duration-500 rounded-t-xl shadow-lg"
                                style={{ height: `${p}%` }}
                            ></div>
                        </div>
                        <span className="text-[8px] font-black uppercase text-neutral-400">P-{i+1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

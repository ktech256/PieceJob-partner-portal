"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PartnerBalance } from '@/types';

interface BalanceMatrixProps {
  balance: PartnerBalance;
}

export default function BalanceMatrix({ balance }: BalanceMatrixProps) {
  return (
    <div className="bg-neutral-50 rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-8 border border-neutral-100">
      <h3 className="text-xl font-black uppercase tracking-tight">Balance Matrix</h3>
      <div className="space-y-6">
        <BalanceItem label="Pending Rewards" value={`${balance.pending} R`} color="text-neutral-400" />
        <BalanceItem label="Available to Payout" value={`${balance.available} R`} color="text-green-600" />
        <BalanceItem label="Total Paid Out" value={`${balance.paid} R`} color="text-blue-600" />

        <button className="w-full mt-4 py-5 bg-white border border-neutral-200 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:border-black transition-all">
          Request Settlement <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function BalanceItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">{label}</span>
       <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}

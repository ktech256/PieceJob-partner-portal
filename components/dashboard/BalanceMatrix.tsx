"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { PartnerData } from '@/types';
import SettlementModal from './SettlementModal';

interface BalanceMatrixProps {
  partner: PartnerData;
  onRefresh?: () => void;
}

export default function BalanceMatrix({ partner, onRefresh }: BalanceMatrixProps) {
  const [showSettlement, setShowSettlement] = useState(false);
  const balance = partner.balance;

  return (
    <>
      <div className="bg-neutral-50 rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-8 border border-neutral-100">
        <h3 className="text-xl font-black uppercase tracking-tight italic">Balance<span className="text-brand-customer-red">Matrix</span></h3>
        <div className="space-y-6">
          <BalanceItem label="Pending Protocol" value={`${balance.pending.toFixed(2)} R`} color="text-neutral-400" />
          <BalanceItem label="Available to Yield" value={`${balance.available.toFixed(2)} R`} color="text-green-600" />
          <BalanceItem label="Currently Requested" value={`${balance.requested.toFixed(2)} R`} color="text-orange-500" />
          <BalanceItem label="In Processing" value={`${balance.processing.toFixed(2)} R`} color="text-blue-500" />
          <BalanceItem label="Total Lifetime Earnings" value={`${balance.lifetime.toFixed(2)} R`} color="text-neutral-900" />

          <div className="pt-4 border-t border-neutral-200">
             <BalanceItem label="Settled History" value={`${balance.paid.toFixed(2)} R`} color="text-neutral-400" />
          </div>

          <button
            onClick={() => setShowSettlement(true)}
            className="w-full mt-4 py-5 bg-white border border-neutral-200 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
          >
            Request Settlement <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {showSettlement && (
        <SettlementModal
          partner={partner}
          onClose={() => setShowSettlement(false)}
          onRefresh={onRefresh || (() => {})}
        />
      )}
    </>
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

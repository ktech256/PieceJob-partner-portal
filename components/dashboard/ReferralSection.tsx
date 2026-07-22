"use client";

import React, { useState } from 'react';
import { Copy, Download, QrCode } from 'lucide-react';
import { REFERRAL_BASE_URL } from '@/lib/constants';
import QRCodeDialog from './QRCodeDialog';

interface ReferralSectionProps {
  referralCode: string;
}

export default function ReferralSection({ referralCode }: ReferralSectionProps) {
  const [showQR, setShowQR] = useState(false);
  const referralLink = `${REFERRAL_BASE_URL}${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard');
  };

  return (
    <div className="lg:col-span-2 bg-neutral-900 text-white rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-8 relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-tight">Your Acquisition Link</h2>
        <p className="text-neutral-400 text-xs font-bold leading-relaxed max-w-md">
          Share this link across your platforms. Every user who registers through this protocol will be permanently attributed to your account.
        </p>

        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between group min-w-0">
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest truncate mr-4">{referralLink}</span>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <button className="flex-1 md:flex-none bg-red-600 text-white px-6 md:px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
              <Download size={16} /> Asset Pack
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="flex-1 md:flex-none bg-white text-black px-6 md:px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <QrCode size={16} /> Get QR
            </button>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/20 rounded-full blur-[100px]"></div>

      <QRCodeDialog
        url={referralLink}
        partnerCode={referralCode}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </div>
  );
}

"use client";

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download } from 'lucide-react';

interface QRCodeDialogProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeDialog({ url, isOpen, onClose }: QRCodeDialogProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'piecejob-referral-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight">Referral QR Code</h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">Scan to register</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X size={24} className="text-neutral-300" />
          </button>
        </div>

        <div className="p-12 flex flex-col items-center gap-8">
          <div ref={qrRef} className="p-6 bg-white border border-neutral-100 rounded-3xl shadow-inner">
            <QRCodeSVG value={url} size={200} />
          </div>

          <button
            onClick={downloadQR}
            className="w-full bg-neutral-900 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl active:scale-95"
          >
            <Download size={16} /> Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}

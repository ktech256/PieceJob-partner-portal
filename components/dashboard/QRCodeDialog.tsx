import React, { useRef, useState } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { X, Download, Loader2 } from 'lucide-react';

interface QRCodeDialogProps {
  url: string;
  partnerCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeDialog({ url, partnerCode, isOpen, onClose }: QRCodeDialogProps) {
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadHDQR = async () => {
    setDownloading(true);
    try {
      // Find the hidden canvas we will render for the HD version
      const canvas = canvasRef.current?.querySelector('canvas');
      if (!canvas) throw new Error('Canvas rendering engine not found');

      // Small delay to ensure rendering is complete if needed
      await new Promise(resolve => setTimeout(resolve, 100));

      const pngFile = canvas.toDataURL('image/png', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.download = `PieceJob_QR_${partnerCode}.png`;
      downloadLink.href = pngFile;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('QR Export failed:', error);
      alert('Failed to generate HD Asset. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const logoSettings = {
    src: "https://piecejob.co/assets/logos/piecejob-logo.png",
    height: 48,
    width: 48,
    excavate: true,
  };

  const hdLogoSettings = {
    ...logoSettings,
    height: 400, // Scaled for 2048
    width: 400,
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight italic">Protocol<span className="text-brand-customer-red">Asset</span></h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">HD Acquisition Signal Generator</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X size={24} className="text-neutral-300" />
          </button>
        </div>

        <div className="p-12 flex flex-col items-center gap-8">
          {/* UI PREVIEW - SVG for crispness */}
          <div className="p-8 bg-white border border-neutral-100 rounded-[32px] shadow-inner relative group">
            <QRCodeSVG
              value={url}
              size={240}
              level="H"
              includeMargin={false}
              imageSettings={logoSettings}
            />
          </div>

          {/* HIDDEN HD RENDERER (2048x2048) */}
          <div ref={canvasRef} className="hidden">
            <QRCodeCanvas
              value={url}
              size={2048}
              level="H"
              includeMargin={true}
              marginSize={2}
              imageSettings={hdLogoSettings}
            />
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={downloadHDQR}
              disabled={downloading}
              className="w-full bg-neutral-900 text-white h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Download size={18} />
              )}
              {downloading ? 'Encrypting HD Asset...' : 'Download HD Asset (2K PNG)'}
            </button>

            <div className="space-y-1">
              <p className="text-[8px] text-center text-neutral-400 font-bold uppercase tracking-widest">
                CENTERED LOGO • 2048px MASTER RESOLUTION
              </p>
              <p className="text-[7px] text-center text-neutral-300 font-bold uppercase tracking-widest">
                SUITABLE FOR LARGE BANNERS & VEHICLE BRANDING
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

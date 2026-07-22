"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/affiliate/forgot-password', { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl border border-neutral-200 p-12 space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center">
           <h1 className="text-2xl font-black uppercase tracking-tighter italic">
             Password<span className="text-brand-customer-red">Recovery</span>
           </h1>
           <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Initialize Security Protocol</p>
        </div>

        {success ? (
          <div className="space-y-8 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[32px] flex items-center justify-center mx-auto">
              <CheckCircle size={40} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase">Transmission Sent</h3>
              <p className="text-[10px] text-neutral-400 font-bold uppercase mt-2 leading-relaxed">
                If an authorized email is found, a recovery signal has been dispatched. Please check your sectors.
              </p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-neutral-900 hover:gap-3 transition-all">
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[9px] font-black uppercase text-neutral-400 ml-1">Registered Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-12 pr-5 py-4 text-xs font-bold outline-none focus:border-black transition-all"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white h-16 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Dispatch Recovery Signal'}
            </button>

            <div className="text-center pt-4">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-neutral-400 hover:text-black transition-colors">
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          </form>
        )}

        <p className="text-center text-[8px] text-neutral-400 font-bold uppercase tracking-[0.2em]">
          PieceJob Global Oracle • Identity Verification Node
        </p>
      </div>
    </div>
  );
}

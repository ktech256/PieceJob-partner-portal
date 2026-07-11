"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Lock, User, Loader2 } from 'lucide-react';

export default function PartnerLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/affiliate/login', { identifier, password });
      if (res.data.success) {
        localStorage.setItem('pj_partner_token', res.data.token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl border border-neutral-200 p-12 space-y-8">
        <div className="text-center">
           <h1 className="text-2xl font-black uppercase tracking-tighter">
             Partner<span className="text-brand-customer-red">Portal</span>
           </h1>
           <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Authorized Affiliate Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[9px] font-black uppercase text-neutral-400 ml-1">Email or Phone</label>
            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-12 pr-5 py-4 text-xs font-bold outline-none focus:border-black transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black uppercase text-neutral-400 ml-1">Access Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Establish Connection'}
          </button>
        </form>

        <p className="text-center text-[8px] text-neutral-400 font-bold uppercase tracking-[0.2em]">
          PieceJob Global Affiliate Network • Security Tier 1
        </p>
      </div>
    </div>
  );
}

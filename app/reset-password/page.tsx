"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setError('Invalid or missing recovery token.');
    if (newPassword !== confirmPassword) return setError('Passwords do not match.');
    if (newPassword.length < 8) return setError('Password must be at least 8 characters.');

    setLoading(true);
    setError('');
    try {
      await api.post('/affiliate/reset-password', { token, newPassword });
      setSuccess(true);
      setTimeout(() => router.push('/'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[32px] flex items-center justify-center mx-auto">
          <AlertCircle size={40} />
        </div>
        <h3 className="text-sm font-black uppercase">Token Missing</h3>
        <p className="text-[10px] text-neutral-400 font-bold uppercase mt-2">
          An invalid or missing security token was detected. Please restart the protocol.
        </p>
        <Link href="/forgot-password" className="inline-flex py-4 px-8 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest mt-4">
           Restart Recovery
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
         <h1 className="text-2xl font-black uppercase tracking-tighter italic">
           Establish<span className="text-brand-customer-red">NewPass</span>
         </h1>
         <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Re-establishing Security Sectors</p>
      </div>

      {success ? (
        <div className="space-y-8 text-center">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[32px] flex items-center justify-center mx-auto">
            <CheckCircle size={40} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase">Access Pass Updated</h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase mt-2">
              Your security credentials have been successfully updated. Redirecting to login...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-black uppercase text-neutral-400 ml-1">New Access Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-12 pr-5 py-4 text-xs font-bold outline-none focus:border-black transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black uppercase text-neutral-400 ml-1">Confirm New Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl pl-12 pr-5 py-4 text-xs font-bold outline-none focus:border-black transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white h-16 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Finalize Password Update'}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl border border-neutral-200 p-12 animate-in zoom-in-95 duration-300">
        <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin text-neutral-400" size={40} /></div>}>
          <ResetPasswordForm />
        </Suspense>

        <p className="text-center text-[8px] text-neutral-400 font-bold uppercase tracking-[0.2em] mt-8">
          PieceJob Global Oracle • Password Encryption Protocol
        </p>
      </div>
    </div>
  );
}

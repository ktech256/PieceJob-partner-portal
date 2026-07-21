"use client";

import React, { useState } from 'react';
import api from '@/lib/api';
import { X, Landmark, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettlementModal({ partner, onClose, onRefresh }: any) {
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const available = partner.balance.available;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const reqAmount = Number(amount);
        if (reqAmount <= 0) {
            setError('Please enter a valid amount.');
            setLoading(false);
            return;
        }

        if (reqAmount > available) {
            setError('Amount exceeds available balance.');
            setLoading(false);
            return;
        }

        try {
            await api.post('/affiliate/settlements/request', { amount: reqAmount, notes });
            setSuccess(true);
            setTimeout(() => {
                onRefresh();
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-10 md:p-12 space-y-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight italic">Request<span className="text-brand-customer-red">Settlement</span></h2>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Protocol Ledger Authorization</p>
                        </div>
                        <button onClick={onClose} className="p-4 hover:bg-neutral-100 rounded-2xl transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {success ? (
                        <div className="py-20 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[32px] flex items-center justify-center shadow-xl shadow-green-100">
                                <CheckCircle2 size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Request Encrypted</h3>
                                <p className="text-xs text-neutral-400 font-bold uppercase mt-2">Finance protocol has acknowledged your signal.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                                    <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest italic">Available Yield</p>
                                    <p className="text-xl font-black mt-1 text-green-600">{available.toFixed(2)} R</p>
                                </div>
                                <div className="p-6 bg-neutral-900 rounded-3xl text-white">
                                    <p className="text-[8px] font-black uppercase text-white/40 tracking-widest italic">Lifetime Earnings</p>
                                    <p className="text-xl font-black mt-1">{partner.balance.lifetime.toFixed(2)} R</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
                                <Landmark className="text-blue-600 shrink-0" size={24} />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Banking Destination</p>
                                    {partner.bankingDetails?.accountNumber ? (
                                        <p className="text-xs font-bold text-blue-900">
                                            {partner.bankingDetails.bankName} • {partner.bankingDetails.accountNumber.slice(-4).padStart(partner.bankingDetails.accountNumber.length, '*')}
                                        </p>
                                    ) : (
                                        <p className="text-xs font-bold text-red-600 uppercase italic">No bank details on file. update profile first.</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">Withdrawal Amount (R)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 font-black text-lg focus:border-neutral-900 outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">Supporting Reference / Notes</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Optional..."
                                        rows={3}
                                        className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-2xl px-6 py-4 font-bold text-sm focus:border-neutral-900 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle size={16} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !partner.bankingDetails?.accountNumber}
                                className="w-full py-6 bg-neutral-900 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-neutral-200 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:shadow-none transition-all"
                            >
                                {loading ? 'Authorizing...' : 'Finalize Request'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

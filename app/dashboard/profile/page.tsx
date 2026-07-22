"use client";

import React, { useEffect, useState } from 'react';
import { User, Shield, Smartphone, Globe, Lock, Save, LogOut } from 'lucide-react';
import api from '@/lib/api';

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

   const [saving, setSaving] = useState(false);
   const [formData, setFormData] = useState({
       name: '',
       email: '',
       phone: '',
       bankName: '',
       accountHolder: '',
       accountNumber: '',
       branchCode: '',
       accountType: 'Savings',
       swiftCode: ''
   });

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/affiliate/dashboard');
        const p = res.data.data;
        setData(p);
        setFormData({
            name: p.name,
            email: p.email || '',
            phone: p.phone || '',
            bankName: p.bankingDetails?.bankName || '',
            accountHolder: p.bankingDetails?.accountHolder || '',
            accountNumber: p.bankingDetails?.accountNumber || '',
            branchCode: p.bankingDetails?.branchCode || '',
            accountType: p.bankingDetails?.accountType || 'Savings',
            swiftCode: p.bankingDetails?.swiftCode || ''
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Update Profile Info
      await api.put('/affiliate/profile', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
      });

      // 2. Update Banking Details
      await api.put('/affiliate/banking', {
          bankName: formData.bankName,
          accountHolder: formData.accountHolder,
          accountNumber: formData.accountNumber,
          branchCode: formData.branchCode,
          accountType: formData.accountType,
          swiftCode: formData.swiftCode
      });

      alert('Identity and Banking Protocol verified and updated.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 md:p-16 space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-neutral-900">Partner <span className="text-brand-customer-red">Identity</span></h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-2">Authorized entity profile and security sectors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* LEFT: ENTITY AVATAR */}
         <div className="space-y-8">
            <div className="bg-neutral-50 rounded-[48px] p-12 border border-neutral-100 flex flex-col items-center text-center gap-6 shadow-inner">
               <div className="w-32 h-32 bg-neutral-900 rounded-[40px] flex items-center justify-center text-white text-5xl font-black shadow-2xl">
                  {data.name.charAt(0)}
               </div>
               <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{data.name}</h2>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mt-1">Status: {data.status}</p>
               </div>
            </div>

            <div className="p-8 bg-neutral-900 text-white rounded-[40px] space-y-6">
               <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4">Security Level</h3>
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl"><Shield size={20} className="text-brand-customer-red" /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase">Tier 1 Verification</p>
                     <p className="text-[8px] font-bold text-neutral-500 uppercase">Authorized access granted</p>
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT: CONFIGURATION */}
         <div className="lg:col-span-2 space-y-12">
            <div className="bg-white border border-neutral-100 rounded-[40px] p-10 space-y-10 shadow-sm">
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-50 pb-4 mb-8">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <ProfileInput label="Authorized Name" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} icon={<User size={14} />} />
                     <ProfileInput label="Workspace Sector" value={data.countryCode} readOnly icon={<Globe size={14} />} />
                     <ProfileInput label="Email Protocol" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} icon={<Smartphone size={14} />} />
                     <ProfileInput label="Contact Signal" value={formData.phone} onChange={(e: any) => setFormData({...formData, phone: e.target.value})} icon={<Smartphone size={14} />} />
                  </div>
               </div>

               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-b border-blue-50 pb-4 mb-8">Banking Destination</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <ProfileInput label="Bank Name" value={formData.bankName} onChange={(e: any) => setFormData({...formData, bankName: e.target.value})} icon={<Lock size={14} />} />
                     <ProfileInput label="Account Holder" value={formData.accountHolder} onChange={(e: any) => setFormData({...formData, accountHolder: e.target.value})} icon={<User size={14} />} />
                     <ProfileInput label="Account Number" value={formData.accountNumber} onChange={(e: any) => setFormData({...formData, accountNumber: e.target.value})} icon={<Lock size={14} />} />
                     <ProfileInput label="Branch Code" value={formData.branchCode} onChange={(e: any) => setFormData({...formData, branchCode: e.target.value})} icon={<Globe size={14} />} />
                     <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-neutral-400 ml-1 flex items-center gap-2">Account Type</label>
                        <select
                           value={formData.accountType}
                           onChange={(e: any) => setFormData({...formData, accountType: e.target.value})}
                           className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-xs font-black uppercase outline-none focus:border-neutral-900 transition-all"
                        >
                           <option value="Savings">Savings</option>
                           <option value="Cheque">Cheque</option>
                           <option value="Business">Business</option>
                        </select>
                     </div>
                     <ProfileInput label="SWIFT / BIC (Optional)" value={formData.swiftCode} onChange={(e: any) => setFormData({...formData, swiftCode: e.target.value})} icon={<Globe size={14} />} />
                  </div>
               </div>

               <div className="pt-10 border-t border-neutral-50 flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-4 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-xl disabled:opacity-50"
                  >
                     <Save size={16} /> {saving ? 'Persisting...' : 'Save Identity'}
                  </button>
                  <button
                    onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                    className="px-8 py-4 bg-red-50 text-brand-customer-red rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-customer-red hover:text-white transition-all active:scale-95"
                  >
                     Log Out
                  </button>
               </div>
            </div>

            <div className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100">
               <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-6">Internal Audit Notes</h4>
               <p className="text-neutral-500 text-xs font-bold leading-relaxed italic">"Account established for premium social acquisition cycles. Entity has been white-listed for global campaign participation."</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function ProfileInput({ label, value, readOnly = false, icon, type = "text", onChange }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-black uppercase text-neutral-400 ml-1 flex items-center gap-2">
          {icon} {label}
       </label>
       <input
         type={type}
         value={value}
         onChange={onChange}
         readOnly={readOnly}
         className={`w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-xs font-black uppercase outline-none focus:border-neutral-900 transition-all ${readOnly ? 'opacity-40 cursor-not-allowed' : ''}`}
       />
    </div>
  );
}

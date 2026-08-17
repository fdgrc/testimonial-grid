'use client';
import { useState } from 'react';

export default function KeyGenPage() {
  const [email, setEmail] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');

  const generateKey = () => {
    if (!email) return;
    const secret = "MY_PASSIVE_INCOME_SECRET_2026"; // MUST match the secret in app/page.tsx!
    
    let hash = 0;
    const combined = email.toLowerCase().trim() + secret;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    
    setGeneratedKey(`TG-${Math.abs(hash).toString(16).toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
        <div>
          <h1 className="text-xl font-bold">My Private Key Generator</h1>
          <p className="text-xs text-slate-400 mt-1">Use this to generate real license codes for customers who buy from you.</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold text-slate-400">Customer Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@email.com" className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none text-lime-400" />
        </div>

        <button onClick={generateKey} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold p-2.5 rounded-xl transition-colors">
          Generate License Key
        </button>

        {generatedKey && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Secure License Key:</span>
            <div className="font-mono text-lg text-yellow-400 select-all font-bold tracking-wider">{generatedKey}</div>
          </div>
        )}
      </div>
    </div>
  );
}

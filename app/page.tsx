'use client';
import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

// A simple mathematical function to validate a key without a database
function validateKey(email: string, keyToTest: string): boolean {
  if (!email || !keyToTest) return false;
  const secret = "MY_PASSIVE_INCOME_SECRET_2026"; // Change this to any secret word you want!
  
  // Combine email and secret to create a simple hash score
  let hash = 0;
  const combined = email.toLowerCase().trim() + secret;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  
  const expectedKey = `TG-${Math.abs(hash).toString(16).toUpperCase()}`;
  return keyToTest.trim().toUpperCase() === expectedKey;
}

export default function BuilderPage() {
  const [theme, setTheme] = useState('light');
  const [layout, setLayout] = useState('grid');
  const [userEmail, setUserEmail] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  
  const [reviews, setReviews] = useState<Testimonial[]>([
    { name: "Sarah Jenkins", role: "SaaS Founder", text: "This tool completely transformed our product launch velocity! Love the layout customizer options.", avatar: "" },
    { name: "Alex Rivera", role: "Indie Creator", text: "Setting this up took me less than 2 minutes. Fits into my Framer site seamlessly with no adjustments needed.", avatar: "" }
  ]);

  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com';
    const jsonStr = encodeURIComponent(JSON.stringify(reviews));
    
    // SECURITY CHECK: Watermark is only removed if the key matches their email perfectly!
    const isPremiumActive = validateKey(userEmail, licenseKey);
    
    const embedUrl = `${baseUrl}/embed?theme=${theme}&layout=${layout}&branding=${!isPremiumActive}&data=${jsonStr}`;
    setEmbedCode(`<iframe src="${embedUrl}" width="100%" height="600px" frameborder="0" style="border:none; border-radius:16px;"></iframe>`);
  }, [theme, layout, reviews, userEmail, licenseKey]);

  const updateReview = (index: number, field: keyof Testimonial, value: string) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    setReviews(updated);
  };

  const handleAvatarUpload = (index: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateReview(index, 'avatar', reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 max-h-[85vh] overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-full">Secure Engine v2.0</span>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 mt-2">Testimonial Grid Builder</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Theme Base</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="light">Light Theme</option>
                <option value="dark">Dark Slate</option>
                <option value="cyber">Cyberpunk Neon</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Layout Structure</label>
              <select value={layout} onChange={(e) => setLayout(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="grid">Uniform Grid</option>
                <option value="masonry">Dynamic Masonry</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Reviews Content</label>
            {reviews.map((rev, index) => (
              <div key={index} className="p-4 bg-slate-50/60 rounded-xl space-y-2 border border-slate-200/50">
                <div className="flex gap-2 items-center">
                  <label className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0 relative">
                    {rev.avatar ? <img src={rev.avatar} className="w-full h-full object-cover" alt="" /> : <span className="text-[10px] text-slate-500 font-bold">Img</span>}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarUpload(index, e.target.files?.)} />
                  </label>
                  <input type="text" value={rev.name} onChange={(e) => updateReview(index, 'name', e.target.value)} className="p-1.5 text-xs bg-white border border-slate-200 rounded w-1/2" placeholder="Client Name" />
                  <input type="text" value={rev.role} onChange={(e) => updateReview(index, 'role', e.target.value)} className="p-1.5 text-xs bg-white border border-slate-200 rounded w-1/2" placeholder="Role" />
                </div>
                <textarea value={rev.text} onChange={(e) => updateReview(index, 'text', e.target.value)} rows={2} className="w-full p-2 text-xs bg-white border border-slate-200 rounded resize-none" placeholder="Feedback text..." />
              </div>
            ))}
          </div>

          {/* NEW SECURE LICENSE INPUTS */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Premium Verification</label>
            <div className="grid grid-cols-1 gap-2">
              <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" placeholder="Your Purchase Email Address" />
              <input type="password" value={licenseKey} onChange={(e) => setLicenseKey(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" placeholder="Paste Secure License Key (TG-...)" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">HTML Code Snippet</label>
            <div className="relative">
              <textarea readOnly value={embedCode} rows={3} className="w-full p-3 font-mono text-[11px] bg-slate-900 text-slate-300 rounded-xl resize-none" />
              <button onClick={() => navigator.clipboard.writeText(embedCode)} className="absolute bottom-3 right-3 bg-white/10 hover:bg-white/20 text-white font-medium text-[10px] px-2.5 py-1.5 rounded">
                Copy Code
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Preview Canvas</span>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm h-[80vh]">
            <iframe src={`/embed?theme=${theme}&layout=${layout}&branding=${!validateKey(userEmail, licenseKey)}&data=${encodeURIComponent(JSON.stringify(reviews))}`} width="100%" height="100%" className="border-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

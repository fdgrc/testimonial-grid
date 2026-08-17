'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function WidgetContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme') || 'light';
  const layout = searchParams.get('layout') || 'grid';
  const showBranding = searchParams.get('branding') !== 'false';
  
  let reviews = [];
  try {
    const rawReviews = searchParams.get('data');
    if (rawReviews) reviews = JSON.parse(decodeURIComponent(rawReviews));
  } catch (e) {
    reviews = [{ name: "Error", role: "System", text: "Failed to parse incoming payload data structure." }];
  }

  const themeStyles = {
    light: 'bg-white text-slate-900 border-slate-100',
    dark: 'bg-slate-950 text-slate-100 border-slate-900',
    cyber: 'bg-black text-lime-400 border-lime-500 font-mono'
  };

  const cardStyles = {
    light: 'bg-slate-50/80 border border-slate-200/50 shadow-sm break-inside-avoid mb-4',
    dark: 'bg-slate-900/60 border border-slate-800/80 shadow-md break-inside-avoid mb-4',
    cyber: 'bg-zinc-900/80 border-2 border-dashed border-lime-500/30 break-inside-avoid mb-4'
  };

  const layoutWrapperClass = layout === 'masonry' 
    ? 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4' 
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <div className={`min-h-screen p-4 flex flex-col justify-between ${themeStyles[theme] || themeStyles.light}`}>
      <div className={layoutWrapperClass}>
        {reviews.map((rev, i) => (
          <div key={i} className={`p-6 rounded-xl flex flex-col justify-between ${cardStyles[theme] || cardStyles.light}`}>
            <p className="text-sm leading-relaxed opacity-90 mb-4">"{rev.text}"</p>
            <div className="flex items-center gap-3 pt-3 border-t border-current/10">
              {rev.avatar ? (
                <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xs uppercase">
                  {rev.name ? rev.name.charAt(0) : 'C'}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-xs tracking-tight">{rev.name}</span>
                <span className="text-[10px] opacity-60 font-medium tracking-wide">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showBranding && (
        <div className="mt-8 text-center border-t border-current/10 pt-4 pb-2">
          <a href="https://your-domain.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold opacity-40 hover:opacity-100">
            ⚡ Powered by <span className="underline decoration-indigo-500 decoration-2">TestimonialGrid</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default function EmbedWidget() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Widget...</div>}>
      <WidgetContent />
    </Suspense>
  );
}

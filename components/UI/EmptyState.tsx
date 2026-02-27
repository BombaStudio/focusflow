import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "Tüm görevler tamamlandı.", 
  description = "Sistem beklemede." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-800 rounded-xl bg-[#0a0a0a]/50">
      <div className="w-12 h-12 rounded-full bg-emerald-500/5 flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-zinc-500">{title}</p>
      {description && <p className="text-zinc-600 text-sm mt-1">{description}</p>}
    </div>
  );
};

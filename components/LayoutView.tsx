import React, { ReactNode } from 'react';

interface LayoutViewProps {
  children: ReactNode;
}

export const LayoutView: React.FC<LayoutViewProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] font-sans selection:bg-emerald-500/30">
      {/* Arka plan ambiyans ışıkları */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex w-full max-w-xl flex-col gap-8 p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
};

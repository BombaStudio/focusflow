import React, { ReactNode } from 'react';

interface LayoutViewProps {
  children: ReactNode;
}

export const LayoutView: React.FC<LayoutViewProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-[#050505] font-sans selection:bg-emerald-500/30 overflow-x-hidden pt-12 pb-24 sm:py-20 md:py-32">
      {/* Arka plan ambiyans ışıkları */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] sm:w-[40%] sm:h-[40%] rounded-full bg-emerald-900/10 blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] sm:w-[40%] sm:h-[40%] rounded-full bg-emerald-900/10 blur-[100px] sm:blur-[120px]" />
      </div>

      <main className="relative z-10 flex w-full md:w-3/4 lg:w-1/2 flex-col gap-6 sm:gap-8 px-5 sm:px-10">
        {children}
      </main>
    </div>
  );
};

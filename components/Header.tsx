import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <h1 className="text-sm font-medium tracking-[0.2em] text-emerald-400/80 uppercase">
          Focus_Flow // Terminal
        </h1>
      </div>
      <h2 className="text-4xl font-light tracking-tight text-zinc-100">
        Görev <span className="font-semibold text-emerald-400 shadow-emerald-400/20">Protokolü</span>
      </h2>
    </header>
  );
};

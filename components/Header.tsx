import React from 'react';

interface HeaderProps {
  title?: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <h1 className="text-sm font-medium tracking-[0.2em] text-emerald-400/80 uppercase">
          {title}
        </h1>
      </div>
      <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-100 wrap-break-word">
        {description}
      </h2>
    </header>
  );
};

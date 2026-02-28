"use client";

import React from 'react';
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  title?: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <h1 className="text-sm font-medium tracking-[0.2em] text-emerald-400/80 uppercase">
            {title}
          </h1>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-100 wrap-break-word">
          {description}
        </h2>
      </div>

      {session?.user && (
        <div className="flex items-center gap-3 bg-[#0a0a0a] py-2 px-4 rounded-xl border border-zinc-800/80">
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || "Kullanıcı Resmi"} 
              className="w-8 h-8 rounded-full border border-zinc-700" 
            />
          )}
          <div className="flex flex-col items-start sm:items-end">
             <span className="text-sm text-zinc-300 font-medium">{session.user.name || session.user.email}</span>
             <span className="text-[10px] tracking-wider text-emerald-500/70 font-semibold uppercase">Bağlantı Kuruldu</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-zinc-800 ml-2 mr-1"></div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="hidden sm:block text-xs font-bold tracking-widest uppercase text-red-500/70 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-500/10"
            title="Sistemden Çıkış Yap"
          >
            ÇIKIŞ
          </button>
          
          {/* Mobil İçin Çıkış Butonu */}
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="sm:hidden ml-auto flex items-center justify-center p-2 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      )}
    </header>
  );
};

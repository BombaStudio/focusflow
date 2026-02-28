import React from 'react';
import { Button } from './Button';

interface AuthEmptyStateProps {
  onLogin: () => void;
}

export const AuthEmptyState: React.FC<AuthEmptyStateProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 mt-8 text-center border border-dashed border-zinc-800 rounded-xl bg-[#0a0a0a]/50 relative group">
      <div className="absolute -inset-0.5 bg-linear-to-b from-blue-500/5 to-transparent rounded-xl blur opacity-30 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-medium text-zinc-300 mb-2 mt-2">Sisteme Giriş Yapın</h2>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          Focus_Flow terminaline erişmek ve görev protokollerini yönetmek için güvenli bir şekilde kimlik doğrulaması gerçekleştirin.
        </p>

        <Button 
          onClick={onLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-6! py-3.5! bg-zinc-100! hover:bg-white! text-zinc-900! border-none rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all"
        >
          <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google ile Devam Et
        </Button>
      </div>
    </div>
  );
};

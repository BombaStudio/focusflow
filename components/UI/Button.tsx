import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-6 py-2 bg-zinc-900 text-emerald-400 rounded-lg border border-zinc-800 hover:bg-emerald-400 hover:text-zinc-950 font-medium transition-all shadow-[0_0_15px_rgba(52,211,153,0)] hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

import React, { forwardRef } from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full bg-transparent px-4 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none ${className}`}
      />
    );
  }
);

InputField.displayName = "InputField";

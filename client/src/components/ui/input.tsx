import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={`w-full rounded-lg border ${
            error 
              ? "border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/20" 
              : "border-[#2A2A4A] bg-[#1A1A2E]/50 focus:border-[#9945FF] focus:ring-[#9945FF]/20"
          } px-4 py-2 text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 transition-all duration-200 ${className}`}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

import React from "react";
import { cn } from "../../lib/utils";  // ShadCN utility for class name merging

interface InputProps {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  className?: string; // Optional className for further customization
  disabled?: boolean;
  error?: string; // Optional error message
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, className, disabled, error }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "px-4 py-2 rounded-md border border-gray-300 bg-[#1A1A2E]/50 focus:ring-[#9945FF] focus:border-[#9945FF] text-white placeholder:text-[#6B7280] focus:outline-none transition-all",
          error ? "border-red-500" : "",
          className
        )}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export { Input };

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    // Base button styles
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 disabled:opacity-50 disabled:pointer-events-none";
    
    // Variant styles
    const variantStyles = {
      default: "bg-[#9945FF] text-white hover:bg-opacity-90",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border-[#9945FF] border text-[#9945FF] hover:bg-[#9945FF] hover:text-white",
      secondary: "bg-[#14F195] text-[#1F2937] hover:bg-opacity-90",
      ghost: "hover:bg-[#9945FF]/10 text-[#9945FF]",
      link: "text-[#9945FF] underline-offset-4 hover:underline"
    };
    
    // Size styles
    const sizeStyles = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 h-9 text-xs",
      lg: "px-8 py-3 text-base",
      icon: "h-10 w-10"
    };

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

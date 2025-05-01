import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    id, 
    name,
    leftIcon,
    rightIcon,
    fullWidth = false,
    ...props 
  }, ref) => {
    const inputId = id || name;
    const widthClass = fullWidth ? "w-full" : "";
    
    return (
      <div className={cn("flex flex-col gap-1.5", widthClass)}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            name={name}
            ref={ref}
            className={cn(
              "px-4 py-2 h-10 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              widthClass,
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
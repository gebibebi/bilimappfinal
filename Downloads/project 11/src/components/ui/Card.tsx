import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = ({ 
  className, 
  children, 
  hoverable = false,
  ...props 
}: CardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200",
        hoverable && "transition-all hover:shadow-md hover:-translate-y-1",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div 
      className={cn("p-5 border-b border-gray-200", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3 
      className={cn("text-lg font-semibold", className)} 
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = ({ 
  className, 
  children, 
  ...props 
}: CardDescriptionProps) => {
  return (
    <p 
      className={cn("text-sm text-gray-500 mt-1", className)} 
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div 
      className={cn("p-5 bg-gray-50 border-t border-gray-200", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
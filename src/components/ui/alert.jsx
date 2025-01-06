import React from 'react';

export const Alert = ({ variant = 'default', className = '', children, ...props }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div
      className={`p-4 rounded-lg ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ className = '', children, ...props }) => (
  <div className={`text-sm ${className}`} {...props}>
    {children}
  </div>
);
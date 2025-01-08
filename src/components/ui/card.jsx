import React from 'react';
import { Button } from '../ui/button';

export const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);


export const CardButton = ({ className = '', children, ...props }) => (
  <Button 
    className={`mt-4 w-full ${className}`} 
    {...props}
  >
    {children}
  </Button>
);
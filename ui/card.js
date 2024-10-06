// src/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 bg-gray-800 text-white ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

export const CardDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

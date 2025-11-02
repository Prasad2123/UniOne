import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'card';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${padding} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;



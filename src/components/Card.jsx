import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick,
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'card';
  const hoverClasses = hover ? 'hover:scale-105 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${padding} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;



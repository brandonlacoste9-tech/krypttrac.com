import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-xl p-6 ${
        hover ? 'hover:glass-strong transition-all duration-300 hover:scale-[1.02]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

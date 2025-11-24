import React, { memo } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = memo(function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-xl p-6 ${
        hover ? 'hover:glass-strong hover:neon-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer' : 'transition-all duration-300'
      } ${className}`}
    >
      {children}
    </div>
  );
});

export default GlassCard;

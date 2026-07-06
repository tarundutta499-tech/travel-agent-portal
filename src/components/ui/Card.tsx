'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: 'none' | 'lift' | 'tilt';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverEffect = 'lift', ...props }, ref) => {
    const baseStyles = 'bg-cream dark:bg-obsidian-light rounded-3xl border border-card-border overflow-hidden shadow-sm transition-all duration-300';
    
    const animations = {
      none: {},
      lift: {
        whileHover: { y: -6, boxShadow: 'var(--shadow-lg)', borderColor: 'rgba(255, 90, 54, 0.2)' },
      },
      tilt: {
        whileHover: { y: -4, rotate: 0.5, boxShadow: 'var(--shadow-lg)', borderColor: 'rgba(15, 92, 102, 0.2)' },
      }
    };

    return (
      <motion.div
        ref={ref}
        {...animations[hoverEffect]}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`${baseStyles} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

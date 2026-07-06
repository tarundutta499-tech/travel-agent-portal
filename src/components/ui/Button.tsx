'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'forest' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-display font-bold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    
    const variants = {
      primary: 'bg-primary hover:bg-primary-dark text-cream shadow-md shadow-primary/25 border-2 border-primary hover:border-primary-dark hover:shadow-lg hover:shadow-primary/30',
      secondary: 'bg-secondary hover:bg-secondary-dark text-cream shadow-md shadow-secondary/25 border-2 border-secondary hover:border-secondary-dark',
      forest: 'bg-forest hover:bg-forest-light text-cream shadow-md shadow-forest/25 border-2 border-forest hover:border-forest-light',
      outline: 'bg-transparent border-2 border-obsidian hover:bg-obsidian hover:text-sand text-obsidian dark:border-sand dark:hover:bg-sand dark:hover:text-obsidian',
      ghost: 'bg-transparent text-obsidian hover:bg-obsidian/5 dark:text-sand dark:hover:bg-sand/10',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

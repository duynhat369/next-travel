'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardWithHeaderProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  animationDelay?: number;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    },
  },
};

const headerVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: 'easeOut',
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

const variantStyles = {
  default: 'bg-white border border-gray-200',
  //   custom below
  elevated: 'bg-white border-0',
  bordered: 'bg-white border-2 border-gray-300 hover:border-gray-400',
  ghost: 'bg-transparent border-0 hover:bg-gray-50',
};

const sizeStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function CardWithHeader({
  title,
  children,
  className,
  headerClassName,
  contentClassName,
  variant = 'default',
  size = 'md',
  animationDelay = 0,
}: CardWithHeaderProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        animationDelay: `${animationDelay}s`,
      }}
      className={className}
    >
      {/* Header Section */}
      <motion.header variants={headerVariants} className={cn('mb-4 relative', headerClassName)}>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: animationDelay + 0.1,
            ease: 'easeOut',
          }}
          className={cn('text-xl font-semibold text-foreground')}
        >
          {title}
        </motion.h2>
      </motion.header>
      <motion.div
        className={cn(
          // Base styles
          'relative rounded-xl transition-all duration-300 ease-out',
          'backdrop-blur-sm',
          contentClassName,
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size]
        )}
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  delay?: number;
  className?: string;
}

export function ProgressBar({ value, delay = 0, className = '' }: ProgressBarProps) {
  return (
    <div className={`relative h-1.5 w-full rounded-full bg-white/5 ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
        initial={{ width: '0%' }}
        animate={{ width: `${value}%` }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: delay + 0.3,
          mass: 1.2,
        }}
      >
        <motion.div
          className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1], scale: 1 }}
          transition={{
            opacity: { duration: 1, delay: delay + 0.5 },
            scale: { type: 'spring', stiffness: 300, damping: 20, delay: delay + 0.5 },
          }}
        >
          <div className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-40" />
        </motion.div>
      </motion.div>
    </div>
  );
}

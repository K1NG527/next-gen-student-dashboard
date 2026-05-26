'use client';

import { motion } from 'framer-motion';

interface SkeletonCardProps {
  className?: string;
  variant?: 'hero' | 'course' | 'activity';
}

export function SkeletonCard({ className = '', variant = 'course' }: SkeletonCardProps) {
  if (variant === 'hero') {
    return (
      <motion.div
        className={`col-span-2 rounded-2xl border border-white/[0.06] bg-[#13131f] p-6 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="animate-pulse-slow space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-slate-800/60" />
              <div className="h-7 w-56 rounded bg-slate-800/60" />
            </div>
            <div className="h-8 w-28 rounded-full bg-slate-800/60" />
          </div>
          <div className="h-4 w-72 rounded bg-slate-800/60" />
          <div className="flex items-center justify-between pt-4">
            <div className="h-3 w-36 rounded bg-slate-800/60" />
            <div className="h-3 w-20 rounded bg-slate-800/60" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'activity') {
    return (
      <motion.div
        className={`col-span-2 rounded-2xl border border-white/[0.06] bg-[#13131f] p-6 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="animate-pulse-slow space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-36 rounded bg-slate-800/60" />
            <div className="h-4 w-24 rounded bg-slate-800/60" />
          </div>
          <div className="grid grid-cols-16 gap-1">
            {Array.from({ length: 112 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm bg-slate-800/60" />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`rounded-2xl border border-white/[0.06] bg-[#13131f] p-5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-pulse-slow space-y-4">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 rounded-xl bg-slate-800/60" />
          <div className="h-5 w-5 rounded bg-slate-800/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-slate-800/60" />
          <div className="h-3 w-20 rounded bg-slate-800/60" />
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded-full bg-slate-800/60" />
          <div className="flex justify-between">
            <div className="h-3 w-12 rounded bg-slate-800/60" />
            <div className="h-3 w-12 rounded bg-slate-800/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

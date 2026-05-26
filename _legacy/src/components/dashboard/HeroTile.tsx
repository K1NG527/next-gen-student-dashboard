'use client';

import { motion } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';

interface HeroTileProps {
  name?: string;
  streak?: number;
  streakRecord?: number;
}

export function HeroTile({ name = 'Alex', streak = 12, streakRecord = 15 }: HeroTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 1.0,
        delay: 0.1,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className="noise-overlay col-span-2 row-span-1 cursor-default overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161621] p-6 transition-colors hover:border-white/[0.12] hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]"
      style={{ '--noise-opacity': '0.04' } as React.CSSProperties}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-xl leading-tight sm:text-2xl">
            <span className="font-serif italic text-slate-300">Welcome back,</span>{' '}
            <span className="font-bold text-slate-100">{name}</span>
          </h1>
          <p className="text-sm text-slate-400">
            You're on fire!{' '}
            <span className="font-medium text-amber-400">
              {streakRecord - streak} more days
            </span>{' '}
            to beat your record.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-2 self-start rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2"
        >
          <Flame className="h-5 w-5 text-amber-400" />
          <span className="font-mono text-sm font-semibold text-amber-400">
            {streak} Day Streak
          </span>
        </motion.div>
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-white/[0.04] pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated 2h ago</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>All systems operational</span>
        </div>
      </div>
    </motion.article>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Code, Database, Palette, Layers, BookOpen, MoreHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Course } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Palette,
  Layers,
};

const gradientMap: Record<string, string> = {
  Code: 'radial-gradient(circle at 80% 20%, rgba(251,191,36,0.06) 0%, transparent 50%)',
  Database: 'radial-gradient(circle at 20% 80%, rgba(251,191,36,0.05) 0%, transparent 50%)',
  Palette: 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 60%)',
  Layers: 'radial-gradient(circle at 80% 80%, rgba(251,191,36,0.05) 0%, transparent 50%)',
};

interface CourseTileProps {
  course: Course;
  index: number;
}

export function CourseTile({ course, index }: CourseTileProps) {
  const Icon = iconMap[course.icon_name] || BookOpen;
  const gradient = gradientMap[course.icon_name] || gradientMap.Code;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 1.0,
        delay: 0.2 + index * 0.1,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className="noise-overlay group relative col-span-1 row-span-1 cursor-default overflow-hidden rounded-2xl border border-white/[0.06] bg-[#13131f] p-5 transition-colors hover:border-white/[0.12] hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]"
      style={{
        '--noise-opacity': `${0.03 + index * 0.01}`,
        background: `#13131f, ${gradient}`,
        backgroundBlendMode: 'normal',
      } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10"
        >
          <Icon className="h-5 w-5 text-amber-400" />
        </motion.div>
        <button className="rounded-lg p-1 text-slate-600 opacity-0 transition-all hover:bg-white/5 hover:text-slate-400 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium tracking-tight text-slate-100">{course.title}</h3>
        <p className="text-xs text-slate-500">In progress</p>
      </div>

      <div className="mt-4 space-y-2">
        <ProgressBar value={course.progress} delay={0.3 + index * 0.1} />
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tabular-nums text-slate-500">
            {course.progress}%
          </span>
          <span className="font-mono text-xs tabular-nums text-amber-400">
            {course.progress >= 100 ? 'Complete' : `${100 - course.progress}% remaining`}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

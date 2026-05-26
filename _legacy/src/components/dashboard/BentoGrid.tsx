'use client';

import { motion } from 'framer-motion';
import { HeroTile } from './HeroTile';
import { CourseTile } from './CourseTile';
import { ActivityTile } from './ActivityTile';
import { ErrorTile } from './ErrorTile';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { Course } from '@/types';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

interface BentoGridProps {
  courses: Course[] | null;
  isLoading: boolean;
  error: string | null;
}

export function BentoGrid({ courses, isLoading, error }: BentoGridProps) {
  if (isLoading) {
    return (
      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <SkeletonCard variant="hero" className="col-span-1 sm:col-span-2" />
        <SkeletonCard variant="course" />
        <SkeletonCard variant="course" />
        <SkeletonCard variant="course" />
        <SkeletonCard variant="course" />
        <SkeletonCard variant="activity" className="col-span-1 sm:col-span-2" />
      </motion.main>
    );
  }

  if (error) {
    return (
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ErrorTile message={error} />
      </main>
    );
  }

  const courseList = courses || [];

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {/* Hero Tile - spans 2 columns */}
      <HeroTile name="Alex" streak={12} streakRecord={15} />

      {/* Course Tiles - 4 individual tiles */}
      {courseList.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}

      {/* Activity Tile - spans 2 columns */}
      <ActivityTile totalDays={142} longestStreak={18} />

      {/* Quick Stats Row - additional visual interest */}
      <StatsRow />
    </motion.main>
  );
}

function StatsRow() {
  const stats = [
    { label: 'Hours Learned', value: '86.5', suffix: 'h' },
    { label: 'Assignments', value: '24', suffix: '/ 32' },
    { label: 'Avg. Score', value: '94', suffix: '%' },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 24,
            mass: 1.0,
            delay: 0.6 + index * 0.1,
          }}
          whileHover={{
            scale: 1.02,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          className="noise-overlay col-span-1 cursor-default overflow-hidden rounded-2xl border border-white/[0.06] bg-[#13131f] p-5 transition-colors hover:border-white/[0.12] hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]"
          style={{ '--noise-opacity': `${0.03 + index * 0.015}` } as React.CSSProperties}
        >
          <div className="space-y-2">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="font-mono text-2xl font-semibold text-slate-100">
              {stat.value}
              <span className="ml-1 text-sm font-normal text-slate-500">{stat.suffix}</span>
            </p>
          </div>
        </motion.article>
      ))}
    </>
  );
}

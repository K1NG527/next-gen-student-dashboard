'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useMemo } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const DAYS = ['Mon', 'Wed', 'Fri'];

function generateActivityData(): number[][] {
  const data: number[][] = [];
  const seedRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };

  for (let week = 0; week < 20; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      const seed = week * 7 + day + 42;
      const rand = seedRandom(seed);
      if (rand > 0.85) {
        weekData.push(4);
      } else if (rand > 0.65) {
        weekData.push(3);
      } else if (rand > 0.4) {
        weekData.push(2);
      } else if (rand > 0.2) {
        weekData.push(1);
      } else {
        weekData.push(0);
      }
    }
    data.push(weekData);
  }

  return data;
}

function getOpacity(level: number): string {
  const opacities: Record<number, string> = {
    0: '0',
    1: '0.15',
    2: '0.35',
    3: '0.6',
    4: '0.9',
  };
  return opacities[level] || '0';
}

interface ActivityTileProps {
  totalDays?: number;
  longestStreak?: number;
}

export function ActivityTile({ totalDays = 142, longestStreak = 18 }: ActivityTileProps) {
  const activityData = useMemo(() => generateActivityData(), []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 1.0,
        delay: 0.5,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className="noise-overlay col-span-2 row-span-1 cursor-default overflow-hidden rounded-2xl border border-white/[0.06] bg-[#13131f] p-6 transition-colors hover:border-white/[0.12] hover:shadow-[0_0_24px_rgba(251,191,36,0.12)]"
      style={{ '--noise-opacity': '0.05' } as React.CSSProperties}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-medium text-slate-100">Study Activity</h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>{totalDays} days active</span>
          <span>Best streak: {longestStreak}d</span>
        </div>
      </div>

      <div className="flex gap-3">
        {/* Day labels */}
        <div className="flex flex-col justify-center gap-[3px] pt-5">
          {DAYS.map((day) => (
            <div key={day} className="h-[10px] text-[9px] leading-[10px] text-slate-600">
              {day}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto">
          {/* Month labels */}
          <div className="mb-1 flex gap-[3px]">
            {MONTHS.map((month, i) => (
              <div
                key={month}
                className="text-[9px] text-slate-600"
                style={{ marginLeft: i === 0 ? 0 : '12px' }}
              >
                {month}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {activityData.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                className="flex flex-col gap-[3px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + weekIndex * 0.02,
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
              >
                {week.map((level, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    className="h-[10px] w-[10px] rounded-sm"
                    style={{
                      backgroundColor:
                        level > 0
                          ? `rgba(251, 191, 36, ${getOpacity(level)})`
                          : 'rgba(255,255,255,0.04)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.7 + weekIndex * 0.02 + dayIndex * 0.005,
                      type: 'spring',
                      stiffness: 500,
                      damping: 25,
                    }}
                    whileHover={{
                      scale: 1.5,
                      backgroundColor: 'rgba(251, 191, 36, 0.8)',
                      transition: { duration: 0.15 },
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="text-[9px] text-slate-600">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-[10px] w-[10px] rounded-sm"
            style={{
              backgroundColor:
                level > 0
                  ? `rgba(251, 191, 36, ${getOpacity(level)})`
                  : 'rgba(255,255,255,0.04)',
            }}
          />
        ))}
        <span className="text-[9px] text-slate-600">More</span>
      </div>
    </motion.article>
  );
}

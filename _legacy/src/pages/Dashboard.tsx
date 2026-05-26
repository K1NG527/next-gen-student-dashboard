'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { BentoGrid } from '@/components/dashboard/BentoGrid';
import { fetchCourses } from '@/lib/supabase';
import type { Course } from '@/types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCourses() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCourses();
        if (mounted) {
          setCourses(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load courses');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadCourses();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 lg:p-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 items-center gap-2 rounded-full border border-white/[0.06] bg-[#13131f] px-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-xs font-semibold text-amber-400">
              A
            </div>
          </div>
        </header>

        <BentoGrid courses={courses} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}

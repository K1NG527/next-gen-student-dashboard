import { createClient } from '@supabase/supabase-js';
import type { Course } from '@/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!client && SUPABASE_URL && SUPABASE_ANON_KEY) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}

const SEED_COURSES: Course[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Code',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'UI/UX Fundamentals',
    progress: 45,
    icon_name: 'Palette',
    created_at: '2024-02-20T14:15:00Z',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    title: 'Database Design',
    progress: 30,
    icon_name: 'Database',
    created_at: '2024-03-10T09:00:00Z',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    title: 'System Architecture',
    progress: 90,
    icon_name: 'Layers',
    created_at: '2024-04-05T16:45:00Z',
  },
];

export async function fetchCourses(): Promise<Course[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn('Supabase not configured. Using mock data.');
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [...SEED_COURSES];
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    throw new Error('Unable to load courses. Check your connection or try again.');
  }
}

export { SEED_COURSES };

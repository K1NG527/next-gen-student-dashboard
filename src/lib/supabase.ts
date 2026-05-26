import { createBrowserClient } from '@supabase/ssr'

// Define the Course type based on the schema
export type Course = {
  id: string
  title: string
  description: string
  progress: number
  icon_name: string
  instructor: string
  duration: string
  students: number
  created_at: string
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

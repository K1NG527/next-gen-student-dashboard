import { Suspense } from "react"
import { createClient } from "@/lib/supabase-server"
import { BentoGrid } from "@/components/BentoGrid"
import { HeroTile } from "@/components/HeroTile"
import { ActivityTile } from "@/components/ActivityTile"
import { CourseGrid } from "@/components/CourseGrid"
import type { Course } from "@/lib/supabase"

const initialCourses: Course[] = [
  { id: "1", title: "Full-Stack Development with MERN", description: "Build production-grade apps using MongoDB, Express, React & Node.", progress: 78, icon_name: "Code", instructor: "Priya Sharma", duration: "42 hours", students: 12450, created_at: new Date().toISOString() },
  { id: "2", title: "Data Science & ML with Python", description: "Master pandas, scikit-learn, TensorFlow and real-world datasets.", progress: 45, icon_name: "Brain", instructor: "Arjun Mehta", duration: "56 hours", students: 9820, created_at: new Date().toISOString() },
  { id: "3", title: "UI/UX Design for Indian Markets", description: "Design intuitive interfaces for Indic language users.", progress: 92, icon_name: "Palette", instructor: "Ananya Iyer", duration: "28 hours", students: 7340, created_at: new Date().toISOString() },
  { id: "4", title: "Cloud Computing on AWS & GCP", description: "Deploy scalable infrastructure for Indian startups.", progress: 33, icon_name: "Cloud", instructor: "Vikram Desai", duration: "38 hours", students: 6150, created_at: new Date().toISOString() },
  { id: "5", title: "Cybersecurity Fundamentals", description: "Learn ethical hacking, network security & OWASP top 10.", progress: 61, icon_name: "Shield", instructor: "Neha Kulkarni", duration: "34 hours", students: 5280, created_at: new Date().toISOString() },
  { id: "6", title: "Mobile App Dev with Flutter", description: "Build cross-platform apps for Android & iOS.", progress: 17, icon_name: "Smartphone", instructor: "Rohan Gupta", duration: "46 hours", students: 8910, created_at: new Date().toISOString() },
]

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && key.length > 20)
}

export default async function DashboardPage() {
  let courses = initialCourses

  if (isConfigured()) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Error fetching courses:", error.message)
      } else if (data && data.length > 0) {
        courses = data as Course[]
      }
    } catch (err) {
      console.error("Database connection failure")
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-sm font-medium text-slate-300">Online</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform">
            S
          </div>
        </div>
      </header>

      <BentoGrid>
        <HeroTile />
        <ActivityTile />
        <CourseGrid courses={courses} />
      </BentoGrid>
    </div>
  )
}

import { createClient } from "@/lib/supabase-server"
import { CourseGrid } from "@/components/CourseGrid"
import type { Course } from "@/lib/supabase"
import { BookOpen } from "lucide-react"

// Fallback mock data
const mockCourses: Course[] = [
  { id: "1", title: "Full-Stack Development with MERN", description: "Build production-grade apps using MongoDB, Express, React & Node.", progress: 78, icon_name: "Code", instructor: "Priya Sharma", duration: "42 hours", students: 12450, created_at: new Date().toISOString() },
  { id: "2", title: "Data Science & ML with Python", description: "Master pandas, scikit-learn, TensorFlow and real-world datasets.", progress: 45, icon_name: "Brain", instructor: "Arjun Mehta", duration: "56 hours", students: 9820, created_at: new Date().toISOString() },
  { id: "3", title: "UI/UX Design for Indian Markets", description: "Design intuitive interfaces for Indic language users.", progress: 92, icon_name: "Palette", instructor: "Ananya Iyer", duration: "28 hours", students: 7340, created_at: new Date().toISOString() },
  { id: "4", title: "Cloud Computing on AWS & GCP", description: "Deploy scalable infrastructure for Indian startups.", progress: 33, icon_name: "Cloud", instructor: "Vikram Desai", duration: "38 hours", students: 6150, created_at: new Date().toISOString() },
  { id: "5", title: "Cybersecurity Fundamentals", description: "Learn ethical hacking, network security & OWASP top 10.", progress: 61, icon_name: "Shield", instructor: "Neha Kulkarni", duration: "34 hours", students: 5280, created_at: new Date().toISOString() },
  { id: "6", title: "Mobile App Dev with Flutter", description: "Build cross-platform apps for Android & iOS.", progress: 17, icon_name: "Smartphone", instructor: "Rohan Gupta", duration: "46 hours", students: 8910, created_at: new Date().toISOString() },
]

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return false
  try {
    new URL(url)
    return key.length > 20
  } catch {
    return false
  }
}

export default async function CoursesPage() {
  let courses = mockCourses

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        courses = data as Course[]
      }
    } catch {
      // fallback to mock
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen size={24} className="text-indigo-400" />
          My Courses
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {courses.length} courses enrolled
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseGrid courses={courses} />
      </div>
    </div>
  )
}

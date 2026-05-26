"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { BentoGridItem } from "./BentoGrid"
import type { Course } from "@/lib/supabase"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const [progress, setProgress] = useState(0)
  
  // Dynamic Icon
  // @ts-ignore - Dynamic key lookup for Lucide
  const Icon = LucideIcons[course.icon_name] || LucideIcons.BookOpen

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(course.progress)
    }, 500)
    return () => clearTimeout(timer)
  }, [course.progress])

  // 3D Tilt Effect
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useMotionTemplate`${mouseYSpring}deg`
  const rotateY = useMotionTemplate`${mouseXSpring}deg`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Calculate rotation between -5 and 5 degrees
    const rX = ((mouseY / height) - 0.5) * -10
    const rY = ((mouseX / width) - 0.5) * 10
    
    x.set(rY)
    y.set(rX)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Determine progress bar color based on progress
  const progressGradient = 
    course.progress >= 75 ? "from-emerald-400 to-cyan-400" :
    course.progress >= 40 ? "from-amber-400 to-orange-400" :
    "from-rose-400 to-pink-400"

  // Format student count
  const formattedStudents = course.students >= 1000 
    ? `${(course.students / 1000).toFixed(1)}K` 
    : String(course.students || 0)

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="h-full cursor-pointer perspective-1000"
    >
      <BentoGridItem className="h-full relative overflow-visible shadow-xl transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        {/* Subtle Grain Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                <Icon size={24} className="text-white" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
                {course.progress}%
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1.5 line-clamp-2">
              {course.title}
            </h3>
            
            {course.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {course.description}
              </p>
            )}
          </div>

          <div>
            {/* Meta info row */}
            <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
              {course.instructor && (
                <span className="flex items-center gap-1">
                  <LucideIcons.User size={12} />
                  {course.instructor}
                </span>
              )}
              {course.duration && (
                <span className="flex items-center gap-1">
                  <LucideIcons.Clock size={12} />
                  {course.duration}
                </span>
              )}
              {course.students > 0 && (
                <span className="flex items-center gap-1">
                  <LucideIcons.Users size={12} />
                  {formattedStudents}
                </span>
              )}
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${progressGradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </BentoGridItem>
    </motion.div>
  )
}

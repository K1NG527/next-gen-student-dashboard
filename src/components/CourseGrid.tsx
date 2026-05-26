"use client"

import { motion } from "framer-motion"
import { CourseCard } from "./CourseCard"
import type { Course } from "@/lib/supabase"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="contents" // Allows it to participate in the CSS grid of the parent
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants} className="h-full">
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  )
}

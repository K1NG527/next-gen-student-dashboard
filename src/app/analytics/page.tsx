"use client"

import { motion } from "framer-motion"
import { BentoGridItem } from "@/components/BentoGrid"
import { TrendingUp, Users, Clock, Award, BarChart2, BookOpen } from "lucide-react"

const stats = [
  { label: "Total Hours", value: "156", change: "+12.5%", icon: Clock, color: "from-cyan-400 to-blue-500" },
  { label: "Courses Enrolled", value: "6", change: "+2", icon: BookOpen, color: "from-violet-400 to-purple-500" },
  { label: "Certificates", value: "3", change: "+1", icon: Award, color: "from-amber-400 to-orange-500" },
  { label: "Global Rank", value: "#847", change: "+63", icon: TrendingUp, color: "from-emerald-400 to-teal-500" },
]

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 3.0 },
  { day: "Fri", hours: 5.5 },
  { day: "Sat", hours: 6.0 },
  { day: "Sun", hours: 3.5 },
]

const topSubjects = [
  { name: "React & Next.js", hours: 48, percentage: 85 },
  { name: "Python & ML", hours: 36, percentage: 65 },
  { name: "UI/UX Design", hours: 28, percentage: 50 },
  { name: "Cloud & DevOps", hours: 22, percentage: 40 },
  { name: "Cybersecurity", hours: 14, percentage: 25 },
]

const maxHours = Math.max(...weeklyData.map(d => d.hours))

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 w-full max-w-7xl mx-auto">
      <header className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          <BarChart2 size={24} className="text-indigo-400" />
          Analytics
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground mt-1"
        >
          Track your learning progress and insights
        </motion.p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <BentoGridItem className="group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </BentoGridItem>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <BentoGridItem className="group">
            <h3 className="text-lg font-semibold text-white mb-6">Weekly Study Hours</h3>
            <div className="flex items-end gap-3 h-48">
              {weeklyData.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                    transition={{
                      delay: 0.4 + i * 0.08,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg relative group/bar"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-white font-medium opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded whitespace-nowrap">
                      {d.hours}h
                    </div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground border-t border-white/5 pt-4">
              <span>This Week</span>
              <span className="text-white font-medium">
                {weeklyData.reduce((a, b) => a + b.hours, 0)} Hours Total
              </span>
            </div>
          </BentoGridItem>
        </motion.div>

        {/* Top Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <BentoGridItem className="group">
            <h3 className="text-lg font-semibold text-white mb-6">Top Subjects</h3>
            <div className="flex flex-col gap-4">
              {topSubjects.map((subject, i) => (
                <div key={subject.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-slate-300 font-medium">{subject.name}</span>
                    <span className="text-xs text-muted-foreground">{subject.hours}h</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.percentage}%` }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 80, damping: 15 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoGridItem>
        </motion.div>
      </div>
    </div>
  )
}

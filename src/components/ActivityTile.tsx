"use client"

import { motion } from "framer-motion"
import { BentoGridItem } from "./BentoGrid"

export function ActivityTile() {
  // Generate mock contribution data
  const weeks = 8
  const daysPerWeek = 7
  
  const generateData = () => {
    return Array.from({ length: weeks * daysPerWeek }).map((_, i) => {
      const level = Math.floor(Math.random() * 4) // 0 to 3
      return { id: i, level }
    })
  }

  const data = generateData()

  return (
    <BentoGridItem className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-6">Activity Graph</h3>
        
        <div className="flex gap-2 justify-between h-32 items-end">
          {/* Simple Bar Chart Visualization */}
          {Array.from({ length: 12 }).map((_, i) => {
            const height = 20 + Math.random() * 80
            return (
              <div key={i} className="w-full bg-white/5 rounded-t-sm group-hover:bg-white/10 transition-colors relative overflow-hidden flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ 
                    delay: 0.1 + i * 0.05, 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15 
                  }}
                  className="w-full bg-gradient-to-t from-purple-500 to-indigo-400 rounded-t-sm"
                />
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground border-t border-white/5 pt-4">
          <span>Last 30 days</span>
          <span className="text-white font-medium">24 Hours Learned</span>
        </div>
      </div>
    </BentoGridItem>
  )
}

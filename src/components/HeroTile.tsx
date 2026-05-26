"use client"

import { motion } from "framer-motion"
import { BentoGridItem } from "./BentoGrid"

export function HeroTile() {
  return (
    <BentoGridItem className="md:col-span-2 relative overflow-hidden group">
      {/* Abstract Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />
      
      <div className="relative z-10 flex flex-col justify-between h-full gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2"
          >
            Dashboard
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Student</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-muted-foreground text-lg max-w-xl"
          >
            You're doing great! Keep up the momentum and dive back into your latest courses.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 w-fit backdrop-blur-md"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            🔥
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Learning Streak</p>
            <p className="text-2xl font-bold text-white">12 Days</p>
          </div>
        </motion.div>
      </div>
    </BentoGridItem>
  )
}

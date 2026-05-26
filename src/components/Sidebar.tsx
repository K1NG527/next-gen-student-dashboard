"use client"

import { useState, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, BarChart2, Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart2, href: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current)
      collapseTimer.current = null
    }
    setExpanded(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    collapseTimer.current = setTimeout(() => {
      setExpanded(false)
    }, 300) // slight delay so quick re-entries don't flicker
  }, [])

  // Determine which nav item is active based on the current URL
  const activeId = navItems.find((item) => {
    if (item.href === "/") return pathname === "/"
    return pathname.startsWith(item.href)
  })?.id ?? "dashboard"

  return (
    <>
      {/* Mobile Top Nav / Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          NextGen
        </h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-muted-foreground hover:text-white transition-colors">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: expanded ? 256 : 72 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "hidden md:flex fixed top-0 left-0 h-screen bg-card/80 backdrop-blur-xl border-r border-white/5 z-40 flex-col pt-6 overflow-hidden"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-12 mb-10 px-5 overflow-hidden">
          <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
            N
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent whitespace-nowrap"
              >
                NextGen
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Links */}
        <ul className="flex flex-col gap-1.5 px-3 flex-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="relative flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-white/[0.08] rounded-xl border border-white/5"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <item.icon
                    size={20}
                    className={cn(
                      "relative z-10 min-w-[1.25rem] transition-colors",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                    )}
                  />
                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                          "relative z-10 font-medium whitespace-nowrap transition-colors",
                          isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Bottom glow accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4 mb-4" />
      </motion.nav>

      {/* Desktop spacer — pushes main content right of the collapsed sidebar */}
      <div className="hidden md:block min-w-[72px] w-[72px]" />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 flex flex-col pt-20 md:hidden"
            >
              <ul className="flex flex-col gap-2 px-4 flex-1">
                {navItems.map((item) => {
                  const isActive = activeId === item.id
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="relative flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors group"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-nav-mobile"
                            className="absolute inset-0 bg-white/10 rounded-xl"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                        )}
                        <item.icon
                          size={20}
                          className={cn(
                            "relative z-10 transition-colors",
                            isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                          )}
                        />
                        <span
                          className={cn(
                            "relative z-10 font-medium transition-colors",
                            isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { motion } from "framer-motion"
import { BentoGridItem } from "@/components/BentoGrid"
import { Settings as SettingsIcon, User, Bell, Palette, Shield, Globe, Moon, Volume2, Eye } from "lucide-react"
import { useState } from "react"

interface ToggleProps {
  enabled: boolean
  onToggle: () => void
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        enabled ? "bg-indigo-500" : "bg-white/10"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  )
}

interface SettingRowProps {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}

function SettingRow({ icon: Icon, title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
          <Icon size={18} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [sounds, setSounds] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <div className="p-4 md:p-6 lg:p-8 pt-20 md:pt-8 w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          <SettingsIcon size={24} className="text-indigo-400" />
          Settings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground mt-1"
        >
          Manage your account and preferences
        </motion.p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <BentoGridItem>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User size={18} className="text-indigo-400" />
              Profile
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20 border-2 border-white/10">
                S
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Student</p>
                <p className="text-sm text-muted-foreground">student@nextgen.edu.in</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  defaultValue="Student"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                <input
                  type="text"
                  defaultValue="Bengaluru, India"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
            </div>
          </BentoGridItem>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <BentoGridItem>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Palette size={18} className="text-indigo-400" />
              Preferences
            </h3>
            <SettingRow icon={Moon} title="Dark Mode" description="Use dark theme across the platform">
              <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            </SettingRow>
            <SettingRow icon={Bell} title="Notifications" description="Receive course updates and reminders">
              <Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} />
            </SettingRow>
            <SettingRow icon={Volume2} title="Sound Effects" description="Play sounds on interactions">
              <Toggle enabled={sounds} onToggle={() => setSounds(!sounds)} />
            </SettingRow>
            <SettingRow icon={Eye} title="Reduced Motion" description="Minimize animations for accessibility">
              <Toggle enabled={reducedMotion} onToggle={() => setReducedMotion(!reducedMotion)} />
            </SettingRow>
          </BentoGridItem>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <BentoGridItem>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Shield size={18} className="text-indigo-400" />
              Privacy & Security
            </h3>
            <SettingRow icon={Globe} title="Public Profile" description="Allow others to view your profile and progress">
              <Toggle enabled={publicProfile} onToggle={() => setPublicProfile(!publicProfile)} />
            </SettingRow>
            <SettingRow icon={Shield} title="Two-Factor Auth" description="Add an extra layer of security">
              <button className="px-4 py-1.5 text-xs font-medium text-indigo-400 border border-indigo-400/30 rounded-lg hover:bg-indigo-400/10 transition-colors">
                Enable
              </button>
            </SettingRow>
          </BentoGridItem>
        </motion.div>
      </div>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface IconMap {
  [key: string]: LucideIcon;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}

export interface ActivityWeek {
  days: ActivityDay[];
}

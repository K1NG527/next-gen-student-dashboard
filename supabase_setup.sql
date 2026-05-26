-- ===================================================
-- Next-Gen Learning Dashboard — Supabase Setup
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ===================================================

-- 1. Drop old table and recreate with richer schema
DROP TABLE IF EXISTS public.courses;

CREATE TABLE public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name text NOT NULL,
  instructor text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  students integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (prototype — no auth required)
CREATE POLICY "Enable read access for all users" ON public.courses
  AS PERMISSIVE FOR SELECT
  TO public
  USING (true);

-- 4. Seed with India-focused course data
INSERT INTO public.courses (title, description, progress, icon_name, instructor, duration, students) VALUES
  (
    'Full-Stack Development with MERN',
    'Build production-grade apps using MongoDB, Express, React & Node. Covers REST APIs, JWT auth, and deployment on AWS.',
    78,
    'Code',
    'Priya Sharma',
    '42 hours',
    12450
  ),
  (
    'Data Science & ML with Python',
    'Master pandas, scikit-learn, TensorFlow and real-world datasets. Includes capstone projects on IPL analytics & census data.',
    45,
    'Brain',
    'Arjun Mehta',
    '56 hours',
    9820
  ),
  (
    'UI/UX Design for Indian Markets',
    'Design intuitive interfaces for Indic language users. Covers accessibility, UPI payment flows, and mobile-first design.',
    92,
    'Palette',
    'Ananya Iyer',
    '28 hours',
    7340
  ),
  (
    'Cloud Computing on AWS & GCP',
    'Deploy scalable infrastructure for Indian startups. Hands-on with EC2, Lambda, Cloud Run, and cost optimisation strategies.',
    33,
    'Cloud',
    'Vikram Desai',
    '38 hours',
    6150
  ),
  (
    'Cybersecurity Fundamentals',
    'Learn ethical hacking, network security & OWASP top 10. Case studies from Indian banking and fintech sectors.',
    61,
    'Shield',
    'Neha Kulkarni',
    '34 hours',
    5280
  ),
  (
    'Mobile App Dev with Flutter',
    'Build cross-platform apps for Android & iOS. Covers state management, Firebase integration, and Play Store deployment.',
    17,
    'Smartphone',
    'Rohan Gupta',
    '46 hours',
    8910
  );

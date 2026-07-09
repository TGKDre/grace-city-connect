-- Run this in your Supabase SQL editor (https://supabase.com/dashboard/project/_/sql/new)

-- 1. Campuses
CREATE TABLE campuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  address TEXT DEFAULT '',
  service_times JSONB DEFAULT '{}',
  stream_url TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  pastor_name TEXT DEFAULT '',
  pastor_photo TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 2. Fellowships
CREATE TABLE fellowships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  zip_code TEXT DEFAULT '',
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  meeting_info TEXT DEFAULT '',
  meeting_time TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  campus_id UUID REFERENCES campuses(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true
);

-- 3. Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date DATE NOT NULL,
  time TEXT DEFAULT '',
  location TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  campus_id UUID REFERENCES campuses(id) ON DELETE CASCADE,
  link_url TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true
);

-- 4. Attendance
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  campus_slug TEXT NOT NULL,
  service_date DATE NOT NULL,
  message TEXT DEFAULT '',
  is_new_visitor BOOLEAN DEFAULT false
);

-- 5. Profiles (links auth.users to roles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT DEFAULT '',
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'campus_admin', 'fellowship_admin', 'super_admin')),
  campus_id UUID REFERENCES campuses(id) ON DELETE SET NULL,
  fellowship_id UUID REFERENCES fellowships(id) ON DELETE SET NULL,
  avatar_url TEXT DEFAULT ''
);

-- Row Level Security
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowships ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read active campuses" ON campuses FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active fellowships" ON fellowships FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active events" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert attendance" ON attendance FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Admin write access
CREATE POLICY "Super admins full access" ON campuses FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins full access fellowships" ON fellowships FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins full access events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins full access profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins read attendance" ON attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Campus admins can manage their own campus
CREATE POLICY "Campus admins manage own campus" ON campuses FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'campus_admin' AND campus_id = id)
);
CREATE POLICY "Campus admins manage own events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('campus_admin', 'super_admin') AND campus_id = events.campus_id)
);

-- Seed data: 5 campuses
INSERT INTO campuses (name, slug, order_index, service_times) VALUES
  ('Houston', 'houston', 1, '{"Sunday":"10:00 AM","Wednesday":"7:00 PM"}'),
  ('Dallas', 'dallas', 2, '{"Sunday":"10:00 AM","Wednesday":"7:00 PM"}'),
  ('Los Angeles', 'los-angeles', 3, '{"Sunday":"10:00 AM","Wednesday":"7:00 PM"}'),
  ('Boca Raton', 'boca-raton', 4, '{"Sunday":"10:00 AM","Wednesday":"7:00 PM"}'),
  ('College Station', 'college-station', 5, '{"Sunday":"10:00 AM","Wednesday":"7:00 PM"}');

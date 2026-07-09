-- Fix RLS recursion on profiles table
-- The issue: admin policies query profiles table, which triggers RLS again

-- 1. Create a security definer function to check role without recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 2. Drop recursive policies on profiles
DROP POLICY IF EXISTS "Public can read own profile" ON profiles;
DROP POLICY IF EXISTS "Super admins full access profiles" ON profiles;

-- 3. Recreate with non-recursive checks
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins manage all profiles" ON profiles
  FOR ALL USING (public.get_user_role() = 'super_admin');

-- 4. Fix admin policies on other tables to use the function
DROP POLICY IF EXISTS "Super admins full access" ON campuses;
DROP POLICY IF EXISTS "Campus admins manage own campus" ON campuses;
DROP POLICY IF EXISTS "Super admins full access fellowships" ON fellowships;
DROP POLICY IF EXISTS "Super admins full access events" ON events;
DROP POLICY IF EXISTS "Campus admins manage own events" ON events;
DROP POLICY IF EXISTS "Super admins read attendance" ON attendance;

CREATE POLICY "Super admins full access campuses" ON campuses
  FOR ALL USING (public.get_user_role() = 'super_admin');

CREATE POLICY "Campus admins update own campus" ON campuses
  FOR UPDATE USING (
    public.get_user_role() = 'campus_admin'
    AND id = (SELECT campus_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Super admins full access fellowships" ON fellowships
  FOR ALL USING (public.get_user_role() = 'super_admin');

CREATE POLICY "Super admins full access events" ON events
  FOR ALL USING (public.get_user_role() = 'super_admin');

CREATE POLICY "Campus admins manage own events" ON events
  FOR ALL USING (
    public.get_user_role() = 'campus_admin'
    AND campus_id = (SELECT campus_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Super admins read attendance" ON attendance
  FOR SELECT USING (public.get_user_role() = 'super_admin');

-- 5. Read access for authenticated campus data (for admin dashboard)
CREATE POLICY "Authenticated users read campuses" ON campuses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users read fellowships" ON fellowships
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users read events" ON events
  FOR SELECT USING (auth.role() = 'authenticated');

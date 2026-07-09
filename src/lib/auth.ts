import { supabase, signIn, signUp, signOut, getCurrentUser, getProfile } from "@/lib/supabase";
import type { Profile } from "@/lib/database.types";

let cachedUser: Profile | null = null;
let cachedSession: any = null;

export async function ensureAuth() {
  const { data } = await supabase.auth.getSession();
  cachedSession = data.session;
  if (!data.session) return null;
  
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data: profile } = await getProfile(user.id);
  cachedUser = profile;
  return profile;
}

export function useUser() {
  return cachedUser;
}

export function requireRole(...roles: string[]) {
  if (!cachedUser) return false;
  if (roles.includes("any")) return true;
  return roles.includes(cachedUser.role);
}

export { supabase, signIn, signUp, signOut };

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, fullName: string) {
  const result = await supabase.auth.signUp({ email, password });
  if (result.data.user) {
    await supabase.from("profiles").insert({
      id: result.data.user.id,
      email,
      full_name: fullName,
      role: "member",
    });
  }
  return result;
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getProfile(userId: string) {
  return supabase.from("profiles").select("*").eq("id", userId).single();
}

export async function getSession() {
  return supabase.auth.getSession();
}

import { supabase } from "./supabase";
import type { Campus } from "./database.types";

let cached: Campus[] | null = null;

export async function getCampuses(): Promise<Campus[]> {
  if (cached) return cached;
  const { data } = await supabase
    .from("campuses")
    .select("*")
    .order("order_index");
  cached = data || [];
  return cached;
}

// Static fallback data for initial renders / SSR
export const campuses: { slug: string; city: string; state: string }[] = [
  { slug: "houston", city: "Houston", state: "Texas" },
  { slug: "dallas", city: "Dallas", state: "Texas" },
  { slug: "los-angeles", city: "Los Angeles", state: "California" },
  { slug: "boca-raton", city: "Boca Raton", state: "Florida" },
  { slug: "college-station", city: "College Station", state: "Texas" },
];

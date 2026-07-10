export type ServiceTimes = {
  sunday?: string;
  wednesday?: string;
  phone?: string;
  email?: string;
  ig?: string;
};

export type Campus = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  service_times: ServiceTimes;
  stream_url: string;
  instagram: string;
  pastor_name: string;
  pastor_photo: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
};

export type Fellowship = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  school: string;
  zip_code: string;
  city: string;
  state: string;
  meeting_info: string;
  meeting_day: string;
  meeting_time: string;
  phone: string;
  email: string;
  instagram: string;
  campus_id: string;
  campus_slug: string;
  is_active: boolean;
};

export type Event = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  campus_id: string | null;
  campus_slug: string;
  link: string;
  is_active: boolean;
};

export type Attendance = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  campus_slug: string;
  service_date: string;
  message: string;
  is_new_visitor: boolean;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: "member" | "campus_admin" | "fellowship_admin" | "super_admin";
  campus_id: string | null;
  fellowship_id: string | null;
  avatar_url: string;
};

export type Database = {
  public: {
    Tables: {
      campuses: { Row: Campus; Insert: Omit<Campus, "id" | "created_at">; Update: Partial<Campus> };
      fellowships: { Row: Fellowship; Insert: Omit<Fellowship, "id" | "created_at">; Update: Partial<Fellowship> };
      events: { Row: Event; Insert: Omit<Event, "id" | "created_at">; Update: Partial<Event> };
      attendance: { Row: Attendance; Insert: Omit<Attendance, "id" | "created_at">; Update: Partial<Attendance> };
      profiles: { Row: Profile; Insert: Omit<Profile, "id">; Update: Partial<Profile> };
    };
  };
};

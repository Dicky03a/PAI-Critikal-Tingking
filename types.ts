// Screen types untuk navigasi aplikasi
export type Screen = 
  | 'DASHBOARD'
  | 'GUIDE'
  | 'COMPETENCY'
  | 'DEFINITION'
  | 'ANALYSIS'
  | 'DESIGN'
  | 'IMPLEMENTATION'
  | 'EVALUATION'
  | 'SUCCESS';

// User activity data yang disimpan ke Supabase
export interface UserActivity {
  analysis?: {
    relevant_values: string;
    impact: string;
  };
  design?: {
    steps: string;
    argument: string;
  };
  implementation?: {
    journal: string;
  };
  evaluation?: {
    most_difficult: string;
    challenge_reason: string;
  };
}

// Material data dari Supabase
export interface Material {
  id: string;
  step_key: string;
  title: string;
  content: {
    body: string;
    [key: string]: any;
  };
  image_url?: string;
  updated_at: string;
}

// Auth types
export type AuthScreen = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD';

// User type dari Supabase Auth
export interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    [key: string]: any;
  };
  created_at: string;
}
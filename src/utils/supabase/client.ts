import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Prefer environment variables when available. For Vite use import.meta.env.
// We support several common variants so this works in Vite and other setups.
const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : (typeof process !== 'undefined' ? process.env : {});

const SUPABASE_URL =
  // NEXT_PUBLIC_* (Next.js style) or Vite env
  env?.NEXT_PUBLIC_SUPABASE_URL || env?.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;

const SUPABASE_ANON_KEY =
  env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || env?.VITE_SUPABASE_ANON_KEY || publicAnonKey;

export const supabase = createClient(String(SUPABASE_URL), String(SUPABASE_ANON_KEY), {
  auth: {
    // persist session in localStorage (browser) and detect url session params
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export default supabase;

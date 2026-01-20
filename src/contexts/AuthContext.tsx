import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabase from '../utils/supabase/client';

// Profile type matching a typical `profiles` table in Supabase
export type Role = 'seeker' | 'employer' | 'admin' | string;

export interface Profile {
  id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  role?: Role | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, full_name?: string, role?: Role) => Promise<{ data?: any; error?: any }>;
  signIn: (email: string, password: string) => Promise<{ data?: any; error?: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ data?: any; error?: any }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from `profiles` table by user id
  const fetchProfile = async (uid: string | undefined | null) => {
    if (!uid) {
      setProfile(null);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase.from<Profile>('profiles').select('*').eq('id', uid).maybeSingle();
      if (error) throw error;
      setProfile(data ?? null);
    } catch (e) {
      console.error('fetchProfile error', e);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // get initial session
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        await fetchProfile(data.session?.user?.id ?? null);
      } catch (e) {
        console.error('auth init error', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // listen to changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess ?? null);
      setUser(sess?.user ?? null);
      await fetchProfile(sess?.user?.id ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async (email: string, password: string, full_name?: string, role: Role = 'seeker') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return { error };

      const userId = data.user?.id;
      if (userId) {
        // create initial profile row with role
        const { data: profileData, error: profileError } = await supabase.from('profiles').upsert({
          id: userId,
          email,
          full_name: full_name ?? null,
          role,
        });
        if (profileError) {
          // not fatal for signup but surfaced
          return { data, error: profileError };
        }
        await fetchProfile(userId);
        return { data: profileData };
      }
      return { data };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error };
      // profile will be fetched by listener but fetch proactively
      await fetchProfile(data.user?.id ?? null);
      return { data };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (e) {
      console.error('signOut error', e);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchProfile(user?.id ?? null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user?.id) return { error: new Error('Not authenticated') };
    setLoading(true);
    try {
      const payload = { id: user.id, ...updates } as Partial<Profile>;
      const { data, error } = await supabase.from('profiles').upsert(payload).select().maybeSingle();
      if (error) return { error };
      setProfile(data ?? null);
      return { data };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

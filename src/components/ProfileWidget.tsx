import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProfileWidget() {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img src={profile?.avatar_url ?? '/avatar-placeholder.png'} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
      <div className="text-sm">
        <div className="font-medium">{profile?.full_name ?? user.email}</div>
        <div className="text-xs text-gray-400">{profile?.role ?? 'seeker'}</div>
      </div>
      <button onClick={signOut} className="ml-3 text-sm text-orange-500">Logout</button>
    </div>
  );
}

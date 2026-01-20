import { Link } from 'react-router-dom';
import { Briefcase, Menu, X, User as UserIcon, LogOut, Bell } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* Use branding image if available at /branding-logo.png, otherwise fall back to icon */}
            <img
              src="/branding-logo.png"
              alt="CareerSpark"
              onError={(e) => {
                // hide image if not present and let the icon render
                (e.target as HTMLImageElement).style.display = 'none';
                const el = document.getElementById('cs-badge-fallback');
                if (el) el.style.display = 'inline-flex';
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span id="cs-badge-fallback" className="inline-flex items-center">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </span>
            <span className="text-xl sm:text-2xl font-bold italic">CareerSpark</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/browse-jobs" className="hover:text-orange-500 transition-colors">
              Browse Jobs
            </Link>
            {user ? (
              <>
                <Link to={profile?.role === 'seeker' ? '/dashboard-seeker' : '/dashboard-provider'} className="hover:text-orange-500 transition-colors">
                  Dashboard
                </Link>
                <Link to="/messages" className="hover:text-orange-500 transition-colors">
                  Messages
                </Link>
                <Link to="/notifications" className="relative hover:text-orange-500 transition-colors">
                  <Bell className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-3">
                  <Link to="/settings" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <UserIcon className="w-5 h-5" />
                    <span>{profile?.full_name ?? user?.email ?? 'Account'}</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-800 pt-4">
            <Link
              to="/browse-jobs"
              className="block hover:text-orange-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            {user ? (
              <>
                <Link
                  to={profile?.role === 'seeker' ? '/dashboard-seeker' : '/dashboard-provider'}
                  className="block hover:text-orange-500 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/messages"
                  className="block hover:text-orange-500 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/notifications"
                  className="block hover:text-orange-500 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications
                </Link>
                <Link
                  to="/settings"
                  className="block hover:text-orange-500 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings ({profile?.full_name ?? user?.email ?? 'Account'})
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
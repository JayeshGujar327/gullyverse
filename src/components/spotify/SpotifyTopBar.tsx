import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  Monitor, 
  LogOut, 
  ShieldCheck, 
  Music, 
  Sliders, 
  ExternalLink,
  Crown,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLayoutTheme } from '../../context/LayoutThemeContext';
import { Role } from '../../types';

interface SpotifyTopBarProps {
  onOpenSearch: () => void;
}

export const SpotifyTopBar: React.FC<SpotifyTopBarProps> = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, switchRole } = useAuth();
  const { setIsCustomizerOpen } = useLayoutTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterChips = [
    { label: 'All', path: '/' },
    { label: 'Tracks', path: '/songs' },
    { label: 'Artists', path: '/artists' },
    { label: 'Cyphers & Beefs', path: '/cyphers' },
    { label: 'Hoods Map', path: '/map' },
    { label: 'Flow Lab', path: '/learn-rap' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#121212]/95 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/5 gap-4">
      {/* 1. History Navigation & Search Box */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Back / Forward Circular Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors disabled:opacity-40"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors disabled:opacity-40"
            title="Go forward"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Global Instant Search Bar */}
        <div className="relative flex-1 min-w-[160px] flex items-center">
          <Search className="w-4 h-4 text-[#b3b3b3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/songs?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            placeholder="What do you want to play in Desi Hip-Hop?"
            className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2e2e2e] text-xs sm:text-sm text-white placeholder-[#757575] rounded-full pl-10 pr-16 py-2 focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#a7a7a7] hover:text-white"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button
              onClick={onOpenSearch}
              className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#b3b3b3] hover:text-white bg-black/40 hover:bg-black/80 rounded transition-colors"
              title="Open Spotlight Search (⌘K)"
            >
              ⌘K
            </button>
          </div>
        </div>
      </div>

      {/* 2. Center Quick Filter Pills (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex items-center gap-1.5">
        {filterChips.map((chip) => {
          const isActive = location.pathname === chip.path;
          return (
            <Link
              key={chip.path}
              to={chip.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
              }`}
            >
              {chip.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Right Utility Capsule & Profile Dropdown */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Explore Premium / VIP Badge */}
        <Link
          to="/awards"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:scale-105 text-black font-bold text-xs shadow-md transition-transform"
        >
          <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>DHH Hall of Fame</span>
        </Link>

        {/* Change UI / Layout Customizer Button */}
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 rounded-full bg-black/60 hover:bg-black text-[#b3b3b3] hover:text-white transition-colors"
          title="Customize Theme & Layout Mode"
        >
          <Monitor className="w-4 h-4 text-amber-400" />
        </button>

        {/* User Profile Capsule */}
        <div className="relative">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 p-1 pl-1 pr-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/10 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-[#1ed760] p-[1.5px] shrink-0">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs font-bold truncate max-w-[80px] hidden sm:inline">
              {user.name.split(' ')[0]}
            </span>
          </button>

          {/* Profile & Role Switcher Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#282828] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-3 border-b border-white/10 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/40">
                    ROLE: {user.role}
                  </span>
                </div>
              </div>

              {/* Persona Switcher */}
              <div className="p-2 space-y-1">
                <span className="text-[10px] font-mono text-[#a7a7a7] uppercase px-2 font-bold">
                  Switch User Role
                </span>
                {(['USER', 'ARTIST', 'SUPER_ADMIN'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setProfileDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      user.role === r
                        ? 'bg-[#1ed760] text-black font-bold'
                        : 'text-[#e2e8f0] hover:bg-[#333333]'
                    }`}
                  >
                    <span>{r === 'SUPER_ADMIN' ? 'Super Admin' : r === 'ARTIST' ? 'Verified MC / Artist' : 'Standard Listener'}</span>
                    {user.role === r && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <Link
                  to="/admin"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-[#e2e8f0] hover:bg-[#333333] hover:text-white"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin & Curators Studio</span>
                </Link>

                <Link
                  to="/submit"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-[#e2e8f0] hover:bg-[#333333] hover:text-white"
                >
                  <Music className="w-4 h-4 text-[#1ed760]" />
                  <span>Submit Track / Verification</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};



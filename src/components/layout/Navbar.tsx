import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  Disc3, 
  MapPin, 
  Mic2, 
  Flame, 
  BookOpen, 
  History, 
  Sliders, 
  Trophy, 
  Layers, 
  Radio, 
  Sparkles, 
  ShieldAlert, 
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setRole } = useAuth();

  const roles: Role[] = ['USER', 'ARTIST', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'DISCOVER', path: '/', icon: Sparkles },
    { label: 'ARTISTS', path: '/artists', icon: Mic2 },
    { label: 'MUSIC', path: '/songs', icon: Disc3 },
    { label: 'MAP', path: '/map', icon: MapPin },
    { label: 'LEARN RAP', path: '/learn-rap', icon: BookOpen },
    { label: 'CYPHERS & BATTLES', path: '/cyphers', icon: Flame },
    { label: 'HISTORY', path: '/history', icon: History },
    { label: 'PRODUCERS', path: '/producers', icon: Sliders },
    { label: 'CULTURE', path: '/culture', icon: Layers },
    { label: 'AWARDS', path: '/awards', icon: Trophy },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0e]/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#08080a] via-[#08080a]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d90429] via-[#f72585] to-[#7209b7] flex items-center justify-center p-[2px] shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0a0e] rounded-[10px] flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-rose-500 animate-spin-slow group-hover:text-rose-400 transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white flex items-center">
                GULLY<span className="text-[#ff334b]">VERSE</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase font-mono text-zinc-400 font-bold -mt-1">
                FROM GULLY TO GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#ff334b] text-white shadow-md shadow-rose-900/30'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors shadow-sm"
              title="Search artists, songs, history (Cmd+K)"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Role Switcher (Simulates Enterprise RBAC) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-mono font-semibold text-zinc-300 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] text-zinc-400 hidden sm:inline">ROLE:</span>
                <span className="text-white font-bold">{user.role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <AnimatePresence>
                {roleDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-[#111116] border border-zinc-700/80 rounded-xl shadow-2xl p-1.5 z-50 backdrop-blur-xl"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                      Switch Active Role
                    </div>
                    {roles.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                          user.role === r
                            ? 'bg-[#ff334b]/20 text-[#ff4d6d] font-bold'
                            : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        <span>{r}</span>
                        {user.role === r && <span className="text-[10px] font-mono">ACTIVE</span>}
                      </button>
                    ))}
                    {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' || user.role === 'MODERATOR') && (
                      <div className="mt-1 pt-1 border-t border-zinc-800">
                        <Link
                          to="/admin"
                          onClick={() => setRoleDropdownOpen(false)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:bg-amber-500/10"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Admin Dashboard
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile / Dashboard Avatar */}
            <Link
              to="/playlists"
              className="relative p-1 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-1.5"
              title="My Playlists & Favorites"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden fixed top-[68px] left-0 right-0 bg-[#0c0c11]/95 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl z-30 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#ff334b] text-white shadow-md'
                        : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-zinc-400" />
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <Link to="/journey" className="text-rose-400 hover:underline flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Rap Journey Quiz
                </Link>
                <Link to="/compare" className="text-zinc-300 hover:underline">
                  Compare Artists
                </Link>
                <Link to="/submit" className="text-emerald-400 hover:underline">
                  Submit Artist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


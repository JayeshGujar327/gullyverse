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
  Sparkles, 
  LayoutGrid,
  ChevronDown,
  Volume2,
  FolderHeart,
  UserPlus,
  ShieldAlert,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { useLayoutTheme } from '../../context/LayoutThemeContext';
import { Role } from '../../types';

interface TopCommandMegaNavProps {
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
}

export const TopCommandMegaNav: React.FC<TopCommandMegaNavProps> = ({ 
  onOpenSearch, 
  onOpenMobileNav 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setRole } = useAuth();
  const { isPlaying, currentSong } = usePlayer();
  const { setIsCustomizerOpen, layoutMode } = useLayoutTheme();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const roles: Role[] = ['USER', 'ARTIST', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setRoleDropdownOpen(false);
  }, [location.pathname]);

  const navCategories = [
    {
      id: 'explore',
      label: 'DISCOVER',
      path: '/',
      icon: Sparkles,
      submenu: [
        { label: 'Explore Home', path: '/', icon: Sparkles, desc: 'Trending drops & live scene pulse' },
        { label: 'All Artists', path: '/artists', icon: Mic2, desc: '6-tier Indian rap encyclopedia' },
        { label: 'Music Vault', path: '/songs', icon: Disc3, desc: 'Lossless audio preview & stem breakdowns' },
        { label: 'Regional Map', path: '/map', icon: MapPin, desc: 'Pan-India city scenes & dialects' },
      ]
    },
    {
      id: 'culture',
      label: 'CULTURE & LORE',
      path: '/history',
      icon: History,
      submenu: [
        { label: '6 Eras Chronicles', path: '/history', icon: History, desc: 'From 1980s cassettes to Billboard charts' },
        { label: 'Cyphers & Battles', path: '/cyphers', icon: Flame, desc: 'Historic beefs, disses & street cyphers' },
        { label: '4 Pillars & Street', path: '/culture', icon: Layers, desc: 'Breaking, graffiti & cultural roots' },
        { label: 'Behind The Beats', path: '/producers', icon: Sliders, desc: 'Beatmakers, sample flips & 808 sound' },
      ]
    },
    {
      id: 'studio',
      label: 'STUDIO LABS',
      path: '/learn-rap',
      icon: BookOpen,
      submenu: [
        { label: 'Flow Lab & Rhymes', path: '/learn-rap', icon: BookOpen, desc: 'Interactive metronome & rhyming engine' },
        { label: 'Artist DNA Matrix', path: '/compare', icon: LayoutGrid, desc: 'Side-by-side lyrical & flow radar compare' },
        { label: 'Sound Journey Match', path: '/journey', icon: Compass, desc: 'Personalized DHH starter pack quiz' },
        { label: 'Trivia Arena', path: '/quizzes', icon: Trophy, desc: 'Test your scene knowledge & earn ranks' },
        { label: 'Annual Awards', path: '/awards', icon: Trophy, desc: 'Community ballot & DHH Hall of Fame' },
      ]
    }
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080a0f]/95 backdrop-blur-xl border-b border-[#1b2338] shadow-2xl py-2.5' 
          : 'bg-[#080a0f]/80 backdrop-blur-lg border-b border-[#181f30] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Brand Identity */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0d16] rounded-[14px] flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="font-heading font-black text-2xl tracking-tight text-white flex items-center">
                GULLY<span className="text-amber-400">VERSE</span>
              </div>
              <div className="text-[9px] tracking-widest uppercase font-mono text-slate-400 font-bold -mt-1 hidden sm:block">
                INDIAN HIP-HOP WORKSTATION
              </div>
            </div>
          </Link>

          {/* Desktop Mega-Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#101422] p-1.5 rounded-2xl border border-[#1e263d]">
            {navCategories.map((cat) => {
              const isCatActive = location.pathname === cat.path || cat.submenu.some(s => s.path === location.pathname);
              const isOpen = activeDropdown === cat.id;

              return (
                <div 
                  key={cat.id} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(cat.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                      isCatActive
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'text-slate-300 hover:text-white hover:bg-[#182033]'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-72 bg-[#0e121e] border border-[#222c44] rounded-2xl p-2.5 shadow-2xl z-50 space-y-1 backdrop-blur-2xl"
                      >
                        {cat.submenu.map((sub) => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                                isSubActive
                                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                                  : 'hover:bg-[#151c2d] text-slate-300 hover:text-white'
                              }`}
                            >
                              <div className={`p-2 rounded-lg mt-0.5 ${
                                isSubActive ? 'bg-amber-400 text-black' : 'bg-[#182033] text-amber-400'
                              }`}>
                                <sub.icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <div className="text-xs font-heading font-bold text-white flex items-center gap-1">
                                  {sub.label}
                                </div>
                                <p className="text-[11px] text-slate-400 leading-tight">
                                  {sub.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Direct Quick Links */}
            <Link
              to="/compare"
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                location.pathname === '/compare' ? 'bg-amber-400 text-black' : 'text-slate-300 hover:text-white hover:bg-[#182033]'
              }`}
            >
              DNA MATCH
            </Link>

            <Link
              to="/awards"
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                location.pathname === '/awards' ? 'bg-amber-400 text-black' : 'text-slate-300 hover:text-white hover:bg-[#182033]'
              }`}
            >
              AWARDS
            </Link>
          </nav>
        </div>

        {/* Right Controls: Search + UI Customizer + Role + Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111624] hover:bg-[#182033] border border-[#1f283d] text-slate-300 hover:text-white text-xs font-mono transition-colors shadow-sm"
            title="Search artists, anthems, lyrics (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">SEARCH CRATE</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-slate-500 font-mono">⌘K</kbd>
          </button>

          {/* Change UI Layout Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all active:scale-95 shadow-sm"
            title="Select from 4 UI Themes / Layouts"
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">UI OPTIONS</span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#111624] hover:bg-[#182033] border border-[#1f283d] text-xs font-mono text-slate-300 hover:text-white transition-colors"
              title="Switch Persona / Access Level"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="font-bold hidden sm:inline">{user.role}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0d101a] border border-[#222c45] rounded-2xl p-2 shadow-2xl z-50 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Select User Persona
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between ${
                      user.role === r
                        ? 'bg-amber-400 text-black'
                        : 'text-slate-300 hover:bg-[#182033] hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {user.role === r && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl bg-[#111624] hover:bg-[#182033] border border-[#1f283d] text-slate-300 hover:text-white transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};


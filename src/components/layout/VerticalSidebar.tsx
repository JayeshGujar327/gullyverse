import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Mic2, 
  Disc3, 
  MapPin, 
  History, 
  Flame, 
  Layers, 
  Sliders, 
  BookOpen, 
  BarChart3, 
  Compass, 
  HelpCircle, 
  Trophy, 
  FolderHeart, 
  UserPlus, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  Radio, 
  Volume2, 
  Play, 
  Pause,
  X,
  Zap,
  Activity,
  Award,
  Crown,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { useLayoutTheme } from '../../context/LayoutThemeContext';
import { Role } from '../../types';

interface VerticalSidebarProps {
  onOpenSearch: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({ 
  onOpenSearch, 
  mobileOpen, 
  onCloseMobile 
}) => {
  const location = useLocation();
  const { user, setRole } = useAuth();
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const { setIsCustomizerOpen, layoutMode } = useLayoutTheme();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: Role[] = ['USER', 'ARTIST', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];

  // Close mobile drawer on route change
  useEffect(() => {
    onCloseMobile();
  }, [location.pathname]);

  const navSections = [
    {
      title: 'CORE CRATE',
      items: [
        { label: 'Discover', path: '/', icon: Sparkles, badge: 'HOT' },
        { label: 'Artists Matrix', path: '/artists', icon: Mic2, count: '10+' },
        { label: 'Music Vault', path: '/songs', icon: Disc3, count: '12+' },
        { label: 'Regional Map', path: '/map', icon: MapPin, badge: 'PAN-INDIA' },
      ]
    },
    {
      title: 'CULTURE & LORE',
      items: [
        { label: '6 Eras Chronicles', path: '/history', icon: History },
        { label: 'Cyphers & Battles', path: '/cyphers', icon: Flame, badge: 'LIVE' },
        { label: '4 Elements & Street', path: '/culture', icon: Layers },
        { label: 'Behind The Beat', path: '/producers', icon: Sliders },
      ]
    },
    {
      title: 'STUDIO & LABS',
      items: [
        { label: 'Flow Lab & Learn', path: '/learn-rap', icon: BookOpen, badge: 'SYNTH' },
        { label: 'Artist DNA Match', path: '/compare', icon: BarChart3 },
        { label: 'Sonic Journey', path: '/journey', icon: Compass },
        { label: 'Trivia Arena', path: '/quizzes', icon: HelpCircle },
        { label: 'Annual Awards', path: '/awards', icon: Trophy, badge: 'VOTE' },
      ]
    },
    {
      title: 'CREATOR & GOVERNANCE',
      items: [
        { label: 'My Playlists', path: '/playlists', icon: FolderHeart },
        { label: 'Submit Talent', path: '/submit', icon: UserPlus, highlight: true },
        { label: 'Admin & Jayesh Dossier', path: '/admin', icon: ShieldAlert, badge: 'ADMIN' }
      ]
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#080a0f] text-slate-200 select-none">
      {/* 1. TOP BRAND & STATUS HEADER */}
      <div className="p-4 border-b border-[#1b2234]">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Pro Audio Record Icon */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl tracking-tight text-white">
                  GULLY<span className="text-amber-400">VERSE</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded">
                  PRO
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                INDIAN HIP-HOP ENGINE
              </p>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg bg-[#141a29] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Pulse / Status Strip */}
        <div className="mt-3.5 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-[#1e2538] text-[11px] font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wider">ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Activity className="w-3 h-3 text-amber-400" />
            <span>128 BPM • DHH V3</span>
          </div>
        </div>

        {/* Quick Search Bar Trigger */}
        <button
          onClick={onOpenSearch}
          className="mt-2.5 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#121624] hover:bg-[#181e30] border border-[#1f283d] text-xs text-slate-400 hover:text-slate-200 transition-all group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Quick Search...</span>
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1b2236] text-slate-300 rounded border border-[#2b354f]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 2. SCROLLABLE VERTICAL NAVIGATION LINKS */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 custom-scrollbar">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-white font-bold border-l-2 border-amber-400 pl-3.5 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-[#121624]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <item.icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-amber-400'
                            : 'text-slate-400 group-hover:text-amber-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Micro tags / Badges */}
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        isActive 
                          ? 'bg-amber-400 text-black' 
                          : 'bg-[#1b2236] text-amber-300 border border-amber-400/20'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count && !item.badge && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.count}
                      </span>
                    )}
                    {item.highlight && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        +ADD
                      </span>
                    )}
                    {item.admin && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        MOD
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. BOTTOM AUDIO MONITOR & USER PROFILE BAR */}
      <div className="p-3 bg-[#0b0e17] border-t border-[#1b2234] space-y-2.5">
        {/* Mini Now-Playing Card if a track exists */}
        {currentSong && (
          <div className="p-2 rounded-xl bg-[#101420] border border-[#20293d] space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <img 
                  src={currentSong.coverArt} 
                  alt={currentSong.title}
                  className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#2d3852]"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white truncate">{currentSong.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentSong.artistName}</p>
                </div>
              </div>
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center shrink-0 shadow-md shadow-amber-400/30 transition-transform active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
              </button>
            </div>

            {/* Equalizer animation mini bars */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 px-1 pt-0.5">
              <div className="flex items-center gap-1 text-amber-400">
                <span className="w-1 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-1 h-1.5 bg-amber-400 rounded-full animate-pulse delay-150"></span>
                <span>{currentSong.bpm} BPM</span>
              </div>
              <span className="text-slate-400 uppercase truncate max-w-[80px]">{currentSong.genre}</span>
            </div>
          </div>
        )}

        {/* Change UI Layout Button */}
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>UI OPTIONS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-1.5 py-0.5 rounded">
            4 THEMES
          </span>
        </button>

        {/* User Identity & Role Capsule */}
        <div className="relative">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#111624] border border-[#1e273b]">
            <Link to="/playlists" className="flex items-center gap-2.5 min-w-0 group">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-lg object-cover border border-amber-400/40"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white group-hover:text-amber-400 truncate transition-colors">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-amber-300 font-semibold">{user.role}</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="p-1.5 rounded-lg bg-[#182033] hover:bg-[#202b45] text-slate-300 hover:text-white transition-colors"
              title="Switch RBAC role"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role selector dropdown */}
          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-[#121726] border border-[#26314a] rounded-xl shadow-2xl p-1.5 z-50 backdrop-blur-xl"
              >
                <div className="px-2.5 py-1 text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                  Select Active Persona
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
                        ? 'bg-amber-400/20 text-amber-300 font-bold'
                        : 'text-slate-300 hover:bg-[#1c2438] hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {user.role === r && <span className="text-[9px] font-mono">ACTIVE</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside 
        id="pro-vertical-sidebar"
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 xl:w-72 z-40 border-r border-[#1a2133] shadow-[4px_0_24px_rgba(0,0,0,0.6)] flex-col"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            {/* Off-canvas panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-4/5 max-w-xs z-50 shadow-2xl border-r border-[#1a2133]"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


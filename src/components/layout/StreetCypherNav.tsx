import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  Flame, 
  Mic2, 
  Disc3, 
  MapPin, 
  Radio, 
  Zap, 
  Sparkles, 
  Sliders, 
  Monitor, 
  History,
  Activity,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { useLayoutTheme } from '../../context/LayoutThemeContext';

interface StreetCypherNavProps {
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
}

export const StreetCypherNav: React.FC<StreetCypherNavProps> = ({ 
  onOpenSearch, 
  onOpenMobileNav 
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const { isPlaying, currentSong } = usePlayer();
  const { setIsCustomizerOpen } = useLayoutTheme();

  const streetLinks = [
    { label: 'CYPHER VAULT', path: '/cyphers', icon: Flame, tag: 'BATTLES' },
    { label: 'EMCEES & CREWS', path: '/artists', icon: Mic2, tag: 'ROSTER' },
    { label: 'BANGER CRATE', path: '/songs', icon: Disc3, tag: '808s' },
    { label: 'GULLY MAP', path: '/map', icon: MapPin, tag: 'HOODS' },
    { label: 'FLOW LAB', path: '/learn-rap', icon: Zap, tag: 'SYNTH' },
    { label: 'CHRONICLES', path: '/history', icon: History, tag: '6 ERAS' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07090e] border-b-2 border-rose-500/40 shadow-2xl">
      {/* Top Ticker Tape */}
      <div className="bg-rose-600 text-black px-4 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest flex items-center justify-between overflow-hidden select-none">
        <div className="flex items-center gap-4 animate-pulse">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 fill-black" /> LIVE UNDERGROUND CYPHER FREQUENCIES
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">MUMBAI GULLIES TO DELHI BATTLES & SOUTHERN CADENCES</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
          <span>STREET FEED ACTIVE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Street Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 p-[2px] shadow-lg shadow-rose-600/30 transform group-hover:rotate-3 transition-transform">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-2xl tracking-tighter text-white uppercase italic">
              GULLY<span className="text-rose-500">VERSE</span>
              <span className="text-amber-400 text-xs ml-1 font-mono">STREET</span>
            </div>
            <div className="text-[9px] font-mono font-extrabold text-rose-400 tracking-wider uppercase -mt-1">
              RAW CYPHER & BATTLE ARENA
            </div>
          </div>
        </Link>

        {/* Industrial Navigation Chips */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {streetLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-extrabold tracking-wider transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30 -translate-y-0.5'
                    : 'bg-[#101420] text-slate-300 border-[#1f273b] hover:text-rose-300 hover:border-rose-500/50'
                }`}
              >
                <link.icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Street Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111624] hover:bg-[#182033] border border-[#20293f] text-slate-300 text-xs font-mono font-bold transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">CRATE FIND</span>
          </button>

          {/* UI Switcher Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-mono font-black tracking-wider uppercase shadow-md shadow-rose-600/30 hover:opacity-90 active:scale-95 transition-all"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>UI OPTIONS</span>
          </button>

          {/* Mobile Nav Button */}
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg bg-[#111624] text-rose-400 border border-[#20293f]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};


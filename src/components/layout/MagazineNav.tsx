import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  Disc3, 
  BookOpen, 
  History, 
  Layers, 
  Mic2, 
  MapPin, 
  Sliders, 
  Trophy, 
  Sparkles,
  Monitor
} from 'lucide-react';
import { useLayoutTheme } from '../../context/LayoutThemeContext';

interface MagazineNavProps {
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
}

export const MagazineNav: React.FC<MagazineNavProps> = ({ 
  onOpenSearch, 
  onOpenMobileNav 
}) => {
  const location = useLocation();
  const { setIsCustomizerOpen } = useLayoutTheme();

  const magazineSections = [
    { label: 'CURATED COVERS', path: '/' },
    { label: 'EMCEE INDEX', path: '/artists' },
    { label: 'VINYL & DISCS', path: '/songs' },
    { label: 'HISTORICAL CHRONICLES', path: '/history' },
    { label: 'REGIONAL ATLAS', path: '/map' },
    { label: 'CULTURE ESSAYS', path: '/culture' },
    { label: 'BEHIND THE BEATS', path: '/producers' },
    { label: 'HALL OF FAME', path: '/awards' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0d14] border-b border-[#1f273b] shadow-xl">
      {/* Top Editorial Ribbon */}
      <div className="border-b border-[#182030] px-4 sm:px-8 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">GULLYVERSE CHRONICLES</span>
          <span>•</span>
          <span>EST. DESI HIP-HOP 1990–2026 ARCHIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>VOLUME IV • SPECIAL COLLECTOR'S EDITION</span>
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            <Monitor className="w-3 h-3" /> SWITCH UI
          </button>
        </div>
      </div>

      {/* Main Magazine Masthead Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-3 group">
          <span className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            GULLY<span className="text-emerald-400 italic">VERSE</span>
          </span>
          <span className="text-xs font-mono tracking-widest text-slate-400 hidden sm:inline">
            // HIP-HOP ANTHOLOGY
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121724] border border-[#202a40] text-slate-300 text-xs font-mono hover:text-white transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">SEARCH ANTHOLOGY</span>
          </button>

          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-500/25 transition-colors flex items-center gap-1.5"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>UI OPTIONS</span>
          </button>

          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl bg-[#121724] text-slate-300 border border-[#202a40]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Magazine Nav Strip */}
      <div className="hidden lg:block border-t border-[#161d2b] bg-[#07090f]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8 py-2 overflow-x-auto no-scrollbar">
          {magazineSections.map((sec) => {
            const isActive = location.pathname === sec.path;
            return (
              <Link
                key={sec.path}
                to={sec.path}
                className={`text-xs font-mono tracking-wider transition-colors uppercase whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {sec.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};


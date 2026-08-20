import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Sparkles, 
  Activity, 
  Radio, 
  Flame, 
  Volume2, 
  Disc3, 
  ShieldCheck, 
  Zap,
  ArrowLeft,
  X,
  Home,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { useLayoutTheme } from '../../context/LayoutThemeContext';

interface TopProBarProps {
  onOpenMobileNav: () => void;
  onOpenSearch: () => void;
}

export const TopProBar: React.FC<TopProBarProps> = ({ 
  onOpenMobileNav, 
  onOpenSearch 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPlaying, currentSong } = usePlayer();
  const { setIsCustomizerOpen } = useLayoutTheme();

  const isHomePage = location.pathname === '/';

  // Dynamic Breadcrumb Labeling
  const getBreadcrumbTitle = () => {
    const p = location.pathname;
    if (p === '/') return { title: 'DISCOVER ARENA', subtitle: 'Trending bangers & living scene archive' };
    if (p === '/artists') return { title: 'ARTISTS DIRECTORY', subtitle: 'Pioneers, prodigies & regional lyricists' };
    if (p.startsWith('/artists/')) return { title: 'ARTIST PROFILE', subtitle: 'Catalog, flow metrics & discography' };
    if (p === '/songs') return { title: 'MUSIC CRATE', subtitle: 'Moods, BPM filters & lossless audio previews' };
    if (p.startsWith('/songs/')) return { title: 'SONG BLUEPRINT', subtitle: 'Lyrical breakdowns & production layers' };
    if (p === '/map') return { title: 'REGIONAL HIP-HOP MAP', subtitle: 'City scenes, local slangs & state anthems' };
    if (p === '/learn-rap') return { title: 'RAP STUDIO & FLOW LAB', subtitle: 'Synthesizer bpm, song DNA & rhyme schemes' };
    if (p === '/history') return { title: 'CHRONICLES OF DESI RAP', subtitle: '6 historical eras from 1980s to Billboard' };
    if (p === '/cyphers') return { title: 'CYPHERS, BATTLES & DISFIGHTS', subtitle: 'Historic lyrical clashes & verse vault' };
    if (p === '/producers') return { title: 'BEHIND THE BEATS', subtitle: 'Signature 808s, master producers & labels' };
    if (p === '/culture') return { title: 'CULTURE & 4 PILLARS', subtitle: 'Breaking, graffiti, streetwear & female MCs' };
    if (p === '/compare') return { title: 'ARTIST DNA MATRIX', subtitle: 'Radar comparison & skill attribute metrics' };
    if (p === '/journey') return { title: 'SOUND JOURNEY MATCH', subtitle: 'Personalized DHH starter pack generator' };
    if (p === '/quizzes') return { title: 'TRIVIA ARENA', subtitle: 'Test your South Asian hip-hop knowledge' };
    if (p === '/playlists') return { title: 'MY CRATES & FAVORITES', subtitle: 'Saved tracks, followed MCs & playlists' };
    if (p === '/submit') return { title: 'SUBMIT UNDERGROUND MC', subtitle: 'Community curation & talent archive' };
    if (p === '/admin') return { title: 'MODERATION CONSOLE', subtitle: 'Editorial queue & submission reviews' };
    if (p === '/awards') return { title: 'ANNUAL DHH AWARDS', subtitle: 'Community ballot & Hall of Fame' };
    return { title: 'GULLYVERSE PRO', subtitle: 'The Indian Hip-Hop Universe' };
  };

  const breadcrumb = getBreadcrumbTitle();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <header 
      id="pro-top-bar"
      className="sticky top-0 z-30 bg-[#080a0f]/90 backdrop-blur-xl border-b border-[#1b2234] px-4 sm:px-6 py-3 transition-colors"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Menu Trigger + Back Navigation + Breadcrumb Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-xl bg-[#121624] hover:bg-[#1a2133] border border-[#1f283d] text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Open navigation sidebar"
            id="mobile-nav-toggle-btn"
          >
            <Menu className="w-5 h-5 text-amber-400" />
          </button>

          {/* Quick Back and Home buttons when inside sub-pages */}
          {!isHomePage && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131826] hover:bg-[#1a2238] border border-[#222c45] hover:border-amber-400/60 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-all shadow-sm active:scale-95 group"
                title="Go back to previous page"
                id="topbar-back-button"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden xs:inline">BACK</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#131826] hover:bg-[#1a2238] border border-[#222c45] text-xs font-mono text-slate-400 hover:text-white transition-all shadow-sm active:scale-95"
                title="Return to Home Arena"
                id="topbar-home-close-button"
              >
                <Home className="w-4 h-4 text-slate-400 hover:text-amber-400" />
              </button>
            </div>
          )}

          <div className="hidden sm:block min-w-0">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-mono tracking-wider font-bold text-amber-400 uppercase">
                WORKSPACE
              </span>
              <span className="text-slate-600">/</span>
              <h2 className="text-xs sm:text-sm font-bold text-white font-mono tracking-wide uppercase truncate">
                {breadcrumb.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block truncate">
              {breadcrumb.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Live Ambient Ticker */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#0d101a] border border-[#1d2438] text-[11px] font-mono text-slate-300 shrink-0">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>DHH BROADCAST:</span>
          </span>
          <span className="text-slate-300">
            Hanumankind & Kalmi on Global Billboard • Seedhe Maut Arena Tour Live
          </span>
        </div>

        {/* Right: Quick Command Search & Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Change UI Layout Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all active:scale-95 shadow-sm"
            title="Choose from 4 UI Themes & Layouts"
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-[11px]">UI OPTIONS</span>
          </button>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121624] hover:bg-[#181f33] border border-[#1e273d] text-slate-300 hover:text-white text-xs font-medium transition-colors shadow-sm"
            title="Search anything (Cmd+K)"
            id="topbar-search-button"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline text-[11px] font-mono">SEARCH</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-[#1c2338] text-slate-300 rounded border border-[#2b354f]">
              ⌘K
            </kbd>
          </button>

          {/* User Quick Badge */}
          <Link
            to="/playlists"
            className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-xl bg-[#121624] hover:bg-[#1a2133] border border-[#1e273d] transition-colors"
            title="My Saved Crates"
            id="topbar-user-profile-badge"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-6 h-6 rounded-lg object-cover border border-amber-400/30"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">
              {user.name.split(' ')[0]}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};


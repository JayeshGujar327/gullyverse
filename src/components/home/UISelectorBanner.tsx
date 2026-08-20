import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  LayoutGrid, 
  Sliders, 
  Flame, 
  Disc3, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Monitor, 
  Layers, 
  Zap, 
  Radio,
  Eye
} from 'lucide-react';
import { useLayoutTheme, LayoutMode, UI_THEME_OPTIONS } from '../../context/LayoutThemeContext';

export const UISelectorBanner: React.FC = () => {
  const { layoutMode, setLayoutMode, setIsCustomizerOpen } = useLayoutTheme();
  const [expanded, setExpanded] = useState(true);

  const getIcon = (id: LayoutMode) => {
    switch (id) {
      case 'SPOTIFY_APP': return <Radio className="w-4 h-4" />;
      case 'STREAMING_BENTO': return <LayoutGrid className="w-4 h-4" />;
      case 'STUDIO_PRO': return <Sliders className="w-4 h-4" />;
      case 'UNDERGROUND_STREET': return <Flame className="w-4 h-4" />;
      case 'EDITORIAL_VINYL': return <Disc3 className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="rounded-2xl bg-[#181818] border border-white/10 shadow-2xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1ed760]/20 border border-[#1ed760]/40 text-[#1ed760] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Monitor className="w-3 h-3 text-[#1ed760]" /> UI LAYOUT SELECTOR
              </span>
              <span className="text-xs font-mono text-[#a7a7a7] hidden sm:inline">• SELECT YOUR APP INTERFACE ARCHITECTURE</span>
            </div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
              Current Layout: <span className="text-[#1ed760] font-black">{UI_THEME_OPTIONS.find(o => o.id === layoutMode)?.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#282828] hover:bg-[#333333] border border-white/10 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#1ed760]" />
              <span>Full Themes Gallery</span>
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-full bg-[#282828] hover:bg-[#333333] text-[#a7a7a7] hover:text-white border border-white/10 transition-colors"
              title={expanded ? 'Minimize bar' : 'Expand layout options'}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Interactive UI Option Buttons */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-white/10">
                {UI_THEME_OPTIONS.map((opt) => {
                  const isActive = layoutMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setLayoutMode(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 group relative ${
                        isActive
                          ? 'bg-[#282828] border-[#1ed760] shadow-lg ring-1 ring-[#1ed760] scale-[1.02]'
                          : 'bg-[#181818] border-white/5 hover:border-white/20 hover:bg-[#202020]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#1ed760] text-black' : 'bg-[#242424] text-[#1ed760]'}`}>
                          {getIcon(opt.id)}
                        </div>
                        {isActive ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#1ed760] text-black text-[9px] font-mono font-black uppercase flex items-center gap-1">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-[#777] uppercase">
                            Select
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-white group-hover:text-[#1ed760] transition-colors truncate">
                          {opt.name}
                        </h4>
                        <p className="text-[10px] text-[#a7a7a7] truncate mt-0.5">
                          {opt.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


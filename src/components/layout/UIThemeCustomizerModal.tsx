import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Sparkles, 
  LayoutGrid, 
  Sliders, 
  Flame, 
  Disc3, 
  Layers, 
  Compass, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Monitor,
  Radio
} from 'lucide-react';
import { useLayoutTheme, LayoutMode, NavStyle, UIThemeOption } from '../../context/LayoutThemeContext';

export const UIThemeCustomizerModal: React.FC = () => {
  const { 
    layoutMode, 
    navStyle, 
    setLayoutMode, 
    setNavStyle, 
    isCustomizerOpen, 
    setIsCustomizerOpen, 
    availableOptions 
  } = useLayoutTheme();

  if (!isCustomizerOpen) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Disc3': return <Disc3 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCustomizerOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto text-[#b3b3b3]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ed760]/10 border border-[#1ed760]/30 text-[#1ed760] text-xs font-mono font-bold uppercase mb-2">
                <Monitor className="w-3.5 h-3.5" /> APP LAYOUT & EXPERIENCE
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Select Your App Layout Architecture
              </h2>
              <p className="text-sm text-[#a7a7a7] mt-1">
                Choose your favorite UI system. GullyVerse dynamically transforms sidebars, top bars, bottom transport decks, and screen layouts in real-time.
              </p>
            </div>

            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-2 rounded-full bg-[#1e1e1e] hover:bg-[#282828] text-[#a7a7a7] hover:text-white transition-colors"
              aria-label="Close UI Selector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* UI Layout Options Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableOptions.map((opt) => {
              const isSelected = layoutMode === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setLayoutMode(opt.id)}
                  className={`relative p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 text-left group ${
                    isSelected
                      ? 'bg-[#242424] border-[#1ed760] shadow-xl ring-1 ring-[#1ed760]'
                      : 'bg-[#181818] border-white/5 hover:border-white/20 hover:bg-[#1e1e1e]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-r ${opt.accentColor} text-black font-bold shadow`}>
                          {getIcon(opt.iconName)}
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-base text-white group-hover:text-[#1ed760] transition-colors">
                            {opt.name}
                          </h3>
                          <p className="text-xs text-[#a7a7a7]">{opt.tagline}</p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#1ed760] text-black font-black'
                          : 'bg-black/50 text-[#a7a7a7] border border-white/10'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>

                    <p className="text-xs text-[#b3b3b3] leading-relaxed pt-1">
                      {opt.description}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-1.5 pt-2">
                      {opt.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#a7a7a7]">
                          <Check className={`w-3 h-3 ${isSelected ? 'text-[#1ed760]' : 'text-[#777]'}`} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#a7a7a7]">
                      Nav Style: <strong className="text-white">{opt.navStyle}</strong>
                    </span>
                    <button
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#1ed760] text-black shadow-md'
                          : 'bg-[#282828] text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {isSelected ? 'Active Theme' : 'Activate Theme'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#777] border-t border-white/10">
            <span>Themes are saved to your local session instantly.</span>
            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:scale-105 transition-transform"
            >
              Done & Continue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


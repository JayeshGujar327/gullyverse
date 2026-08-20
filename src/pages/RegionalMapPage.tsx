import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Flame, 
  Mic2, 
  Disc3, 
  Play, 
  BookOpen, 
  Sparkles, 
  Building2, 
  Compass, 
  Volume2,
  Radio,
  Share2,
  Check,
  Music2,
  Layers
} from 'lucide-react';
import { REGIONAL_SCENES } from '../data/regions';
import { SONGS } from '../data/songs';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { RegionalScene } from '../types';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

// Normalized SVG Coordinates (0-100% x, y) for Indian Hip-Hop Hubs
const MAP_HOTSPOTS: Record<string, { x: number; y: number; label: string }> = {
  'delhi-ncr': { x: 38, y: 28, label: 'Delhi-NCR' },
  'punjab-chandigarh': { x: 33, y: 20, label: 'Punjab / Chandigarh' },
  'mumbai': { x: 26, y: 58, label: 'Mumbai Gully' },
  'pune': { x: 30, y: 64, label: 'Pune Basti' },
  'bengaluru': { x: 38, y: 79, label: 'Bengaluru' },
  'chennai': { x: 48, y: 78, label: 'Chennai' },
  'kerala-kochi': { x: 35, y: 88, label: 'Kerala (Kochi)' },
  'kolkata': { x: 74, y: 48, label: 'Kolkata' },
  'northeast-shillong': { x: 86, y: 38, label: 'Northeast (Shillong)' }
};

export const RegionalMapPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalScene>(REGIONAL_SCENES[0]); // Mumbai default
  const [filterRegionZone, setFilterRegionZone] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');
  const { playSong } = usePlayer();
  const { showToast } = useToast();

  const zones = ['ALL', 'WEST', 'NORTH', 'SOUTH', 'EAST', 'NORTHEAST'];

  const filteredRegions = REGIONAL_SCENES.filter((r) => {
    if (filterRegionZone === 'ALL') return true;
    if (filterRegionZone === 'WEST') return ['mumbai', 'pune'].includes(r.id);
    if (filterRegionZone === 'NORTH') return ['delhi-ncr', 'punjab-chandigarh'].includes(r.id);
    if (filterRegionZone === 'SOUTH') return ['bengaluru', 'chennai', 'kerala-kochi'].includes(r.id);
    if (filterRegionZone === 'EAST') return ['kolkata'].includes(r.id);
    if (filterRegionZone === 'NORTHEAST') return ['northeast-shillong'].includes(r.id);
    return true;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast(`Shared ${selectedRegion.city} Hip-Hop Hub! Link copied.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28 space-y-6 select-none">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Regional Hip-Hop Sound Map" 
        parentLabel="DISCOVER SCENE" 
        parentRoute="/" 
      />

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-r from-[#181818] via-[#1a1a24] to-[#121212] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ed760]/10 border border-[#1ed760]/30 text-[#1ed760] text-xs font-mono font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5" /> GEOGRAPHICAL SOUND MATRIX • PAN-INDIA
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
            REGIONAL RAP MAP OF INDIA
          </h1>
          <p className="text-[#a7a7a7] text-sm sm:text-base leading-relaxed">
            Desi Hip-Hop is a diverse sonic subcontinent. From Mumbai's Bambaiya street slang to Delhi's drill cadences and Kerala's political poetry, explore regional soundscapes, street slang, landmark venues, and defining anthems.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-black/60 p-1.5 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setViewMode('MAP')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'MAP'
                ? 'bg-[#1ed760] text-black shadow-md'
                : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Interactive Map
          </button>
          <button
            onClick={() => setViewMode('GRID')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'GRID'
                ? 'bg-[#1ed760] text-black shadow-md'
                : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Hub Matrix
          </button>
        </div>
      </div>

      {/* Zone Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setFilterRegionZone(zone)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              filterRegionZone === zone
                ? 'bg-white text-black font-black shadow-lg scale-105'
                : 'bg-[#181818] border border-white/10 text-[#b3b3b3] hover:text-white hover:bg-[#282828]'
            }`}
          >
            {zone} REGION ({REGIONAL_SCENES.filter((r) => {
              if (zone === 'ALL') return true;
              if (zone === 'WEST') return ['mumbai', 'pune'].includes(r.id);
              if (zone === 'NORTH') return ['delhi-ncr', 'punjab-chandigarh'].includes(r.id);
              if (zone === 'SOUTH') return ['bengaluru', 'chennai', 'kerala-kochi'].includes(r.id);
              if (zone === 'EAST') return ['kolkata'].includes(r.id);
              if (zone === 'NORTHEAST') return ['northeast-shillong'].includes(r.id);
              return true;
            }).length})
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map / Hubs List + Deep Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map Canvas or Grid of Hubs (6 or 7 cols) */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-4">
          {viewMode === 'MAP' ? (
            /* Interactive Stylized Geographical Cartography Box */
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-[#a7a7a7] border-b border-white/10 pb-3">
                <span className="flex items-center gap-1.5 text-[#1ed760] font-bold">
                  <MapPin className="w-3.5 h-3.5" /> CLICK PINS TO EXPLORE SOUNDSCAPES
                </span>
                <span className="text-white font-bold">{filteredRegions.length} Active Hubs</span>
              </div>

              {/* SVG Cartographic Canvas */}
              <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.2] bg-gradient-to-b from-[#0a0a0f] to-[#121218] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
                {/* Background Grid Lines & Coordinates */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* Decorative Radar Sweep / Subcontinent Watermark */}
                <svg className="w-full h-full opacity-20 pointer-events-none absolute inset-0" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  {/* Stylized outline bounds of India */}
                  <path
                    d="M 35 15 Q 45 10 50 16 Q 60 22 55 30 Q 75 30 85 36 Q 90 42 75 52 Q 65 65 52 88 Q 45 92 38 88 Q 30 72 25 58 Q 20 40 35 15 Z"
                    className="text-white/30"
                    strokeWidth="0.75"
                    strokeDasharray="2 2"
                  />
                  <circle cx="50" cy="50" r="40" className="text-white/10" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="25" className="text-white/10" strokeWidth="0.5" />
                </svg>

                {/* Hotspot Interactive Nodes */}
                {filteredRegions.map((region) => {
                  const hotspot = MAP_HOTSPOTS[region.id] || { x: 50, y: 50, label: region.city };
                  const isSelected = selectedRegion.id === region.id;

                  return (
                    <motion.div
                      key={region.id}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute z-10 cursor-pointer group"
                      onClick={() => setSelectedRegion(region)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Pulse Wave on Active */}
                      {isSelected && (
                        <span className="absolute -inset-2.5 rounded-full bg-[#1ed760]/30 animate-ping" />
                      )}

                      {/* Map Pin Capsule */}
                      <div
                        className={`px-2.5 py-1 rounded-full border shadow-xl flex items-center gap-1.5 transition-all text-xs font-bold whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#1ed760] text-black border-[#1ed760] shadow-[0_0_15px_rgba(30,215,96,0.6)] scale-105'
                            : 'bg-[#1e1e1e]/90 text-white border-white/20 hover:border-[#1ed760] hover:bg-[#282828]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-black animate-pulse' : 'bg-[#1ed760]'
                          }`}
                        />
                        <span className="text-[11px] font-heading font-black tracking-tight">{region.city}</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 bg-black/80 backdrop-blur rounded-lg border border-white/10 text-[10px] font-mono text-[#a7a7a7]">
                  <span>Active Hub: <strong className="text-[#1ed760]">{selectedRegion.city}</strong></span>
                  <span>Est. {selectedRegion.establishedYear}</span>
                </div>
              </div>

              {/* Mini Hub Carousel / Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredRegions.map((region) => {
                  const isSelected = selectedRegion.id === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#282828] border-[#1ed760] shadow text-white'
                          : 'bg-[#181818] border-white/5 text-[#a7a7a7] hover:text-white hover:bg-[#202020]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#1ed760]' : 'bg-[#555]'}`} />
                        <span className="font-bold text-xs truncate">{region.city}</span>
                      </div>
                      <p className="text-[10px] text-[#777] truncate mt-0.5">{region.state}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Grid View of Regional Hubs */
            <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredRegions.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                return (
                  <div
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#242424] border-[#1ed760] shadow-xl ring-1 ring-[#1ed760]'
                        : 'bg-[#181818] border-white/5 hover:border-white/20 hover:bg-[#1e1e1e]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#1ed760] animate-pulse' : 'bg-white/40'}`} />
                          <h3 className="font-heading font-extrabold text-base text-white truncate">
                            {region.city}
                          </h3>
                        </div>
                        <p className="text-xs text-[#a7a7a7] font-mono">
                          {region.state} • {region.primaryLanguages.join(', ')}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#1ed760] font-bold bg-[#1ed760]/10 px-2 py-0.5 rounded-full border border-[#1ed760]/20 shrink-0">
                        Est. {region.establishedYear}
                      </span>
                    </div>

                    <p className="text-xs text-[#b3b3b3] mt-2 line-clamp-2 leading-relaxed">
                      {region.soundSignature}
                    </p>

                    <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono text-[#777]">
                      <Mic2 className="w-3.5 h-3.5 text-[#1ed760]" />
                      <span className="truncate">Key MCs: {region.keyArtists.join(', ')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Deep Regional Dossier Inspector (6 or 7 cols) */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 shadow-2xl space-y-6 text-[#b3b3b3]"
            >
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1ed760] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>REGIONAL SCENE DOSSIER • {selectedRegion.state}</span>
                  </div>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                    {selectedRegion.city}
                  </h2>
                  <p className="text-xs font-mono text-[#a7a7a7]">
                    Languages: {selectedRegion.primaryLanguages.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-[#242424] hover:bg-[#333333] text-white border border-white/10 transition-colors"
                    title="Share Hub"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="px-3 py-1.5 rounded-lg bg-[#242424] border border-white/10 text-right">
                    <span className="text-[10px] font-mono text-[#777] block uppercase">Pioneered</span>
                    <strong className="text-sm font-mono text-[#1ed760] font-black">{selectedRegion.establishedYear}</strong>
                  </div>
                </div>
              </div>

              {/* Sound Signature & Cadence */}
              <div className="space-y-2 p-4 rounded-xl bg-[#181818] border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1ed760] font-bold">
                  <Volume2 className="w-4 h-4" /> SOUND SIGNATURE & CADENCE
                </div>
                <p className="text-sm text-white leading-relaxed font-sans">
                  {selectedRegion.soundSignature}
                </p>
              </div>

              {/* History & Movement Origin */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#a7a7a7] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1ed760]" /> MOVEMENT HISTORY & ORIGIN
                </h4>
                <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                  {selectedRegion.sceneHistory}
                </p>
              </div>

              {/* Key MCs & Crews */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#a7a7a7] font-bold flex items-center gap-1.5">
                  <Mic2 className="w-3.5 h-3.5 text-[#1ed760]" /> KEY MCs, LYRICISTS & CREWS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.keyArtists.map((artistName) => (
                    <span
                      key={artistName}
                      className="px-3 py-1 rounded-full bg-[#1e1e1e] border border-white/10 text-xs font-bold text-white hover:border-[#1ed760] transition-colors"
                    >
                      {artistName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Street Slang Glossary */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
                  <BookOpen className="w-4 h-4" /> LOCAL STREET SLANG & LINGO
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(selectedRegion.localSlang || []).map((slang) => (
                    <div
                      key={slang.term}
                      className="p-3 rounded-xl bg-[#181818] border border-white/5 space-y-1 hover:border-white/20 transition-colors"
                    >
                      <span className="text-xs font-bold text-[#1ed760] font-mono block">
                        "{slang.term}"
                      </span>
                      <p className="text-[11px] text-[#b3b3b3] leading-relaxed">
                        {slang.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defining Scene Anthems */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#1ed760] font-bold">
                  <Disc3 className="w-4 h-4" /> DEFINING SCENE ANTHEMS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(selectedRegion.iconicAnthems || []).map((title) => {
                    const matchedSong = SONGS.find(
                      (s) =>
                        s.title.toLowerCase().includes(title.toLowerCase()) ||
                        title.toLowerCase().includes(s.title.toLowerCase())
                    );
                    return (
                      <div
                        key={title}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/5 hover:bg-[#202020] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <Music2 className="w-4 h-4 text-[#1ed760] shrink-0" />
                          <span className="text-xs font-bold text-white truncate">{title}</span>
                        </div>
                        {matchedSong ? (
                          <button
                            onClick={() => playSong(matchedSong)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1ed760] text-black text-[11px] font-bold hover:scale-105 transition-transform shrink-0"
                          >
                            <Play className="w-3 h-3 fill-black ml-0.5" /> Play
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-[#777] shrink-0">Classic Track</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Landmark Hip-Hop Venues & Cypher Spots */}
              {selectedRegion.keyVenues && selectedRegion.keyVenues.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#a7a7a7]">
                    <Building2 className="w-3.5 h-3.5 text-[#1ed760]" />
                    <span>LANDMARK VENUES & CYPHER SPOTS:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion.keyVenues.map((v) => (
                      <span
                        key={v}
                        className="text-xs px-3 py-1 rounded-lg bg-[#181818] border border-white/10 text-white font-mono"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


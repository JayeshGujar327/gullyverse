import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Mic2, Disc3, MapPin, BookOpen, Flame, Sliders, ArrowRight } from 'lucide-react';
import { ARTISTS } from '../../data/artists';
import { SONGS, ALBUMS } from '../../data/songs';
import { REGIONAL_SCENES } from '../../data/regions';
import { HIP_HOP_TERMS } from '../../data/education';
import { CYPHERS, RAP_BATTLES } from '../../data/cyphers';
import { PRODUCERS } from '../../data/producers';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Filtered categorized results
  const filteredArtists = trimmed
    ? ARTISTS.filter(
        (a) =>
          a.stageName.toLowerCase().includes(trimmed) ||
          a.name.toLowerCase().includes(trimmed) ||
          a.city.toLowerCase().includes(trimmed) ||
          a.languages.some((l) => l.toLowerCase().includes(trimmed))
      )
    : [];

  const filteredSongs = trimmed
    ? SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(trimmed) ||
          s.artistName.toLowerCase().includes(trimmed) ||
          s.producer.toLowerCase().includes(trimmed) ||
          s.genre.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredRegions = trimmed
    ? REGIONAL_SCENES.filter(
        (r) =>
          r.city.toLowerCase().includes(trimmed) ||
          r.state.toLowerCase().includes(trimmed) ||
          r.primaryLanguages.some((l) => l.toLowerCase().includes(trimmed))
      )
    : [];

  const filteredTerms = trimmed
    ? HIP_HOP_TERMS.filter(
        (t) =>
          t.term.toLowerCase().includes(trimmed) ||
          t.definition.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredCyphers = trimmed
    ? CYPHERS.filter((c) => c.title.toLowerCase().includes(trimmed))
    : [];

  const hasResults =
    filteredArtists.length > 0 ||
    filteredSongs.length > 0 ||
    filteredRegions.length > 0 ||
    filteredTerms.length > 0 ||
    filteredCyphers.length > 0;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#111117] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-800 bg-zinc-900/60">
            <Search className="w-5 h-5 text-rose-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists, anthems, cities, slang, cyphers, producers..."
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
              ESC
            </kbd>
          </div>

          {/* Search Body */}
          <div className="p-4 overflow-y-auto space-y-6">
            {!trimmed ? (
              <div className="space-y-4 py-4">
                <div className="text-xs font-mono uppercase text-zinc-400">Popular Searches</div>
                <div className="flex flex-wrap gap-2">
                  {['DIVINE', 'Seedhe Maut', 'Nanchaku', 'Mumbai Gully Rap', 'KR$NA', 'Boom Bap', 'MC Stan', '808 Sub', 'Carnatic Rap'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : !hasResults ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-sm font-semibold text-zinc-300">No results found for "{query}"</p>
                <p className="text-xs text-zinc-500">Try searching for artist names (DIVINE, KR$NA), tracks, or cities.</p>
              </div>
            ) : (
              <>
                {/* Artists */}
                {filteredArtists.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-rose-400 font-bold">
                      <Mic2 className="w-3.5 h-3.5" /> Artists ({filteredArtists.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredArtists.map((artist) => (
                        <div
                          key={artist.id}
                          onClick={() => handleSelect(`/artists/${artist.id}`)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 cursor-pointer transition-colors"
                        >
                          <img
                            src={artist.image}
                            alt={artist.stageName}
                            className="w-10 h-10 rounded-lg object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <h4 className="text-xs font-bold text-white truncate">{artist.stageName}</h4>
                              <span className="text-[10px] text-zinc-400 font-mono">({artist.city})</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 truncate">{artist.genres.slice(0, 2).join(' • ')}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Songs */}
                {filteredSongs.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 font-bold">
                      <Disc3 className="w-3.5 h-3.5" /> Anthems & Tracks ({filteredSongs.length})
                    </div>
                    <div className="space-y-1.5">
                      {filteredSongs.map((song) => (
                        <div
                          key={song.id}
                          onClick={() => handleSelect(`/songs/${song.id}`)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={song.coverArt}
                              alt={song.title}
                              className="w-9 h-9 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{song.title}</h4>
                              <p className="text-[10px] text-zinc-400 truncate">{song.artistName} • {song.genre}</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400">{song.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regional Scenes */}
                {filteredRegions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-400 font-bold">
                      <MapPin className="w-3.5 h-3.5" /> Regional Scenes ({filteredRegions.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredRegions.map((region) => (
                        <div
                          key={region.id}
                          onClick={() => handleSelect(`/map`)}
                          className="p-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white">{region.city}, {region.state}</h4>
                            <span className="text-[10px] font-mono text-amber-400">{region.establishedYear}</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{region.soundSignature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terminology */}
                {filteredTerms.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-purple-400 font-bold">
                      <BookOpen className="w-3.5 h-3.5" /> Dictionary Terms ({filteredTerms.length})
                    </div>
                    <div className="space-y-1.5">
                      {filteredTerms.map((term) => (
                        <div
                          key={term.id}
                          onClick={() => handleSelect(`/learn-rap`)}
                          className="p-2.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/80 cursor-pointer transition-colors"
                        >
                          <h4 className="text-xs font-bold text-purple-300">{term.term}</h4>
                          <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-1">{term.simpleExplanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


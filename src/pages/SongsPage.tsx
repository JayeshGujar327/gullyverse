import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Disc3, Flame, Volume2, Sparkles, Filter, Sliders } from 'lucide-react';
import { SONGS } from '../data/songs';
import { SongCard } from '../components/music/SongCard';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Mood, Genre } from '../types';

export const SongsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('ALL');
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [undergroundFilter, setUndergroundFilter] = useState<'ALL' | 'UNDERGROUND' | 'MAINSTREAM'>('ALL');
  const [maxBpm, setMaxBpm] = useState<number>(160);

  const moods: Mood[] = [
    'HYPE',
    'STREET',
    'AGGRESSIVE',
    'HUSTLE',
    'CONSCIOUS',
    'CHILL',
    'NIGHT',
    'EMOTIONAL'
  ];

  const genres = useMemo(() => {
    const set = new Set<string>();
    SONGS.forEach((s) => set.add(s.genre));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredSongs = useMemo(() => {
    return SONGS.filter((song) => {
      const matchSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.producer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMood = selectedMood === 'ALL' || song.mood === selectedMood;
      const matchGenre = selectedGenre === 'ALL' || song.genre === selectedGenre;
      const matchUg =
        undergroundFilter === 'ALL' ||
        (undergroundFilter === 'UNDERGROUND' && song.isUnderground) ||
        (undergroundFilter === 'MAINSTREAM' && !song.isUnderground);
      const matchBpm = song.bpm <= maxBpm;

      return matchSearch && matchMood && matchGenre && matchUg && matchBpm;
    });
  }, [searchQuery, selectedMood, selectedGenre, undergroundFilter, maxBpm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Music Crate" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
          <Disc3 className="w-4 h-4" /> DHH MUSIC & ANTHEM VAULT
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          INDIAN RAP DISCOVERY
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Search the definitive sound catalog of South Asian hip-hop. Filter by street mood, tempo, producers, and underground heat.
        </p>
      </div>

      {/* Mood Selector Pills (Horizontal Scroll) */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono uppercase text-zinc-400">DISCOVER BY MOOD</label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedMood('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              selectedMood === 'ALL'
                ? 'bg-[#ff334b] text-white shadow-lg shadow-rose-950/40'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            ALL VIBES
          </button>
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                selectedMood === m
                  ? 'bg-[#ff334b] text-white shadow-lg shadow-rose-950/40'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Complex Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by track title, rapper, producer, or lyric snippet..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Genre selector */}
          <div className="w-full md:w-48">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Underground filter */}
          <div className="w-full md:w-44">
            <select
              value={undergroundFilter}
              onChange={(e) => setUndergroundFilter(e.target.value as 'ALL' | 'UNDERGROUND' | 'MAINSTREAM')}
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="ALL">All Releases</option>
              <option value="UNDERGROUND">Underground Only</option>
              <option value="MAINSTREAM">Mainstream Heavy</option>
            </select>
          </div>
        </div>

        {/* BPM Range Slider */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <Sliders className="w-4 h-4 text-rose-500" />
            <span>MAX BPM TEMPO: <strong className="text-white">{maxBpm} BPM</strong></span>
          </div>
          <input
            type="range"
            min="80"
            max="160"
            step="2"
            value={maxBpm}
            onChange={(e) => setMaxBpm(parseInt(e.target.value))}
            className="w-full sm:w-64 h-1.5 bg-zinc-800 accent-rose-500 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>SHOWING {filteredSongs.length} TRACKS</span>
          {(selectedMood !== 'ALL' || selectedGenre !== 'ALL' || undergroundFilter !== 'ALL' || searchQuery || maxBpm < 160) && (
            <button
              onClick={() => {
                setSelectedMood('ALL');
                setSelectedGenre('ALL');
                setUndergroundFilter('ALL');
                setSearchQuery('');
                setMaxBpm(160);
              }}
              className="text-rose-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredSongs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111116] border border-zinc-800">
            <p className="text-zinc-300 font-bold">No songs match your criteria.</p>
            <p className="text-xs text-zinc-500 mt-1">Try relaxing the BPM slider or mood filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSongs.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


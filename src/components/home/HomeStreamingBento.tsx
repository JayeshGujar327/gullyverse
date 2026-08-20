import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Flame, 
  Disc3, 
  Mic2, 
  MapPin, 
  BookOpen, 
  ArrowRight, 
  Play, 
  Pause,
  Award, 
  Sliders, 
  Layers, 
  Radio, 
  TrendingUp, 
  Volume2,
  Calendar,
  Zap,
  Activity,
  Compass,
  Headphones,
  CheckCircle2,
  LayoutGrid,
  ShieldCheck
} from 'lucide-react';
import { ARTISTS, ALL_ARTISTS } from '../../data/artists';
import { SONGS } from '../../data/songs';
import { REGIONAL_SCENES } from '../../data/regions';
import { SongCard } from '../music/SongCard';
import { ArtistCard } from '../artists/ArtistCard';
import { usePlayer } from '../../context/PlayerContext';
import { Mood } from '../../types';

export const HomeStreamingBento: React.FC = () => {
  const { playSong, isPlaying, currentSong, togglePlay } = usePlayer();
  const [selectedMood, setSelectedMood] = useState<string>('ALL');

  const topArtists = ALL_ARTISTS.slice(0, 6);
  const featuredArtist = ALL_ARTISTS[0]; // DIVINE
  const artist2 = ALL_ARTISTS[1]; // Seedhe Maut
  const trendingSongs = SONGS.filter(s => selectedMood === 'ALL' || s.mood === selectedMood).slice(0, 6);

  const moods: { id: string; label: string; emoji: string }[] = [
    { id: 'ALL', label: 'All Bangers', emoji: '🔥' },
    { id: 'HYPE', label: 'Moshpit Hype', emoji: '⚡' },
    { id: 'AGGRESSIVE', label: 'Raw Drill & Hard', emoji: '🥊' },
    { id: 'CHILL', label: 'Midnight Chill', emoji: '🌙' },
    { id: 'LYRICAL', label: 'Pure Bars & Technical', emoji: '🧠' },
    { id: 'STREET', label: 'Gully Anthem', emoji: '🏙️' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. BENTO HERO MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Bento Hero Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#121727] via-[#0d101a] to-[#141a2c] border border-[#232f4c] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> MODERN STREAMING BENTO MATRIX
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
                GULLY<span className="text-amber-400">VERSE</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Stream master lossless anthems, explore pan-India regional dialects, compare lyrical flow signatures, and dive into authentic Indian hip-hop culture.
              </p>
            </div>

            {/* Quick Action Dock */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => playSong(SONGS[0])}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-black" />
                Play Master Anthem
              </button>

              <Link
                to="/artists"
                className="px-5 py-3.5 rounded-2xl bg-[#182033] hover:bg-[#202b44] border border-[#263450] text-white font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors"
              >
                <Mic2 className="w-4 h-4 text-amber-400" />
                Browse 50+ MCs
              </Link>

              <Link
                to="/map"
                className="px-5 py-3.5 rounded-2xl bg-[#182033] hover:bg-[#202b44] border border-[#263450] text-slate-300 hover:text-white font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                Regional Map
              </Link>
            </div>
          </div>

          {/* Right Bento Column: 2 Stacked Cards (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Card 1: Artist of the Week Quick Card */}
            <div className="p-5 rounded-3xl bg-[#0f1320] border border-[#1e273d] flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-colors shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> SPOTLIGHT ARTIST
                </span>
                <span className="text-[10px] font-mono text-slate-400">98% POWER</span>
              </div>

              <div className="flex items-center gap-3.5">
                <img
                  src={featuredArtist.image}
                  alt={featuredArtist.stageName}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#283550] shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-heading font-bold text-base text-white">{featuredArtist.stageName}</h3>
                  <p className="text-xs text-slate-400">{featuredArtist.city} • {featuredArtist.primaryLanguage}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1a2336] text-xs font-mono">
                <span className="text-slate-400">"{featuredArtist.quote?.slice(0, 32)}..."</span>
                <Link to={`/artists/${featuredArtist.id}`} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: Interactive Flow Lab / Rhyme Metronome Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#111728] to-[#0c101a] border border-[#222d46] flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> FLOW LAB & SYNTHESIZER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[9px] font-mono">
                  LIVE 808
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Practice rhyme schemes over customizable 808 tempos with real-time syllable counters and rap dictionary.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#1a2336]">
                <span className="text-xs font-mono text-slate-400">90 to 140 BPM PRESETS</span>
                <Link
                  to="/learn-rap"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Launch Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MOOD & VIBE QUICK-SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <h2 className="font-heading font-extrabold text-xl text-white">Mood Station</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Instant Streaming Preset</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {moods.map((m) => {
            const isActive = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-[#101422] text-slate-300 border-[#1f283d] hover:text-white hover:border-[#2e3b59]'
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. TRENDING MASTER ANTHEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
              HIGH FREQUENCY AUDIO
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Trending Crate
            </h2>
          </div>

          <Link to="/songs" className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 font-bold">
            VIEW ALL TRACKS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trendingSongs.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED RAP MATRIX ARTISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              EMCEE LINEUP
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Pioneers & Prodigies
            </h2>
          </div>

          <Link to="/artists" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-bold">
            EXPLORE 50+ ARTISTS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};


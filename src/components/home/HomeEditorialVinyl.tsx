import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Disc3, 
  BookOpen, 
  History, 
  Layers, 
  Mic2, 
  MapPin, 
  Quote, 
  Play, 
  ArrowRight, 
  Sparkles,
  Award,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { ARTISTS, ALL_ARTISTS } from '../../data/artists';
import { SONGS, ALBUMS } from '../../data/songs';
import { HISTORY_ERAS } from '../../data/history';
import { usePlayer } from '../../context/PlayerContext';

export const HomeEditorialVinyl: React.FC = () => {
  const { playSong } = usePlayer();
  const [selectedVinyl, setSelectedVinyl] = useState(0);

  const coverArtist = ALL_ARTISTS[0]; // DIVINE
  const featuredSong = SONGS[0];
  const vinylRecords = SONGS.slice(0, 4);

  return (
    <div className="space-y-16 pb-28">
      {/* 1. EDITORIAL COVER STORY HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-6 sm:p-12 rounded-3xl bg-[#090c14] border border-[#1b2438] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Cover Editorial (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest">
                <Sparkles className="w-4 h-4" /> GULLYVERSE ANTHOLOGY // COVER STORY
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                THE DECADE THAT <br />
                <span className="text-emerald-400 italic">REDEFINED</span> INDIAN MUSIC.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                How Mumbai's chawls, Delhi's underground cyphers, and Punjab's folk-infused cadences broke the monopoly of Bollywood to establish Desi Hip-Hop as South Asia’s dominant cultural voice.
              </p>

              <div className="p-4 rounded-2xl bg-[#111624] border-l-4 border-emerald-400 text-xs text-slate-300 italic">
                "{coverArtist.quote || 'From the gullies to international arenas, this is our lived truth through the microphone.'}"
                <span className="block font-bold text-white not-italic mt-1 font-mono">— {coverArtist.stageName} ({coverArtist.city})</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/history"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <BookOpen className="w-4 h-4" /> Read 6 Eras Anthology
                </Link>

                <Link
                  to="/culture"
                  className="px-5 py-3.5 rounded-xl bg-[#131826] hover:bg-[#1a2236] border border-[#222d46] text-slate-200 font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors"
                >
                  <Layers className="w-4 h-4 text-emerald-400" /> 4 Pillars of Culture
                </Link>
              </div>
            </div>

            {/* Right: Spinning Vinyl Record Player (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0f1422] border border-[#1e2840] space-y-5 shadow-2xl">
              <div className="flex items-center justify-between w-full text-xs font-mono">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Disc3 className="w-4 h-4 animate-spin-slow" /> MASTER VINYL TURNTABLE
                </span>
                <span className="text-slate-400">33⅓ RPM</span>
              </div>

              {/* Vinyl Disk Graphic */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-black via-zinc-900 to-black border-4 border-zinc-800 shadow-2xl flex items-center justify-center animate-spin-slow">
                <div className="w-40 h-40 rounded-full border border-zinc-700/60 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-zinc-700/80 flex items-center justify-center">
                    {/* Vinyl Center Label */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 p-2 text-center flex flex-col items-center justify-center text-black font-black">
                      <span className="text-[9px] font-mono leading-none font-extrabold">{vinylRecords[selectedVinyl].title.slice(0, 10)}</span>
                      <span className="text-[8px] font-mono mt-0.5">{vinylRecords[selectedVinyl].bpm} BPM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-heading font-bold text-base text-white">{vinylRecords[selectedVinyl].title}</h4>
                <p className="text-xs text-slate-400 font-mono">{vinylRecords[selectedVinyl].artistName} • {vinylRecords[selectedVinyl].releaseYear}</p>
              </div>

              <button
                onClick={() => playSong(vinylRecords[selectedVinyl])}
                className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-300" />
                Play Turntable Preview
              </button>

              {/* Quick Track Switcher */}
              <div className="flex items-center gap-1.5 pt-1">
                {vinylRecords.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVinyl(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      selectedVinyl === i ? 'bg-emerald-400 scale-125' : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    title={`Select record ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIX HISTORICAL ERAS CHRONICLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-white">
            6 Epochs of Desi Hip-Hop
          </h2>
          <Link to="/history" className="text-xs font-mono text-emerald-400 hover:underline">
            EXPLORE FULL CHRONOLOGY →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HISTORY_ERAS.map((era) => (
            <div key={era.id} className="p-4 rounded-2xl bg-[#0c101a] border border-[#1b2338] space-y-2 hover:border-emerald-500/30 transition-colors">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{era.years}</span>
              <h4 className="font-heading font-bold text-sm text-white line-clamp-1">{era.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{era.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ESSENTIAL DISCOGRAPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Essential Discography
          </h2>
          <Link to="/songs" className="text-xs font-mono text-slate-400 hover:text-white">
            COMPLETE VAULT →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALBUMS.slice(0, 4).map((album) => (
            <div key={album.id} className="p-4 rounded-2xl bg-[#0d111c] border border-[#1d263c] space-y-3 hover:border-emerald-500/40 transition-colors">
              <img
                src={album.coverArt}
                alt={album.title}
                className="w-full h-44 rounded-xl object-cover border border-[#24304c]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-sm text-white">{album.title}</h4>
                <p className="text-xs text-slate-400">{album.artistName} • {album.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


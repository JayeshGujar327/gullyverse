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
  Award, 
  Sliders, 
  Layers, 
  Radio, 
  TrendingUp, 
  Volume2,
  Calendar,
  Zap,
  Activity,
  BarChart3,
  Compass,
  Headphones
} from 'lucide-react';
import { ARTISTS, ALL_ARTISTS } from '../../data/artists';
import { SONGS } from '../../data/songs';
import { HISTORY_ERAS, ICONIC_MOMENTS } from '../../data/history';
import { CYPHERS } from '../../data/cyphers';
import { HIP_HOP_TERMS } from '../../data/education';
import { ArtistCard } from '../artists/ArtistCard';
import { SongCard } from '../music/SongCard';
import { usePlayer } from '../../context/PlayerContext';

export const HomeStudioPro: React.FC = () => {
  const { playSong } = usePlayer();

  const featuredArtist = ALL_ARTISTS[0]; // DIVINE
  const artistOfTheWeek = ALL_ARTISTS[1]; // Seedhe Maut
  const songOfTheDay = SONGS[2]; // Nanchaku
  const dailyTerm = HIP_HOP_TERMS[0]; // Bar
  const dailyMoment = ICONIC_MOMENTS[0]; // Mere Gully Mein
  const dailyCypher = CYPHERS[0]; // Gully Gang Cypher

  const trendingSongs = SONGS.slice(0, 6);
  const risingArtists = ALL_ARTISTS.slice(4, 10);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO PRO AUDIO CONSOLE */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(245,158,11,0.18),rgba(0,0,0,0))] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101524] border border-[#222d47] shadow-lg text-xs font-mono tracking-widest text-slate-300 font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-amber-400">STUDIO PRO WORKSTATION</span>
            <span className="text-slate-600">•</span>
            <span>ONE COUNTRY. MANY FLOWS.</span>
          </div>

          <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
            GULLY<span className="text-amber-400">VERSE</span>
          </h1>
          <p className="font-display text-xl sm:text-3xl text-slate-300 tracking-wide uppercase">
            "FROM GULLY TO GLOBAL."
          </p>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            The comprehensive interactive workstation for Indian Hip-Hop. Explore raw street cadences, regional rap geographies, interactive flow synthesizers, cypher archives, and living cultural lore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/artists"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-black font-heading font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 flex items-center gap-2 transform active:scale-95 transition-all"
            >
              <Mic2 className="w-4 h-4 text-black" /> Explore Artists
            </Link>

            <Link
              to="/map"
              className="px-6 py-3.5 rounded-xl bg-[#121624] hover:bg-[#1a2136] border border-[#20293f] text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all"
            >
              <MapPin className="w-4 h-4 text-amber-400" /> Regional Rap Map
            </Link>

            <Link
              to="/learn-rap"
              className="px-6 py-3.5 rounded-xl bg-[#121624] hover:bg-[#1a2136] border border-[#20293f] text-slate-300 hover:text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-lg transition-all"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" /> Flow Lab
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE DAILY DROP (4-BOX MATRIX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-7 rounded-3xl bg-[#0d101a] border border-[#1d2538] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#1a2236]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
                <Sparkles className="w-4 h-4" /> DAILY CURATION
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                THE DAILY DROP
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#121624] px-3 py-1.5 rounded-full border border-[#20293f]">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
            {/* Daily Artist */}
            <div className="p-4 rounded-2xl bg-[#121624] border border-[#1f283d] space-y-3 hover:border-amber-400/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">ARTIST SPOTLIGHT</span>
              <div className="flex items-center gap-3">
                <img
                  src={featuredArtist.image}
                  alt={featuredArtist.stageName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#2a3652]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">{featuredArtist.stageName}</h4>
                  <p className="text-xs text-slate-400">{featuredArtist.city} • {featuredArtist.primaryLanguage}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{featuredArtist.quote || featuredArtist.signatureStyle}</p>
              <Link to={`/artists/${featuredArtist.id}`} className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold hover:underline">
                Explore Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Song of the Day */}
            <div className="p-4 rounded-2xl bg-[#121624] border border-[#1f283d] space-y-3 hover:border-amber-400/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">ANTHEM OF THE DAY</span>
              <div className="flex items-center gap-3">
                <img
                  src={songOfTheDay.coverArt}
                  alt={songOfTheDay.title}
                  className="w-12 h-12 rounded-xl object-cover border border-[#2a3652]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">{songOfTheDay.title}</h4>
                  <p className="text-xs text-slate-400">{songOfTheDay.artistName} • {songOfTheDay.bpm} BPM</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic">"{songOfTheDay.iconicBars}"</p>
              <button
                onClick={() => playSong(songOfTheDay)}
                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold hover:underline"
              >
                <Play className="w-3 h-3 fill-emerald-400" /> Play Preview
              </button>
            </div>

            {/* Daily Term */}
            <div className="p-4 rounded-2xl bg-[#121624] border border-[#1f283d] space-y-3 hover:border-amber-400/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">RAP DICTIONARY</span>
              <div>
                <h4 className="font-heading font-bold text-sm text-cyan-300">{dailyTerm.term}</h4>
                <p className="text-[10px] font-mono text-slate-400">{dailyTerm.category}</p>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{dailyTerm.simpleExplanation}</p>
              <Link to="/learn-rap" className="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:underline">
                View Full Glossary <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Historic Moment */}
            <div className="p-4 rounded-2xl bg-[#121624] border border-[#1f283d] space-y-3 hover:border-amber-400/40 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">TODAY IN DHH HISTORY</span>
              <div>
                <h4 className="font-heading font-bold text-sm text-amber-300">{dailyMoment.year}: {dailyMoment.title}</h4>
                <p className="text-[10px] font-mono text-slate-400">{dailyMoment.artists.join(', ')}</p>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{dailyMoment.impact}</p>
              <Link to="/history" className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold hover:underline">
                Open Timeline <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING MASTER CRATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
              <TrendingUp className="w-4 h-4" /> AUDIO CRATE
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              TRENDING TRACKS
            </h2>
          </div>
          <Link
            to="/songs"
            className="text-xs font-mono font-bold text-slate-300 hover:text-amber-400 flex items-center gap-1"
          >
            VIEW ALL TRACKS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trendingSongs.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </section>

      {/* 4. ARTISTS MATRIX LINEUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            PRO RISING ARTISTS
          </h2>
          <Link to="/artists" className="text-xs font-mono font-bold text-slate-300 hover:text-amber-400 flex items-center gap-1">
            VIEW ROSTER <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {risingArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};


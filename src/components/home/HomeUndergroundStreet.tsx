import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Flame, 
  Mic2, 
  Disc3, 
  Radio, 
  Zap, 
  MapPin, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  History, 
  AlertTriangle,
  Layers,
  Swords,
  Trophy
} from 'lucide-react';
import { CYPHERS, DISS_TIMELINES } from '../../data/cyphers';
import { ARTISTS, ALL_ARTISTS } from '../../data/artists';
import { SONGS } from '../../data/songs';
import { usePlayer } from '../../context/PlayerContext';

export const HomeUndergroundStreet: React.FC = () => {
  const { playSong, isPlaying, currentSong } = usePlayer();
  const [selectedCassette, setSelectedCassette] = useState(0);

  const undergroundCypher = CYPHERS[0];
  const streetArtists = ALL_ARTISTS.filter(a => a.categories?.includes('UNDERGROUND') || a.categories?.includes('NEW_WAVE')).slice(0, 6);
  const rawBattles = DISS_TIMELINES.slice(0, 3);

  const cassettes = [
    { title: 'GULLY SIDE TAPE VOL. 1', bpm: '90 BPM', artist: 'DIVINE x Naezy', genre: 'Mumbai Street Anthem' },
    { title: 'DELHI DRILL & PUNCHLINES', bpm: '140 BPM', artist: 'Seedhe Maut x KR$NA', genre: 'Capital Moshpit' },
    { title: 'DECCAN CYPHER FREQUENCIES', bpm: '115 BPM', artist: 'Brodha V x Dabzee', genre: 'South Regional Force' },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* 1. VINTAGE CASSETTE & CYPHER HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-[#090b12] border-2 border-rose-600/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-black uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-rose-500" /> UNDERGROUND CYPHER & STREET ARCHIVE
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white uppercase italic tracking-tighter leading-tight">
                RAW STREETS. <br />
                <span className="text-rose-500">UNFILTERED</span> BARS.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Step into Mumbai's gullies, Delhi's moshpits, and Kerala's cyphers. Experience raw battle rap breakdowns, diss timelines, and street anthems that fueled the Desi Hip-Hop revolution.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/cyphers"
                  className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Flame className="w-4 h-4" /> Enter Cypher Arena
                </Link>

                <Link
                  to="/map"
                  className="px-5 py-3.5 rounded-xl bg-[#131724] hover:bg-[#1c2236] border border-[#232c45] text-slate-200 font-mono font-bold text-xs uppercase flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-rose-400" /> Hoods & Slangs Map
                </Link>
              </div>
            </div>

            {/* Right: Tactile Street Cassette Player (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111420] border-2 border-[#20293f] shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5" /> GULLY CASSETTE DECK
                </span>
                <span className="text-slate-400">SIDE A // STEREO</span>
              </div>

              {/* Tape Body Graphic */}
              <div className="p-4 rounded-xl bg-[#090c15] border border-[#1e263c] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[11px] font-mono text-amber-400 font-bold">
                  <span>{cassettes[selectedCassette].title}</span>
                  <span>{cassettes[selectedCassette].bpm}</span>
                </div>

                {/* Animated Wheels */}
                <div className="flex items-center justify-around py-3 bg-[#131826] rounded-lg border border-[#212b42]">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-700 bg-black flex items-center justify-center animate-spin-slow">
                    <div className="w-4 h-4 rounded-full bg-slate-500"></div>
                  </div>
                  <div className="h-6 w-20 bg-slate-900 rounded border border-slate-700 flex items-center justify-center">
                    <div className="w-16 h-1 bg-rose-500 rounded animate-pulse"></div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-slate-700 bg-black flex items-center justify-center animate-spin-slow">
                    <div className="w-4 h-4 rounded-full bg-slate-500"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
                  <span>{cassettes[selectedCassette].artist}</span>
                  <span>{cassettes[selectedCassette].genre}</span>
                </div>
              </div>

              {/* Tape Controller Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {cassettes.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCassette(idx);
                      playSong(SONGS[idx]);
                    }}
                    className={`py-2 px-2 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                      selectedCassette === idx
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-[#151a29] text-slate-400 hover:text-white border border-[#222b40]'
                    }`}
                  >
                    TAPE {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HISTORIC DISFIGHTS & BATTLE ARENA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-rose-500" />
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Historic Lyrical Beefs & Disfights
            </h2>
          </div>
          <Link to="/cyphers" className="text-xs font-mono text-rose-400 hover:underline font-bold">
            VIEW ALL BATTLES →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rawBattles.map((battle) => (
            <div key={battle.id} className="p-5 rounded-2xl bg-[#0f1320] border border-[#1e263c] space-y-3 hover:border-rose-500/40 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-rose-400 font-bold">{battle.year} CLASH</span>
                <span className="text-slate-400">{battle.tracks.length} DISSTRACKS</span>
              </div>
              <h3 className="font-heading font-bold text-base text-white">{battle.feudTitle || battle.feud}</h3>
              <p className="text-xs text-slate-300 line-clamp-3">{battle.summary}</p>
              <div className="pt-2 border-t border-[#1a2336] flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">STATUS: {battle.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. UNDERGROUND CREW ROSTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Underground Emcees & New Wave
          </h2>
          <Link to="/artists" className="text-xs font-mono text-slate-400 hover:text-white">
            ALL CREWS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {streetArtists.map((artist) => (
            <div key={artist.id} className="p-4 rounded-2xl bg-[#0d101a] border border-[#1e2538] flex items-center gap-3.5 hover:border-rose-500/30 transition-colors">
              <img
                src={artist.image}
                alt={artist.stageName}
                className="w-14 h-14 rounded-xl object-cover border border-[#27324c]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-sm text-white">{artist.stageName}</h4>
                <p className="text-xs text-slate-400">{artist.city} • {artist.primaryRole}</p>
                <Link to={`/artists/${artist.id}`} className="text-xs text-rose-400 font-bold hover:underline">
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


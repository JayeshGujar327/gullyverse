import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Tv, Swords, Disc3, ShieldAlert, Mic2, Sparkles, Quote } from 'lucide-react';
import { CYPHERS, RAP_BATTLES, DISS_TIMELINES, VERSE_VAULT } from '../data/cyphers';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { usePlayer } from '../context/PlayerContext';
import { Cypher } from '../types';

export const CyphersBattlesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CYPHERS' | 'BATTLES' | 'DISS_TIMELINE' | 'VERSES'>('CYPHERS');
  const { openYoutubeModal } = usePlayer();

  const handleWatchCypher = (cypher: Cypher) => {
    // Transform into standard song-like object for youtube modal
    openYoutubeModal({
      id: cypher.id,
      title: cypher.title,
      artistId: 'various',
      artistName: cypher.artists.join(', '),
      album: 'Cypher Session',
      duration: cypher.duration,
      releaseYear: cypher.year,
      coverArt: cypher.thumbnailUrl,
      youtubeUrl: cypher.videoUrl,
      youtubeId: cypher.youtubeId,
      bpm: 92,
      genre: 'Gully Rap',
      mood: 'HYPE',
      language: 'Hindi / English / Marathi',
      producer: cypher.beatProducer || 'Live Cypher Beat',
      isUnderground: true,
      audioSynthesizerPattern: 'cypher_boom_bap'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Cyphers & Battles" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-500 font-bold tracking-wider">
          <Flame className="w-4 h-4" /> STREET CYPHER VAULT & BATTLE ARENA
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          CYPHERS, BATTLES & DISS CLASHES
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Where raw freestyle lyricism is tested. Explore legendary Indian cyphers, park battles, and historic diss-track sagas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
        {[
          { id: 'CYPHERS', label: 'CYPHER VAULT' },
          { id: 'BATTLES', label: 'BATTLE LEAGUES' },
          { id: 'DISS_TIMELINE', label: 'DISS TRACK SAGES' },
          { id: 'VERSES', label: 'THE VERSE VAULT' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#ff334b] text-white shadow-lg shadow-rose-950/40'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. CYPHER VAULT */}
      {activeTab === 'CYPHERS' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CYPHERS.map((cypher) => (
            <div
              key={cypher.id}
              className="group p-5 rounded-2xl bg-[#111116] border border-zinc-800 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-zinc-900">
                  <img
                    src={cypher.thumbnailUrl}
                    alt={cypher.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => handleWatchCypher(cypher)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#ff334b] text-white flex items-center justify-center shadow-xl">
                      <Tv className="w-6 h-6" />
                    </div>
                  </button>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-200">
                    {cypher.duration}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="text-rose-400 font-bold">{cypher.city}</span>
                    <span>{cypher.year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-rose-400 transition-colors">
                    {cypher.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2">{cypher.significance}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                <div className="text-[11px] font-mono text-zinc-400">
                  Featuring: <strong className="text-zinc-200">{cypher.artists.join(', ')}</strong>
                </div>
                <button
                  onClick={() => handleWatchCypher(cypher)}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-rose-600 text-zinc-200 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Tv className="w-3.5 h-3.5" /> Watch Cypher Stream
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. BATTLE LEAGUES */}
      {activeTab === 'BATTLES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RAP_BATTLES.map((battle) => (
            <div
              key={battle.id}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-amber-400 font-bold">{battle.event} • {battle.city}</span>
                <span>{battle.year}</span>
              </div>

              <div className="flex items-center justify-center gap-4 py-4 bg-zinc-900/80 rounded-2xl border border-zinc-800">
                <span className="font-heading font-black text-xl text-white">{battle.mc1}</span>
                <span className="text-xs font-mono text-rose-500 font-bold bg-rose-500/10 px-2 py-1 rounded">VS</span>
                <span className="font-heading font-black text-xl text-white">{battle.mc2}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{battle.context}</p>

              {battle.winner && (
                <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                  <span>Declared Decision: <strong>{battle.winner}</strong></span>
                  <span className="text-zinc-500">Unanimous</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. DISS TRACK SAGES */}
      {activeTab === 'DISS_TIMELINE' && (
        <div className="space-y-6">
          {DISS_TIMELINES.map((saga) => (
            <div
              key={saga.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 space-y-6 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase">{saga.year} DISS CLASH</span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">{saga.feud}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  {saga.status}
                </div>
              </div>

              <p className="text-sm text-zinc-300">{saga.summary}</p>

              {/* Rounds Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold">EXCHANGE ROUNDS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {saga.tracks.map((track, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span>ROUND {i + 1}</span>
                        <span className="text-rose-400 font-bold">{track.rapper}</span>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-white truncate">{track.title}</h5>
                      <p className="text-[11px] text-zinc-400 italic line-clamp-2">"{track.keyPunchline}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. THE VERSE VAULT */}
      {activeTab === 'VERSES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VERSE_VAULT.map((verse) => (
            <div
              key={verse.id}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold">{verse.artist} — {verse.song}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">{verse.category}</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-zinc-800">
                  <p className="text-sm sm:text-base font-medium italic text-zinc-100 whitespace-pre-line leading-relaxed font-sans">
                    "{verse.verseText}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="text-amber-400 font-bold">Analysis: </span>
                {verse.breakdown}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


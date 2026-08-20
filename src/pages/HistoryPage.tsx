import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Calendar, Sparkles, Flame, ArrowRight, Disc3, Award } from 'lucide-react';
import { HISTORY_ERAS, ICONIC_MOMENTS } from '../data/history';
import { HistoryEra } from '../types';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const HistoryPage: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<HistoryEra>(HISTORY_ERAS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Chronicles of Desi Rap" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
          <History className="w-4 h-4" /> THE 6 ERAS OF INDIAN HIP-HOP
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          CHRONICLES OF DESI RAP
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Trace the 40-year evolution from cassette tapes, Orkut cyphers, and underground street battles to global stadium tours and multi-lingual streaming supremacy.
        </p>
      </div>

      {/* 6 Eras Timeline Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {HISTORY_ERAS.map((era) => {
          const isSelected = selectedEra.id === era.id;
          return (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-rose-950/20 border-rose-500 shadow-xl shadow-rose-950/30'
                  : 'bg-[#111116] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="text-[10px] font-mono text-amber-400 font-bold">{era.years}</div>
              <h3 className="font-heading font-bold text-sm text-white mt-1 leading-tight">{era.title}</h3>
            </button>
          );
        })}
      </div>

      {/* Selected Era Deep Dive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEra.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">
                ERA SPOTLIGHT • {selectedEra.years}
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
                {selectedEra.title}
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Pioneers: <strong className="text-amber-400">{selectedEra.keyPioneers.join(', ')}</strong>
            </div>
          </div>

          <p className="text-base text-zinc-200 leading-relaxed font-sans">
            {selectedEra.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/80">
            {/* Key Developments */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> KEY DEVELOPMENTS
              </h4>
              <ul className="space-y-2">
                {selectedEra.keyDevelopments.map((dev, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0"></span>
                    <span>{dev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Defining Anthems */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5" /> DEFINING ANTHEMS OF THIS ERA
              </h4>
              <div className="space-y-2">
                {selectedEra.definingTracks.map((track, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
                    <span>{track}</span>
                    <span className="text-[10px] text-zinc-500 font-bold">CLASSIC</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Iconic Cultural Moments Timeline Archive */}
      <div className="space-y-6 pt-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
            <Award className="w-4 h-4" /> TIME CAPSULE
          </div>
          <h2 className="font-heading font-black text-3xl text-white">
            ICONIC CULTURAL MILESTONES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ICONIC_MOMENTS.map((moment) => (
            <div
              key={moment.id}
              className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">{moment.year}</span>
                <span className="text-zinc-500">{moment.category}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">{moment.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{moment.description}</p>
              <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-rose-300">
                <span className="text-zinc-400 font-bold">Impact: </span>
                {moment.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


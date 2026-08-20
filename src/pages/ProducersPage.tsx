import React from 'react';
import { motion } from 'motion/react';
import { Sliders, Building2, Disc3, Sparkles, Music2, Layers } from 'lucide-react';
import { PRODUCERS, RECORD_LABELS } from '../data/producers';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const ProducersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-12">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Producers & Labels" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
          <Sliders className="w-4 h-4" /> BEHIND THE 808s & BOOM BAP
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          PRODUCERS & RECORD LABELS
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          The sonic architects who define Indian hip-hop. From classical Indian instrument chopping to futuristic trap and heavy drill basslines.
        </p>
      </div>

      {/* 1. PRODUCERS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold">
          <Sliders className="w-4 h-4" /> MASTER BEATMAKERS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCERS.map((producer) => (
            <div
              key={producer.id}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={producer.image}
                      alt={producer.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-zinc-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-heading font-black text-xl text-white">{producer.name}</h3>
                      <p className="text-xs text-zinc-400 font-mono">{producer.city} • Est. {producer.activeSince}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
                  <span className="text-purple-400 font-bold font-mono">TAG: </span>
                  <span className="font-mono text-zinc-200">"{producer.signatureTag}"</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{producer.bio}</p>

                <div className="space-y-1 text-xs font-mono">
                  <span className="text-zinc-500 uppercase">Sound Style:</span>
                  <p className="text-zinc-200">{producer.soundStyle}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs font-mono">
                <div className="text-zinc-400">
                  Key Beats: <strong className="text-rose-400">{producer.keyBeats.join(', ')}</strong>
                </div>
                <div className="text-zinc-500">
                  Collaborators: {producer.frequentCollaborators.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. RECORD LABELS & CREWS SECTION */}
      <section className="space-y-6 pt-6 border-t border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
          <Building2 className="w-4 h-4" /> INDEPENDENT LABELS & COLLECTIVES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECORD_LABELS.map((label) => (
            <div
              key={label.id}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-xl text-white">{label.name}</h3>
                  <span className="text-xs font-mono text-amber-400 font-bold">{label.foundedYear}</span>
                </div>

                <div className="text-xs font-mono text-zinc-400">
                  Founded by <strong className="text-zinc-200">{label.founders.join(', ')}</strong> ({label.city})
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{label.description}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-xs font-mono space-y-2">
                <div className="text-zinc-400">
                  Key Roster: <strong className="text-zinc-200">{label.keyRoster.join(', ')}</strong>
                </div>
                <div className="text-[11px] text-zinc-500 italic">
                  Notable: {label.notableReleases.join(' • ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


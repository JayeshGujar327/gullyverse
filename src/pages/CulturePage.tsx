import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Mic2, Disc3, Sparkles, Heart, Shirt, Palette, Users } from 'lucide-react';
import { HIP_HOP_ELEMENTS, FASHION_STYLES, WOMEN_IN_DHH } from '../data/education';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const CulturePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ELEMENTS' | 'WOMEN' | 'FASHION'>('ELEMENTS');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Culture & 4 Pillars" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
          <Layers className="w-4 h-4" /> THE 4 PILLARS & STREET MOVEMENT
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          CULTURE, STREETWEAR & WOMEN IN DHH
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Beyond music: Exploring the visual arts, breaking crews, streetwear aesthetics, and the fearless female MCs elevating South Asian hip-hop.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
        {[
          { id: 'ELEMENTS', label: 'THE 4 ELEMENTS IN INDIA' },
          { id: 'WOMEN', label: 'WOMEN IN INDIAN HIP-HOP' },
          { id: 'FASHION', label: 'DHH STREETWEAR & AESTHETICS' },
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

      {/* 1. THE 4 ELEMENTS */}
      {activeTab === 'ELEMENTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HIP_HOP_ELEMENTS.map((el) => (
            <div
              key={el.name}
              className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">PILLAR</span>
                <span className="text-xs font-mono text-zinc-400">{el.icon}</span>
              </div>
              <h3 className="font-heading font-black text-2xl text-white">{el.name}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{el.description}</p>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                  Indian Scene Manifestation:
                </div>
                <p className="text-xs text-zinc-300">{el.indianContext}</p>
              </div>

              <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                Key Pioneers: <strong className="text-white">{el.keyFigures.join(', ')}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. WOMEN IN DHH */}
      {activeTab === 'WOMEN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WOMEN_IN_DHH.map((woman) => (
            <div
              key={woman.name}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-rose-400 font-bold">{woman.city}</span>
                  <span>{woman.role}</span>
                </div>
                <h3 className="font-heading font-black text-xl text-white">{woman.name}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{woman.impact}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-xs font-mono">
                <span className="text-zinc-500 uppercase">Notable: </span>
                <strong className="text-amber-400">{woman.notableTracks.join(', ')}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. FASHION & STREETWEAR */}
      {activeTab === 'FASHION' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FASHION_STYLES.map((style) => (
            <div
              key={style.style}
              className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl"
            >
              <div className="text-[10px] font-mono uppercase text-rose-400 font-bold">STREETWEAR CODE</div>
              <h3 className="font-heading font-black text-2xl text-white">{style.style}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{style.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {style.keyItems.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200">
                    {item}
                  </span>
                ))}
              </div>

              <div className="text-xs font-mono text-zinc-400 pt-3 border-t border-zinc-800">
                Worn by: <strong className="text-white">{style.associatedArtists.join(', ')}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


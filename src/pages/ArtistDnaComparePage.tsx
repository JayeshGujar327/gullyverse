import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { GitCompare, Sparkles, Flame, Mic2, MapPin, Swords, ArrowRight } from 'lucide-react';
import { ARTISTS } from '../data/artists';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Artist } from '../types';

export const ArtistDnaComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialArtistA = searchParams.get('artistA') || ARTISTS[0].id;
  const initialArtistB = searchParams.get('artistB') || ARTISTS[1].id;

  const [artistAId, setArtistAId] = useState<string>(initialArtistA);
  const [artistBId, setArtistBId] = useState<string>(initialArtistB);

  const artistA = ARTISTS.find((a) => a.id === artistAId) || ARTISTS[0];
  const artistB = ARTISTS.find((a) => a.id === artistBId) || ARTISTS[1];

  // Combined Radar Data for head-to-head comparison
  const radarData = [
    { subject: 'Lyricism', [artistA.stageName]: artistA.scores.lyrical, [artistB.stageName]: artistB.scores.lyrical, fullMark: 100 },
    { subject: 'Flow', [artistA.stageName]: artistA.scores.flow, [artistB.stageName]: artistB.scores.flow, fullMark: 100 },
    { subject: 'Delivery', [artistA.stageName]: artistA.scores.delivery, [artistB.stageName]: artistB.scores.delivery, fullMark: 100 },
    { subject: 'Storytelling', [artistA.stageName]: artistA.scores.storytelling, [artistB.stageName]: artistB.scores.storytelling, fullMark: 100 },
    { subject: 'Technical', [artistA.stageName]: artistA.scores.technical, [artistB.stageName]: artistB.scores.technical, fullMark: 100 },
    { subject: 'Live Energy', [artistA.stageName]: artistA.scores.livePerformance, [artistB.stageName]: artistB.scores.livePerformance, fullMark: 100 },
  ];

  // Check if they collaborated or influenced each other
  const haveCollaborated =
    artistA.collaborators.some((c) => c.toLowerCase().includes(artistB.stageName.toLowerCase())) ||
    artistB.collaborators.some((c) => c.toLowerCase().includes(artistA.stageName.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Artist DNA Matrix" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
          <GitCompare className="w-4 h-4" /> HEAD-TO-HEAD MATRIX
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          HIP-HOP DNA COMPARISON
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Analyze flow cadences, lyrical density, storytelling versatility, and regional influences side-by-side in real-time.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-[#111116] border border-zinc-800 shadow-xl">
        {/* Artist A Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff334b]"></span>
            CORNER 1 (RED): SELECT MC
          </label>
          <select
            value={artistAId}
            onChange={(e) => setArtistAId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-rose-500"
          >
            {ARTISTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.stageName} ({a.city} • {a.primaryLanguage})
              </option>
            ))}
          </select>
        </div>

        {/* Artist B Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7209b7]"></span>
            CORNER 2 (PURPLE): SELECT MC
          </label>
          <select
            value={artistBId}
            onChange={(e) => setArtistBId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-purple-500"
          >
            {ARTISTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.stageName} ({a.city} • {a.primaryLanguage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Head-to-Head Visual Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Artist A Profile Card (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#111116] border border-rose-500/40 shadow-2xl space-y-4 text-center">
          <img
            src={artistA.image}
            alt={artistA.stageName}
            className="w-28 h-28 rounded-2xl object-cover mx-auto border-2 border-rose-500 shadow-xl"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="font-heading font-black text-2xl text-white">{artistA.stageName}</h3>
            <p className="text-xs text-zinc-400 font-mono">{artistA.city}, {artistA.state}</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            {artistA.signatureStyle}
          </div>
          <Link
            to={`/artists/${artistA.id}`}
            className="inline-block text-xs font-bold text-rose-400 hover:underline"
          >
            View Full Profile →
          </Link>
        </div>

        {/* Center Radar Matrix (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-3xl bg-[#0f0f14] border border-zinc-800 shadow-2xl space-y-4">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">RADAR OVERLAY MATRIX</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#272732" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 8 }} />
                <Radar
                  name={artistA.stageName}
                  dataKey={artistA.stageName}
                  stroke="#ff334b"
                  fill="#ff334b"
                  fillOpacity={0.35}
                />
                <Radar
                  name={artistB.stageName}
                  dataKey={artistB.stageName}
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.35}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Artist B Profile Card (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#111116] border border-purple-500/40 shadow-2xl space-y-4 text-center">
          <img
            src={artistB.image}
            alt={artistB.stageName}
            className="w-28 h-28 rounded-2xl object-cover mx-auto border-2 border-purple-500 shadow-xl"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="font-heading font-black text-2xl text-white">{artistB.stageName}</h3>
            <p className="text-xs text-zinc-400 font-mono">{artistB.city}, {artistB.state}</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            {artistB.signatureStyle}
          </div>
          <Link
            to={`/artists/${artistB.id}`}
            className="inline-block text-xs font-bold text-purple-400 hover:underline"
          >
            View Full Profile →
          </Link>
        </div>
      </div>

      {/* Comparison Metrics Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 shadow-xl space-y-4">
        <h3 className="font-heading font-bold text-xl text-white">
          Attribute Breakdown Table
        </h3>

        <div className="divide-y divide-zinc-800 text-xs font-mono">
          {[
            { label: 'LYRICAL COMPLEXITY', valA: artistA.scores.lyrical, valB: artistB.scores.lyrical },
            { label: 'FLOW VELOCITY', valA: artistA.scores.flow, valB: artistB.scores.flow },
            { label: 'DELIVERY & CADENCE', valA: artistA.scores.delivery, valB: artistB.scores.delivery },
            { label: 'STORYTELLING', valA: artistA.scores.storytelling, valB: artistB.scores.storytelling },
            { label: 'TECHNICAL MULTIS', valA: artistA.scores.technical, valB: artistB.scores.technical },
            { label: 'LIVE MOSHPIT ENERGY', valA: artistA.scores.livePerformance, valB: artistB.scores.livePerformance },
            { label: 'POPULARITY / REACH', valA: artistA.popularity, valB: artistB.popularity },
          ].map((row) => {
            const isAWinner = row.valA > row.valB;
            const isBWinner = row.valB > row.valA;
            return (
              <div key={row.label} className="py-3 flex items-center justify-between gap-4">
                <span className={`w-16 sm:w-24 text-left font-bold ${isAWinner ? 'text-rose-400' : 'text-zinc-400'}`}>
                  {row.valA} / 100 {isAWinner && '🏆'}
                </span>
                <span className="text-zinc-300 font-bold uppercase text-center flex-1">{row.label}</span>
                <span className={`w-16 sm:w-24 text-right font-bold ${isBWinner ? 'text-purple-400' : 'text-zinc-400'}`}>
                  {isBWinner && '🏆 '} {row.valB} / 100
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


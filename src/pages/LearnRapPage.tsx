import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Sliders, 
  Search, 
  Flame, 
  Layers, 
  Radio, 
  CheckCircle2, 
  Activity
} from 'lucide-react';
import { HIP_HOP_TERMS, FLOW_TYPES, SONG_STRUCTURE_PARTS } from '../data/education';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { HipHopTerm, FlowType } from '../types';

export const LearnRapPage: React.FC = () => {
  // Tabs: 'FLOW_LAB' | 'BAR_EXPLAINER' | 'BEAT_LAB' | 'ANATOMY' | 'DICTIONARY'
  const [activeTab, setActiveTab] = useState<'FLOW_LAB' | 'BAR_EXPLAINER' | 'BEAT_LAB' | 'ANATOMY' | 'DICTIONARY'>('FLOW_LAB');

  // Metronome & Bar Explainer State
  const [bpm, setBpm] = useState<number>(90);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0); // 0, 1, 2, 3

  // Flow Lab State
  const [selectedFlow, setSelectedFlow] = useState<FlowType>(FLOW_TYPES[0]);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  // 8-Step Drum Sequencer (Beat Lab) State
  const [isBeatLabPlaying, setIsBeatLabPlaying] = useState<boolean>(false);
  const [beatLabStep, setBeatLabStep] = useState<number>(0);
  const [grid, setGrid] = useState<{
    kick: boolean[];
    snare: boolean[];
    hihat: boolean[];
    sub808: boolean[];
  }>({
    kick:   [true,  false, false, false, true,  false, false, false],
    snare:  [false, false, true,  false, false, false, true,  false],
    hihat:  [true,  true,  true,  true,  true,  true,  true,  true],
    sub808: [true,  false, false, false, false, true,  false, false],
  });

  // Dictionary state
  const [termSearch, setTermSearch] = useState<string>('');
  const [termCategory, setTermCategory] = useState<string>('ALL');

  // Web Audio Context reference for synthesizers
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize Sound Effects
  const playClick = (isAccent: boolean) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isAccent ? 1200 : 800, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback
    }
  };

  const triggerDrumSound = (type: 'kick' | 'snare' | 'hihat' | 'sub808') => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (type === 'kick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'snare') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hihat') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'highpass' as unknown as OscillatorType;
        osc.frequency.setValueAtTime(7000, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'sub808') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.35);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // Audio fallback
    }
  };

  // Metronome Timer Loop
  useEffect(() => {
    if (!isMetronomeActive) return;
    const intervalMs = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      setCurrentBeat((prev) => {
        const next = (prev + 1) % 4;
        playClick(next === 0);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isMetronomeActive, bpm]);

  // Flow Lab Step Animation Loop
  useEffect(() => {
    if (!isFlowPlaying) return;
    const stepDuration = ((60 / selectedFlow.bpm) * 1000) / 4; // 16th note subdivision
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 16);
    }, stepDuration);
    return () => clearInterval(interval);
  }, [isFlowPlaying, selectedFlow]);

  // Beat Lab 8-Step Sequencer Loop
  useEffect(() => {
    if (!isBeatLabPlaying) return;
    const stepMs = ((60 / bpm) * 1000) / 2; // 8th note steps
    const interval = setInterval(() => {
      setBeatLabStep((prev) => {
        const nextStep = (prev + 1) % 8;
        if (grid.kick[nextStep]) triggerDrumSound('kick');
        if (grid.snare[nextStep]) triggerDrumSound('snare');
        if (grid.hihat[nextStep]) triggerDrumSound('hihat');
        if (grid.sub808[nextStep]) triggerDrumSound('sub808');
        return nextStep;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [isBeatLabPlaying, bpm, grid]);

  // Filtered Dictionary terms
  const filteredTerms = HIP_HOP_TERMS.filter((t) => {
    const matchSearch =
      t.term.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.hindiExample?.toLowerCase().includes(termSearch.toLowerCase());
    const matchCat = termCategory === 'ALL' || t.category === termCategory;
    return matchSearch && matchCat;
  });

  const categories = ['ALL', 'RHYME_FLOW', 'METRICS_BARS', 'STREET_CULTURE', 'PRODUCTION_BEATS', 'PERFORMANCE_BATTLE'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Rap Studio & Flow Lab" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
          <BookOpen className="w-4 h-4" /> RAP CADENCE & CRAFT MASTERCLASS
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          LEARN RAP & FLOW LAB
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Deconstruct the science of bars, multisyllabic rhyming, triplet velocities, and beat structures in Desi Hip-Hop with real-time interactive tools.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
        {[
          { id: 'FLOW_LAB', label: 'FLOW CADENCE LAB' },
          { id: 'BAR_EXPLAINER', label: 'WHAT IS A BAR? (4/4)' },
          { id: 'BEAT_LAB', label: '8-STEP DRUM SEQUENCER' },
          { id: 'ANATOMY', label: 'RAP SONG ANATOMY' },
          { id: 'DICTIONARY', label: 'DHH DICTIONARY (35+)' },
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

      {/* 1. FLOW CADENCE LAB */}
      {activeTab === 'FLOW_LAB' && (
        <div className="space-y-8">
          {/* Flow Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FLOW_TYPES.map((flow) => (
              <button
                key={flow.id}
                onClick={() => {
                  setSelectedFlow(flow);
                  setActiveStep(0);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedFlow.id === flow.id
                    ? 'bg-rose-950/20 border-rose-500 shadow-xl shadow-rose-950/30'
                    : 'bg-[#111116] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold">{flow.bpm} BPM</div>
                <h3 className="font-heading font-bold text-sm text-white mt-1">{flow.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{flow.description}</p>
              </button>
            ))}
          </div>

          {/* Active Flow Breakdown Visualizer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
                  ACTIVE FLOW ARCHETYPE • {selectedFlow.timeDivision}
                </span>
                <h2 className="font-heading font-black text-3xl text-white">
                  {selectedFlow.name}
                </h2>
              </div>
              <button
                onClick={() => setIsFlowPlaying(!isFlowPlaying)}
                className="px-6 py-3 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white font-bold text-xs uppercase font-mono flex items-center gap-2 shadow-lg"
              >
                {isFlowPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isFlowPlaying ? 'PAUSE TICKER' : 'PLAY VISUAL CADENCE'}
              </button>
            </div>

            {/* 16-Step Subdivision Grid */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>16-Step Rhythm Subdivision:</span>
                <span className="text-rose-400 font-bold">{selectedFlow.bpm} BPM</span>
              </div>

              <div className="grid grid-cols-16 gap-1 sm:gap-1.5 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                {Array.from({ length: 16 }).map((_, idx) => {
                  const isCurrent = isFlowPlaying && activeStep === idx;
                  const isQuarterBeat = idx % 4 === 0;
                  return (
                    <div
                      key={idx}
                      className={`h-12 sm:h-16 rounded-lg flex flex-col items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#ff334b] text-white shadow-lg shadow-rose-900/50 scale-105 z-10'
                          : isQuarterBeat
                          ? 'bg-zinc-800/90 border border-zinc-700 text-zinc-200'
                          : 'bg-zinc-900/60 text-zinc-500'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold">{idx + 1}</span>
                      {isQuarterBeat && <span className="text-[8px] font-mono text-amber-400">●</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real Example in Desi Hip-Hop */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-rose-400 font-bold">DHH REFERENCE BAR</span>
                <span>Song: <strong className="text-white">{selectedFlow.sampleSong}</strong> by <strong className="text-zinc-200">{selectedFlow.artistExample}</strong></span>
              </div>
              <p className="text-base sm:text-lg font-medium italic text-zinc-100 font-sans p-3 bg-black/40 rounded-xl border border-zinc-800">
                "{selectedFlow.barsExample}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. WHAT IS A BAR? (4/4 EXPLAINER) */}
      {activeTab === 'BAR_EXPLAINER' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">FOUNDATION</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              WHAT EXACTLY IS A "BAR" IN HIP-HOP?
            </h2>
            <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
              In music theory and rap, <strong>1 Bar = 1 Measure of 4 Beats (4/4 Time Signature)</strong>. When a rapper drops a 16-bar verse, they are rhyming across 16 cycles of a 4-count beat.
            </p>
          </div>

          {/* Interactive 4/4 Beat Metronome Canvas */}
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Interactive 4/4 Pulse Metronome
                </h3>
                <p className="text-xs font-mono text-zinc-400">Listen and watch where syllables land on the 1, 2, 3, and 4.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                  className="px-6 py-2.5 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white font-bold text-xs uppercase font-mono flex items-center gap-2"
                >
                  {isMetronomeActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isMetronomeActive ? 'STOP METRONOME' : 'START CLICK'}
                </button>
              </div>
            </div>

            {/* 4 Beat Pads */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {[
                { beat: 0, label: 'BEAT 1 (DOWNBEAT)', desc: 'Kick Drum / Rhyme Anchor' },
                { beat: 1, label: 'BEAT 2', desc: 'Hi-Hat / Syllable Transition' },
                { beat: 2, label: 'BEAT 3 (CLAP/SNARE)', desc: 'Snare / Punchline Accent' },
                { beat: 3, label: 'BEAT 4', desc: 'Breath / Setup for Next Bar' },
              ].map((item) => {
                const isActive = isMetronomeActive && currentBeat === item.beat;
                return (
                  <div
                    key={item.beat}
                    className={`p-4 sm:p-6 rounded-2xl border text-center transition-all duration-150 ${
                      isActive
                        ? 'bg-[#ff334b] border-rose-400 text-white scale-105 shadow-xl shadow-rose-900/50'
                        : 'bg-black/50 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-heading font-black text-3xl sm:text-5xl">
                      {item.beat + 1}
                    </div>
                    <div className="text-[10px] font-mono font-bold mt-1 uppercase truncate">
                      {item.label}
                    </div>
                    <div className="text-[9px] font-mono opacity-80 mt-0.5 hidden sm:block">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BPM Slider */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
              <span>TEMPO: <strong className="text-white">{bpm} BPM</strong> (Boom Bap: 85-95 • Trap/Drill: 130-145)</span>
              <input
                type="range"
                min="60"
                max="150"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-48 sm:w-64 h-1.5 bg-zinc-800 accent-rose-500 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. BEAT LAB: 8-STEP DRUM SEQUENCER */}
      {activeTab === 'BEAT_LAB' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">PRODUCER SUITE</span>
              <h2 className="font-heading font-black text-3xl text-white">
                8-STEP STREET DRUM SEQUENCER
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Click any step to program your own 808 sub, kick, snare, or hi-hat rhythm in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBeatLabPlaying(!isBeatLabPlaying)}
                className="px-6 py-3 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white font-bold text-xs uppercase font-mono flex items-center gap-2 shadow-lg"
              >
                {isBeatLabPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isBeatLabPlaying ? 'STOP BEAT' : 'PLAY LOOP'}
              </button>
            </div>
          </div>

          {/* Step Indicator Header */}
          <div className="grid grid-cols-9 gap-2 items-center text-xs font-mono text-zinc-500">
            <span className="text-zinc-400 font-bold">INSTRUMENT</span>
            {Array.from({ length: 8 }).map((_, stepIdx) => (
              <div
                key={stepIdx}
                className={`text-center py-1 rounded ${
                  isBeatLabPlaying && beatLabStep === stepIdx
                    ? 'bg-rose-500 text-white font-bold'
                    : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                {stepIdx + 1}
              </div>
            ))}
          </div>

          {/* Drum Rows */}
          {(['kick', 'snare', 'hihat', 'sub808'] as const).map((instrument) => (
            <div key={instrument} className="grid grid-cols-9 gap-2 items-center">
              <button
                onClick={() => triggerDrumSound(instrument)}
                className="text-left font-mono text-xs uppercase font-bold text-zinc-300 hover:text-rose-400 p-2 rounded-xl bg-zinc-900 border border-zinc-800"
              >
                {instrument === 'sub808' ? '808 SUB' : instrument} 🔊
              </button>

              {grid[instrument].map((isActive, stepIdx) => {
                const isCurrent = isBeatLabPlaying && beatLabStep === stepIdx;
                return (
                  <button
                    key={stepIdx}
                    onClick={() => {
                      setGrid((prev) => {
                        const newRow = [...prev[instrument]];
                        newRow[stepIdx] = !newRow[stepIdx];
                        return { ...prev, [instrument]: newRow };
                      });
                    }}
                    className={`h-12 rounded-xl border transition-all ${
                      isActive
                        ? instrument === 'kick'
                          ? 'bg-rose-600 border-rose-500 shadow-md shadow-rose-950'
                          : instrument === 'snare'
                          ? 'bg-purple-600 border-purple-500 shadow-md shadow-purple-950'
                          : instrument === 'hihat'
                          ? 'bg-amber-600 border-amber-500 shadow-md shadow-amber-950'
                          : 'bg-cyan-600 border-cyan-500 shadow-md shadow-cyan-950'
                        : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800'
                    } ${isCurrent ? 'ring-2 ring-white scale-105' : ''}`}
                    aria-label={`Toggle ${instrument} step ${stepIdx + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 4. RAP SONG ANATOMY */}
      {activeTab === 'ANATOMY' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-2">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              ANATOMY OF A DESI HIP-HOP TRACK
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore how classic song structures are designed for maximum impact in concerts and cyphers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SONG_STRUCTURE_PARTS.map((part) => (
              <div
                key={part.name}
                className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 font-bold">{part.typicalLength}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-300">
                    STRUCTURE
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">{part.name}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{part.purpose}</p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800/80 text-xs font-mono text-zinc-400">
                  <span className="text-amber-400 font-bold">Pro Tip: </span>
                  {part.proTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SEARCHABLE HIP-HOP DICTIONARY */}
      {activeTab === 'DICTIONARY' && (
        <div className="space-y-6">
          {/* Search and Category Filter Toolbar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={termSearch}
                onChange={(e) => setTermSearch(e.target.value)}
                placeholder="Search definitions (e.g. Bar, Punchline, Multi, 808, Cypher, Bantai)..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setTermCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    termCategory === c
                      ? 'bg-[#ff334b] text-white font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {c.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Dictionary Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="p-5 rounded-2xl bg-[#111116] border border-zinc-800/90 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-white">{term.term}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-purple-400 font-bold">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{term.definition}</p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-zinc-800/80 text-xs font-mono text-zinc-400">
                  <span className="text-rose-400 font-bold">Simple: </span>
                  {term.simpleExplanation}
                </div>
                {term.hindiExample && (
                  <p className="text-xs italic text-zinc-400 font-sans">
                    Example: "{term.hindiExample}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


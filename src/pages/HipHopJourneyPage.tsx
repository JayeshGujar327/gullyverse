import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Flame, Disc3, Mic2 } from 'lucide-react';
import { RAP_JOURNEY_QUESTIONS } from '../data/quizzes';
import { ARTISTS } from '../data/artists';
import { SONGS } from '../data/songs';
import { ArtistCard } from '../components/artists/ArtistCard';
import { SongCard } from '../components/music/SongCard';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const HipHopJourneyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recommendedArtistIds, setRecommendedArtistIds] = useState<string[]>([]);

  const currentQuestion = RAP_JOURNEY_QUESTIONS[currentStep];

  const handleSelectOption = (tags: string[], artists: string[]) => {
    setSelectedTags((prev) => [...prev, ...tags]);
    setRecommendedArtistIds((prev) => Array.from(new Set([...prev, ...artists])));

    if (currentStep < RAP_JOURNEY_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(RAP_JOURNEY_QUESTIONS.length); // Completed state
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedTags([]);
    setRecommendedArtistIds([]);
  };

  // Matched recommendations
  const matchedArtists = ARTISTS.filter((a) => recommendedArtistIds.includes(a.id)).slice(0, 3);
  const finalArtists = matchedArtists.length > 0 ? matchedArtists : ARTISTS.slice(0, 3);
  const recommendedSongs = SONGS.filter((s) => finalArtists.some((a) => a.id === s.artistId)).slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Sound Journey Match" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
          <Sparkles className="w-4 h-4" /> PERSONALIZED DISCOVERY ENGINE
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          FIND YOUR DHH SOUND
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Answer 4 quick questions about your musical taste to unlock your tailored Indian Hip-Hop starters.
        </p>
      </div>

      {/* Quiz Progress & Question Card */}
      {currentStep < RAP_JOURNEY_QUESTIONS.length ? (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-8">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>STEP {currentStep + 1} OF {RAP_JOURNEY_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / RAP_JOURNEY_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#ff334b] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / RAP_JOURNEY_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white text-center">
            {currentQuestion.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.tags, opt.recommendedArtists)}
                className="p-5 rounded-2xl bg-zinc-900/80 hover:bg-rose-950/20 border border-zinc-800 hover:border-rose-500/60 text-left transition-all group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                    {opt.text}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 transition-colors" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {opt.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-950/30 to-purple-950/30 border border-rose-500/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#ff334b] text-white flex items-center justify-center mx-auto shadow-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-black text-3xl text-white">
              YOUR PERSONALIZED DHH STARTER PACK
            </h2>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto">
              Based on your preferences for <strong>{selectedTags.slice(0, 4).join(', ')}</strong>, here is your curated gateway into Indian Hip-Hop:
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Journey Quiz
            </button>
          </div>

          {/* Recommended Artists */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Mic2 className="w-5 h-5 text-rose-500" /> Recommended MCs For You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {finalArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>

          {/* Recommended Tracks */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Disc3 className="w-5 h-5 text-cyan-400" /> Essential Tracks to Start With
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendedSongs.map((song, idx) => (
                <SongCard key={song.id} song={song} index={idx} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


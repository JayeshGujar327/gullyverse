import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle2, Flame, Sparkles, Star, Mic2 } from 'lucide-react';
import { ANNUAL_AWARDS, PAST_AWARD_WINNERS } from '../data/events';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { useToast } from '../context/ToastContext';

export const AwardsPage: React.FC = () => {
  const { showToast } = useToast();
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  const handleVote = (categoryId: string, nomineeName: string) => {
    setUserVotes((prev) => ({ ...prev, [categoryId]: nomineeName }));
    showToast(`Vote cast for ${nomineeName}!`, 'success');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Annual DHH Awards" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
          <Trophy className="w-4 h-4" /> THE PEOPLE'S HIP-HOP HONORS
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          ANNUAL DHH COMMUNITY AWARDS
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Cast your vote for the lyricists, producers, projects, and underground breakthroughs defining the culture this year.
        </p>
      </div>

      {/* Voting Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ANNUAL_AWARDS.map((award) => {
          const selectedNominee = userVotes[award.id];
          return (
            <div
              key={award.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span className="font-bold">{award.year} EDITION</span>
                  <span>{award.totalVotes.toLocaleString()} VOTES CAST</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white mt-1">
                  {award.category}
                </h3>
              </div>

              {/* Nominees Grid with Percentage Bars */}
              <div className="space-y-2.5">
                {award.nominees.map((nominee) => {
                  const isVoted = selectedNominee === nominee.name;
                  return (
                    <button
                      key={nominee.name}
                      onClick={() => handleVote(award.id, nominee.name)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isVoted
                          ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/30'
                          : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {/* Live Vote Percentage Fill */}
                      <div
                        className="absolute inset-0 bg-rose-500/10 pointer-events-none transition-all duration-500"
                        style={{ width: `${nominee.votePercentage}%` }}
                      ></div>

                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                            {nominee.name}
                            {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-mono">{nominee.work}</p>
                        </div>
                        <span className="text-xs font-mono text-rose-400 font-bold">
                          {nominee.votePercentage}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedNominee && (
                <div className="text-[11px] font-mono text-emerald-400 text-center">
                  ✓ Your vote recorded for {selectedNominee}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Historical Hall of Fame Archive */}
      <div className="space-y-6 pt-8 border-t border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
            <Star className="w-4 h-4" /> DHH HALL OF FAME
          </div>
          <h2 className="font-heading font-black text-3xl text-white">
            PAST CROWNED CHAMPIONS (2020–2024)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAST_AWARD_WINNERS.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-2 shadow-md"
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold">{item.year} HONOREE</span>
              <h4 className="font-heading font-bold text-base text-white">{item.winner}</h4>
              <p className="text-xs text-rose-400 font-mono font-semibold">{item.category}</p>
              <p className="text-[11px] text-zinc-400 italic">"{item.project}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


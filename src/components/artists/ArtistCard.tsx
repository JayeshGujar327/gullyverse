import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Sparkles, Flame, Heart, ArrowRight, Music2, GitCompare, ShieldCheck, HelpCircle, CheckCircle2, Mic2, Disc } from 'lucide-react';
import { Artist, ArtistCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { SONGS } from '../../data/songs';

interface ArtistCardProps {
  artist: Artist;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  MAINSTREAM: { label: 'Mainstream', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  NEW_WAVE: { label: 'New Wave', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  SOUTH_INDIAN: { label: 'South Regional', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  PUNJABI: { label: 'Punjabi Rap', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  UNDERGROUND: { label: 'Underground', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  PRODUCER: { label: 'Producer', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  SPECIAL_CANDIDATE: { label: 'Special Candidate', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  IDENTITY_VERIFICATION_REQUIRED: { label: 'Identity Review', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  LEGEND: { label: 'Legend', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
};

const ROLE_LABELS: Record<string, string> = {
  RAPPER: 'MC / Lyricist',
  PRODUCER: 'Beat Producer',
  RAPPER_PRODUCER: 'MC & Producer',
  RAPPER_SINGER: 'MC & Vocalist',
  DJ: 'DJ / Turntablist',
  GROUP: 'Crew / Collective'
};

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { user, toggleFavoriteArtist } = useAuth();
  const { playSong } = usePlayer();
  const isFavorited = user.favoriteArtistIds.includes(artist.id);

  const isVerified100k = artist.verified100kPlus || artist.verification?.verified100kPlus;
  const isPendingIdentity = artist.categories?.includes('IDENTITY_VERIFICATION_REQUIRED' as ArtistCategory);

  const handlePlayTopSong = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const songId = artist.topSongs[0];
    const targetSong = SONGS.find((s) => s.id === songId) || SONGS.find((s) => s.artistId === artist.id);
    if (targetSong) {
      playSong(targetSong);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#0e121d] border border-[#1b2336] hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all flex flex-col"
    >
      {/* Cover Image & Avatar Header */}
      <div className="relative h-40 w-full overflow-hidden bg-[#080a0f]">
        <img
          src={artist.coverImage || artist.image}
          alt={artist.stageName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e121d] via-[#0e121d]/40 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#2b354f] text-[10px] font-mono font-bold text-amber-400">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>{artist.popularity}% POWER</span>
          </div>

          {isVerified100k && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>100K+ VERIFIED</span>
            </div>
          )}

          {isPendingIdentity && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-950/80 backdrop-blur-md border border-yellow-500/40 text-[9px] font-mono font-bold text-yellow-300">
              <HelpCircle className="w-3 h-3" />
              <span>IDENTITY REVIEW</span>
            </div>
          )}
        </div>

        {/* Favorite Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteArtist(artist.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-slate-400 hover:text-white transition-colors z-10"
          title={isFavorited ? 'Unfollow artist' : 'Follow artist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* Artist Profile Photo Floating */}
        <div className="absolute -bottom-2 left-3.5 flex items-end gap-2.5">
          <img
            src={artist.image}
            alt={artist.stageName}
            className="w-14 h-14 rounded-xl object-cover border-2 border-[#0e121d] shadow-xl bg-slate-900"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="mb-1.5">
            <h3 className="font-heading font-extrabold text-base text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
              {artist.stageName}
              {artist.verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[8px] text-black font-black" title="Verified Artist">
                  ✓
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              {artist.city}, {artist.state}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 pt-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Role & Category Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {artist.primaryRole && (
            <span className="px-2 py-0.5 rounded-md bg-[#182133] border border-[#273552] text-[10px] font-mono text-slate-200 font-medium flex items-center gap-1">
              <Mic2 className="w-2.5 h-2.5 text-amber-400" />
              {ROLE_LABELS[artist.primaryRole] || artist.primaryRole}
            </span>
          )}

          {artist.categories?.slice(0, 2).map((cat) => {
            const config = CATEGORY_LABELS[cat] || { label: cat, color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
            return (
              <span
                key={cat}
                className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold uppercase tracking-wider ${config.color}`}
              >
                {config.label}
              </span>
            );
          })}
        </div>

        {/* Short Bio Excerpt */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {artist.shortBio || artist.bio}
        </p>

        {/* Genres & Languages Chips */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {artist.genres.slice(0, 3).map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded-md bg-[#141a29] border border-[#20293d] text-[10px] font-mono text-slate-300 font-medium"
              >
                {g}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Language: <span className="text-slate-200 font-semibold">{artist.primaryLanguage}</span>
            {artist.languages.length > 1 && <span> ({artist.languages.slice(1).join(', ')})</span>}
          </div>
        </div>

        {/* Skill Scores Micro-Bar (Lyrical, Flow, Delivery) */}
        <div className="pt-2 border-t border-[#1a2236] space-y-1 text-[10px] font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span>LYRICISM: {artist.scores.lyrical}</span>
            <span>FLOW: {artist.scores.flow}</span>
            <span>DELIVERY: {artist.scores.delivery}</span>
          </div>
          <div className="w-full bg-[#141a29] h-1.5 rounded-full overflow-hidden flex">
            <div
              className="bg-amber-400 h-full"
              style={{ width: `${(artist.scores.lyrical / 100) * 100}%` }}
            ></div>
            <div
              className="bg-cyan-400 h-full"
              style={{ width: `${(artist.scores.flow / 100) * 100}%` }}
            ></div>
            <div
              className="bg-orange-500 h-full"
              style={{ width: `${(artist.scores.delivery / 100) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-1.5 flex items-center justify-between gap-2">
          <button
            onClick={handlePlayTopSong}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-xs font-semibold text-slate-200 transition-colors"
          >
            <Music2 className="w-3.5 h-3.5 text-amber-400" />
            Play Anthem
          </button>

          <Link
            to={`/compare?artistA=${artist.id}`}
            className="p-1.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-slate-400 hover:text-white transition-colors"
            title="Compare in Hip-Hop DNA"
          >
            <GitCompare className="w-4 h-4" />
          </Link>

          <Link
            to={`/artists/${artist.id}`}
            className="flex items-center justify-center p-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black transition-colors"
            title="View Full Profile"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};



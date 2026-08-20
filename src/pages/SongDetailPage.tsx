import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Tv, 
  Heart, 
  Share2, 
  Disc3, 
  Sliders, 
  Flame, 
  ExternalLink,
  Quote,
  ShieldCheck,
  Music2
} from 'lucide-react';
import { SONGS } from '../data/songs';
import { ARTISTS } from '../data/artists';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const SongDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong, togglePlay, openYoutubeModal } = usePlayer();
  const { user, toggleFavoriteSong } = useAuth();
  const { showToast } = useToast();

  const song = SONGS.find((s) => s.id === id);

  if (!song) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-24 text-center space-y-4">
        <h1 className="font-heading font-black text-3xl text-white">Song Not Found</h1>
        <p className="text-slate-400 text-sm">The requested anthem does not exist or has been moved.</p>
        <Link to="/songs" className="inline-block px-6 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold font-mono">
          BACK TO SONGS
        </Link>
      </div>
    );
  }

  const artist = ARTISTS.find((a) => a.id === song.artistId);
  const isCurrent = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const isFavorited = user.favoriteSongIds.includes(song.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Song URL copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back and Close Header Navigation */}
      <PageHeaderNav 
        title={song.title} 
        parentLabel="SONGS CRATE" 
        parentRoute="/songs" 
      />

      {/* Hero Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0e121d] border border-[#1e263c] shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 shrink-0 shadow-2xl border border-[#222c45]">
          <img
            src={song.coverArt}
            alt={song.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => (isCurrent ? togglePlay() : playSong(song))}
            className="absolute inset-0 bg-black/40 flex items-center justify-center group"
            id="song-detail-play-btn"
          >
            <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              {isCurrentlyPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
            </div>
          </button>
        </div>

        <div className="space-y-4 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
              {song.genre} • {song.releaseYear}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#131826] border border-[#222c45] text-slate-300 text-[10px] font-mono font-bold">
              MOOD: {song.mood}
            </span>
            {song.isUnderground && (
              <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold">
                UNDERGROUND SEED
              </span>
            )}
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">
            {song.title}
          </h1>

          <p className="text-base text-slate-300 font-mono">
            By <Link to={`/artists/${song.artistId}`} className="text-amber-400 font-bold hover:underline">{song.artistName}</Link>
            {song.featuredArtists && song.featuredArtists.length > 0 && (
              <span className="text-slate-400"> feat. {song.featuredArtists.join(', ')}</span>
            )}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-slate-400 border-t border-[#1c2438]">
            <div>
              <span className="text-[10px] text-slate-500 font-bold">PRODUCER</span>
              <p className="font-bold text-slate-200 truncate">{song.producer}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold">BPM TEMPO</span>
              <p className="font-bold text-amber-400">{song.bpm} BPM</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold">DURATION</span>
              <p className="font-bold text-slate-200">{song.duration}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold">LANGUAGE</span>
              <p className="font-bold text-slate-200">{song.language}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
            <button
              onClick={() => openYoutubeModal(song)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg font-mono active:scale-95 transition-all"
              id="song-detail-watch-video-btn"
            >
              <Tv className="w-4 h-4" /> Watch Official Video
            </button>
            <button
              onClick={() => toggleFavoriteSong(song.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
                isFavorited
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-[#121624] border-[#222c45] text-slate-300 hover:text-white'
              }`}
              title="Save to favorites"
              id="song-detail-favorite-btn"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-[#121624] border border-[#222c45] text-slate-300 hover:text-white transition-colors"
              title="Share song URL"
              id="song-detail-share-btn"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Iconic Bars & Lyrical Analysis */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0e121d] border border-[#1e263c] space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
          <Quote className="w-4 h-4" /> ICONIC BARS & LYRICS HIGHLIGHT
        </div>
        <div className="p-5 rounded-xl bg-[#080a0f] border border-[#1b2234]">
          <p className="text-base sm:text-lg font-medium italic text-slate-200 leading-relaxed font-sans">
            "{song.iconicBars || song.lyricsSnippet}"
          </p>
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-[#1b2234]">
          <span>Official licensed streaming preview via YouTube & DHH archives</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Master Audio
          </span>
        </div>
      </div>
    </div>
  );
};


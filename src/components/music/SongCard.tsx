import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  Tv, 
  Heart, 
  Plus, 
  Check, 
  Share2, 
  Flame,
  Volume2
} from 'lucide-react';
import { Song } from '../../types';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface SongCardProps {
  song: Song;
  index?: number;
}

export const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const { currentSong, isPlaying, playSong, togglePlay, openYoutubeModal, addToQueue } = usePlayer();
  const { user, toggleFavoriteSong, playlists, addSongToPlaylist } = useAuth();
  const { showToast } = useToast();
  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);

  const isCurrent = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const isFavorited = user.favoriteSongIds.includes(song.id);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(window.location.origin + `/songs/${song.id}`);
    showToast('Song URL copied!', 'success');
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-2xl border transition-all duration-200 gap-3 ${
        isCurrent
          ? 'bg-amber-500/10 border-amber-400/50 shadow-lg shadow-amber-500/10'
          : 'bg-[#0d101a] border-[#1c2438] hover:border-[#2b3856] hover:bg-[#121624]'
      }`}
    >
      {/* Left: Index / Cover Art / Titles */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {typeof index === 'number' && (
          <span className="hidden sm:block text-xs font-mono text-slate-500 w-5 text-center font-bold">
            {index + 1}
          </span>
        )}

        {/* Cover Art with Play Overlay */}
        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#080a0f] shrink-0 shadow-md border border-[#222d47]">
          <img
            src={song.coverArt}
            alt={song.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={handlePlayToggle}
            className={`absolute inset-0 flex items-center justify-center transition-all ${
              isCurrentlyPlaying
                ? 'bg-black/60 opacity-100'
                : 'bg-black/40 opacity-0 group-hover:opacity-100'
            }`}
            aria-label={isCurrentlyPlaying ? 'Pause song' : 'Play song preview'}
          >
            <div className="w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform active:scale-95">
              {isCurrentlyPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-black" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
              )}
            </div>
          </button>
        </div>

        {/* Text Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-heading font-bold text-sm text-white truncate group-hover:text-amber-400 transition-colors">
              <Link to={`/songs/${song.id}`}>{song.title}</Link>
            </h4>
            {song.isUnderground && (
              <span className="px-1.5 py-0.2 text-[9px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
                UG
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 truncate">
            <Link to={`/artists/${song.artistId}`} className="hover:text-slate-200">
              {song.artistName}
            </Link>
            {song.featuredArtists && song.featuredArtists.length > 0 && (
              <span className="text-slate-500"> ft. {song.featuredArtists.join(', ')}</span>
            )}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">{song.genre}</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{song.bpm} BPM</span>
            <span>•</span>
            <span>{song.duration}</span>
          </div>
        </div>
      </div>

      {/* Center/Right: Badges & Mood Tag */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <span className="px-2.5 py-0.5 rounded-full bg-[#151b2b] border border-[#232d47] text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
          {song.mood}
        </span>

        {/* Watch Official Video on YouTube */}
        <button
          onClick={() => openYoutubeModal(song)}
          className="p-1.5 rounded-xl bg-[#141a29] hover:bg-[#1d263b] border border-[#222c45] text-slate-400 hover:text-amber-400 transition-colors"
          title="Watch Official Video"
        >
          <Tv className="w-3.5 h-3.5" />
        </button>

        {/* Favorite */}
        <button
          onClick={() => toggleFavoriteSong(song.id)}
          className={`p-1.5 rounded-xl bg-[#141a29] hover:bg-[#1d263b] border border-[#222c45] transition-colors ${
            isFavorited ? 'text-amber-400' : 'text-slate-400 hover:text-white'
          }`}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>

        {/* Add to Playlist Popup Menu */}
        <div className="relative">
          <button
            onClick={() => setPlaylistMenuOpen(!playlistMenuOpen)}
            className="p-1.5 rounded-xl bg-[#141a29] hover:bg-[#1d263b] border border-[#222c45] text-slate-400 hover:text-white transition-colors"
            title="Add to Playlist"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {playlistMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[#121624] border border-[#26314a] rounded-xl shadow-2xl p-1.5 z-30 space-y-1">
              <div className="text-[9px] font-mono uppercase text-slate-400 px-2 py-1">
                Add to Playlist:
              </div>
              {playlists.map((pl) => {
                const inPl = pl.songIds.includes(song.id);
                return (
                  <button
                    key={pl.id}
                    onClick={() => {
                      addSongToPlaylist(pl.id, song.id);
                      setPlaylistMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-[#1a2133] text-slate-300 hover:text-white"
                  >
                    <span className="truncate">{pl.name}</span>
                    {inPl && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  addToQueue(song);
                  setPlaylistMenuOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:bg-amber-400/10"
              >
                + Add to Play Queue
              </button>
            </div>
          )}
        </div>

        {/* Share Link */}
        <button
          onClick={handleCopyLink}
          className="p-1.5 rounded-xl bg-[#141a29] hover:bg-[#1d263b] border border-[#222c45] text-slate-400 hover:text-white transition-colors hidden sm:block"
          title="Copy Link"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};


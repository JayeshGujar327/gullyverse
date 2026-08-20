import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Heart, 
  Tv, 
  ExternalLink, 
  Radio, 
  Sparkles, 
  Music, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Share2,
  Mic2
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { ALL_ARTISTS } from '../../data/artists';

interface SpotifyRightSidebarProps {
  onClose: () => void;
  onOpenLyrics: () => void;
}

export const SpotifyRightSidebar: React.FC<SpotifyRightSidebarProps> = ({ onClose, onOpenLyrics }) => {
  const { currentSong, queue, playSong, openYoutubeModal } = usePlayer();
  const { user, toggleFavoriteSong } = useAuth();

  if (!currentSong) return null;

  const isFavorited = (user?.favoriteSongIds || []).includes(currentSong.id);
  const artist = ALL_ARTISTS.find((a) => a.id === currentSong.artistId);
  const nextInQueue = queue.find((s) => s.id !== currentSong.id);

  return (
    <aside className="w-72 lg:w-80 xl:w-84 bg-[#121212] rounded-xl flex flex-col min-h-0 overflow-hidden shrink-0 shadow-md select-none border-l border-white/5">
      {/* 1. Panel Header */}
      <div className="p-4 pb-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#1ed760] animate-pulse" />
          <h3 className="font-bold text-sm text-white truncate">Now Playing View</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar min-h-0">
        {/* Big Track Artwork */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-[#080808] group">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => openYoutubeModal(currentSong)}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity text-white font-mono text-xs font-bold"
          >
            <Tv className="w-7 h-7 text-[#1ed760]" />
            <span>Watch HD Video</span>
          </button>
        </div>

        {/* Track Title & Like Action */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white truncate hover:underline">
              <Link to={`/songs/${currentSong.id}`}>{currentSong.title}</Link>
            </h2>
            <p className="text-sm text-[#b3b3b3] hover:text-white hover:underline truncate mt-0.5">
              <Link to={`/artists/${currentSong.artistId}`}>{currentSong.artistName}</Link>
            </p>
          </div>

          <button
            onClick={() => toggleFavoriteSong(currentSong.id)}
            className={`p-2 rounded-full transition-transform active:scale-90 ${
              isFavorited ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'
            }`}
            title="Save to Liked Songs"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#1ed760] text-[#1ed760]' : ''}`} />
          </button>
        </div>

        {/* 3. About the Artist Card (Iconic Spotify Feature) */}
        {artist && (
          <div className="rounded-xl overflow-hidden bg-[#181818] border border-white/5 shadow-md">
            <div className="relative h-32 w-full">
              <img
                src={artist.coverImage || artist.image}
                alt={artist.stageName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full">
                About the artist
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-white flex items-center gap-1.5">
                    <Link to={`/artists/${artist.id}`} className="hover:underline">
                      {artist.stageName}
                    </Link>
                    <CheckCircle2 className="w-4 h-4 text-[#1ed760] fill-[#1ed760]/20" />
                  </h4>
                  <p className="text-xs text-[#a7a7a7] mt-0.5">
                    {artist.popularity ? `${(artist.popularity * 45000).toLocaleString()} monthly listeners` : '1.8M monthly listeners'}
                  </p>
                </div>

                <Link
                  to={`/artists/${artist.id}`}
                  className="px-3.5 py-1.5 rounded-full border border-[#727272] hover:border-white text-xs font-bold text-white transition-colors"
                >
                  Follow
                </Link>
              </div>

              <p className="text-xs text-[#b3b3b3] line-clamp-3 leading-relaxed">
                {artist.bio || `${artist.stageName} is one of the premier voices shaping modern Desi Hip-Hop from ${artist.city}.`}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#a7a7a7]">
                <span>Origin: <strong className="text-white">{artist.city}</strong></span>
                <span>Role: <strong className="text-white">{artist.primaryRole}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Lyrics Sneak Peek */}
        <div className="p-4 rounded-xl bg-[#181818] border border-white/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Mic2 className="w-3.5 h-3.5 text-[#1ed760]" /> Lyrics
            </span>
            <button
              onClick={onOpenLyrics}
              className="text-xs text-[#b3b3b3] hover:text-white font-bold hover:underline"
            >
              Expand
            </button>
          </div>
          <p className="text-sm font-heading font-medium text-[#e2e8f0] italic leading-relaxed line-clamp-3">
            "{currentSong.lyricsSnippet || currentSong.iconicBars || currentSong.description || 'Gully se nikle toh seedha stage pe tabahi machayi...'}"
          </p>
        </div>

        {/* 5. Next in Queue */}
        {nextInQueue && (
          <div className="p-4 rounded-xl bg-[#181818] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Next In Queue</span>
              <Link to="/songs" className="text-[#a7a7a7] hover:text-white">
                View queue
              </Link>
            </div>

            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#242424] hover:bg-[#2a2a2a] transition-colors group">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={nextInQueue.coverArt}
                  alt={nextInQueue.title}
                  className="w-10 h-10 rounded object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-white truncate">{nextInQueue.title}</h5>
                  <p className="text-[11px] text-[#a7a7a7] truncate">{nextInQueue.artistName}</p>
                </div>
              </div>

              <button
                onClick={() => playSong(nextInQueue)}
                className="p-2 rounded-full bg-[#1ed760] text-black hover:scale-105 transition-transform shrink-0"
                title="Play next"
              >
                <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* 6. Master Audio Fidelity & Credits */}
        <div className="p-3.5 rounded-xl bg-[#141414] border border-white/5 text-xs text-[#a7a7a7] space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#1ed760] font-bold">● MASTER AUDIO</span>
            <span>320 KBPS</span>
          </div>
          <p className="text-[11px] text-[#b3b3b3]">Release Year: {currentSong.releaseYear || '2024'}</p>
          <p className="text-[11px] text-[#b3b3b3]">Genre: {currentSong.genre}</p>
        </div>
      </div>
    </aside>
  );
};


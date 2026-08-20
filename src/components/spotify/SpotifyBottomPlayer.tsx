import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  Heart, 
  Tv, 
  Mic2, 
  ListMusic, 
  Maximize2, 
  PanelRight, 
  Radio, 
  Loader2 
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';

interface SpotifyBottomPlayerProps {
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onOpenLyrics: () => void;
  onOpenQueue: () => void;
}

export const SpotifyBottomPlayer: React.FC<SpotifyBottomPlayerProps> = ({
  rightPanelOpen,
  onToggleRightPanel,
  onOpenLyrics,
  onOpenQueue,
}) => {
  const {
    currentSong,
    isPlaying,
    isLoadingAudio,
    progress,
    currentTimeFormatted,
    durationFormatted,
    volume,
    isMuted,
    isLooping,
    isShuffle,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    toggleShuffle,
    openYoutubeModal,
    openSpotifyModal,
  } = usePlayer();

  const { user, toggleFavoriteSong } = useAuth();
  const [isScrubbingHover, setIsScrubbingHover] = useState(false);
  const [isVolumeHover, setIsVolumeHover] = useState(false);

  if (!currentSong) return null;

  const isFavorited = (user?.favoriteSongIds || []).includes(currentSong.id);

  return (
    <footer className="h-20 sm:h-22 bg-black px-3 sm:px-4 flex items-center justify-between shrink-0 select-none z-50 border-t border-[#181818]">
      {/* 1. LEFT: TRACK INFO (Cover Art, Title, Artist, Like, TV) */}
      <div className="flex items-center gap-3 min-w-0 w-1/4 max-w-[300px]">
        {/* Cover Art with Video overlay button */}
        <div className="relative group shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-[#181818] shadow">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => openYoutubeModal(currentSong)}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
            title="Watch Video"
          >
            <Tv className="w-4 h-4 text-[#1ed760]" />
          </button>
        </div>

        {/* Title & Artist */}
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-semibold text-white truncate hover:underline">
            <Link to={`/songs/${currentSong.id}`}>{currentSong.title}</Link>
          </h4>
          <p className="text-[11px] sm:text-xs text-[#b3b3b3] truncate hover:underline hover:text-white mt-0.5">
            <Link to={`/artists/${currentSong.artistId}`}>{currentSong.artistName}</Link>
          </p>
        </div>

        {/* Liked Heart Button */}
        <button
          onClick={() => toggleFavoriteSong(currentSong.id)}
          className={`p-1.5 rounded-full transition-transform active:scale-90 ${
            isFavorited ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'
          }`}
          title="Save to Liked Songs"
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-[#1ed760] text-[#1ed760]' : ''}`} />
        </button>

        {/* Official Spotify Launch Button */}
        <button
          onClick={() => openSpotifyModal(currentSong)}
          className="p-1.5 rounded-full text-[#b3b3b3] hover:text-[#1ed760] transition-colors"
          title="Open Official Spotify Player"
        >
          <Radio className="w-4 h-4" />
        </button>
      </div>

      {/* 2. CENTER: PLAYBACK CONTROLS & TIMELINE SCRUBBER */}
      <div className="flex flex-col items-center justify-center gap-1.5 w-2/4 max-w-2xl px-2">
        {/* Control Buttons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`p-1 relative transition-colors ${
              isShuffle ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'
            }`}
            title="Enable shuffle"
          >
            <Shuffle className="w-4 h-4" />
            {isShuffle && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1ed760]"></span>
            )}
          </button>

          {/* Previous */}
          <button
            onClick={prevSong}
            className="text-[#b3b3b3] hover:text-white transition-colors"
            title="Previous"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Big Circular Play / Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoadingAudio}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:scale-106 active:scale-95 text-black flex items-center justify-center shadow-lg transition-transform disabled:opacity-80"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoadingAudio ? (
              <Loader2 className="w-4 h-4 text-black animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-black text-black" />
            ) : (
              <Play className="w-4 h-4 fill-black text-black ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={nextSong}
            className="text-[#b3b3b3] hover:text-white transition-colors"
            title="Next"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Repeat */}
          <button
            onClick={toggleLoop}
            className={`p-1 relative transition-colors ${
              isLooping ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'
            }`}
            title="Enable repeat"
          >
            <Repeat className="w-4 h-4" />
            {isLooping && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1ed760]"></span>
            )}
          </button>
        </div>

        {/* Timeline Scrubber Bar */}
        <div className="w-full flex items-center gap-2 text-[11px] font-mono text-[#a7a7a7]">
          <span className="w-8 text-right select-none">{currentTimeFormatted}</span>

          <div
            onMouseEnter={() => setIsScrubbingHover(true)}
            onMouseLeave={() => setIsScrubbingHover(false)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percent = (clickX / rect.width) * 100;
              seek(percent);
            }}
            className="relative flex-1 h-1 bg-[#4d4d4d] hover:h-1.5 rounded-full cursor-pointer transition-all group flex items-center"
          >
            <div
              className={`h-full rounded-full transition-all duration-75 ${
                isScrubbingHover ? 'bg-[#1ed760]' : 'bg-white'
              }`}
              style={{ width: `${progress}%` }}
            />
            {/* Scrubber Thumb */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white rounded-full shadow transition-opacity ${
                isScrubbingHover ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: `${progress}%` }}
            />
          </div>

          <span className="w-8 text-left select-none">{durationFormatted}</span>
        </div>
      </div>

      {/* 3. RIGHT: NOW PLAYING, LYRICS, QUEUE, VOLUME & FULLSCREEN */}
      <div className="flex items-center justify-end gap-2.5 w-1/4 max-w-[300px]">
        {/* Lyrics Button */}
        <button
          onClick={onOpenLyrics}
          className="p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f] transition-colors"
          title="Lyrics"
        >
          <Mic2 className="w-4 h-4" />
        </button>

        {/* Queue Button */}
        <button
          onClick={onOpenQueue}
          className="p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f] transition-colors"
          title="Queue"
        >
          <ListMusic className="w-4 h-4" />
        </button>

        {/* Video Button */}
        <button
          onClick={() => openYoutubeModal(currentSong)}
          className="hidden sm:block p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f] transition-colors"
          title="Official Video"
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* Toggle Right Panel (Now Playing View) */}
        <button
          onClick={onToggleRightPanel}
          className={`p-1.5 rounded-full transition-colors ${
            rightPanelOpen
              ? 'text-[#1ed760] bg-[#1f1f1f]'
              : 'text-[#b3b3b3] hover:text-white hover:bg-[#1f1f1f]'
          }`}
          title="Now playing view"
        >
          <PanelRight className="w-4 h-4" />
        </button>

        {/* Volume Controls */}
        <div 
          className="hidden md:flex items-center gap-1.5"
          onMouseEnter={() => setIsVolumeHover(true)}
          onMouseLeave={() => setIsVolumeHover(false)}
        >
          <button
            onClick={toggleMute}
            className="p-1 text-[#b3b3b3] hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newVol = Math.max(0, Math.min(1, clickX / rect.width));
              setVolume(newVol);
            }}
            className="w-20 h-1 bg-[#4d4d4d] hover:h-1.5 rounded-full cursor-pointer relative group flex items-center transition-all"
          >
            <div
              className={`h-full rounded-full ${
                isVolumeHover ? 'bg-[#1ed760]' : 'bg-white'
              }`}
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};


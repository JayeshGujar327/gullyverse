import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Tv, 
  ListMusic, 
  Heart, 
  ChevronDown, 
  Activity,
  Repeat,
  Shuffle,
  Loader2,
  ExternalLink,
  Radio
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const GlobalPlayer: React.FC = () => {
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
    queue,
    isExpanded,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    toggleShuffle,
    setIsExpanded,
    openYoutubeModal,
    audioFrequencyData,
    playSong,
    removeFromQueue
  } = usePlayer();

  const { user, toggleFavoriteSong } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render animated audio visualizer bars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = 3;
      const gap = 2.5;
      const count = Math.min(14, audioFrequencyData.length);

      for (let i = 0; i < count; i++) {
        const value = isPlaying ? audioFrequencyData[i] || 12 : 6;
        const height = Math.max(3, (value / 100) * canvas.height);
        const x = i * (barWidth + gap);
        const y = canvas.height - height;

        // Radiant Electric Amber to Cyan gradient
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#fb923c');
        grad.addColorStop(1, '#06b6d4');

        ctx.fillStyle = isPlaying ? grad : '#1e2638';
        ctx.fillRect(x, y, barWidth, height);
      }

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, audioFrequencyData]);

  if (!currentSong) return null;

  const isFavorited = user.favoriteSongIds.includes(currentSong.id);

  return (
    <>
      {/* Docked Bottom Pro Player Bar */}
      <div 
        id="global-audio-player-deck"
        className="fixed bottom-0 left-0 lg:left-64 xl:left-72 right-0 z-40 bg-[#0a0d14]/95 backdrop-blur-xl border-t border-[#1b2234] shadow-[0_-10px_35px_rgba(0,0,0,0.85)] py-2.5 px-3 sm:px-6 transition-all duration-300"
      >
        {/* Interactive Scrubbing Bar */}
        <div 
          id="audio-scrubber-track"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = (clickX / rect.width) * 100;
            seek(percent);
          }}
          className="absolute -top-1.5 left-0 right-0 h-2 bg-[#141b2b] cursor-pointer group hover:h-2.5 transition-all"
        >
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 relative transition-all duration-75"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-300 rounded-full shadow-lg shadow-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Track Information & Cover Art */}
          <div className="flex items-center gap-3 min-w-0 max-w-[35%] sm:max-w-[32%]">
            <div className="relative group shrink-0">
              <img
                src={currentSong.coverArt}
                alt={currentSong.title}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#242e47] shadow-md group-hover:border-amber-400/50 transition-colors"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => openYoutubeModal(currentSong)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity text-white"
                title="Watch Official HD Video"
                id="player-thumb-video-btn"
              >
                <Tv className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate hover:text-amber-400 transition-colors font-sans">
                  <Link to={`/songs/${currentSong.id}`}>{currentSong.title}</Link>
                </h4>
                {currentSong.isUnderground && (
                  <span className="hidden xl:inline-block px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                    Underground
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate hover:text-slate-200">
                <Link to={`/artists/${currentSong.artistId}`}>{currentSong.artistName}</Link>
                {currentSong.featuredArtists && currentSong.featuredArtists.length > 0 && (
                  <span className="text-slate-400"> ft. {currentSong.featuredArtists.join(', ')}</span>
                )}
              </p>
            </div>

            <button
              onClick={() => toggleFavoriteSong(currentSong.id)}
              className={`hidden sm:block p-1.5 rounded-lg transition-colors ${
                isFavorited ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Favorite song"
              id="player-favorite-btn"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>

          {/* Center: Playback Transport Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleShuffle}
                className={`hidden sm:block p-1.5 rounded-lg transition-colors ${
                  isShuffle ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle Shuffle"
                id="player-shuffle-btn"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={prevSong}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="Previous track"
                id="player-prev-btn"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={togglePlay}
                disabled={isLoadingAudio}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform active:scale-95 disabled:opacity-80"
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
                id="player-play-pause-btn"
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-5 h-5 text-black animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-black" />
                ) : (
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                )}
              </button>

              <button
                onClick={nextSong}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="Next track"
                id="player-next-btn"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={toggleLoop}
                className={`hidden sm:block p-1.5 rounded-lg transition-colors ${
                  isLooping ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle Repeat"
                id="player-repeat-btn"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Time Codes & Stream Bitrate Badge */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="text-slate-300 font-semibold">{currentTimeFormatted}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{durationFormatted}</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-amber-400 font-medium">
                <Radio className="w-2.5 h-2.5 animate-pulse" /> Real Audio Master (320 kbps)
              </span>
            </div>
          </div>

          {/* Right: Real-time Visualizer & Deck Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Live Frequency Spectrum Visualizer */}
            <div className="hidden lg:flex items-center gap-2 bg-[#121726] px-2.5 py-1.5 rounded-xl border border-[#20293d]">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <canvas ref={canvasRef} width={80} height={16} className="rounded" />
            </div>

            {/* YouTube HD Official Video Modal Button */}
            <button
              onClick={() => openYoutubeModal(currentSong)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#121726] hover:bg-[#1a2238] border border-[#20293d] hover:border-amber-400/40 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
              title="Watch official high-definition music video"
              id="player-official-video-btn"
            >
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Official Video</span>
            </button>

            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Toggle mute"
                id="player-volume-btn"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-amber-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-700 accent-amber-400 rounded-lg cursor-pointer"
                id="player-volume-slider"
              />
            </div>

            {/* Playback Queue Drawer Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-xl border transition-colors ${
                isExpanded
                  ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                  : 'bg-[#121726] border-[#20293d] text-slate-400 hover:text-white'
              }`}
              title="Toggle queue & iconic bars"
              aria-label="Toggle player queue"
              id="player-queue-toggle-btn"
            >
              <ListMusic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Playback Queue & Track Breakdown Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-[68px] right-3 sm:right-6 w-[94vw] sm:w-96 max-h-[75vh] bg-[#0e121d]/98 backdrop-blur-2xl border border-[#20293d] rounded-2xl shadow-2xl p-5 z-40 overflow-y-auto custom-scrollbar"
            id="player-queue-drawer"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2438]">
              <div className="flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Up Next & Bar Analysis
                </h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-slate-400 hover:text-white"
                id="player-queue-close-btn"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Current Song Highlight Card */}
            <div className="my-4 p-3.5 rounded-xl bg-[#131826] border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  NOW PLAYING
                </span>
                <span>{currentSong.bpm} BPM • {currentSong.genre}</span>
              </div>
              <p className="text-xs italic text-slate-200 font-medium bg-[#0a0d14]/70 p-2.5 rounded-lg border border-[#1e263c]">
                "{currentSong.iconicBars || currentSong.lyricsSnippet}"
              </p>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Producer: <strong className="text-slate-200">{currentSong.producer}</strong></span>
                <button
                  onClick={() => openYoutubeModal(currentSong)}
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  Watch HD Stream <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Queue Song List */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex justify-between items-center">
                <span>Playback Queue ({queue.length})</span>
                <span className="text-[10px] text-amber-400">Real Studio Streams</span>
              </div>
              {queue.map((song, idx) => (
                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                    song.id === currentSong.id
                      ? 'bg-amber-500/10 border border-amber-500/40 text-amber-300'
                      : 'hover:bg-[#151b2a] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 w-4">{idx + 1}</span>
                    <img
                      src={song.coverArt}
                      alt={song.title}
                      className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#20293d]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{song.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{song.artistName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{song.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


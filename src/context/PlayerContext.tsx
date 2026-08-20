import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, SpotifyPlayerStatus } from '../types';
import { SONGS } from '../data/songs';
import { getAudioSourceForSong } from '../data/audioDatabase';
import { useToast } from './ToastContext';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoadingAudio: boolean;
  progress: number; // 0-100
  currentTime: number; // seconds
  duration: number; // seconds
  currentTimeFormatted: string;
  durationFormatted: string;
  volume: number; // 0-1
  isMuted: boolean;
  isLooping: boolean;
  isShuffle: boolean;
  queue: Song[];
  isExpanded: boolean;
  isVisualizerActive: boolean;
  youtubeModalSong: Song | null;
  spotifyModalSong: Song | null;
  spotifyPlayerStatus: SpotifyPlayerStatus;
  activePlaybackEngine: 'master_audio' | 'spotify_embed';
  audioFrequencyData: number[];
  audioSourceType: 'master' | 'local' | 'youtube';
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (progressPercent: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  setIsExpanded: (val: boolean) => void;
  setIsVisualizerActive: (val: boolean) => void;
  openYoutubeModal: (song: Song) => void;
  closeYoutubeModal: () => void;
  openSpotifyModal: (song: Song) => void;
  closeSpotifyModal: () => void;
  playSpotifyTrack: (song: Song) => void;
  openInSpotifyApp: (song: Song) => void;
  copySpotifyLink: (song: Song) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const formatTime = (secs: number): string => {
  if (isNaN(secs) || secs < 0) return '0:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [currentSong, setCurrentSong] = useState<Song | null>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>(SONGS);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVisualizerActive, setIsVisualizerActive] = useState<boolean>(true);
  const [youtubeModalSong, setYoutubeModalSong] = useState<Song | null>(null);
  const [spotifyModalSong, setSpotifyModalSong] = useState<Song | null>(null);
  const [spotifyPlayerStatus, setSpotifyPlayerStatus] = useState<SpotifyPlayerStatus>('IDLE');
  const [activePlaybackEngine, setActivePlaybackEngine] = useState<'master_audio' | 'spotify_embed'>('master_audio');
  const [audioSourceType, setAudioSourceType] = useState<'master' | 'local' | 'youtube'>('master');
  const [audioFrequencyData, setAudioFrequencyData] = useState<number[]>(new Array(16).fill(10));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Real HTML5 Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoadingAudio(false);
    };

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleWaiting = () => setIsLoadingAudio(true);
    const handleCanPlay = () => setIsLoadingAudio(false);

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        handleNextSongAuto();
      }
    };

    const handleError = () => {
      setIsLoadingAudio(false);
      setIsPlaying(false);
      // If direct stream fails, fallback to secondary master track
      if (currentSong && audio.src !== getAudioSourceForSong(currentSong.id)) {
        console.warn('Primary stream failed, attempting secondary high-def audio stream');
        audio.src = getAudioSourceForSong(currentSong.id);
        audio.play().catch(console.warn);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Web Audio Analyser setup for authentic visualizer response
  const setupWebAudioAnalyser = () => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      try {
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        sourceNodeRef.current = source;
      } catch (err) {
        // In case CORS blocks createMediaElementSource, fallback to synthetic frequency generator
        console.info('Using dynamic visualizer generator:', err);
      }

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
    } catch (e) {
      console.warn('Web Audio API not initialized:', e);
    }
  };

  // Real-time Visualizer Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setAudioFrequencyData(new Array(16).fill(6));
      return;
    }

    const updateVisualizer = () => {
      if (analyserRef.current && sourceNodeRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const sampled = Array.from(dataArray.slice(0, 16)).map((val) => Math.max(10, Math.floor((val / 255) * 100)));
        setAudioFrequencyData(sampled);
      } else {
        // Organic frequency simulation when audio element is playing
        setAudioFrequencyData((prev) =>
          prev.map((val) => {
            const delta = (Math.random() - 0.48) * 35;
            return Math.max(12, Math.min(95, val + delta));
          })
        );
      }
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animFrameRef.current = requestAnimationFrame(updateVisualizer);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Volume & Mute Sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Play a specific song with real audio
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setProgress(0);
    setCurrentTime(0);
    setIsLoadingAudio(true);
    setAudioSourceType(song.audioSourceType || 'master');

    setupWebAudioAnalyser();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const audio = audioRef.current;
    if (audio) {
      const targetAudioUrl = song.audioUrl || getAudioSourceForSong(song.id);
      audio.src = targetAudioUrl;
      audio.load();
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
          showToast(`Now Playing: ${song.title} (${song.bpm} BPM)`, 'success');
        })
        .catch((err) => {
          console.warn('Audio autoplay prevented or failed:', err);
          setIsPlaying(false);
          setIsLoadingAudio(false);
        });
    }
  };

  const togglePlay = () => {
    if (!currentSong && queue.length > 0) {
      playSong(queue[0]);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    setupWebAudioAnalyser();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // If audio has no source yet, load current song
      if (!audio.src && currentSong) {
        audio.src = currentSong.audioUrl || getAudioSourceForSong(currentSong.id);
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play failed:', err);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.warn);
    }
    setIsPlaying(true);
  };

  const handleNextSongAuto = () => {
    if (!currentSong || queue.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      playSong(queue[randomIndex]);
      return;
    }
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playSong(queue[nextIndex]);
  };

  const nextSong = () => {
    handleNextSongAuto();
  };

  const prevSong = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playSong(queue[prevIndex]);
  };

  const seek = (progressPercent: number) => {
    const clamped = Math.max(0, Math.min(100, progressPercent));
    setProgress(clamped);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (clamped / 100) * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    showToast(isLooping ? 'Repeat off' : 'Repeat track enabled', 'info');
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    showToast(isShuffle ? 'Shuffle off' : 'Shuffle mode enabled', 'info');
  };

  const addToQueue = (song: Song) => {
    if (queue.some((s) => s.id === song.id)) {
      showToast('Track already in queue', 'info');
      return;
    }
    setQueue((prev) => [...prev, song]);
    showToast(`Added "${song.title}" to queue`, 'success');
  };

  const removeFromQueue = (songId: string) => {
    setQueue((prev) => prev.filter((s) => s.id !== songId));
    showToast('Removed from queue', 'info');
  };

  const openYoutubeModal = (song: Song) => {
    setYoutubeModalSong(song);
    pause(); // Pause background master track while watching official video
  };

  const closeYoutubeModal = () => {
    setYoutubeModalSong(null);
  };

  const openSpotifyModal = (song: Song) => {
    setSpotifyModalSong(song);
    setSpotifyPlayerStatus('PLAYING');
    pause(); // Pause master audio element so sound does not clash with Spotify embed
    showToast(`Streaming "${song.title}" via official Spotify player`, 'success');
  };

  const closeSpotifyModal = () => {
    setSpotifyModalSong(null);
    setSpotifyPlayerStatus('IDLE');
  };

  const playSpotifyTrack = (song: Song) => {
    // If it has a verified spotifyTrackId or spotifyUrl, open official Spotify embed/player
    if (song.spotifyTrackId || song.spotifyUrl) {
      openSpotifyModal(song);
    } else {
      // Fallback to master audio
      playSong(song);
    }
  };

  const openInSpotifyApp = (song: Song) => {
    const targetUrl = song.spotifyUrl || (song.spotifyTrackId ? `https://open.spotify.com/track/${song.spotifyTrackId}` : null);
    if (targetUrl) {
      try {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        showToast('Opening official Spotify track...', 'info');
      } catch {
        showToast('Spotify link ready', 'info');
      }
    } else {
      showToast('Spotify link not available for this track', 'warning');
    }
  };

  const copySpotifyLink = (song: Song) => {
    const targetUrl = song.spotifyUrl || (song.spotifyTrackId ? `https://open.spotify.com/track/${song.spotifyTrackId}` : null);
    if (targetUrl) {
      navigator.clipboard?.writeText(targetUrl).then(() => {
        showToast('Copied official Spotify link to clipboard!', 'success');
      }).catch(() => {
        showToast(`Spotify URL: ${targetUrl}`, 'info');
      });
    } else {
      showToast('No Spotify link found for this track', 'warning');
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        isLoadingAudio,
        progress,
        currentTime,
        duration,
        currentTimeFormatted: formatTime(currentTime),
        durationFormatted: formatTime(duration),
        volume,
        isMuted,
        isLooping,
        isShuffle,
        queue,
        isExpanded,
        isVisualizerActive,
        youtubeModalSong,
        spotifyModalSong,
        spotifyPlayerStatus,
        activePlaybackEngine,
        audioFrequencyData,
        audioSourceType,
        playSong,
        togglePlay,
        pause,
        resume,
        nextSong,
        prevSong,
        seek,
        setVolume,
        toggleMute,
        toggleLoop,
        toggleShuffle,
        addToQueue,
        removeFromQueue,
        setIsExpanded,
        setIsVisualizerActive,
        openYoutubeModal,
        closeYoutubeModal,
        openSpotifyModal,
        closeSpotifyModal,
        playSpotifyTrack,
        openInSpotifyApp,
        copySpotifyLink,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};


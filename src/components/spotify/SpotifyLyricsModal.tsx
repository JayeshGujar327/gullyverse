import React from 'react';
import { X, Mic2, Heart, Volume2, Sparkles } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';

interface SpotifyLyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotifyLyricsModal: React.FC<SpotifyLyricsModalProps> = ({ isOpen, onClose }) => {
  const { currentSong, progress } = usePlayer();
  const { user, toggleFavoriteSong } = useAuth();

  if (!isOpen || !currentSong) return null;

  const isFavorited = (user?.favoriteSongIds || []).includes(currentSong.id);

  // Generate sample structured lines from lyrics
  const rawLyrics = currentSong.lyricsSnippet || currentSong.iconicBars;
  const lyricLines = rawLyrics
    ? rawLyrics.split('\n').filter(Boolean)
    : [
        'Gully se nikle toh seedha stage pe tabahi machayi',
        'Asli Hip-Hop ka josh, har ek line mein sachai',
        '808 drop hua toh crowd pura pagal ho gaya',
        'Desi flow ka shor ab har kone mein chha gaya',
        'Rhymes tight, scheme tight, delivery untouchable',
        'Apna time aayega nahi, apna time laaye hain hum',
        'Mumbai to Delhi to Kerala, one nation, one sound',
        'Microphone check ek do, bars flow like a hurricane',
      ];

  const activeLineIndex = Math.min(
    lyricLines.length - 1,
    Math.floor((progress / 100) * lyricLines.length)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover shadow-lg border border-white/10"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="font-bold text-base text-white">{currentSong.title}</h3>
            <p className="text-xs text-[#b3b3b3]">{currentSong.artistName}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Close lyrics"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Lyrics Karaoke Stream */}
      <div className="max-w-4xl mx-auto w-full my-auto overflow-y-auto max-h-[70vh] py-8 text-left space-y-6 custom-scrollbar px-4">
        {lyricLines.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          const isPassed = idx < activeLineIndex;
          return (
            <p
              key={idx}
              className={`font-heading font-black text-2xl sm:text-4xl md:text-5xl transition-all duration-300 ${
                isActive
                  ? 'text-white scale-105 origin-left drop-shadow-[0_0_20px_rgba(30,215,96,0.5)] text-[#1ed760]'
                  : isPassed
                  ? 'text-[#535353] blur-[0.5px]'
                  : 'text-[#777777]'
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs text-[#b3b3b3] pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Mic2 className="w-4 h-4 text-[#1ed760]" />
          <span>Synced Live Lyrics • Desi Hip-Hop Archive</span>
        </div>
        <button
          onClick={() => toggleFavoriteSong(currentSong.id)}
          className={`flex items-center gap-1.5 font-bold ${
            isFavorited ? 'text-[#1ed760]' : 'text-white hover:underline'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#1ed760]' : ''}`} />
          <span>{isFavorited ? 'Saved in Liked Songs' : 'Save to Liked Songs'}</span>
        </button>
      </div>
    </div>
  );
};


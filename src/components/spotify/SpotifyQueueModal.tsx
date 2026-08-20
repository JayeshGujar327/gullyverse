import React from 'react';
import { X, Play, Trash2, ListMusic, Music, Radio } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

interface SpotifyQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotifyQueueModal: React.FC<SpotifyQueueModalProps> = ({ isOpen, onClose }) => {
  const { currentSong, queue, isPlaying, playSong, removeFromQueue } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in select-none">
      <div className="bg-[#181818] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-[#1ed760]" />
            <h3 className="font-bold text-lg text-white">Play Queue</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
          {/* Now Playing */}
          {currentSong && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#a7a7a7] uppercase tracking-wider">
                Now Playing
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#242424] border border-[#1ed760]/30 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={currentSong.coverArt}
                    alt={currentSong.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#1ed760] truncate">{currentSong.title}</h4>
                    <p className="text-xs text-[#b3b3b3] truncate">{currentSong.artistName}</p>
                  </div>
                </div>

                {isPlaying && (
                  <div className="flex items-end gap-1 h-4 px-3">
                    <span className="w-1 bg-[#1ed760] animate-pulse h-full"></span>
                    <span className="w-1 bg-[#1ed760] animate-pulse h-3"></span>
                    <span className="w-1 bg-[#1ed760] animate-pulse h-5"></span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Up */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#a7a7a7] uppercase tracking-wider">
                Next Up ({queue.length} tracks)
              </span>
            </div>

            <div className="space-y-1">
              {queue.map((song, index) => {
                const isCurrent = song.id === currentSong?.id;
                return (
                  <div
                    key={`${song.id}-${index}`}
                    className={`flex items-center justify-between p-2.5 rounded-lg hover:bg-[#282828] transition-colors group ${
                      isCurrent ? 'bg-[#222222]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-mono text-[#777] w-4 text-center">
                        {index + 1}
                      </span>
                      <img
                        src={song.coverArt}
                        alt={song.title}
                        className="w-10 h-10 rounded object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h5
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isCurrent ? 'text-[#1ed760]' : 'text-white'
                          }`}
                        >
                          {song.title}
                        </h5>
                        <p className="text-[11px] text-[#a7a7a7] truncate">{song.artistName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playSong(song)}
                        className="p-1.5 rounded-full text-white bg-[#1ed760] hover:scale-105 opacity-0 group-hover:opacity-100 transition-all text-black"
                        title="Play track"
                      >
                        <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                      </button>
                      <button
                        onClick={() => removeFromQueue(song.id)}
                        className="p-1.5 rounded-full text-[#777] hover:text-rose-400 hover:bg-[#333333] transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from queue"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, Music2, Share2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useToast } from '../../context/ToastContext';

export const YoutubePlayerModal: React.FC = () => {
  const { youtubeModalSong, closeYoutubeModal } = usePlayer();
  const { showToast } = useToast();

  if (!youtubeModalSong) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/songs/${youtubeModalSong.id}`);
    showToast('Song link copied to clipboard!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0f0f14] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <h3 className="font-heading font-bold text-base text-white truncate max-w-md">
                {youtubeModalSong.title} — {youtubeModalSong.artistName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                title="Share song link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={closeYoutubeModal}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* YouTube Embed Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {youtubeModalSong.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeModalSong.youtubeId}?autoplay=1&rel=0`}
                title={youtubeModalSong.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <Music2 className="w-12 h-12 text-zinc-600 mx-auto animate-bounce" />
                <p className="text-sm text-zinc-400">
                  Official streaming link available on artist channels:
                </p>
                {youtubeModalSong.youtubeUrl && (
                  <a
                    href={youtubeModalSong.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                  >
                    Open on YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Bottom Details & Legal Attribution */}
          <div className="p-4 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="font-mono text-zinc-300">
                Producer: <strong>{youtubeModalSong.producer}</strong>
              </span>
              <span>•</span>
              <span className="font-mono">{youtubeModalSong.bpm} BPM</span>
              <span>•</span>
              <span className="text-rose-400 font-semibold">{youtubeModalSong.genre}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Official YouTube stream embedding
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


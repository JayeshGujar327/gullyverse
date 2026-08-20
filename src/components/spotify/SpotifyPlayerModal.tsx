import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Radio, 
  Music, 
  Disc, 
  Clock, 
  Calendar, 
  Share2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useToast } from '../../context/ToastContext';

export const SpotifyPlayerModal: React.FC = () => {
  const { spotifyModalSong, closeSpotifyModal, openInSpotifyApp, copySpotifyLink } = usePlayer();
  const { showToast } = useToast();
  const [copiedUri, setCopiedUri] = useState(false);

  if (!spotifyModalSong) return null;

  const trackId = spotifyModalSong.spotifyTrackId || (spotifyModalSong.spotifyUrl ? spotifyModalSong.spotifyUrl.split('/track/')[1]?.split('?')[0] : '4L1XoN2k1J9W5T3r8L5P1k');
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  const spotifyUri = spotifyModalSong.spotifyUri || `spotify:track:${trackId}`;

  const handleCopyUri = () => {
    navigator.clipboard?.writeText(spotifyUri).then(() => {
      setCopiedUri(true);
      showToast(`Copied Spotify URI: ${spotifyUri}`, 'success');
      setTimeout(() => setCopiedUri(false), 2000);
    }).catch(() => {
      showToast(`Spotify URI: ${spotifyUri}`, 'info');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#121212] border border-[#282828] rounded-2xl shadow-2xl overflow-hidden text-white animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#282828] bg-[#181818]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1ed760] flex items-center justify-center text-black font-bold">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white">
                  Official Spotify Player
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30">
                  <ShieldCheck className="w-3 h-3" />
                  {spotifyModalSong.spotifyMatchStatus || 'VERIFIED'}
                </span>
              </div>
              <p className="text-xs text-[#b3b3b3]">
                Direct audio streaming provided officially by Spotify
              </p>
            </div>
          </div>

          <button
            onClick={closeSpotifyModal}
            className="w-8 h-8 rounded-full bg-[#282828] hover:bg-[#383838] flex items-center justify-center text-[#b3b3b3] hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Spotify Official Embed Widget */}
          <div className="w-full rounded-xl overflow-hidden bg-black/40 border border-[#282828] shadow-inner flex justify-center">
            <iframe
              src={embedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${spotifyModalSong.title} - Spotify Player`}
              className="rounded-xl"
            />
          </div>

          {/* Song Deep Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#181818] p-3 rounded-xl border border-[#282828]">
              <div className="flex items-center gap-1.5 text-xs text-[#b3b3b3] mb-1">
                <Music className="w-3.5 h-3.5 text-[#1ed760]" />
                <span>Genre</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">{spotifyModalSong.genre}</p>
            </div>

            <div className="bg-[#181818] p-3 rounded-xl border border-[#282828]">
              <div className="flex items-center gap-1.5 text-xs text-[#b3b3b3] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#1ed760]" />
                <span>Release</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">
                {spotifyModalSong.releaseDate || spotifyModalSong.releaseYear}
              </p>
            </div>

            <div className="bg-[#181818] p-3 rounded-xl border border-[#282828]">
              <div className="flex items-center gap-1.5 text-xs text-[#b3b3b3] mb-1">
                <Disc className="w-3.5 h-3.5 text-[#1ed760]" />
                <span>Producer</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">{spotifyModalSong.producer || 'Self-Produced'}</p>
            </div>

            <div className="bg-[#181818] p-3 rounded-xl border border-[#282828]">
              <div className="flex items-center gap-1.5 text-xs text-[#b3b3b3] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#1ed760]" />
                <span>Type</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">{spotifyModalSong.selectionType || 'POPULAR'}</p>
            </div>
          </div>

          {/* Editorial Note */}
          {spotifyModalSong.description && (
            <div className="p-3.5 bg-[#181818]/70 border border-[#282828] rounded-xl text-xs text-[#b3b3b3] leading-relaxed">
              <span className="font-semibold text-white mr-1.5">Editorial Note:</span>
              {spotifyModalSong.description}
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyUri}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#282828] hover:bg-[#383838] text-white rounded-full transition-colors"
                title="Copy Spotify Track URI"
              >
                {copiedUri ? <Check className="w-3.5 h-3.5 text-[#1ed760]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUri ? 'URI Copied' : 'Copy Spotify URI'}</span>
              </button>

              <button
                onClick={() => copySpotifyLink(spotifyModalSong)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#282828] hover:bg-[#383838] text-white rounded-full transition-colors"
                title="Copy Open Spotify Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </button>
            </div>

            <button
              onClick={() => openInSpotifyApp(spotifyModalSong)}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold bg-[#1ed760] hover:bg-[#1fdf64] text-black rounded-full transition-all hover:scale-105 shadow-lg shadow-[#1ed760]/20"
            >
              <span>Open in Spotify App</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


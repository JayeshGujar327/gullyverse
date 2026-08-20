import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Radio, 
  ExternalLink, 
  Copy, 
  Check, 
  Tv, 
  Disc, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  ArrowUp, 
  ArrowDown, 
  Settings, 
  Music,
  Share2
} from 'lucide-react';
import { Song, Artist } from '../../types';
import { getTopSongsForArtist, reorderArtistTopSongs } from '../../data/artistSongs';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface ArtistTopSongsSectionProps {
  artist: Artist;
}

const SELECTION_TYPE_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  MOST_STREAMED: { label: 'Most Streamed', bg: 'bg-emerald-500/20', text: 'text-emerald-300 border-emerald-500/30' },
  BREAKTHROUGH: { label: 'Breakthrough', bg: 'bg-amber-500/20', text: 'text-amber-300 border-amber-500/30' },
  POPULAR: { label: 'Top Popular', bg: 'bg-purple-500/20', text: 'text-purple-300 border-purple-500/30' },
  EDITOR_PICK: { label: 'Editor Pick', bg: 'bg-cyan-500/20', text: 'text-cyan-300 border-cyan-500/30' },
  FEATURED: { label: 'Featured Single', bg: 'bg-rose-500/20', text: 'text-rose-300 border-rose-500/30' },
  ICONIC_CLASSIC: { label: 'Iconic Classic', bg: 'bg-yellow-500/20', text: 'text-yellow-300 border-yellow-500/30' },
  UNDERGROUND_FAVORITE: { label: 'Cypher Classic', bg: 'bg-blue-500/20', text: 'text-blue-300 border-blue-500/30' },
};

export const ArtistTopSongsSection: React.FC<ArtistTopSongsSectionProps> = ({ artist }) => {
  const { currentSong, isPlaying, playSong, togglePlay, openSpotifyModal, openYoutubeModal, openInSpotifyApp, copySpotifyLink } = usePlayer();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [songs, setSongs] = useState<Song[]>(() => getTopSongsForArtist(artist.id, 5));
  const [adminMode, setAdminMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' || user?.isAdmin;

  const handlePlayOrToggle = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= songs.length) return;

    const newSongs = [...songs];
    const [moved] = newSongs.splice(index, 1);
    newSongs.splice(targetIdx, 0, moved);
    setSongs(newSongs);

    const reorderedIds = newSongs.map(s => s.id);
    reorderArtistTopSongs(artist.id, reorderedIds);
    showToast(`Updated Top 5 track order for ${artist.stageName}`, 'success');
  };

  const handleCopyUri = (song: Song) => {
    const uri = song.spotifyUri || (song.spotifyTrackId ? `spotify:track:${song.spotifyTrackId}` : `spotify:track:${song.id}`);
    navigator.clipboard?.writeText(uri).then(() => {
      setCopiedId(song.id);
      showToast(`Copied Spotify URI: ${uri}`, 'success');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#282828]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1ed760] font-bold">
            <Radio className="w-4 h-4" />
            <span>OFFICIAL SPOTIFY TOP 5 ESSENTIALS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Top Songs by {artist.stageName}
          </h2>
        </div>

        {/* Right Action / Admin Toggle */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={() => setAdminMode(!adminMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                adminMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-[#181818] text-[#b3b3b3] hover:text-white border-[#282828]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{adminMode ? 'Done Reordering' : 'Manage Top 5'}</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181818] border border-[#282828] text-[11px] text-[#b3b3b3]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1ed760]" />
            <span>Verified Streaming Sources</span>
          </div>
        </div>
      </div>

      {/* Top 5 Songs List */}
      <div className="divide-y divide-[#1f1f1f] bg-[#121212]/80 border border-[#222222] rounded-2xl overflow-hidden shadow-xl">
        {songs.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#b3b3b3]">
            No verified songs currently registered for this artist.
          </div>
        ) : (
          songs.map((song, idx) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            const badge = SELECTION_TYPE_BADGES[song.selectionType || 'POPULAR'] || SELECTION_TYPE_BADGES.POPULAR;

            return (
              <div
                key={song.id}
                className={`group p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isThisPlaying ? 'bg-[#1a1a1a]' : 'hover:bg-[#181818]'
                }`}
              >
                {/* Left Part: Order, Cover, Title, Artists, Badge */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Display Order Number or Reorder buttons in Admin mode */}
                  {adminMode ? (
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded bg-[#282828] hover:bg-[#383838] disabled:opacity-30 text-white"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === songs.length - 1}
                        className="p-1 rounded bg-[#282828] hover:bg-[#383838] disabled:opacity-30 text-white"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-6 text-center text-sm font-mono font-bold text-[#b3b3b3] group-hover:text-white shrink-0">
                      #{idx + 1}
                    </div>
                  )}

                  {/* Artwork with Quick Play overlay */}
                  <div className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-[#242424] shadow group/thumb">
                    <img
                      src={song.coverArt || artist.coverImageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'}
                      alt={song.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => handlePlayOrToggle(song)}
                      className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                        isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover/thumb:opacity-100'
                      }`}
                      title={isThisPlaying ? 'Pause Master Track' : 'Play Master Track'}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-5 h-5 text-[#1ed760] fill-current" />
                      ) : (
                        <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Song Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white truncate hover:underline cursor-pointer" onClick={() => handlePlayOrToggle(song)}>
                        {song.title}
                      </h4>

                      {/* Selection Type Badge */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>

                      {/* Spotify Verified Badge */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1ed760] bg-[#1ed760]/10 px-1.5 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" />
                        Spotify
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#b3b3b3] mt-1 font-mono">
                      <span>{song.artistName} {song.featuredArtists && song.featuredArtists.length > 0 ? `ft. ${song.featuredArtists.join(', ')}` : ''}</span>
                      {song.albumTitle && <span>• {song.albumTitle}</span>}
                      {song.releaseYear && <span>• {song.releaseYear}</span>}
                      {song.bpm && <span className="text-amber-400">• {song.bpm} BPM</span>}
                      {song.duration && <span>• {song.duration}</span>}
                    </div>

                    {/* Lyrics Snippet / Editorial Note */}
                    {song.lyricsSnippet && (
                      <p className="text-[11px] text-[#888888] italic truncate mt-1">
                        "{song.lyricsSnippet}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Part: Spotify Player / Embed / Share Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 self-end sm:self-center">
                  {/* Official Spotify Embed Player Trigger */}
                  <button
                    onClick={() => openSpotifyModal(song)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1ed760]/15 hover:bg-[#1ed760]/25 border border-[#1ed760]/40 text-[#1ed760] text-xs font-bold transition-all hover:scale-105"
                    title="Stream with Official Spotify Player"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Spotify Player</span>
                  </button>

                  {/* Open Directly in Spotify App / Web */}
                  <button
                    onClick={() => openInSpotifyApp(song)}
                    className="p-2 rounded-full bg-[#242424] hover:bg-[#333333] text-[#b3b3b3] hover:text-white transition-colors"
                    title="Open on Spotify.com"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {/* Copy Spotify URI */}
                  <button
                    onClick={() => handleCopyUri(song)}
                    className="p-2 rounded-full bg-[#242424] hover:bg-[#333333] text-[#b3b3b3] hover:text-white transition-colors"
                    title="Copy Spotify Track URI"
                  >
                    {copiedId === song.id ? (
                      <Check className="w-3.5 h-3.5 text-[#1ed760]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Watch YouTube Video (if available) */}
                  {(song.youtubeUrl || song.youtubeId) && (
                    <button
                      onClick={() => openYoutubeModal(song)}
                      className="p-2 rounded-full bg-[#242424] hover:bg-[#333333] text-red-400 hover:text-red-300 transition-colors"
                      title="Watch Official Video"
                    >
                      <Tv className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


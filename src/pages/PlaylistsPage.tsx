import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, ListMusic, Heart, Trash2, Play, Sparkles, Disc3, Mic2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { SONGS } from '../data/songs';
import { ARTISTS } from '../data/artists';
import { SongCard } from '../components/music/SongCard';
import { ArtistCard } from '../components/artists/ArtistCard';
import { PageHeaderNav } from '../components/common/PageHeaderNav';

export const PlaylistsPage: React.FC = () => {
  const { user, playlists, createPlaylist, removePlaylist, removeSongFromPlaylist } = useAuth();
  const { playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'FAVORITE_SONGS' | 'FAVORITE_ARTISTS' | 'PLAYLISTS'>('FAVORITE_SONGS');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const favoriteSongs = SONGS.filter((s) => (user?.favoriteSongIds || []).includes(s.id));
  const favoriteArtists = ARTISTS.filter((a) => (user?.favoriteArtistIds || []).includes(a.id));

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName) return;
    createPlaylist(newPlaylistName, newPlaylistDesc);
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setIsCreating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="My Playlists & Favorites" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
            <ListMusic className="w-4 h-4" /> USER VAULT & CRATES
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
            MY PLAYLISTS & FAVORITES
          </h1>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white text-xs font-bold font-mono uppercase flex items-center gap-2 self-start sm:self-auto shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Custom Playlist
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('FAVORITE_SONGS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
            activeTab === 'FAVORITE_SONGS'
              ? 'bg-[#ff334b] text-white shadow-lg'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
          }`}
        >
          Liked Anthems ({favoriteSongs.length})
        </button>

        <button
          onClick={() => setActiveTab('FAVORITE_ARTISTS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
            activeTab === 'FAVORITE_ARTISTS'
              ? 'bg-[#ff334b] text-white shadow-lg'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
          }`}
        >
          Followed MCs ({favoriteArtists.length})
        </button>

        <button
          onClick={() => setActiveTab('PLAYLISTS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
            activeTab === 'PLAYLISTS'
              ? 'bg-[#ff334b] text-white shadow-lg'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
          }`}
        >
          My Crates ({playlists.length})
        </button>
      </div>

      {/* New Playlist Modal / Inline Form */}
      {isCreating && (
        <div className="p-6 rounded-3xl bg-[#111116] border border-rose-500/40 shadow-2xl space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">Create New Custom Crate</h3>
          <form onSubmit={handleCreatePlaylist} className="space-y-3">
            <div>
              <label className="text-xs font-mono text-zinc-400">PLAYLIST NAME</label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="e.g. Late Night Delhi Drill"
                className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-400">DESCRIPTION (OPTIONAL)</label>
              <input
                type="text"
                value={newPlaylistDesc}
                onChange={(e) => setNewPlaylistDesc(e.target.value)}
                placeholder="e.g. Heavy basslines and technical bars for the gym"
                className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#ff334b] text-white text-xs font-bold font-mono"
              >
                Save Playlist
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-mono"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 1: Liked Songs */}
      {activeTab === 'FAVORITE_SONGS' && (
        <div className="space-y-4">
          {favoriteSongs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#111116] border border-zinc-800 space-y-2">
              <Heart className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-zinc-300 font-bold">No liked anthems yet.</p>
              <p className="text-xs text-zinc-500">Click the heart icon on any song card to save it to your crate.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {favoriteSongs.map((song, idx) => (
                <SongCard key={song.id} song={song} index={idx} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Followed Artists */}
      {activeTab === 'FAVORITE_ARTISTS' && (
        <div className="space-y-4">
          {favoriteArtists.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#111116] border border-zinc-800 space-y-2">
              <Mic2 className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-zinc-300 font-bold">No followed MCs yet.</p>
              <p className="text-xs text-zinc-500">Follow artists from the directory to keep track of their sound.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Custom Playlists */}
      {activeTab === 'PLAYLISTS' && (
        <div className="space-y-6">
          {playlists.map((pl) => {
            const playlistSongs = SONGS.filter((s) => (pl.songIds || []).includes(s.id));
            return (
              <div
                key={pl.id}
                className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-black text-xl text-white">{pl.name}</h3>
                    <p className="text-xs text-zinc-400">{pl.description || 'Custom user crate'} • {playlistSongs.length} tracks</p>
                  </div>
                  <button
                    onClick={() => removePlaylist(pl.id)}
                    className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                    title="Delete playlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {playlistSongs.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">No songs added to this crate yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {playlistSongs.map((song, i) => (
                      <div key={song.id} className="relative group">
                        <SongCard song={song} index={i} />
                        <button
                          onClick={() => removeSongFromPlaylist(pl.id, song.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-zinc-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove from this playlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


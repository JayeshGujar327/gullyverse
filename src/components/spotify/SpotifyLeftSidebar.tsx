import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  ArrowRight, 
  Heart, 
  Flame, 
  Music, 
  Disc, 
  Radio, 
  MapPin, 
  Swords, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Pin,
  Check,
  Award,
  BookOpen,
  Mic2,
  Headphones,
  History,
  Layers,
  Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { ALL_ARTISTS } from '../../data/artists';
import { SONGS } from '../../data/songs';
import { REGIONAL_SCENES } from '../../data/regions';
import { CYPHERS } from '../../data/cyphers';

interface SpotifyLeftSidebarProps {
  onOpenSearch: () => void;
}

export const SpotifyLeftSidebar: React.FC<SpotifyLeftSidebarProps> = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const { user, playlists } = useAuth();
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PLAYLISTS' | 'ARTISTS' | 'REGIONS' | 'CYPHERS'>('ALL');
  const [librarySearch, setLibrarySearch] = useState('');

  const favoriteCount = (user?.favoriteSongIds || []).length;

  // Curated DHH official playlist presets
  const curatedPlaylists = [
    {
      id: 'pl-gully-gold',
      name: 'Mumbai Gully Rap Essentials',
      tag: 'Bambaiya Street Anthems',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      trackCount: 18,
      leadSongId: 'mere-gully-mein'
    },
    {
      id: 'pl-capital-drill',
      name: 'Capital Drill & Bass (Delhi 88)',
      tag: 'Seedhe Maut & KR$NA Zone',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      trackCount: 22,
      leadSongId: 'nanchaku'
    },
    {
      id: 'pl-historic-beefs',
      name: 'Historic DHH Beef & Diss Battles',
      tag: 'Iconic Lyrical Warfare',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
      trackCount: 14,
      leadSongId: 'makasam'
    },
    {
      id: 'pl-deccan-south',
      name: 'Deccan & South Carnatic Rap',
      tag: 'Bengaluru, Kerala & Chennai',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      trackCount: 16,
      leadSongId: 'big-dawgs'
    },
    {
      id: 'pl-urdu-conscious',
      name: 'Poetic & Conscious Rap Vault',
      tag: 'Deep Metaphors & Storytelling',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
      trackCount: 15,
      leadSongId: 'gandi-aulaad'
    }
  ];

  // Play pinned Liked Songs list
  const handlePlayLikedSongs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const likedSongs = SONGS.filter((s) => (user?.favoriteSongIds || []).includes(s.id));
    if (likedSongs.length > 0) {
      playSong(likedSongs[0]);
    } else {
      navigate('/playlists');
    }
  };

  const handlePlayCuratedPlaylist = (e: React.MouseEvent, leadSongId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const targetSong = SONGS.find((s) => s.id === leadSongId) || SONGS[0];
    if (targetSong) {
      playSong(targetSong);
    }
  };

  // Filtered artists by search query
  const filteredArtists = ALL_ARTISTS.filter(
    (a) =>
      !librarySearch ||
      a.stageName.toLowerCase().includes(librarySearch.toLowerCase()) ||
      a.city.toLowerCase().includes(librarySearch.toLowerCase()) ||
      a.primaryRole.toLowerCase().includes(librarySearch.toLowerCase())
  );

  // Filtered regions
  const filteredRegions = REGIONAL_SCENES.filter(
    (r) =>
      !librarySearch ||
      r.city.toLowerCase().includes(librarySearch.toLowerCase()) ||
      r.state.toLowerCase().includes(librarySearch.toLowerCase()) ||
      r.soundSignature.toLowerCase().includes(librarySearch.toLowerCase())
  );

  // Filtered cyphers
  const filteredCyphers = CYPHERS.filter(
    (c) =>
      !librarySearch ||
      c.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      c.city.toLowerCase().includes(librarySearch.toLowerCase()) ||
      c.artists.some((a) => a.toLowerCase().includes(librarySearch.toLowerCase()))
  );

  // Filtered user playlists
  const filteredUserPlaylists = playlists.filter(
    (p) => !librarySearch || p.name.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <aside className="w-72 lg:w-80 xl:w-84 flex flex-col gap-2 shrink-0 h-full min-h-0 select-none gully-sidebar-scroll">
      {/* 1. TOP NAV CARD */}
      <div className="bg-[#121212] rounded-xl p-4 flex flex-col gap-3 shadow-md shrink-0 border border-white/5">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1 group">
          <div className="w-8 h-8 rounded-full bg-[#1ed760] flex items-center justify-center shadow-lg shadow-[#1ed760]/30 group-hover:scale-105 transition-transform">
            <Radio className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base text-white tracking-tight">GULLYVERSE</span>
              <span className="text-[10px] font-mono font-black text-black bg-[#1ed760] px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                DHH
              </span>
            </div>
            <p className="text-[10px] text-[#a7a7a7] -mt-0.5">Spotify Edition</p>
          </div>
        </Link>

        {/* Primary Links */}
        <div className="space-y-1 pt-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isActive
                  ? 'text-white bg-[#282828]'
                  : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>

          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-bold text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] transition-colors text-left"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>

          <NavLink
            to="/songs"
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isActive
                  ? 'text-white bg-[#282828]'
                  : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
              }`
            }
          >
            <Disc className="w-5 h-5" />
            <span>Tracks & Crates</span>
          </NavLink>

          <NavLink
            to="/artists"
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isActive
                  ? 'text-white bg-[#282828]'
                  : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
              }`
            }
          >
            <Music className="w-5 h-5" />
            <span>Artists & MCs</span>
          </NavLink>
        </div>
      </div>


      {/* =========================================================
          GULLYVERSE CREATOR & ADMIN
          ========================================================= */}

      <div className="mx-2 mt-2 mb-2 rounded-xl bg-[#121212] p-2">

        <div className="px-3 pt-2 pb-1">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#1ed760]">
            GULLYVERSE
          </span>
        </div>

        <a
          href="/about"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b3b3b3] hover:bg-[#1f1f1f] hover:text-white transition-all duration-200"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1ed760]/10 border border-[#1ed760]/20 text-[#1ed760] text-sm font-bold">
            i
          </span>

          <span className="text-sm font-semibold">
            About GULLYVERSE
          </span>
        </a>

        <a
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b3b3b3] hover:bg-[#1f1f1f] hover:text-white transition-all duration-200"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
            ⚙
          </span>

          <span className="text-sm font-semibold">
            Admin Dashboard
          </span>
        </a>

      </div>
      {/* 2. SPOTIFY "YOUR LIBRARY" CARD */}
      <div className="bg-[#121212] rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden shadow-md border border-white/5">
        {/* Library Header */}
        <div className="p-3.5 pb-2 flex items-center justify-between shrink-0">
          <button 
            onClick={() => navigate('/playlists')}
            className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors group"
          >
            <Library className="w-5 h-5 group-hover:scale-105 transition-transform text-[#a7a7a7] group-hover:text-[#1ed760]" />
            <span className="font-bold text-sm tracking-tight text-white">Your Library</span>
          </button>

          <div className="flex items-center gap-1">
            <Link
              to="/submit"
              className="p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors"
              title="Submit Artist or Track"
            >
              <Plus className="w-4 h-4" />
            </Link>
            <Link
              to="/playlists"
              className="p-1.5 rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-colors"
              title="View All Playlists & Crates"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-[#222222] shrink-0">
          {(['ALL', 'PLAYLISTS', 'ARTISTS', 'REGIONS', 'CYPHERS'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-[#242424] text-white hover:bg-[#2a2a2a]'
              }`}
            >
              {filter === 'ALL' ? 'All' : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Search inside library */}
        <div className="px-3 pt-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#a7a7a7] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              placeholder={`Search ${activeFilter.toLowerCase()}...`}
              className="w-full bg-[#1e1e1e] hover:bg-[#252525] focus:bg-[#282828] text-xs text-white placeholder-[#777] rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1ed760] transition-colors"
            />
          </div>
        </div>

        {/* Scrollable Library Content List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar min-h-0 overscroll-contain">
          {/* Pinned: Liked Songs Card */}
          {(activeFilter === 'ALL' || activeFilter === 'PLAYLISTS') && (
            <Link
              to="/playlists"
              className="flex items-center justify-between p-2 rounded-md hover:bg-[#242424] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded bg-gradient-to-br from-[#450af5] via-[#8e2de2] to-[#c471ed] flex items-center justify-center shrink-0 shadow-md group-hover:shadow-lg transition-shadow relative">
                  <Heart className="w-5 h-5 fill-white text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-[#1ed760] transition-colors">
                    Liked Songs
                  </h4>
                  <p className="text-xs text-[#a7a7a7] flex items-center gap-1 truncate">
                    <Pin className="w-3 h-3 text-[#1ed760] fill-[#1ed760] shrink-0" />
                    <span>Playlist • {favoriteCount} songs</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handlePlayLikedSongs}
                className="w-8 h-8 rounded-full bg-[#1ed760] text-black opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg transition-opacity hover:scale-105 shrink-0 ml-1"
                title="Play Liked Songs"
              >
                <Radio className="w-4 h-4" />
              </button>
            </Link>
          )}

          {/* DHH Quick Access Portal Links in ALL */}
          {activeFilter === 'ALL' && !librarySearch && (
            <>
              <Link
                to="/map"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#20293d] border border-[#2e3b56] flex items-center justify-center shrink-0 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                    Hoods & Regional Map
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">Pan-India Cities & Slangs</p>
                </div>
              </Link>

              <Link
                to="/learn-rap"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#291b35] border border-[#3e2752] flex items-center justify-center shrink-0 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                    Flow Lab & Studio
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">Interactive Rhyme Engine</p>
                </div>
              </Link>

              <Link
                to="/cyphers"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#35191f] border border-[#52252e] flex items-center justify-center shrink-0 text-rose-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                    Cyphers & Battle Beefs
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">Diss Timelines & Breakdown</p>
                </div>
              </Link>

              <Link
                to="/awards"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#2b2512] border border-[#4d3d1a] flex items-center justify-center shrink-0 text-amber-500">
                  <Crown className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                    DHH Hall of Fame
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">Iconic Records & Milestones</p>
                </div>
              </Link>

              <Link
                to="/producers"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#162725] border border-[#234542] flex items-center justify-center shrink-0 text-teal-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-teal-400 transition-colors">
                    Producers & Beatmakers
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">Signature Boom-Bap & 808s</p>
                </div>
              </Link>
            </>
          )}

          {/* User Playlists (Rendered in ALL and PLAYLISTS) */}
          {(activeFilter === 'ALL' || activeFilter === 'PLAYLISTS') &&
            filteredUserPlaylists.map((playlist) => (
              <Link
                key={playlist.id}
                to="/playlists"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#282828] flex items-center justify-center shrink-0 text-white overflow-hidden border border-white/5">
                  {playlist.coverArt ? (
                    <img src={playlist.coverArt} alt={playlist.name} className="w-full h-full object-cover" />
                  ) : (
                    <Disc className="w-5 h-5 text-[#a7a7a7]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-[#1ed760] transition-colors">
                    {playlist.name}
                  </h4>
                  <p className="text-xs text-[#a7a7a7] truncate">
                    Playlist • {(playlist.songIds || []).length} tracks
                  </p>
                </div>
              </Link>
            ))}

          {/* Curated Official Playlists (Rendered in PLAYLISTS) */}
          {activeFilter === 'PLAYLISTS' &&
            curatedPlaylists
              .filter((p) => !librarySearch || p.name.toLowerCase().includes(librarySearch.toLowerCase()) || p.tag.toLowerCase().includes(librarySearch.toLowerCase()))
              .map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => navigate('/songs')}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#242424] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-12 h-12 rounded object-cover shrink-0 border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate group-hover:text-[#1ed760] transition-colors">
                        {playlist.name}
                      </h4>
                      <p className="text-xs text-[#a7a7a7] truncate">
                        {playlist.tag} • {playlist.trackCount} tracks
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handlePlayCuratedPlaylist(e, playlist.leadSongId)}
                    className="w-8 h-8 rounded-full bg-[#1ed760] text-black opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg transition-opacity hover:scale-105 shrink-0 ml-1"
                    title="Play Playlist"
                  >
                    <Radio className="w-4 h-4" />
                  </button>
                </div>
              ))}

          {/* Artists Section (Rendered in ALL and ARTISTS) */}
          {(activeFilter === 'ALL' || activeFilter === 'ARTISTS') &&
            filteredArtists.map((artist) => {
              const isArtistCurrent = currentSong?.artistId === artist.id;
              return (
                <Link
                  key={artist.id}
                  to={`/artists/${artist.id}`}
                  className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group ${
                    isArtistCurrent ? 'bg-[#202020]' : ''
                  }`}
                >
                  <img
                    src={artist.image}
                    alt={artist.stageName}
                    className="w-12 h-12 rounded-full object-cover shrink-0 shadow border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold truncate group-hover:text-[#1ed760] transition-colors ${
                          isArtistCurrent ? 'text-[#1ed760]' : 'text-white'
                        }`}
                      >
                        {artist.stageName}
                      </h4>
                      {isArtistCurrent && isPlaying && (
                        <div className="flex items-end gap-0.5 h-3 shrink-0">
                          <span className="w-0.5 bg-[#1ed760] animate-pulse h-full"></span>
                          <span className="w-0.5 bg-[#1ed760] animate-pulse h-2"></span>
                          <span className="w-0.5 bg-[#1ed760] animate-pulse h-3"></span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#a7a7a7] truncate">
                      Artist • {artist.city}
                    </p>
                  </div>
                </Link>
              );
            })}

          {/* Regional Hubs List (Rendered in REGIONS) */}
          {activeFilter === 'REGIONS' &&
            filteredRegions.map((region) => (
              <Link
                key={region.id}
                to="/map"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#1c2333] border border-[#2b3752] flex items-center justify-center shrink-0 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                      {region.city}
                    </h4>
                    <span className="text-[10px] font-mono text-[#1ed760] font-bold">
                      {region.establishedYear}
                    </span>
                  </div>
                  <p className="text-xs text-[#a7a7a7] truncate">
                    {region.state} • {region.primaryLanguages.slice(0, 2).join('/')}
                  </p>
                </div>
              </Link>
            ))}

          {/* Cyphers & Battles List (Rendered in CYPHERS) */}
          {activeFilter === 'CYPHERS' &&
            filteredCyphers.map((cypher) => (
              <Link
                key={cypher.id}
                to="/cyphers"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#242424] transition-colors group"
              >
                <div className="w-12 h-12 rounded bg-[#2b171c] border border-[#4d252f] flex items-center justify-center shrink-0 text-rose-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                      {cypher.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#a7a7a7]">
                      {cypher.year}
                    </span>
                  </div>
                  <p className="text-xs text-[#a7a7a7] truncate">
                    {cypher.city} • {cypher.artists.slice(0, 2).join(', ')}
                  </p>
                </div>
              </Link>
            ))}

          {/* Empty state when search yields no result */}
          {((activeFilter === 'ARTISTS' && filteredArtists.length === 0) ||
            (activeFilter === 'REGIONS' && filteredRegions.length === 0) ||
            (activeFilter === 'CYPHERS' && filteredCyphers.length === 0) ||
            (activeFilter === 'PLAYLISTS' && filteredUserPlaylists.length === 0 && curatedPlaylists.length === 0)) && (
            <div className="py-8 text-center text-xs text-[#777] space-y-1">
              <p>No matching items found</p>
              <button
                onClick={() => setLibrarySearch('')}
                className="text-[#1ed760] hover:underline font-bold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Footer info & Cultural Badges */}
        <div className="p-3 border-t border-[#222222] flex items-center justify-between text-[11px] text-[#777] shrink-0">
          <div className="flex items-center gap-2">
            <Link to="/history" className="hover:text-white transition-colors">Timeline</Link>
            <span>•</span>
            <Link to="/awards" className="hover:text-white transition-colors">Awards</Link>
            <span>•</span>
            <Link to="/culture" className="hover:text-white transition-colors">Culture</Link>
          </div>
          <span className="font-mono text-[9px] text-[#1ed760] bg-[#1ed760]/10 px-1.5 py-0.5 rounded font-bold">
            DESI 2026
          </span>
        </div>
      </div>
    </aside>
  );
};




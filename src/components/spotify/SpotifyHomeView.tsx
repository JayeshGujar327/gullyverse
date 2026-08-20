import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Heart, 
  Flame, 
  Music, 
  Disc, 
  Radio, 
  MapPin, 
  Sparkles, 
  Swords, 
  Award, 
  ArrowRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { SpotifyCard } from './SpotifyCard';
import { SONGS } from '../../data/songs';
import { ALL_ARTISTS } from '../../data/artists';
import { CYPHERS, DISS_TIMELINES } from '../../data/cyphers';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';

export const SpotifyHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { user } = useAuth();

  // Dynamic Greeting based on client local hour
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // 6 Quick Access Cards
  const quickPicks = [
    {
      id: 'liked-songs',
      title: 'Liked Songs',
      imageUrl: '',
      gradient: 'from-[#450af5] to-[#8e2de2]',
      isLiked: true,
      onClick: () => navigate('/playlists'),
      onPlay: () => {
        const liked = SONGS.filter((s) => (user?.favoriteSongIds || []).includes(s.id));
        if (liked.length > 0) playSong(liked[0]);
      },
    },
    {
      id: 'dhh-essentials',
      title: 'DHH Heavy Rotation',
      imageUrl: SONGS[0]?.coverArt || '',
      subtitle: 'DIVINE, Seedhe Maut, KR$NA',
      onClick: () => navigate('/songs'),
      onPlay: () => playSong(SONGS[0]),
    },
    {
      id: 'mumbai-gully',
      title: 'Mumbai Gully Rap',
      imageUrl: SONGS[1]?.coverArt || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      subtitle: 'DIVINE, Naezy, MC Altaf',
      onClick: () => navigate('/map'),
      onPlay: () => playSong(SONGS[1] || SONGS[0]),
    },
    {
      id: 'delhi-drill',
      title: 'Capital Drill & Bars',
      imageUrl: SONGS[2]?.coverArt || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      subtitle: 'Seedhe Maut, Prabh Deep, Raga',
      onClick: () => navigate('/songs'),
      onPlay: () => playSong(SONGS[2] || SONGS[0]),
    },
    {
      id: 'battle-beefs',
      title: 'Historic Diss Battles',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      subtitle: 'KR$NA vs Muhfaad & Emiway',
      onClick: () => navigate('/cyphers'),
      onPlay: () => playSong(SONGS[3] || SONGS[0]),
    },
    {
      id: 'south-wave',
      title: 'Deccan South Frequencies',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      subtitle: 'Brodha V, Dabzee, Hanumankind',
      onClick: () => navigate('/map'),
      onPlay: () => playSong(SONGS[4] || SONGS[0]),
    },
  ];

  // Distinct Collections
  const topTracks = SONGS.slice(0, 7);
  const featuredArtists = ALL_ARTISTS.slice(0, 7);
  const undergroundTracks = SONGS.filter((s) => s.isUnderground || s.bpm > 130).slice(0, 7);

  const regionalCards = [
    { title: 'Mumbai Gully', color: 'from-amber-600 to-orange-800', desc: '50+ Tracks • Gully Gang, Azadi', path: '/map' },
    { title: 'Delhi Drill & Capital', color: 'from-blue-600 to-indigo-900', desc: '65+ Tracks • TBS, Azadi, SM', path: '/map' },
    { title: 'Punjab Drill & Folk', color: 'from-emerald-600 to-teal-900', desc: '40+ Tracks • Moosetape Wave', path: '/map' },
    { title: 'Kerala & Tamil Wave', color: 'from-rose-600 to-red-900', desc: '35+ Tracks • South Frequencies', path: '/map' },
    { title: 'Northeast Hip-Hop', color: 'from-purple-600 to-violet-900', desc: '20+ Tracks • Shillong, Guwahati', path: '/map' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. GULLYVERSE BRAND HERO + DYNAMIC GREETING */}
      <section className="relative px-4 sm:px-6 pt-6 sm:pt-8">

        {/* Main GULLYVERSE Brand Title */}
        <div className="relative flex flex-col items-center justify-center text-center mb-8 sm:mb-10">

          {/* Atmospheric Green Glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-40 bg-[#1ed760]/10 blur-3xl rounded-full pointer-events-none"></div>

          {/* Main App Name */}
          <h1 className="relative font-heading font-black text-[clamp(2.6rem,5.5vw,5.8rem)] leading-[0.9] tracking-[-0.045em] text-white uppercase max-w-full px-4">
            GULLYVERSE
          </h1>

          {/* Subtitle */}
          <p className="relative mt-4 text-[11px] sm:text-sm md:text-base font-mono font-bold tracking-[0.35em] uppercase text-[#1ed760]">
            THE INDIAN HIP-HOP CULTURE UNIVERSE
          </p>

          {/* Supporting Line */}
          <p className="relative mt-2 text-xs sm:text-sm md:text-base text-[#a7a7a7]">
            Music • Culture • History • The Streets
          </p>

          {/* Decorative Divider */}
          <div className="relative mt-6 flex items-center gap-3 w-full max-w-2xl">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1ed760]/40 to-[#1ed760]/20"></div>
            <div className="w-2 h-2 rounded-full bg-[#1ed760] shadow-[0_0_12px_#1ed760]"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#1ed760]/40 to-[#1ed760]/20"></div>
          </div>
        </div>

        {/* Dynamic Greeting */}
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 left-0 right-0 h-80 bg-gradient-to-b from-[#1db954]/15 via-[#121212]/70 to-transparent pointer-events-none -z-10"></div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
            {greeting}
          </h1>
          <span className="text-xs font-mono font-bold text-[#1ed760] bg-[#1ed760]/10 px-2.5 py-1 rounded-full border border-[#1ed760]/20">
            DESI HIP-HOP 2026
          </span>
        </div>

        {/* 2. SPOTIFY 6 QUICK-ACCESS CARDS (2x3 GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {quickPicks.map((pick) => {
            const isCurrent = pick.onPlay && currentSong?.id === SONGS[0]?.id; // heuristic check
            return (
              <div
                key={pick.id}
                onClick={pick.onClick}
                className="group relative flex items-center bg-[#282828]/60 hover:bg-[#282828] rounded-md overflow-hidden transition-all duration-200 cursor-pointer shadow-md"
              >
                {/* Left Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#1e1e1e] flex items-center justify-center relative overflow-hidden">
                  {pick.isLiked ? (
                    <div className={`w-full h-full bg-gradient-to-br ${pick.gradient} flex items-center justify-center`}>
                      <Heart className="w-6 h-6 fill-white text-white" />
                    </div>
                  ) : (
                    <img
                      src={pick.imageUrl}
                      alt={pick.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Card Title */}
                <div className="px-3 sm:px-4 py-2 min-w-0 flex-1 flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-white truncate group-hover:underline">
                    {pick.title}
                  </span>

                  {/* Floating Green Play Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (pick.onPlay) pick.onPlay();
                    }}
                    className="w-10 h-10 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-106 text-black opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-xl transition-all duration-200 shrink-0 ml-2"
                    title="Play"
                  >
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SHELF 1: MADE FOR YOU / DHH HEAVY ROTATION */}
      <section className="px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight hover:underline cursor-pointer">
              <Link to="/songs">Made For You • DHH Heavy Rotation</Link>
            </h2>
            <p className="text-xs text-[#a7a7a7]">Essential anthems, viral hits, and chart toppers</p>
          </div>
          <Link to="/songs" className="text-xs font-bold text-[#b3b3b3] hover:underline hover:text-white">
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4">
          {topTracks.map((song) => (
            <SpotifyCard
              key={song.id}
              id={song.id}
              title={song.title}
              subtitle={`${song.artistName} • ${song.releaseYear || '2024'}`}
              imageUrl={song.coverArt}
              type="song"
              isCurrent={currentSong?.id === song.id}
              isPlaying={isPlaying}
              onPlayClick={() => {
                if (currentSong?.id === song.id) togglePlay();
                else playSong(song);
              }}
              onClick={() => navigate(`/songs/${song.id}`)}
              badge={song.isUnderground ? 'RAW' : undefined}
            />
          ))}
        </div>
      </section>

      {/* 4. SHELF 2: POPULAR MCS & ARTISTS (ROUND AVATARS) */}
      <section className="px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight hover:underline cursor-pointer">
              <Link to="/artists">Popular MCs & Lyricists</Link>
            </h2>
            <p className="text-xs text-[#a7a7a7]">Pioneers, kings, and torchbearers of the culture</p>
          </div>
          <Link to="/artists" className="text-xs font-bold text-[#b3b3b3] hover:underline hover:text-white">
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4">
          {featuredArtists.map((artist) => {
            const isCurrent = currentSong?.artistId === artist.id;
            return (
              <SpotifyCard
                key={artist.id}
                id={artist.id}
                title={artist.stageName}
                subtitle={`Artist • ${artist.city}`}
                imageUrl={artist.image}
                type="artist"
                isCurrent={isCurrent}
                isPlaying={isPlaying}
                onPlayClick={() => {
                  const topSongId = artist.topSongs && artist.topSongs.length > 0 ? artist.topSongs[0] : null;
                  const targetSong = topSongId ? SONGS.find((s) => s.id === topSongId) : SONGS.find((s) => s.artistId === artist.id);
                  if (targetSong) playSong(targetSong);
                }}
                onClick={() => navigate(`/artists/${artist.id}`)}
              />
            );
          })}
        </div>
      </section>

      {/* 5. SHELF 3: HISTORIC CYPHER SESSIONS & BATTLE DISSTRACKS */}
      <section className="px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight hover:underline cursor-pointer">
              <Link to="/cyphers">Cyphers & Historic Beefs</Link>
            </h2>
            <p className="text-xs text-[#a7a7a7]">Legendary rap battles, diss timelines, and raw cypher verses</p>
          </div>
          <Link to="/cyphers" className="text-xs font-bold text-[#b3b3b3] hover:underline hover:text-white">
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {DISS_TIMELINES.slice(0, 3).map((battle) => (
            <div
              key={battle.id}
              onClick={() => navigate('/cyphers')}
              className="p-4 sm:p-5 rounded-lg bg-[#181818] hover:bg-[#282828] transition-all cursor-pointer group space-y-2.5 border border-white/5"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#1ed760] font-bold flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5" /> {battle.year} CLASH
                </span>
                <span className="text-[#a7a7a7]">{battle.tracks.length} Tracks</span>
              </div>
              <h3 className="font-heading font-extrabold text-base text-white group-hover:underline">
                {battle.feudTitle || battle.feud}
              </h3>
              <p className="text-xs text-[#a7a7a7] line-clamp-2 leading-relaxed">
                {battle.summary}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#b3b3b3] border-t border-white/5">
                <span>STATUS: <strong className="text-amber-400">{battle.status}</strong></span>
                <span className="text-[#1ed760] font-bold flex items-center gap-1">
                  View Timeline <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SHELF 4: PAN-INDIA REGIONAL GENRE TILES (SPOTIFY BROWSE STYLE) */}
      <section className="px-4 sm:px-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight hover:underline cursor-pointer">
              <Link to="/map">Explore Pan-India Gullies</Link>
            </h2>
            <p className="text-xs text-[#a7a7a7]">Browse regional dialects, slangs, and soundscapes</p>
          </div>
          <Link to="/map" className="text-xs font-bold text-[#b3b3b3] hover:underline hover:text-white">
            Open Map
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {regionalCards.map((region, idx) => (
            <div
              key={idx}
              onClick={() => navigate(region.path)}
              className={`p-4 sm:p-5 rounded-xl bg-gradient-to-br ${region.color} shadow-lg hover:scale-103 transition-transform cursor-pointer relative overflow-hidden h-28 sm:h-36 flex flex-col justify-between`}
            >
              <h3 className="font-heading font-black text-base sm:text-lg text-white leading-tight">
                {region.title}
              </h3>
              <p className="text-[11px] text-white/80 font-mono font-medium">
                {region.desc}
              </p>
              <MapPin className="w-12 h-12 text-white/10 absolute -bottom-2 -right-2 transform rotate-12" />
            </div>
          ))}
        </div>
      </section>

      {/* 7. SHELF 5: INTERACTIVE FLOW LAB & ACADEMY */}
      <section className="px-4 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/40">
              <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE STUDIO
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Flow Lab & Multi-Syllabic Rhyme Studio
            </h2>
            <p className="text-sm text-[#b3b3b3] leading-relaxed">
              Test your bars with our real-time phoneme analyzer, 808 metronome beat maker, multi-syllable highlighter, and Desi slang thesaurus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/learn-rap"
              className="px-6 py-3 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold text-sm shadow-xl transition-transform hover:scale-105"
            >
              Launch Flow Lab
            </Link>
            <Link
              to="/journey"
              className="px-5 py-3 rounded-full bg-[#282828] hover:bg-[#333333] text-white font-bold text-sm border border-white/10 transition-colors"
            >
              Take DHH Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};




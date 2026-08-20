import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  MapPin, 
  Flame, 
  Heart, 
  Mic2, 
  Music2, 
  Award, 
  ArrowLeft, 
  ExternalLink, 
  Disc3, 
  GitCompare,
  Quote,
  Sparkles,
  Radio,
  Play,
  ShieldCheck,
  HelpCircle,
  Youtube,
  Instagram,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ARTISTS, ALL_ARTISTS, getArtistById } from '../data/artists';
import { SONGS, ALBUMS } from '../data/songs';
import { SongCard } from '../components/music/SongCard';
import { ArtistTopSongsSection } from '../components/music/ArtistTopSongsSection';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { ArtistCategory } from '../types';

const CATEGORY_TAGS: Record<string, { label: string; color: string }> = {
  MAINSTREAM: { label: 'Mainstream Titan', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  NEW_WAVE: { label: 'New Wave & Alt', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  SOUTH_INDIAN: { label: 'South Regional Force', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  PUNJABI: { label: 'Punjabi & Desi Rap', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  UNDERGROUND: { label: 'Underground / Cypher', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  PRODUCER: { label: 'Music Producer', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  SPECIAL_CANDIDATE: { label: 'Special Candidate', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  IDENTITY_VERIFICATION_REQUIRED: { label: 'Identity Review Required', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  LEGEND: { label: 'DHH Legend', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  PIONEER: { label: 'Foundational Pioneer', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  GLOBAL: { label: 'Global Impact', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  CONSCIOUS_RAP: { label: 'Conscious Rap', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
};

export const ArtistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleFavoriteArtist } = useAuth();
  const { playSong } = usePlayer();

  const artist = getArtistById(id || '') || ALL_ARTISTS.find((a) => a.id === id || a.slug === id);

  if (!artist) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-24 text-center space-y-4">
        <h1 className="font-heading font-black text-3xl text-white">Artist Not Found</h1>
        <p className="text-slate-400 text-sm">The requested artist profile does not exist or has been moved.</p>
        <Link to="/artists" className="inline-block px-6 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold">
          Back to Artists Directory
        </Link>
      </div>
    );
  }

  const isFavorited = user.favoriteArtistIds.includes(artist.id);
  const isVerified100k = artist.verified100kPlus || artist.verification?.verified100kPlus;
  const isCandidate = artist.categories?.includes('SPECIAL_CANDIDATE' as ArtistCategory) || artist.categories?.includes('IDENTITY_VERIFICATION_REQUIRED' as ArtistCategory);

  // Artist's Songs & Albums
  const artistSongs = SONGS.filter((s) => s.artistId === artist.id || s.featuredArtists?.includes(artist.stageName));
  const artistAlbums = ALBUMS.filter((a) => a.artistId === artist.id);

  const handlePlayAnthem = () => {
    if (artistSongs.length > 0) {
      playSong(artistSongs[0]);
    }
  };

  // Radar chart data for skill scores
  const radarData = [
    { subject: 'Lyricism', score: artist.scores.lyrical, fullMark: 100 },
    { subject: 'Flow', score: artist.scores.flow, fullMark: 100 },
    { subject: 'Delivery', score: artist.scores.delivery, fullMark: 100 },
    { subject: 'Storytelling', score: artist.scores.storytelling, fullMark: 100 },
    { subject: 'Technical', score: artist.scores.technical, fullMark: 100 },
    { subject: 'Live Energy', score: artist.scores.livePerformance, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 space-y-8">
      {/* Back and Close Header Navigation */}
      <PageHeaderNav 
        title={artist.stageName} 
        parentLabel="ARTISTS DIRECTORY" 
        parentRoute="/artists" 
      />

      {/* Special Candidate Advisory Notice */}
      {isCandidate && (
        <div className="p-4 sm:p-5 rounded-2xl bg-yellow-950/40 border border-yellow-500/40 flex items-start gap-3 text-xs text-yellow-200">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-yellow-300 uppercase tracking-wider font-mono">Special Candidate / Identity Verification Notice</h4>
            <p className="text-zinc-300 leading-relaxed">
              This entity profile is designated as an independent candidate undergoing identity review. Curators are currently verifying track attribution, alias disambiguation, and streaming threshold metrics.
            </p>
          </div>
        </div>
      )}

      {/* Hero Banner with Realistic Cover Photo */}
      <div className="relative rounded-3xl overflow-hidden border border-[#1e263c] bg-[#0e121d] shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={artist.coverImage || artist.image}
            alt={artist.stageName}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e121d] via-[#0e121d]/60 to-transparent"></div>
        </div>

        {/* Floating Artist Profile Avatar & Header Info */}
        <div className="p-6 sm:p-10 -mt-24 sm:-mt-28 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <img
              src={artist.image}
              alt={artist.stageName}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-[#0e121d] shadow-2xl shrink-0 bg-slate-900"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
                  {artist.region} REGION • {artist.yearsActive}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" /> {artist.popularity}% POWER SCORE
                </span>
                {isVerified100k && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100K+ YOUTUBE VERIFIED
                  </span>
                )}
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white flex items-center gap-2">
                {artist.stageName}
                {artist.verified && (
                  <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs text-black font-black" title="Verified DHH Profile">
                    ✓
                  </span>
                )}
              </h1>

              <p className="text-sm font-mono text-slate-300">
                {artist.name} {artist.alias && artist.alias.length > 0 && `(aka ${artist.alias.join(', ')})`}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {artist.city}, {artist.state}
                </span>
                {artist.primaryRole && (
                  <span className="font-mono text-slate-300 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                    Role: {artist.primaryRole}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {artistSongs.length > 0 && (
              <button
                onClick={handlePlayAnthem}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-black" />
                Play Master Anthem
              </button>
            )}

            <button
              onClick={() => toggleFavoriteArtist(artist.id)}
              className={`px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
                isFavorited
                  ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                  : 'bg-[#141a29] border-[#222c45] text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
              {isFavorited ? 'Following' : 'Follow Artist'}
            </button>

            <Link
              to={`/compare?artistA=${artist.id}`}
              className="px-5 py-2.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors"
            >
              <GitCompare className="w-4 h-4 text-cyan-400" />
              Compare DNA
            </Link>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      {artist.categories && artist.categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {artist.categories.map((cat) => {
            const conf = CATEGORY_TAGS[cat] || { label: cat, color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
            return (
              <span
                key={cat}
                className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold uppercase tracking-wider ${conf.color}`}
              >
                {conf.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Main Grid: Left Bio & Style / Right Skill Radar & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quote Block */}
          {artist.quote && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/20 to-orange-950/20 border border-amber-500/30 flex items-start gap-3">
              <Quote className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <p className="text-sm font-medium italic text-slate-200 leading-relaxed">
                "{artist.quote}"
              </p>
            </div>
          )}

          {/* Biography */}
          <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] space-y-3 shadow-lg">
            <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Biography & Underground Origin
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {artist.bio}
            </p>
          </div>

          {/* Signature Style & Sonic DNA */}
          <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] space-y-4 shadow-lg">
            <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-amber-400" /> Signature Flow & Sonic DNA
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {artist.signatureStyle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1b2336] text-xs">
              <div>
                <span className="font-mono text-slate-500 uppercase">Primary Language</span>
                <p className="font-bold text-slate-200 mt-0.5">{artist.primaryLanguage}</p>
              </div>
              <div>
                <span className="font-mono text-slate-500 uppercase">Multilingual Flows</span>
                <p className="font-bold text-slate-200 mt-0.5">{artist.languages.join(', ')}</p>
              </div>
              <div>
                <span className="font-mono text-slate-500 uppercase">Key Influences</span>
                <p className="font-bold text-slate-200 mt-0.5">{artist.influences.join(', ')}</p>
              </div>
              <div>
                <span className="font-mono text-slate-500 uppercase">Frequent Collaborators</span>
                <p className="font-bold text-slate-200 mt-0.5">{artist.collaborators.join(', ')}</p>
              </div>
              {artist.producerCredits && artist.producerCredits.length > 0 && (
                <div className="sm:col-span-2">
                  <span className="font-mono text-slate-500 uppercase">Production Discography</span>
                  <p className="font-bold text-amber-300 mt-0.5">{artist.producerCredits.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Awards & Critical Acclaim */}
          {artist.awards && artist.awards.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] space-y-3 shadow-lg">
              <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Awards & Cultural Accolades
              </h3>
              <ul className="space-y-2">
                {artist.awards.map((award, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Verification Dossier & Skill Radar Chart (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Official Verification Card */}
          {artist.verification && (
            <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading font-bold text-base text-white">100K+ Streaming Verification</h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  artist.verification.status === 'VERIFIED'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                  {artist.verification.status}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Platform:</span>
                  <span className="text-white font-bold">{artist.verification.verificationPlatform}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Anchor Release:</span>
                  <span className="text-amber-300 font-bold">{artist.verification.verificationSong}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Documented Views:</span>
                  <span className="text-emerald-400 font-bold">{artist.verification.verifiedViewCount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Verification Source:</span>
                  <span className="text-zinc-300">{artist.verification.verificationSource}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Audit Date:</span>
                  <span className="text-zinc-300">{artist.verification.verificationDate}</span>
                </div>
              </div>

              {artist.verification.verificationUrl && (
                <a
                  href={artist.verification.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  View Verified Video on YouTube
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Radar Chart */}
          <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] shadow-lg space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase text-amber-400 font-bold">ARTIST ATTRIBUTE RADAR</span>
                <span className="text-slate-400">Verified Matrix</span>
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white mt-1">
                Technical Rap Matrix
              </h3>
            </div>

            {/* Recharts Radar Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e263c" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                  <Radar
                    name={artist.stageName}
                    dataKey="score"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Explicit Score Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1b2336] text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#131826] border border-[#1e263c]">
                <span className="text-slate-400">Lyricism</span>
                <p className="text-base font-bold text-white">{artist.scores.lyrical}/100</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#131826] border border-[#1e263c]">
                <span className="text-slate-400">Flow</span>
                <p className="text-base font-bold text-amber-400">{artist.scores.flow}/100</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#131826] border border-[#1e263c]">
                <span className="text-slate-400">Delivery</span>
                <p className="text-base font-bold text-orange-400">{artist.scores.delivery}/100</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#131826] border border-[#1e263c]">
                <span className="text-slate-400">Storytelling</span>
                <p className="text-base font-bold text-cyan-400">{artist.scores.storytelling}/100</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono text-center">
              *Editorial metrics curated by Desi Hip-Hop Analysts.
            </p>
          </div>

          {/* Social & Streaming Links */}
          <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1b2336] shadow-lg space-y-3">
            <h3 className="font-heading font-bold text-base text-white">External Profiles & Streaming</h3>
            <div className="flex flex-col gap-2 text-xs">
              {artist.spotifyUrl && (
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-emerald-400 font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Music2 className="w-4 h-4" /> Spotify Discography
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              )}

              {artist.youtubeUrl && (
                <a
                  href={artist.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-red-400 font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" /> Official YouTube Channel
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              )}

              {artist.instagramUrl && (
                <a
                  href={artist.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#141a29] hover:bg-[#1c2438] border border-[#222c45] text-pink-400 font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" /> Instagram Handle
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Songs — Spotify Powered */}
      <ArtistTopSongsSection artist={artist} />

      {/* Discography & Essential Anthems */}
      <div className="space-y-6 pt-6 border-t border-[#1b2336]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
            <Disc3 className="w-4 h-4" /> DISCOGRAPHY & MASTER TRACKS
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Essential Tracks by {artist.stageName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {artistSongs.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};


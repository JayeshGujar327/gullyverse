import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Mic2, MapPin, Sparkles, SlidersHorizontal, ArrowUpDown, ShieldCheck, HelpCircle, Layers, CheckCircle2, UserCheck } from 'lucide-react';
import { ARTISTS, ALL_ARTISTS } from '../data/artists';
import { ArtistCard } from '../components/artists/ArtistCard';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Genre, ArtistCategory, PrimaryRole } from '../types';

export const ArtistsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [only100kVerified, setOnly100kVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'lyrical' | 'flow' | 'name'>('popularity');

  // Extract unique filter items
  const cities = useMemo(() => ['ALL', ...Array.from(new Set(ALL_ARTISTS.map((a) => a.city)))].sort(), []);
  const genres = useMemo(() => {
    const set = new Set<string>();
    ALL_ARTISTS.forEach((a) => a.genres.forEach((g) => set.add(g)));
    return ['ALL', ...Array.from(set)].sort();
  }, []);
  const languages = useMemo(() => {
    const set = new Set<string>();
    ALL_ARTISTS.forEach((a) => a.languages.forEach((l) => set.add(l)));
    return ['ALL', ...Array.from(set)].sort();
  }, []);

  const categoryTabs = [
    { id: 'ALL', label: 'All Catalog', count: ALL_ARTISTS.length },
    { id: 'MAINSTREAM', label: 'Mainstream Titans', count: ALL_ARTISTS.filter(a => a.categories?.includes('MAINSTREAM')).length },
    { id: 'NEW_WAVE', label: 'New Wave & Alt', count: ALL_ARTISTS.filter(a => a.categories?.includes('NEW_WAVE')).length },
    { id: 'SOUTH_INDIAN', label: 'South Regional', count: ALL_ARTISTS.filter(a => a.categories?.includes('SOUTH_INDIAN')).length },
    { id: 'PUNJABI', label: 'Punjabi & Desi', count: ALL_ARTISTS.filter(a => a.categories?.includes('PUNJABI')).length },
    { id: 'UNDERGROUND', label: 'Underground & Cypher', count: ALL_ARTISTS.filter(a => a.categories?.includes('UNDERGROUND')).length },
    { id: 'PRODUCER', label: 'Producers & Beatmakers', count: ALL_ARTISTS.filter(a => a.primaryRole === 'PRODUCER' || a.categories?.includes('PRODUCER')).length },
    { id: 'SPECIAL_CANDIDATE', label: 'Special Candidates', count: ALL_ARTISTS.filter(a => a.categories?.includes('SPECIAL_CANDIDATE')).length },
  ];

  const filteredArtists = useMemo(() => {
    return ALL_ARTISTS.filter((artist) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        artist.stageName.toLowerCase().includes(q) ||
        artist.name.toLowerCase().includes(q) ||
        (artist.alias && artist.alias.some(al => al.toLowerCase().includes(q))) ||
        artist.city.toLowerCase().includes(q) ||
        artist.state.toLowerCase().includes(q) ||
        artist.genres.some(g => g.toLowerCase().includes(q));

      const matchCategory =
        selectedCategory === 'ALL' ||
        artist.categories?.includes(selectedCategory as ArtistCategory) ||
        (selectedCategory === 'PRODUCER' && (artist.primaryRole === 'PRODUCER' || artist.primaryRole === 'RAPPER_PRODUCER'));

      const matchRole =
        selectedRole === 'ALL' ||
        artist.primaryRole === selectedRole;

      const match100k =
        !only100kVerified ||
        artist.verified100kPlus === true ||
        artist.verification?.verified100kPlus === true;

      const matchCity = selectedCity === 'ALL' || artist.city === selectedCity;
      const matchGenre = selectedGenre === 'ALL' || artist.genres.includes(selectedGenre as Genre);
      const matchLang = selectedLanguage === 'ALL' || artist.languages.includes(selectedLanguage);

      return matchSearch && matchCategory && matchRole && match100k && matchCity && matchGenre && matchLang;
    }).sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'lyrical') return b.scores.lyrical - a.scores.lyrical;
      if (sortBy === 'flow') return b.scores.flow - a.scores.flow;
      return a.stageName.localeCompare(b.stageName);
    });
  }, [searchQuery, selectedCategory, selectedRole, only100kVerified, selectedCity, selectedGenre, selectedLanguage, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Artists Directory" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
          <Mic2 className="w-4 h-4" /> COMPREHENSIVE DHH ROSTER • 6-TIER ARCHITECTURE
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          INDIAN HIP-HOP ARTISTS
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-3xl">
          Explore the official archive of Desi Hip-Hop artists spanning Mainstream Titans, New Wave innovators, South Indian regional forces, Punjabi rap powerhouses, Underground cyphers, and Special Verification candidates.
        </p>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20'
                  : 'bg-[#111116] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by stage name, alias (e.g. TBSM, Ruab), real name, or city..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* 100k+ YouTube Toggle */}
          <button
            onClick={() => setOnly100kVerified(!only100kVerified)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-colors whitespace-nowrap ${
              only100kVerified
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-zinc-900 border-zinc-700/80 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100K+ YOUTUBE VERIFIED</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popularity' | 'lyrical' | 'flow' | 'name')}
              className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="popularity">Popularity / Impact</option>
              <option value="lyrical">Lyrical Score</option>
              <option value="flow">Flow Velocity</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-zinc-800/80">
          {/* Primary Role Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase">Primary Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200"
            >
              <option value="ALL">All Creative Roles</option>
              <option value="RAPPER">Rapper / MC</option>
              <option value="PRODUCER">Producer / Beatmaker</option>
              <option value="RAPPER_PRODUCER">Rapper & Producer</option>
              <option value="RAPPER_SINGER">Rapper & Vocalist</option>
              <option value="GROUP">Crew / Group</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase">City / State</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase">Genre Style</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200"
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>SHOWING {filteredArtists.length} OF {ALL_ARTISTS.length} ARTISTS</span>
        {(selectedCategory !== 'ALL' || selectedRole !== 'ALL' || selectedCity !== 'ALL' || selectedGenre !== 'ALL' || selectedLanguage !== 'ALL' || only100kVerified || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedRole('ALL');
              setSelectedCity('ALL');
              setSelectedGenre('ALL');
              setSelectedLanguage('ALL');
              setOnly100kVerified(false);
              setSearchQuery('');
            }}
            className="text-amber-400 hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Artists Grid */}
      {filteredArtists.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
          <p className="text-zinc-300 font-bold">No artists match the selected filters.</p>
          <p className="text-xs text-zinc-500">Try switching categories or clearing search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
};


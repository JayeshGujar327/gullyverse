import { Artist, ArtistCategory, PrimaryRole } from '../../types';
import { MAINSTREAM_ARTISTS } from './mainstream';
import { NEW_WAVE_ARTISTS } from './newWave';
import { SOUTH_REGIONAL_ARTISTS } from './southRegional';
import { PUNJABI_DESI_ARTISTS } from './punjabiDesi';
import { UNDERGROUND_ARTISTS } from './underground';
import { SPECIAL_CANDIDATES } from './specialCandidates';

export {
  MAINSTREAM_ARTISTS,
  NEW_WAVE_ARTISTS,
  SOUTH_REGIONAL_ARTISTS,
  PUNJABI_DESI_ARTISTS,
  UNDERGROUND_ARTISTS,
  SPECIAL_CANDIDATES
};

// Master collection of all artists with duplicates deduplicated by id
const combined = [
  ...MAINSTREAM_ARTISTS,
  ...NEW_WAVE_ARTISTS,
  ...SOUTH_REGIONAL_ARTISTS,
  ...PUNJABI_DESI_ARTISTS,
  ...UNDERGROUND_ARTISTS,
  ...SPECIAL_CANDIDATES
];

const seenIds = new Set<string>();
export const ALL_ARTISTS: Artist[] = combined.filter(artist => {
  if (seenIds.has(artist.id)) {
    return false;
  }
  seenIds.add(artist.id);
  return true;
});

// Alias for backward compatibility
export const ARTISTS: Artist[] = ALL_ARTISTS;

// Utility Lookups
export const getArtistById = (id: string): Artist | undefined => {
  return ALL_ARTISTS.find(a => a.id === id || a.slug === id);
};

export const getArtistBySlug = (slug: string): Artist | undefined => {
  return ALL_ARTISTS.find(a => a.slug === slug || a.id === slug);
};

export const getArtistsByCategory = (category: ArtistCategory): Artist[] => {
  return ALL_ARTISTS.filter(a => a.categories?.includes(category));
};

export const getArtistsByRole = (role: PrimaryRole): Artist[] => {
  return ALL_ARTISTS.filter(a => a.primaryRole === role);
};

export const getVerified100kArtists = (): Artist[] => {
  return ALL_ARTISTS.filter(a => a.verified100kPlus || a.verification?.verified100kPlus);
};

export const getSpecialCandidates = (): Artist[] => {
  return SPECIAL_CANDIDATES;
};


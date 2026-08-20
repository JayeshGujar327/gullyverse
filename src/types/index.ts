export type Role = 'USER' | 'ARTIST' | 'EDITOR' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';

export type ArtistCategory = 
  | 'ALL'
  | 'MAINSTREAM'
  | 'NEW_WAVE'
  | 'UNDERGROUND'
  | 'RISING'
  | 'LEGEND'
  | 'PIONEER'
  | 'GULLY_RAP'
  | 'BATTLE_RAP'
  | 'CONSCIOUS_RAP'
  | 'COMMERCIAL_RAP'
  | 'REGIONAL'
  | 'PUNJABI'
  | 'SOUTH_INDIAN'
  | 'FEMALE_ARTIST'
  | 'PRODUCER'
  | 'RAPPER_PRODUCER'
  | 'GLOBAL'
  | 'CULT'
  | 'SCENE_ARTIST'
  | 'GROUP'
  | 'SPECIAL_CANDIDATE'
  | 'IDENTITY_VERIFICATION_REQUIRED'
  | 'VERIFIED_100K';

export type PrimaryRole = 
  | 'RAPPER'
  | 'SINGER'
  | 'ARTIST'
  | 'PRODUCER'
  | 'RAPPER_SINGER'
  | 'RAPPER_PRODUCER'
  | 'GROUP'
  | 'UNKNOWN';

export type VerificationStatus = 
  | 'VERIFIED' 
  | 'PARTIALLY_VERIFIED' 
  | 'PENDING'
  | 'PENDING_VERIFICATION' 
  | 'IDENTITY_VERIFICATION_REQUIRED' 
  | 'UNVERIFIED';

export interface ArtistVerification {
  verified100kPlus?: boolean;
  verificationPlatform?: 'YouTube' | 'Spotify' | 'Apple Music' | 'JioSaavn' | 'Multiple' | 'Unknown';
  verificationSong?: string;
  verificationUrl?: string;
  verifiedViewCount?: string | number;
  verificationDate?: string;
  verificationSource?: string;
  status: VerificationStatus;
  notes?: string;
  lastVerifiedAt?: string;
}

export type Genre = 
  | 'Gully Rap'
  | 'Boom Bap'
  | 'Trap'
  | 'Drill'
  | 'Conscious Rap'
  | 'Hardcore Rap'
  | 'Commercial Rap'
  | 'Lo-fi Hip-Hop'
  | 'Alternative Hip-Hop'
  | 'Experimental Hip-Hop'
  | 'Punjabi Rap'
  | 'Desi Hip-Hop'
  | 'Regional Hip-Hop'
  | 'Classical Fusion'
  | 'Rap Rock'
  | 'Satirical Rap'
  | 'Storytelling'
  | 'Southern Hip-Hop'
  | 'Poetic Hip-Hop'
  | 'Electronic'
  | 'Tamil Rap'
  | 'Malayalam Rap'
  | 'Kannada Rap'
  | 'Marathi Rap'
  | 'Bengali Rap'
  | 'Club Rap'
  | 'Battle Rap'
  | 'Folk Rap'
  | 'R&B'
  | 'Emo Rap'
  | 'Freestyle Rap'
  | 'Sufi Hip-Hop'
  | 'Underground Rap'
  | 'Comedy Rap'
  | (string & {});


export type Mood =
  | 'HYPE'
  | 'CHILL'
  | 'EMOTIONAL'
  | 'CONSCIOUS'
  | 'STREET'
  | 'HUSTLE'
  | 'NIGHT'
  | 'AGGRESSIVE';

export interface ArtistSkillScores {
  lyrical: number;
  flow: number;
  delivery: number;
  storytelling: number;
  technical: number;
  livePerformance: number;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  stageName: string;
  alias?: string[];
  city: string;
  state: string;
  region: string;
  primaryLanguage: string;
  languages: string[];
  genres: Genre[];
  categories: ArtistCategory[];
  primaryRole?: PrimaryRole;
  yearsActive: string;
  bio: string;
  shortBio?: string;
  signatureStyle: string;
  influences: string[];
  awards?: string[];
  scores: ArtistSkillScores;
  verified: boolean;
  popularity: number; // 1-100
  image: string;
  imageUrl?: string;
  coverImage?: string;
  coverImageUrl?: string;
  tier?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  topSongs?: string[]; // Song IDs or Titles
  collaborators: string[]; // Artist names/IDs
  producerCredits?: string[];
  quote?: string;
  verification?: ArtistVerification;
  verified100kPlus?: boolean;
  isGroup?: boolean;
  southAsianScene?: boolean;
}

export type SelectionType = 
  | 'POPULAR'
  | 'MOST_STREAMED'
  | 'BREAKTHROUGH'
  | 'EDITOR_PICK'
  | 'FEATURED';

export type SpotifyMatchStatus = 
  | 'VERIFIED'
  | 'LIKELY_MATCH'
  | 'NEEDS_REVIEW'
  | 'NOT_FOUND';

export type SpotifyPlayerStatus =
  | 'IDLE'
  | 'LOADING'
  | 'PLAYING'
  | 'PAUSED'
  | 'ERROR'
  | 'UNAVAILABLE'
  | 'OPEN_SPOTIFY';

export type SourceType =
  | 'Spotify'
  | 'YouTube Official'
  | 'Apple Music'
  | 'Artist Website'
  | 'Label'
  | 'Official Social';

export interface Song {
  id: string;
  title: string;
  slug?: string;
  artistId: string;
  artistName: string;
  featuredArtists?: string[];
  albumId?: string;
  albumTitle?: string;
  album?: string;
  releaseYear: number;
  releaseDate?: string;
  genre: Genre;
  language: string;
  producer: string;
  bpm: number;
  duration: string; // e.g. "3:42"
  durationMs?: number;
  mood: Mood;
  isUnderground: boolean;
  isExplicit?: boolean;
  coverArt: string;
  coverImageUrl?: string;
  audioUrl?: string;
  localAudioPath?: string;
  audioSourceType?: 'master' | 'local' | 'youtube';
  description?: string;
  youtubeId?: string; // for embedding
  youtubeUrl?: string;
  spotifyTrackId?: string;
  spotifyUri?: string; // e.g. "spotify:track:4L1XoN2k1J9W5T3r8L5P1k"
  spotifyUrl?: string; // e.g. "https://open.spotify.com/track/4L1XoN2k1J9W5T3r8L5P1k"
  appleMusicUrl?: string;
  audioPreviewTone?: string;
  audioSynthesizerPattern?: string;
  lyricsSnippet?: string;
  iconicBars?: string;
  selectionType?: SelectionType;
  displayOrder?: number;
  spotifyMatchStatus?: SpotifyMatchStatus;
  sourceType?: SourceType;
  sourceUrl?: string;
  sourceName?: string;
  lastVerifiedAt?: string;
  editorialNote?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArtistSong {
  id: string;
  artistId: string;
  songId: string;
  role: 'PRIMARY' | 'FEATURED' | 'PRODUCER' | 'COLLABORATOR';
  isFeaturedSong: boolean;
  displayOrder: number; // 1, 2, 3, 4, 5
  selectionType: SelectionType;
  editorialNote?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseYear: number;
  genre: Genre;
  coverArt: string;
  trackCount: number;
  duration: string;
  tracks: string[];
  description: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface RegionalScene {
  id: string;
  city: string;
  state: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  primaryLanguages: string[];
  keyArtists: string[];
  iconicAnthems: string[];
  sceneHistory: string;
  localSlang: { term: string; meaning: string }[];
  soundSignature: string;
  keyVenues: string[];
  establishedYear: string;
}

export interface HistoryEra {
  id: string;
  era?: string;
  timeframe?: string;
  years: string;
  title: string;
  tagline?: string;
  summary: string;
  description?: string;
  keyPioneers: string[];
  keyDevelopments: string[];
  definingTracks: string[];
  pivotalReleases?: string[];
  culturalImpact?: string;
  iconicMoments?: string[];
}

export interface IconicMoment {
  id: string;
  year: number;
  dateStr?: string;
  title: string;
  artists?: string[];
  category?: string;
  description: string;
  impact: string;
  mediaUrl?: string;
  mediaType?: 'youtube' | 'article' | 'video';
  tags?: string[];
}

export interface Cypher {
  id: string;
  title: string;
  year: number;
  city: string;
  duration: string;
  artists: string[];
  producer: string;
  beatProducer?: string;
  location: string;
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  description?: string;
  significance: string;
  culturalSignificance?: string;
  language: string;
}

export interface RapBattle {
  id: string;
  event: string;
  year: number;
  city: string;
  mc1: string;
  mc2: string;
  rapperA?: string;
  rapperB?: string;
  winner?: string;
  rounds?: number;
  youtubeId?: string;
  context: string;
  keyHighlights?: string;
}

export interface DissTrackEvent {
  id: string;
  feud: string;
  feudTitle?: string;
  year: string;
  status: string;
  summary: string;
  narrative?: string;
  artistsInvolved?: string[];
  tracks: {
    title: string;
    rapper: string;
    trackTitle?: string;
    artist?: string;
    target?: string;
    date?: string;
    keyPunchline?: string;
    context?: string;
    link?: string;
  }[];
}

export interface VerseHighlight {
  id: string;
  song: string;
  artist: string;
  songTitle?: string;
  category: string;
  verseText: string;
  verseExcerpt?: string;
  breakdown: string;
  explanation?: string;
  timestamp?: string;
  youtubeId?: string;
}

export interface Producer {
  id: string;
  name: string;
  stageName: string;
  city: string;
  activeSince: string;
  signatureTag: string;
  soundStyle: string;
  style?: string;
  genres: Genre[];
  signatureSound?: string;
  keyBeats: string[];
  frequentCollaborators: string[];
  topProductions?: string[];
  artistsWorkedWith?: string[];
  image: string;
  bio: string;
  socials?: {
    instagram?: string;
    spotify?: string;
  };
}

export interface LabelCollective {
  id: string;
  name: string;
  city: string;
  foundedYear: number;
  founders: string[];
  keyRoster: string[];
  notableReleases: string[];
  description: string;
  bio?: string;
  image?: string;
}

export interface HipHopTerm {
  id: string;
  term: string;
  category: 'Structure' | 'Rhyme & Flow' | 'Production' | 'Culture & Street' | 'Battle';
  definition: string;
  simpleExplanation: string;
  hindiExample?: string;
  desiRapExample: string;
  relatedTerms: string[];
}

export interface FlowType {
  id: string;
  name: string;
  bpmRecommended?: number;
  bpm?: number;
  timeDivision?: string;
  description: string;
  patternVisual: string[];
  famousExample: { artist: string; song: string; bar: string };
  audioBeepPattern?: number[];
}

export interface SongDnaSection {
  name: string;
  bars?: string;
  typicalLength?: string;
  purpose: string;
  energyLevel?: number;
  writingStyle?: string;
  productionLayer?: string;
  proTip?: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  questions: QuizQuestionItem[];
}

export interface UserPlaylist {
  id: string;
  name: string;
  description: string;
  coverArt?: string;
  createdBy: string;
  songIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface ArtistSubmission {
  id: string;
  artistName: string;
  stageName: string;
  city: string;
  state: string;
  language: string;
  genre: Genre;
  bio: string;
  topSongTitle: string;
  streamingLink: string;
  instagramUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  submittedBy: string;
}

export interface AwardNominee {
  name: string;
  work: string;
  votePercentage: number;
}

export interface AwardCategory {
  id: string;
  category: string;
  categoryName?: string;
  year: number;
  totalVotes: number;
  nominees: AwardNominee[];
}

export interface HipHopEvent {
  id: string;
  title: string;
  type: 'Festival' | 'Tour' | 'Battle League' | 'Club Jam' | 'Showcase';
  city: string;
  venue: string;
  date: string;
  artists: string[];
  status: 'UPCOMING' | 'PAST';
  ticketUrl?: string;
  image: string;
  description: string;
}


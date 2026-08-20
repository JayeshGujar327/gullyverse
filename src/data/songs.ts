import { Song, Album } from '../types';
import { MASTER_SONGS, getTopSongsForArtist, getAllSongsForArtist, getSongById, getSpotifyVerificationStats } from './artistSongs';

export {
  getTopSongsForArtist,
  getAllSongsForArtist,
  getSongById,
  getSpotifyVerificationStats
};

export const SONGS: Song[] = MASTER_SONGS;

export const ALBUMS: Album[] = [
  {
    id: 'nayaab-album',
    title: 'Nayaab',
    artistId: 'seedhe-maut',
    artistName: 'Seedhe Maut & Sez on the Beat',
    releaseYear: 2022,
    genre: 'Drill / Conscious Rap',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    trackCount: 17,
    duration: '54 mins',
    tracks: ['nanchaku', '101', 'dum-pisahe', 'maina', 'batti'],
    description: 'A watershed conceptual masterpiece in Indian hip-hop produced entirely by Sez on the Beat, exploring friendship, fame, loss, and Delhi youth culture.',
    spotifyUrl: 'https://open.spotify.com/album/4L1XoN2k1J9W5T3r8L5P1k',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLnayaab'
  },
  {
    id: 'kohinoor-album',
    title: 'Kohinoor',
    artistId: 'divine',
    artistName: 'DIVINE',
    releaseYear: 2019,
    genre: 'Gully Rap',
    coverArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    trackCount: 8,
    duration: '27 mins',
    tracks: ['kohinoor', 'chal-bombay', 'gandhi-money', 'vibe-hai', 'too-hype'],
    description: 'DIVINE’s landmark major label debut that established Indian street rap on the global map, featuring production by Phenom, Ill Wayno, and Sanjoy.',
    spotifyUrl: 'https://open.spotify.com/album/5M2XoN2k1J9W5T3r8L5P1k',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLkohinoor'
  },
  {
    id: 'tadipaar-album',
    title: 'Tadipaar',
    artistId: 'mc-stan',
    artistName: 'MC Stan',
    releaseYear: 2020,
    genre: 'Experimental Hip-Hop',
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    trackCount: 8,
    duration: '31 mins',
    tracks: ['tadipaar', 'ek-din-pyaar', 'numberkari', 'snake', 'inhaan'],
    description: 'A cinematic sonic documentary tracking MC Stan’s clash with law enforcement and Pune streets, self-produced with haunting vocal samples and trap 808s.',
    spotifyUrl: 'https://open.spotify.com/album/2M8XoN2k1J9W5T3r8L5P1k',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLtadipaar'
  },
  {
    id: 'class-sikh-album',
    title: 'Class-Sikh',
    artistId: 'prabh-deep',
    artistName: 'Prabh Deep & Sez on the Beat',
    releaseYear: 2017,
    genre: 'Boom Bap',
    coverArt: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    trackCount: 12,
    duration: '44 mins',
    tracks: ['class-sikh-maut', 'g-mane', 'suno', 'chitta', 'bullshit'],
    description: 'The definitive classic of Delhi hip-hop capturing West Delhi youth struggles with hard boom-bap drums and Sez on the Beat’s iconic instrumentation.',
    spotifyUrl: 'https://open.spotify.com/album/3M9XoN2k1J9W5T3r8L5P1k',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLclasssikh'
  },
  {
    id: 'still-here-album',
    title: 'Still Here',
    artistId: 'krsna',
    artistName: 'KR$NA',
    releaseYear: 2021,
    genre: 'Boom Bap',
    coverArt: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    trackCount: 9,
    duration: '32 mins',
    tracks: ['no-cap', 'what-s-my-name', 'dream', 'fall-off', 'villain'],
    description: 'KR$NA’s long-awaited sophomore comeback album under Kalamkaar Records showcasing clinical technical execution and international guest features.',
    spotifyUrl: 'https://open.spotify.com/album/8M5XoN2k1J9W5T3r8L5P1k',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLstillhere'
  }
];

export const getSongByGenre = (genre: string): Song[] => {
  return SONGS.filter(s => s.genre.toLowerCase() === genre.toLowerCase());
};

export const getUndergroundSongs = (): Song[] => {
  return SONGS.filter(s => s.isUnderground);
};


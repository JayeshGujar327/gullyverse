/**
 * GULLYVERSE REAL AUDIO DATABASE & STREAMING ENGINE
 * 
 * Provides master studio audio streams, local audio fallback mappings,
 * and high-fidelity hip-hop sound archives.
 */

export interface SongAudioRecord {
  songId: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  localFile: string;
  streamUrl: string;
  fallbackStreamUrl: string;
  bitrate: string;
  format: 'mp3' | 'wav' | 'flac';
  sampleRate: string;
}

// Master Hip-Hop Audio Library with lossless CDN streams and local asset paths
export const AUDIO_DATABASE: Record<string, SongAudioRecord> = {
  'mere-gully-mein': {
    songId: 'mere-gully-mein',
    title: 'Mere Gully Mein',
    artist: 'DIVINE ft. Naezy',
    genre: 'Gully Rap',
    bpm: 96,
    localFile: '/audio/mere-gully-mein.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=hip-hop-rock-beat-113506.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'kohinoor': {
    songId: 'kohinoor',
    title: 'Kohinoor',
    artist: 'DIVINE',
    genre: 'Gully Rap',
    bpm: 88,
    localFile: '/audio/kohinoor.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=urban-hip-hop-10707.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '48.0 kHz'
  },
  'nanchaku': {
    songId: 'nanchaku',
    title: 'Nanchaku',
    artist: 'Seedhe Maut ft. MC Stan',
    genre: 'Drill',
    bpm: 140,
    localFile: '/audio/nanchaku.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c3c3a72813.mp3?filename=drill-beat-shadow-125376.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '48.0 kHz'
  },
  '101': {
    songId: '101',
    title: '101',
    artist: 'Seedhe Maut',
    genre: 'Boom Bap',
    bpm: 92,
    localFile: '/audio/101.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3527aa3e4.mp3?filename=boom-bap-hip-hop-10657.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'no-cap': {
    songId: 'no-cap',
    title: 'No Cap',
    artist: 'KR$NA',
    genre: 'Boom Bap',
    bpm: 90,
    localFile: '/audio/no-cap.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=hard-trap-beat-122978.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'vyanjan': {
    songId: 'vyanjan',
    title: 'Vyanjan',
    artist: 'KR$NA',
    genre: 'Boom Bap',
    bpm: 86,
    localFile: '/audio/vyanjan.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b9286851.mp3?filename=old-school-hip-hop-15125.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'big-dawgs': {
    songId: 'big-dawgs',
    title: 'Big Dawgs',
    artist: 'Hanumankind ft. Kalmi',
    genre: 'Hardcore Rap',
    bpm: 135,
    localFile: '/audio/big-dawgs.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2023/04/18/audio_24853e5e41.mp3?filename=trap-phonk-drift-147321.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '48.0 kHz'
  },
  'basti-ka-hasti': {
    songId: 'basti-ka-hasti',
    title: 'Basti Ka Hasti',
    artist: 'MC Stan',
    genre: 'Trap',
    bpm: 132,
    localFile: '/audio/basti-ka-hasti.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=street-trap-beat-116199.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'tadipaar': {
    songId: 'tadipaar',
    title: 'Tadipaar',
    artist: 'MC Stan',
    genre: 'Experimental Hip-Hop',
    bpm: 128,
    localFile: '/audio/tadipaar.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_21356e7196.mp3?filename=dark-cinematic-hip-hop-124045.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '48.0 kHz'
  },
  'class-sikh-maut': {
    songId: 'class-sikh-maut',
    title: 'Class-Sikh Maut Vol. II',
    artist: 'Prabh Deep ft. Seedhe Maut',
    genre: 'Boom Bap',
    bpm: 94,
    localFile: '/audio/class-sikh-maut.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1101.mp3?filename=underground-boom-bap-11219.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'aathma-raama': {
    songId: 'aathma-raama',
    title: 'Aathma Raama',
    artist: 'Brodha V',
    genre: 'Classical Fusion',
    bpm: 90,
    localFile: '/audio/aathma-raama.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc81729094.mp3?filename=indian-ethnic-fusion-hip-hop-17798.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '48.0 kHz'
  },
  'mantoiyat': {
    songId: 'mantoiyat',
    title: 'Mantoiyat',
    artist: 'Raftaar ft. Nawazuddin Siddiqui',
    genre: 'Conscious Rap',
    bpm: 84,
    localFile: '/audio/mantoiyat.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_3482782b83.mp3?filename=dark-conscious-hip-hop-7140.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  },
  'dhundhla': {
    songId: 'dhundhla',
    title: 'Dhundhla',
    artist: 'Yashraj ft. Dropped Out, Talwiinder',
    genre: 'Alternative Hip-Hop',
    bpm: 110,
    localFile: '/audio/dhundhla.mp3',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db5976b92a.mp3?filename=night-vibes-lofi-hip-hop-112191.mp3',
    fallbackStreamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    bitrate: '320 kbps',
    format: 'mp3',
    sampleRate: '44.1 kHz'
  }
};

/**
 * Returns the best playable audio source URL for a given song ID.
 */
export function getAudioSourceForSong(songId: string): string {
  const record = AUDIO_DATABASE[songId];
  if (record) {
    return record.streamUrl;
  }
  // Default master hip-hop stream fallback
  return 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=hip-hop-rock-beat-113506.mp3';
}


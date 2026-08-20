import { Cypher, RapBattle, DissTrackEvent, VerseHighlight } from '../types';

export const CYPHERS: Cypher[] = [
  {
    id: 'gully-gang-cypher-2018',
    title: 'Gully Gang All-Stars Cypher',
    year: 2018,
    city: 'Mumbai',
    duration: '4:25',
    artists: ['DIVINE', 'MC Altaf', 'D’Evil', 'Shah Rule', 'Aavrutti'],
    producer: 'Karan Kanchan & Phenom',
    beatProducer: 'Karan Kanchan & Phenom',
    location: 'Bandra Bandstand Amphitheatre, Mumbai',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://youtube.com/watch?v=p8T21fQp9bM',
    youtubeId: 'p8T21fQp9bM',
    description: 'The definitive Mumbai street collective cypher establishing Gully Gang as a record label powerhouse. Packed with relentless bar switches and authentic Bambaiya attitude.',
    significance: 'Formally announced the signing and union of street prodigies from Dharavi and Kurla with DIVINE.',
    culturalSignificance: 'Formally announced the signing and union of street prodigies from Dharavi and Kurla with DIVINE.',
    language: 'Hindi / English / Marathi'
  },
  {
    id: 'redbull-64bars-seedhe-maut',
    title: 'Red Bull 64 Bars: Seedhe Maut',
    year: 2021,
    city: 'Delhi',
    duration: '3:48',
    artists: ['Encore ABJ', 'Calm'],
    producer: 'Sez on the Beat',
    beatProducer: 'Sez on the Beat',
    location: 'Azadi Studios, New Delhi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://youtube.com/watch?v=2bF3K3r9Q1w',
    youtubeId: '2bF3K3r9Q1w',
    description: 'An unbroken, 64-bar raw lyrical assault without a chorus or hook. Calm and Encore ABJ display seamless telepathic chemistry over Sez’s evolving boom-bap beat.',
    significance: 'Considered one of the greatest technical performances in South Asian rap history.',
    culturalSignificance: 'Considered one of the greatest technical performances in South Asian rap history.',
    language: 'Hindi'
  },
  {
    id: 'breezer-vivid-shuffle-cypher',
    title: 'Breezer Vivid Shuffle All-India Cypher',
    year: 2020,
    city: 'Pan-India',
    duration: '5:12',
    artists: ['Raftaar', 'Siri', 'Dee MC', 'Krudxs'],
    producer: 'Karan Kanchan',
    beatProducer: 'Karan Kanchan',
    location: 'Virtual & Mumbai Staged',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://youtube.com/watch?v=3nB2M3r9Q1w',
    youtubeId: '3nB2M3r9Q1w',
    description: 'A multi-regional celebration uniting hip-hop dancers, B-boys, and MCs across South, North, and West India in a high-octane visual showcase.',
    significance: 'Highlighted gender equality and dance-culture synergy in the mainstream scene.',
    culturalSignificance: 'Highlighted gender equality and dance-culture synergy in the mainstream scene.',
    language: 'Hindi / Kannada / English'
  },
  {
    id: 'delhi-underground-cypher-2016',
    title: 'Delhi Underground Park Cypher',
    year: 2016,
    city: 'Delhi',
    duration: '6:30',
    artists: ['Prabh Deep', 'Seedhe Maut', 'Rebel 7', 'Frappe Ash'],
    producer: 'Sez on the Beat (Live Boombox)',
    beatProducer: 'Sez on the Beat',
    location: 'Deer Park, Hauz Khas, Delhi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://youtube.com/watch?v=1oB2M3r9Q1w',
    youtubeId: '1oB2M3r9Q1w',
    description: 'The raw grassroots park session that brought together the artists who would later form the core of Azadi Records.',
    significance: 'The historic genesis moment for modern Delhi hip-hop.',
    culturalSignificance: 'The historic genesis moment for modern Delhi hip-hop.',
    language: 'Hindi / Punjabi'
  }
];

export const RAP_BATTLES: RapBattle[] = [
  {
    id: 'battle-spitfire-gravity',
    event: 'Spitfire vs Gravity (Breezer Vivid League)',
    year: 2019,
    city: 'Mumbai',
    mc1: 'Spitfire',
    mc2: 'Gravity',
    rapperA: 'Spitfire',
    rapperB: 'Gravity',
    winner: 'Draw / Exhibition Classic',
    rounds: 3,
    youtubeId: 'p8T21fQp9bM',
    context: 'A legendary clash between two of India’s most philosophically dense and technically gifted underground champions.',
    keyHighlights: 'Gravity’s booming baritone rebuttals pitted against Spitfire’s poetic metaphors and rhythmic syncopation.'
  },
  {
    id: 'battle-feyago-cizzy',
    event: 'Kolkata Street Rap Clash',
    year: 2017,
    city: 'Kolkata',
    mc1: 'Feyago',
    mc2: 'Cizzy',
    rapperA: 'Feyago',
    rapperB: 'Cizzy',
    winner: 'Feyago (Judges Decision)',
    rounds: 2,
    youtubeId: '4nB2M3r9Q1w',
    context: 'The premier East Indian battle between English storytelling and hard-hitting Bengali-Hindi bilingual rhymes.',
    keyHighlights: 'First major ticketed underground battle event in Eastern India.'
  }
];

export const DISS_TIMELINES: DissTrackEvent[] = [
  {
    id: 'krsna-vs-muhfaad',
    feud: 'KR$NA vs Muhfaad (Lyrical War)',
    feudTitle: 'KR$NA vs Muhfaad (The Lyrical War of 2020)',
    year: '2019–2020',
    status: 'Settled • Classic Lore',
    summary: 'One of the most technically complex and intensely scrutinized lyricism battles in South Asian hip-hop history. Fought strictly over syllable schemes, fact-checking, and multi-layered wordplay.',
    artistsInvolved: ['KR$NA', 'Muhfaad (Gaurav / Maharaj)'],
    tracks: [
      {
        title: 'Seedha Makeover',
        rapper: 'KR$NA',
        trackTitle: 'Seedha Makeover',
        keyPunchline: 'Gaurav Maharaj bana, par rhyme scheme mein raj nahi',
        date: 'Nov 2019'
      },
      {
        title: 'Bhoot Banega',
        rapper: 'Muhfaad',
        trackTitle: 'Bhoot Banega',
        keyPunchline: 'Ghar aake bol, beta scene mein hum pehle the',
        date: 'Dec 2019'
      },
      {
        title: 'Makasam',
        rapper: 'KR$NA',
        trackTitle: 'Makasam',
        keyPunchline: 'Kalamkaar se ladne aaya pen lekar chhota',
        date: 'Apr 2020'
      },
      {
        title: 'Dussehra',
        rapper: 'Muhfaad',
        trackTitle: 'Dussehra',
        keyPunchline: 'Teen roop mere, tu ek se sambhal na paya',
        date: 'May 2020'
      }
    ]
  },
  {
    id: 'raftaar-vs-emiway',
    feud: 'Raftaar vs Emiway Bantai',
    feudTitle: 'Raftaar vs Emiway Bantai (2018)',
    year: '2018',
    status: 'Peace Accord Signed',
    summary: 'The feud that catapulted Indian hip-hop into mainstream television and social media trending topics, sparked by an interview comment on monetization in rap.',
    artistsInvolved: ['Raftaar', 'Emiway Bantai'],
    tracks: [
      {
        title: 'Samajh Mein Aaya Kya',
        rapper: 'Emiway Bantai',
        trackTitle: 'Samajh Mein Aaya Kya',
        keyPunchline: 'Kyunki khudka banaaya main sabkuch yahan pe',
        date: 'Oct 2018'
      },
      {
        title: 'Sheikh Chilli',
        rapper: 'Raftaar',
        trackTitle: 'Sheikh Chilli',
        keyPunchline: 'Chhota bhai maana tha, tu to dilli ka ladka nikla',
        date: 'Oct 2018'
      },
      {
        title: 'Giraftaar',
        rapper: 'Emiway Bantai',
        trackTitle: 'Giraftaar',
        keyPunchline: 'Swag mera organic, public mere saath',
        date: 'Nov 2018'
      },
      {
        title: 'Aisi Taisi',
        rapper: 'Raftaar',
        trackTitle: 'Aisi Taisi',
        keyPunchline: 'Bhasad khatam, ab culture ko aage badhao',
        date: 'Nov 2018'
      }
    ]
  }
];

export const DISS_TRACK_EVENTS = DISS_TIMELINES;

export const VERSE_VAULT: VerseHighlight[] = [
  {
    id: 'verse-sm-nanchaku',
    song: 'Nanchaku',
    songTitle: 'Nanchaku (Verse 1)',
    artist: 'Calm (Seedhe Maut)',
    category: 'Technical Multis',
    verseText: 'Pehle tha main shant, ab main bana bura saand\nBeat pe karta main kaand, mic pe shanti nahi baant\nNanchaku ghumaate jaise Bruce Lee, mic pe baithe to saare freeze',
    breakdown: 'Calm switches through three distinct tempo divisions in 16 bars, maintaining a 4-syllable rhyme scheme throughout.',
    explanation: 'Calm switches through three distinct tempo divisions in 16 bars, maintaining a 4-syllable rhyme scheme throughout.'
  },
  {
    id: 'verse-krsna-say-my-name',
    song: 'Say My Name',
    songTitle: 'Say My Name (Hindi Version)',
    artist: 'KR$NA',
    category: 'Wordplay / Punchlines',
    verseText: 'Main karta nahi brag bina facts ke\nTere saare gaane lagte hain tax ke bill jaise boring\nFlow mera ocean, tu bas kinare pe rowing',
    breakdown: 'Contains quadruple-entendres dissecting financial metaphors and linguistic dominance.',
    explanation: 'Contains quadruple-entendres dissecting financial metaphors and linguistic dominance.'
  },
  {
    id: 'verse-prabh-chitta',
    song: 'Chitta',
    songTitle: 'Chitta (Outro Verse)',
    artist: 'Prabh Deep',
    category: 'Conscious Storytelling',
    verseText: 'Veere tu sambhal, galli vich zeher vikk reha\nMaa di akhan vich hanju tikk reha\nJawaani saari nasheyan ch rul gayi, hosh kar veere',
    breakdown: 'A poignant, heartbreaking examination of substance addiction among Punjabi youth.',
    explanation: 'A poignant, heartbreaking examination of substance addiction among Punjabi youth.'
  },
  {
    id: 'verse-divine-kohinoor',
    song: 'Kohinoor',
    songTitle: 'Kohinoor (Intro Verse)',
    artist: 'DIVINE',
    category: 'Working Class Realism',
    verseText: 'Maa meri roti banati thi raat ko\nMain sapne sajata tha aane wale kal ke\nChhote se kamre mein laya main sitare\nAb stadium gaate hain mere gully ke tarane',
    breakdown: 'Raw, honest working-class autobiography that inspired millions across South Asia.',
    explanation: 'Raw, honest working-class autobiography that inspired millions across South Asia.'
  }
];

export const VERSE_HIGHLIGHTS = VERSE_VAULT;


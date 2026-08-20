import { Producer, LabelCollective } from '../types';

export const PRODUCERS: Producer[] = [
  {
    id: 'sez-on-the-beat',
    name: 'Sajeel Kapoor',
    stageName: 'Sez on the Beat',
    city: 'Delhi',
    activeSince: '2012',
    signatureTag: 'Sez on the beat boy!',
    soundStyle: 'Dusty Boom Bap, Cinematic Soul Chops, Dark Drill 808s',
    style: 'Dusty Boom Bap, Cinematic Soul Chops, Dark Drill 808s',
    genres: ['Boom Bap', 'Drill', 'Conscious Rap', 'Experimental Hip-Hop'],
    signatureSound: 'The iconic vocal tag "Sez on the beat boy", warm analog warmth, heavy rolling subs, and intricate sample layering.',
    keyBeats: ['Mere Gully Mein (Original)', 'Nayaab (Full Album)', 'Class-Sikh', 'Bayaan', '101'],
    frequentCollaborators: ['DIVINE', 'Seedhe Maut', 'Prabh Deep', 'KR$NA', 'Ahmer', 'Raftaar', 'Yungsta'],
    topProductions: ['Mere Gully Mein (Original Beat)', 'Nayaab (Full Album)', 'Class-Sikh (Full Album)', 'Bayaan (Full Album)', '101'],
    artistsWorkedWith: ['DIVINE', 'Seedhe Maut', 'Prabh Deep', 'KR$NA', 'Ahmer', 'Raftaar', 'Yungsta', 'Siri'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    bio: 'Widely revered as the godfather of Indian hip-hop production, Sez on the Beat crafted the foundational sound of Delhi and Mumbai rap, producing landmark albums like Class-Sikh, Bayaan, and Nayaab.'
  },
  {
    id: 'karan-kanchan',
    name: 'Karan Kanchan',
    stageName: 'Karan Kanchan',
    city: 'Mumbai',
    activeSince: '2016',
    signatureTag: 'Karan Kanchan on the beat!',
    soundStyle: 'High-energy Trap, Japanese Classical Sampling, Heavy Bass, Moshpit Bangers',
    style: 'High-energy Trap, Japanese Classical Sampling, Heavy Bass, Moshpit Bangers',
    genres: ['Trap', 'Hardcore Rap', 'Gully Rap', 'Electronic'],
    signatureSound: 'Japanese Koto / Shamisen strings fused with thunderous distorted 808s and aggressive brass drops.',
    keyBeats: ['Mirchi (DIVINE)', 'Satya (DIVINE)', 'Aana Nahi (Seedhe Maut)', 'Dum Pishaach'],
    frequentCollaborators: ['DIVINE', 'Seedhe Maut', 'Raftaar', 'Farhan Khan', 'Dee MC', 'Srushti Tawade'],
    topProductions: ['Mirchi (DIVINE)', 'Satya (DIVINE)', 'Aana Nahi (Seedhe Maut)', 'Dum Pishaach', 'Gully Gang Cyphers'],
    artistsWorkedWith: ['DIVINE', 'Seedhe Maut', 'Raftaar', 'Farhan Khan', 'Dee MC', 'Srushti Tawade'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    bio: 'A core producer for Gully Gang and pioneer of Japanese-trap fusion in India, Karan Kanchan is renowned for producing the most explosive festival and club moshpit tracks in DHH.'
  },
  {
    id: 'phenom',
    name: 'Pinaki Rattan',
    stageName: 'Phenom',
    city: 'Delhi / Mumbai',
    activeSince: '2015',
    signatureTag: 'Phenom the beat maker!',
    soundStyle: 'Stadium Anthems, Polished Trap, Latin & Reggaeton Infusions',
    style: 'Stadium Anthems, Polished Trap, Latin & Reggaeton Infusions',
    genres: ['Gully Rap', 'Commercial Rap', 'Trap'],
    signatureSound: 'Massive synth leads, crystal clean mixdowns, bouncy rhythmic swing.',
    keyBeats: ['Kohinoor', 'Chal Bombay', 'Gunehgar', 'Gandhi Money'],
    frequentCollaborators: ['DIVINE', 'King', 'Kalamkaar', 'Kavya'],
    topProductions: ['Kohinoor', 'Chal Bombay', 'Gunehgar', 'Gandhi Money'],
    artistsWorkedWith: ['DIVINE', 'King', 'Kalamkaar', 'Kavya'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bio: 'The sonic architect behind DIVINE’s global breakout record Kohinoor, crafting commercial chart-toppers with pristine international production values.'
  },
  {
    id: 'kalmi',
    name: 'Kalmi',
    stageName: 'Kalmi',
    city: 'Bengaluru / Kerala',
    activeSince: '2019',
    signatureTag: 'Kalmi on the 808s',
    soundStyle: 'Southern Bounce, Dirty South 808s, Memphis Trap Fusion',
    style: 'Southern Bounce, Dirty South 808s, Memphis Trap Fusion',
    genres: ['Trap', 'Boom Bap', 'Hardcore Rap'],
    signatureSound: 'Distorted slide 808s, haunting pitch-bent vocal chops, dark menacing cowbell melodies.',
    keyBeats: ['Big Dawgs (Hanumankind)', 'The Last Dance', 'Southside Banger'],
    frequentCollaborators: ['Hanumankind', 'Brodha V', 'Siri'],
    topProductions: ['Big Dawgs (Hanumankind)', 'The Last Dance', 'Southside Banger'],
    artistsWorkedWith: ['Hanumankind', 'Brodha V', 'Siri'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    bio: 'Produced the international Billboard smash "Big Dawgs", championing an uncompromising southern bounce sound tailored for high-energy rap.'
  }
];

export const RECORD_LABELS: LabelCollective[] = [
  {
    id: 'gully-gang',
    name: 'Gully Gang Entertainment',
    city: 'Mumbai',
    foundedYear: 2018,
    founders: ['DIVINE (Vivian Fernandes)'],
    keyRoster: ['DIVINE', 'MC Altaf', 'D’Evil', 'Shah Rule', 'Karan Kanchan', 'JD'],
    notableReleases: ['Kohinoor (Album)', 'Gunehgar (Album)', 'Gully Gang Cypher'],
    description: 'Founded by DIVINE, Gully Gang is Mumbai’s flagship street label providing infrastructure, production, and global distribution partnerships with Mass Appeal and Def Jam.',
    bio: 'Founded by DIVINE, Gully Gang is Mumbai’s flagship street label providing infrastructure, production, and global distribution partnerships with Mass Appeal and Def Jam.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'azadi-records',
    name: 'Azadi Records',
    city: 'Delhi',
    foundedYear: 2017,
    founders: ['Mo Joshi', 'Uday Kapur'],
    keyRoster: ['Seedhe Maut', 'Prabh Deep', 'Ahmer', 'Tienas', 'Sez on the Beat (Foundational)', 'Rebel 7'],
    notableReleases: ['Class-Sikh', 'Bayaan', 'Nayaab', 'Little Kid Big Dreams', 'Tabia'],
    description: 'An iconic Delhi independent powerhouse focused on long-form concept albums, artistic sovereignty, and sociopolitical narratives across South Asia.',
    bio: 'An iconic Delhi independent powerhouse focused on long-form concept albums, artistic sovereignty, and sociopolitical narratives across South Asia.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kalamkaar',
    name: 'Kalamkaar Music',
    city: 'Delhi / Gurugram',
    foundedYear: 2017,
    founders: ['Raftaar (Dilin Nair)', 'Ankit Khanna'],
    keyRoster: ['Raftaar', 'KR$NA', 'Karma', 'Deep Kalsi', 'Rashmeet Kaur', 'Yashwad'],
    notableReleases: ['Still Here (Album)', 'Mr. Nair (Album)', 'PRAA (EP)', 'Say My Name'],
    description: 'A powerhouse rap label founded by Raftaar and Ankit Khanna that nurtured premier technical lyricists, scoring chart-topping streaming hits.',
    bio: 'A powerhouse rap label founded by Raftaar and Ankit Khanna that nurtured premier technical lyricists, scoring chart-topping streaming hits.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80'
  }
];

export const LABELS_COLLECTIVES = RECORD_LABELS;


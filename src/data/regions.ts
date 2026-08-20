import { RegionalScene } from '../types';

export const REGIONAL_SCENES: RegionalScene[] = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    coordinates: [19.0760, 72.8777],
    primaryLanguages: ['Hindi', 'Bambaiya Hindi', 'Marathi', 'English'],
    keyArtists: ['DIVINE', 'Naezy', 'Gravity', 'Dee MC', 'MC Altaf', 'D’Evil', 'Yashraj', 'Tienas', '7Bantai’Z'],
    iconicAnthems: ['Mere Gully Mein', 'Kohinoor', 'Aafat', 'Chal Bombay', 'Asal G Hustle'],
    sceneHistory: 'The epicentre of Indian street rap. Emerged from cyphers at Bandra Carter Road, Dharavi, and JB Nagar. DIVINE and Naezy channeled authentic local street slang (Bambaiya) to transform the underground into a nationwide cultural phenomenon.',
    localSlang: [
      { term: 'Bantai / Bachha', meaning: 'Homie, friend, or younger kid from the neighborhood.' },
      { term: 'Kalti / Katle', meaning: 'Slip away, leave or escape the scene quickly.' },
      { term: 'Chava / Chavi', meaning: 'Boyfriend / Girlfriend.' },
      { term: 'Dhinchak', meaning: 'Flashy, loud, or over-the-top.' },
      { term: 'Khali Peeli', meaning: 'For no reason, without purpose.' }
    ],
    soundSignature: 'Heavy brass stabs, aggressive boom-bap syncopation, Bambaiya cadence, authentic street reality poetry.',
    keyVenues: ['antiSOCIAL Lower Parel', 'The Habitat Khar', 'Bandra Fort Amphitheatre', 'Dharavi Dream Project Studio'],
    establishedYear: '2011'
  },
  {
    id: 'delhi-ncr',
    city: 'Delhi-NCR',
    state: 'Delhi',
    region: 'North',
    coordinates: [28.6139, 77.2090],
    primaryLanguages: ['Hindi', 'Punjabi', 'Haryanvi', 'English'],
    keyArtists: ['Seedhe Maut', 'KR$NA', 'Raftaar', 'Prabh Deep', 'Fotty Seven', 'Rebel 7', 'Frappe Ash', 'Ahmer', 'Yungsta'],
    iconicAnthems: ['Nanchaku', '101', 'Class-Sikh Maut', 'No Cap', 'Boht Sahi', 'Gandi Aulaad'],
    sceneHistory: 'Delhi is the lyrical boiler room of Indian Hip-Hop. From West Delhi cyphers in Tilak Nagar and Janakpuri to the poetic revival in Hauz Khas, Delhi rap is known for technical rhyming, hyper-speed cadence shifts, drill energy, and raw socio-political grit.',
    localSlang: [
      { term: 'Baatcheet', meaning: 'Conversation, respect, status or mutual understanding.' },
      { term: 'Launde', meaning: 'The boys / crew members.' },
      { term: 'Bhasad', meaning: 'Chaos, fight, or intense commotion.' },
      { term: 'Tashan', meaning: 'Attitude, swagger, or pride.' },
      { term: 'Scene', meaning: 'The current hip-hop movement or happening spot.' }
    ],
    soundSignature: 'Sliding UK Drill 808s, dusty vinyl jazz samples, multi-syllabic rhyme structures, high-tempo dual flows.',
    keyVenues: ['Auro Kitchen & Bar', 'Summer House Cafe', 'Dear Donna', 'Saket Underground Spots'],
    establishedYear: '2008'
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    coordinates: [18.5204, 73.8567],
    primaryLanguages: ['Marathi', 'Hindi', 'Punekar Street Slang'],
    keyArtists: ['MC Stan', 'Sambata', 'Vijay DK', 'MC Gawthi', 'Finsta'],
    iconicAnthems: ['Basti Ka Hasti', 'Tadipaar', 'Insaan', 'Punekar Anthem', 'Kalti'],
    sceneHistory: 'Pune created its own distinct sonic world led by MC Stan and Marathi rap pioneers. Rooted in Tadiwala Road and local bastis, Pune hip-hop is characterized by raw autotune trap, self-produced 808 beats, and honest stories of street conflict.',
    localSlang: [
      { term: 'Haq Se', meaning: 'With full right, legitimately, without apology.' },
      { term: 'Yeda Bhau', meaning: 'Acting crazy or unpredictable friend.' },
      { term: 'Porgi', meaning: 'Girl in Marathi.' },
      { term: 'Tadipaar', meaning: 'Legally exiled/banished from city limits.' }
    ],
    soundSignature: 'Avant-garde mumble trap, hypnotic reversed synths, syncopated 808 drops, and raw Marathi-Hindi vernacular.',
    keyVenues: ['High Spirits Cafe', 'Classic Rock Coffee Co.', 'FC Road Cypher Spot'],
    establishedYear: '2016'
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    coordinates: [12.9716, 77.5946],
    primaryLanguages: ['Kannada', 'English', 'Tamil', 'Hindi'],
    keyArtists: ['Brodha V', 'Siri', 'Rahul Dit-O', 'All Ok', 'Smokey the Ghost', 'Gubbi', 'MC Bijju'],
    iconicAnthems: ['Aathma Raama', 'Vainko', 'Gaddbadd', 'Don’t Worry Bro', 'Kannada Rap Revolution'],
    sceneHistory: 'Bengaluru has one of the oldest and most technically revered hip-hop lineages in India. From Machas With Attitude in the late 2000s to modern Kannada trap, the scene pioneered fusing Carnatic melodies, classical literature, and English fast rap.',
    localSlang: [
      { term: 'Macha', meaning: 'Dude, brother, closest friend.' },
      { term: 'Scene Sakath', meaning: 'The vibe or scene is amazing.' },
      { term: 'Sakkath', meaning: 'Awesome, top-tier quality.' },
      { term: 'Guru', meaning: 'Master or respectful term for a friend.' }
    ],
    soundSignature: 'Carnatic violin/veena chops, precise boom-bap rhythm, high-tempo English & Kannada flows, electronic trap crossovers.',
    keyVenues: ['Fandom at Gilly’s Redefined', 'Indiranagar Social', 'Church Street Cypher Steps'],
    establishedYear: '2007'
  },
  {
    id: 'punjab-chandigarh',
    city: 'Chandigarh / Mohali',
    state: 'Punjab',
    region: 'North',
    coordinates: [30.7333, 76.7794],
    primaryLanguages: ['Punjabi', 'Hindi', 'English'],
    keyArtists: ['Sidhu Moose Wala', 'Bohemia', 'Wazir Patar', 'Sikander Kahlon', 'Nseeb', 'Karan Aujla', 'Prabh Deep'],
    iconicAnthems: ['295', 'Kali Denali', 'Ek Din', 'The Last Ride', 'Chitta'],
    sceneHistory: 'The birthplace of Desi Rap via Bohemia in the early 2000s, Punjab’s hip-hop evolved into a global titan through folk storytelling, heavy West Coast G-Funk influences, and unapologetic rural narratives.',
    localSlang: [
      { term: 'Yaar / Beli', meaning: 'True brothers or lifelong friends.' },
      { term: 'Gabru', meaning: 'Strong, valiant young man.' },
      { term: 'Vibe Kaim', meaning: 'The energy is pure and unwavering.' }
    ],
    soundSignature: 'Tumbi & Dholak acoustic grooves fused with G-Funk basslines and trap 808s, soaring folk hooks.',
    keyVenues: ['Sector 17 Plaza', 'Elante Courtyard', 'Tricity Underground Jam Studios'],
    establishedYear: '2002'
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    coordinates: [13.0827, 80.2707],
    primaryLanguages: ['Tamil', 'English', 'Madras Bashai'],
    keyArtists: ['Arivu', 'Yogi B', 'OfRo', 'ADK', 'Senthuzhan', 'Paal Dabba', 'Asal Kolaar'],
    iconicAnthems: ['Enjoy Enjaami', 'Sanda Seivom', 'Kallamouni', '10000 Pax', 'Jorthaale'],
    sceneHistory: 'Rooted in Gaana music, folk oppression battles, and anti-caste resistance, Chennai Tamil rap is one of the most socially powerful subcultures in world music. Artists like Arivu and The Casteless Collective brought grassroots rebellion to mainstream festival stages.',
    localSlang: [
      { term: 'Thala', meaning: 'Boss, leader, or respected friend.' },
      { term: 'Gethu', meaning: 'Supreme swagger, pride, or respect.' },
      { term: 'Machi', meaning: 'Pal / homie in Tamil.' }
    ],
    soundSignature: 'Urumi, Parai and Thavil traditional percussion fused with breakbeats and fiery political Tamil poetry.',
    keyVenues: ['The Muse Room', 'Bay 146', 'Marina Beach Cypher Corners'],
    establishedYear: '2006'
  },
  {
    id: 'kerala-kochi',
    city: 'Kochi / Trivandrum',
    state: 'Kerala',
    region: 'South',
    coordinates: [9.9312, 76.2673],
    primaryLanguages: ['Malayalam', 'English'],
    keyArtists: ['Street Academics', 'Fejo', 'Hanumankind', 'Baby Jean', 'Dabzee', 'ThirumaLi', 'Vedan'],
    iconicAnthems: ['Big Dawgs', 'Voice of the Voiceless', 'Apara', 'Manavalan Thug', 'Palapally'],
    sceneHistory: 'Kerala’s hip-hop revolution blends classical Malayalam literature, political rebellion, and international English fast flows (as seen in Hanumankind’s global mega-hit Big Dawgs). Crews like Street Academics laid the foundation for an explosive independent movement.',
    localSlang: [
      { term: 'Aliya / Bro', meaning: 'Brother or close comrade.' },
      { term: 'Pwoli', meaning: 'Superb, fire, or mind-blowing.' },
      { term: 'Kidu', meaning: 'Top notch or cool.' }
    ],
    soundSignature: 'Chenda percussion accents, smooth old-school boom-bap, heavy southern trap, and cinematic Texas-style 808s.',
    keyVenues: ['JT Pac Kochi', 'Fort Kochi Beach Promenade', 'Panampilly Nagar Cyphers'],
    establishedYear: '2009'
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    coordinates: [22.5726, 88.3639],
    primaryLanguages: ['Bengali', 'Hindi', 'English'],
    keyArtists: ['EPR Iyer', 'Underground Authority', 'Cizzy', 'MC Headshot', 'Feyago', 'Joell'],
    iconicAnthems: ['Surkhiyaan', 'Q', 'Bongo Rap', 'Rastafari', 'Kolkata Cypher'],
    sceneHistory: 'Kolkata’s hip-hop is built on literary heritage, spoken-word poetry, and rap-rock political activism. Led by crews like Underground Authority and Streetfood Music, Kolkata artists emphasize complex vocabulary, journalism in rap, and street battles.',
    localSlang: [
      { term: 'Dada', meaning: 'Elder brother or respected leader.' },
      { term: 'Adda', meaning: 'Long, passionate conversation circle with tea.' },
      { term: 'Faatafaati', meaning: 'Extraordinary or brilliant.' }
    ],
    soundSignature: 'Rap-rock heavy guitar riffs, spoken-word interludes, introspective acoustic samples, and lyrical protest bars.',
    keyVenues: ['Someplace Else', 'Skinny Mo’s Jazz Club', 'College Street Coffee House Steps'],
    establishedYear: '2009'
  },
  {
    id: 'northeast-shillong',
    city: 'Shillong / Guwahati',
    state: 'Meghalaya / Assam',
    region: 'Northeast',
    coordinates: [25.5788, 91.8933],
    primaryLanguages: ['Khasi', 'English', 'Assamese', 'Mizo'],
    keyArtists: ['Khasi Bloodz', 'Meba Ofilia', 'Cryptographik Street Poets', 'Borkung Hrangkhawl', 'Jelo'],
    iconicAnthems: ['Anthem for the Northeast', 'Done Talking', 'Don’t Give In', 'Shillong City'],
    sceneHistory: 'Northeast India was one of the earliest adopters of genuine hip-hop culture in India, excelling in all four elements: MCing, B-boying, DJing, and graffiti. Shillong crews like Khasi Bloodz channeled the region’s rock pedigree into fierce boom-bap.',
    localSlang: [
      { term: 'Kha / Bah', meaning: 'Brother or friend in Khasi.' },
      { term: 'Vibe Chull', meaning: 'Total musical immersion.' }
    ],
    soundSignature: 'Bluesy electric guitars, organic acoustic drums, rapid-fire English and Khasi rhymes, mountain soul harmonies.',
    keyVenues: ['Cloud 9 Shillong', 'Polo Grounds Jam Stage', 'U Soso Tham Auditorium'],
    establishedYear: '2008'
  }
];


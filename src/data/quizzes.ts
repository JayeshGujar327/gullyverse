import { Quiz, QuizQuestionItem } from '../types';

export const RAP_JOURNEY_QUESTIONS = [
  {
    id: 'q1',
    question: 'What kind of instrumental production hits you hardest?',
    options: [
      {
        text: 'Dusty 90s Boom-Bap & Soulful Sample Chops',
        tags: ['Boom Bap', 'Conscious Rap', 'Classic'],
        recommendedArtists: ['seedhe-maut', 'prabh-deep', 'krsna']
      },
      {
        text: 'Heavy Distorted 808s, Sliders & Dark Drill',
        tags: ['Drill', 'Trap', 'Hardcore'],
        recommendedArtists: ['krsna', 'gravity', 'mc-stan']
      },
      {
        text: 'Gritty Street Anthems & Raw Live Energy',
        tags: ['Gully Rap', 'Bambaiya', 'High Energy'],
        recommendedArtists: ['divine', 'gravity', 'yashraj']
      },
      {
        text: 'Melodic Southside Bounce, Memphis Flow & Global Vibe',
        tags: ['Southern Bounce', 'Trap', 'English Rap'],
        recommendedArtists: ['hanumankind', 'brodha-v']
      }
    ]
  },
  {
    id: 'q2',
    question: 'What lyrical style do you prioritize when listening to a verse?',
    options: [
      {
        text: 'Multisyllabic rhymes, complex metaphors & surgical punchlines',
        tags: ['Lyrical', 'Technical Multis'],
        recommendedArtists: ['krsna', 'seedhe-maut', 'gravity']
      },
      {
        text: 'Raw working-class reality, neighborhood struggles & honesty',
        tags: ['Street Realism', 'Storytelling'],
        recommendedArtists: ['divine', 'prabh-deep', 'mc-stan']
      },
      {
        text: 'Rapid-fire chopper flows, speed agility & classical fusion',
        tags: ['Chopper Flow', 'Classical Fusion'],
        recommendedArtists: ['brodha-v', 'gravity']
      },
      {
        text: 'Vulnerable introspective poetry & cinematic storytelling',
        tags: ['Introspective', 'Concept Albums'],
        recommendedArtists: ['prabh-deep', 'yashraj', 'seedhe-maut']
      }
    ]
  },
  {
    id: 'q3',
    question: 'Which language flavor appeals most to your ears?',
    options: [
      {
        text: 'Bilingual Hindi-English / Dilli Urdu slang',
        tags: ['Delhi Hindi', 'Urdu'],
        recommendedArtists: ['seedhe-maut', 'krsna']
      },
      {
        text: 'Raw Bambaiya & Marathi street slangs (Haq Se, Bantai)',
        tags: ['Mumbai Street', 'Marathi'],
        recommendedArtists: ['divine', 'mc-stan', 'gravity']
      },
      {
        text: 'International English with South Asian heritage cadence',
        tags: ['English', 'Pan-Global'],
        recommendedArtists: ['hanumankind', 'brodha-v']
      },
      {
        text: 'Pure Punjabi cadence & street poetry',
        tags: ['Punjabi', 'Desi Rap'],
        recommendedArtists: ['prabh-deep']
      }
    ]
  },
  {
    id: 'q4',
    question: 'What setting are you listening in most often?',
    options: [
      {
        text: 'Gym / Moshpit / High Adrenaline Workout',
        tags: ['Workout', 'Moshpit'],
        recommendedArtists: ['hanumankind', 'seedhe-maut', 'krsna']
      },
      {
        text: 'Late Night City Drive / Reflective Walk with Headphones',
        tags: ['Night Drive', 'Introspective'],
        recommendedArtists: ['prabh-deep', 'yashraj', 'seedhe-maut']
      },
      {
        text: 'Car Stereo with Subwoofers blasting on the Street',
        tags: ['Street Banger', '808s'],
        recommendedArtists: ['divine', 'mc-stan']
      },
      {
        text: 'Deep Lyric Breakdown Session analyzing every metaphor',
        tags: ['Technical Bars', 'Hip-Hop Head'],
        recommendedArtists: ['krsna', 'gravity', 'seedhe-maut']
      }
    ]
  }
];

export const QUIZZES: Quiz[] = [
  {
    id: 'dhh-roots',
    title: 'Desi Rap Origins & Pioneers',
    difficulty: 'EASY',
    description: 'Test your knowledge on the foundational moments that built Indian hip-hop from 2006 to 2018.',
    questions: [
      {
        id: 'q1',
        question: 'Which legendary 2006 album by Bohemia coined the term "Desi Hip-Hop"?',
        options: ['Vich Pardesan De', 'Pesa Nasha Pyar', 'Da Rap Star', 'Thanda Thanda Pani'],
        correctAnswer: 1,
        explanation: 'Bohemia released Pesa Nasha Pyar in 2006, introducing West Coast G-funk rhythms to South Asian rap.'
      },
      {
        id: 'q2',
        question: 'Which Mumbai street was made iconic by DIVINE in "Mere Gully Mein"?',
        options: ['Bandra West', '59 JB Nagar, Andheri East', 'Colaba Causeway', 'Dharavi 90 Feet Road'],
        correctAnswer: 1,
        explanation: 'DIVINE proudly repped 59 JB Nagar across his catalog and breakout videos.'
      },
      {
        id: 'q3',
        question: 'Who produced the breakthrough albums "Class-Sikh", "Bayaan", and "Nayaab"?',
        options: ['Karan Kanchan', 'Phenom', 'Sez on the Beat', 'Kalmi'],
        correctAnswer: 2,
        explanation: 'Sajeel Kapoor (Sez on the Beat) engineered these defining projects for Azadi Records.'
      }
    ]
  },
  {
    id: 'lyrical-gods',
    title: 'Rhyme Schemes & Punchline Masters',
    difficulty: 'MEDIUM',
    description: 'Identify technical schemes, multi-syllable rhyme patterns, and iconic diss lines.',
    questions: [
      {
        id: 'q1',
        question: 'Which song features KR$NA using all 36 consonants of the Hindi alphabet in sequential order?',
        options: ['Makasam', 'No Cap', 'Vyanjan', 'Roll Up'],
        correctAnswer: 2,
        explanation: 'KR$NA released Vyanjan in 2014, demonstrating incredible linguistic and metric discipline.'
      },
      {
        id: 'q2',
        question: '"TBSM4L" is the official slogan and creed of which Delhi rap duo?',
        options: ['Full Power', 'Seedhe Maut', 'Young Stunners', '7Bantai\'Z'],
        correctAnswer: 1,
        explanation: 'TBSM4L stands for "Terabhai Seedhe Maut For Life" repped by Calm and Encore ABJ.'
      },
      {
        id: 'q3',
        question: 'Which famous diss track was recorded by KR$NA during the 2020 lyrical battle against Muhfaad?',
        options: ['Sheikh Chilli', 'Makasam', 'Samajh Mein Aaya Kya', 'Aisi Taisi'],
        correctAnswer: 1,
        explanation: 'Makasam is regarded as one of the most surgical diss tracks in Indian hip-hop.'
      }
    ]
  },
  {
    id: 'pan-india-sound',
    title: 'Regional Hubs & Global Breakthroughs',
    difficulty: 'HARD',
    description: 'For hardcore fans who follow the regional soundscapes from Kerala and Bengaluru to Pune and Punjab.',
    questions: [
      {
        id: 'q1',
        question: 'Where was Hanumankind\'s global Billboard hit video "Big Dawgs" filmed?',
        options: ['A Mumbai chawl', 'A Kerala Well of Death (Maut Ka Kuan)', 'A Delhi flyover', 'A Bengaluru tech park'],
        correctAnswer: 1,
        explanation: 'Director Bijoy Shetty filmed Hanumankind performing inside a real gravity-defying Well of Death in coastal Kerala.'
      },
      {
        id: 'q2',
        question: 'Which Pune rap artist pioneered the albums "Tadipaar" and "Insaan" using local Marathi slang?',
        options: ['Sambata', 'MC Stan', 'Vijay DK', 'Gravity'],
        correctAnswer: 1,
        explanation: 'MC Stan from Tadiwala Road Pune revolutionized new-wave hip-hop and Pune slangs.'
      },
      {
        id: 'q3',
        question: 'Which track by Brodha V famously blended Sanskrit Carnatic shlokas with English chopper flows?',
        options: ['Aigiri Nandini', 'Aathma Raama', 'Vainko', 'Shook Ones'],
        correctAnswer: 1,
        explanation: 'Aathma Raama (2012) became a timeless anthem across South India.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS = QUIZZES[0].questions;


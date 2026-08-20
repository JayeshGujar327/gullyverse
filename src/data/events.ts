import { HipHopEvent, AwardCategory } from '../types';

export const HIP_HOP_EVENTS: HipHopEvent[] = [
  {
    id: 'breezer-vivid-shuffle-2025',
    title: 'Breezer Vivid Shuffle Grand Finale',
    type: 'Festival',
    city: 'Mumbai',
    venue: 'Jio World Garden, BKC',
    date: 'November 15, 2025',
    artists: ['DIVINE', 'Seedhe Maut', 'Siri', 'Dee MC', 'Karan Kanchan'],
    status: 'UPCOMING',
    ticketUrl: 'https://insider.in',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: 'India’s biggest hip-hop dance and rap battle championship featuring breaking battles, live cyphers, and headliner performances.'
  },
  {
    id: 'seedhe-maut-arena-tour',
    title: 'Seedhe Maut Nation Arena Tour',
    type: 'Tour',
    city: 'Delhi',
    venue: 'Talkatora Indoor Stadium',
    date: 'December 20, 2025',
    artists: ['Seedhe Maut', 'Sez on the Beat', 'Special Guests'],
    status: 'UPCOMING',
    ticketUrl: 'https://insider.in',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: 'A 3-hour stadium moshpit experience playing through Bayaan, Nayaab, and Lunch Break in their entirety.'
  },
  {
    id: 'gully-fest-2025',
    title: 'Gully Fest All-Stars Showcase',
    type: 'Festival',
    city: 'Mumbai',
    venue: 'NESCO Ground, Goregaon',
    date: 'October 28, 2025',
    artists: ['DIVINE', 'MC Altaf', 'Gravity', 'D’Evil', 'Yashraj'],
    status: 'UPCOMING',
    ticketUrl: 'https://bookmyshow.com',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description: 'A massive celebration of Mumbai street culture with live graffiti exhibitions, B-boy battles, and street food stalls.'
  }
];

export const ANNUAL_AWARDS: AwardCategory[] = [
  {
    id: 'award-artist-year',
    category: 'Artist of the Year (DHH)',
    categoryName: 'Artist of the Year (DHH)',
    year: 2025,
    totalVotes: 14820,
    nominees: [
      { name: 'Seedhe Maut', work: 'Kshma EP & Arena Tour', votePercentage: 38 },
      { name: 'Hanumankind', work: 'Big Dawgs (Billboard Entry)', votePercentage: 32 },
      { name: 'DIVINE', work: 'Street Dreams & Global Festivals', votePercentage: 18 },
      { name: 'KR$NA', work: 'For The Record Tour', votePercentage: 12 }
    ]
  },
  {
    id: 'award-album-year',
    category: 'Album of the Year',
    categoryName: 'Album of the Year',
    year: 2025,
    totalVotes: 12450,
    nominees: [
      { name: 'Nayaab', work: 'Seedhe Maut & Sez on the Beat', votePercentage: 42 },
      { name: 'Kohinoor', work: 'DIVINE & Mass Appeal', votePercentage: 24 },
      { name: 'Tadipaar', work: 'MC Stan & Hindi Records', votePercentage: 22 },
      { name: 'Still Here', work: 'KR$NA & Kalamkaar', votePercentage: 12 }
    ]
  },
  {
    id: 'award-producer-year',
    category: 'Producer of the Year',
    categoryName: 'Producer of the Year',
    year: 2025,
    totalVotes: 10980,
    nominees: [
      { name: 'Sez on the Beat', work: 'The Mellow Boy & Azadi Catalog', votePercentage: 45 },
      { name: 'Kalmi', work: 'Big Dawgs & Southside Drill', votePercentage: 30 },
      { name: 'Karan Kanchan', work: 'Japanese Trap & Stadium Anthems', votePercentage: 25 }
    ]
  },
  {
    id: 'award-underground-breakthrough',
    category: 'Underground Breakthrough of the Year',
    categoryName: 'Underground Breakthrough of the Year',
    year: 2025,
    totalVotes: 9400,
    nominees: [
      { name: 'Yashraj', work: 'Meri Jaan Pehle Naach & Dhundhla', votePercentage: 36 },
      { name: 'Gravity', work: 'Moon Landing & 3:16', votePercentage: 34 },
      { name: 'Rebel 7', work: 'Dilli Ka Ladka & Street Cyphers', votePercentage: 30 }
    ]
  }
];

export const PAST_AWARD_WINNERS = [
  { year: 2024, category: 'Song of the Year', winner: 'Hanumankind & Kalmi', project: 'Big Dawgs' },
  { year: 2023, category: 'Album of the Year', winner: 'Seedhe Maut', project: 'Lunch Break' },
  { year: 2022, category: 'Album of the Year', winner: 'Seedhe Maut & Sez on the Beat', project: 'Nayaab' },
  { year: 2021, category: 'Lyricist of the Year', winner: 'KR$NA', project: 'Still Here' },
  { year: 2020, category: 'Street Album of the Year', winner: 'MC Stan', project: 'Tadipaar' }
];


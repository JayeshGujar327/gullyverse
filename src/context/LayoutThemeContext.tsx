import React, { createContext, useContext, useState, useEffect } from 'react';

export type LayoutMode = 'SPOTIFY_APP' | 'STREAMING_BENTO' | 'STUDIO_PRO' | 'UNDERGROUND_STREET' | 'EDITORIAL_VINYL';
export type NavStyle = 'SPOTIFY_SHELL' | 'SIDEBAR' | 'TOP_COMMAND' | 'STREET_BAR' | 'MAGAZINE_HEADER';

export interface UIThemeOption {
  id: LayoutMode;
  navStyle: NavStyle;
  name: string;
  tagline: string;
  accentColor: string;
  badge: string;
  iconName: string;
  description: string;
  features: string[];
}

export const UI_THEME_OPTIONS: UIThemeOption[] = [
  {
    id: 'SPOTIFY_APP',
    navStyle: 'SPOTIFY_SHELL',
    name: 'Spotify Desktop & Mobile App',
    tagline: 'Official 3-Pane Spotify Desktop Experience',
    accentColor: 'from-[#1ed760] via-[#1db954] to-emerald-600',
    badge: 'FLAGSHIP SPOTIFY',
    iconName: 'Radio',
    description: 'Authentic 3-pane Spotify architecture with left library drawer, sticky navigation top bar, collapsible Now Playing right sidebar, dynamic greeting, and dedicated bottom audio player bar.',
    features: [
      '3-Column Spotify Desktop Layout & Mobile Bar',
      'Interactive Pinned "Liked Songs" & Custom Library',
      'Collapsible Now Playing View & Artist Bios',
      'Synced Fullscreen Karaoke Lyrics & Queue Drawer',
      'Iconic Spotify Green (#1ed760) Transport Deck'
    ]
  },
  {
    id: 'STREAMING_BENTO',
    navStyle: 'TOP_COMMAND',
    name: 'Modern Bento & Glass Stream',
    tagline: 'Dark Glass Grid Matrix',
    accentColor: 'from-amber-400 to-orange-500',
    badge: 'BENTO MATRIX',
    iconName: 'LayoutGrid',
    description: 'High-density Bento Grid with floating glass command bar, instant mood selector, live audio wave sampler, and maximized wide-screen space.',
    features: ['Top Command Bar & Mega Dropdowns', 'Interactive Bento Grid Dashboard', 'Live 808 Mood Station', 'Floating Ambient Audio Visualizer']
  },
  {
    id: 'STUDIO_PRO',
    navStyle: 'SIDEBAR',
    name: 'Pro Audio Workstation',
    tagline: 'DAW / Ableton & Studio Console Architecture',
    accentColor: 'from-amber-400 via-amber-500 to-yellow-500',
    badge: 'PRO DAW',
    iconName: 'Sliders',
    description: 'Full-featured studio console with persistent multi-tier vertical sidebar, real-time live drop feed, radar stats matrix, and synthesizer telemetry.',
    features: ['Collapsible 4-Tier Pro Sidebar', 'The Daily Drop 4-Box Matrix', 'Deep Discography & Radar Breakdown', 'Lossless Audio Master Anthems']
  },
  {
    id: 'UNDERGROUND_STREET',
    navStyle: 'STREET_BAR',
    name: 'Raw Street & Cypher Cassette',
    tagline: 'Industrial Gully Mixtape & Battle Arena',
    accentColor: 'from-rose-500 via-red-500 to-amber-500',
    badge: 'RAW & UNFILTERED',
    iconName: 'Flame',
    description: 'Heavy tactile street styling inspired by Mumbai/Delhi underground cyphers, cassette tape decks, battle verse showdowns, and graffiti tags.',
    features: ['Tactile Cassette Mixtape Deck', 'Live Cypher & Beef Ticker', 'Punchline & Rhyme Battle Arena', 'Industrial Brutalist Navigation']
  },
  {
    id: 'EDITORIAL_VINYL',
    navStyle: 'MAGAZINE_HEADER',
    name: 'Editorial Culture & Vinyl Vault',
    tagline: 'Rolling Stone / Pitchfork Hip-Hop Dossier',
    accentColor: 'from-emerald-400 via-teal-400 to-cyan-400',
    badge: 'MAGAZINE & LORE',
    iconName: 'Disc3',
    description: 'Refined editorial publication aesthetic with turntable vinyl spinners, in-depth cultural retrospectives, quote spotlights, and regional atlas.',
    features: ['Editorial Cover Story Layout', 'Spinning Vinyl Record Vault', '6-Eras Interactive Historical Lore', 'Curator Notes & Lyrical Deep-Dives']
  }
];

interface LayoutThemeContextType {
  layoutMode: LayoutMode;
  navStyle: NavStyle;
  setLayoutMode: (mode: LayoutMode) => void;
  setNavStyle: (style: NavStyle) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  availableOptions: UIThemeOption[];
}

const LayoutThemeContext = createContext<LayoutThemeContextType | undefined>(undefined);

export const LayoutThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    const saved = localStorage.getItem('gullyverse_ui_layout_mode');
    return (saved as LayoutMode) || 'SPOTIFY_APP';
  });

  const [navStyle, setNavStyleState] = useState<NavStyle>(() => {
    const saved = localStorage.getItem('gullyverse_ui_nav_style');
    if (saved) return saved as NavStyle;
    const found = UI_THEME_OPTIONS.find(opt => opt.id === layoutMode);
    return found ? found.navStyle : 'SPOTIFY_SHELL';
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
    localStorage.setItem('gullyverse_ui_layout_mode', mode);
    const option = UI_THEME_OPTIONS.find(o => o.id === mode);
    if (option) {
      setNavStyleState(option.navStyle);
      localStorage.setItem('gullyverse_ui_nav_style', option.navStyle);
    }
  };

  const setNavStyle = (style: NavStyle) => {
    setNavStyleState(style);
    localStorage.setItem('gullyverse_ui_nav_style', style);
  };

  return (
    <LayoutThemeContext.Provider
      value={{
        layoutMode,
        navStyle,
        setLayoutMode,
        setNavStyle,
        isCustomizerOpen,
        setIsCustomizerOpen,
        availableOptions: UI_THEME_OPTIONS
      }}
    >
      {children}
    </LayoutThemeContext.Provider>
  );
};

export const useLayoutTheme = () => {
  const context = useContext(LayoutThemeContext);
  if (!context) {
    throw new Error('useLayoutTheme must be used within a LayoutThemeProvider');
  }
  return context;
};


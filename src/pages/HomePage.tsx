import React from 'react';
import { useLayoutTheme } from '../context/LayoutThemeContext';
import { SpotifyHomeView } from '../components/spotify/SpotifyHomeView';
import { HomeStreamingBento } from '../components/home/HomeStreamingBento';
import { HomeStudioPro } from '../components/home/HomeStudioPro';
import { HomeUndergroundStreet } from '../components/home/HomeUndergroundStreet';
import { HomeEditorialVinyl } from '../components/home/HomeEditorialVinyl';

export const HomePage: React.FC = () => {
  const { layoutMode } = useLayoutTheme();

  return (
    <div className="gully-home-theme min-h-full">
      {/* Dynamic Home Screen Rendering according to selected UI Option */}
      {(layoutMode === 'SPOTIFY_APP' || !layoutMode) && <SpotifyHomeView />}
      {layoutMode === 'STREAMING_BENTO' && <HomeStreamingBento />}
      {layoutMode === 'STUDIO_PRO' && <HomeStudioPro />}
      {layoutMode === 'UNDERGROUND_STREET' && <HomeUndergroundStreet />}
      {layoutMode === 'EDITORIAL_VINYL' && <HomeEditorialVinyl />}
    </div>
  );
};



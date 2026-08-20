import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Search, Library, Crown, Play, Pause, Tv } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

interface SpotifyMobileNavProps {
  onOpenSearch: () => void;
}

export const SpotifyMobileNav: React.FC<SpotifyMobileNavProps> = ({ onOpenSearch }) => {
  const { currentSong, isPlaying, togglePlay, openYoutubeModal } = usePlayer();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 select-none">
      {/* Mini Player above bottom bar (if song is loaded) */}
      {currentSong && (
        <div className="mx-2 mb-1 p-2 rounded-lg bg-[#282828]/95 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-2xl">
          <Link to={`/songs/${currentSong.id}`} className="flex items-center gap-2.5 min-w-0 flex-1">
            <img
              src={currentSong.coverArt}
              alt={currentSong.title}
              className="w-10 h-10 rounded object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">{currentSong.title}</h5>
              <p className="text-[10px] text-[#b3b3b3] truncate">{currentSong.artistName}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openYoutubeModal(currentSong)}
              className="p-1.5 text-[#b3b3b3] hover:text-white"
              title="Video"
            >
              <Tv className="w-4 h-4 text-[#1ed760]" />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-black" />
              ) : (
                <Play className="w-4 h-4 fill-black ml-0.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Spotify Mobile Bottom Bar */}
      <nav className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex items-center justify-around">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-white' : 'text-[#777] hover:text-white'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-[#777] hover:text-white"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-white' : 'text-[#777] hover:text-white'
            }`
          }
        >
          <Library className="w-5 h-5" />
          <span>Your Library</span>
        </NavLink>

        <NavLink
          to="/awards"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-bold ${
              isActive ? 'text-white' : 'text-[#777] hover:text-white'
            }`
          }
        >
          <Crown className="w-5 h-5" />
          <span>DHH Pro</span>
        </NavLink>
      </nav>
    </div>
  );
};


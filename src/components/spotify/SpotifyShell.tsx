import React, { useState } from 'react';
import { SpotifyLeftSidebar } from './SpotifyLeftSidebar';
import { SpotifyTopBar } from './SpotifyTopBar';
import { SpotifyRightSidebar } from './SpotifyRightSidebar';
import { SpotifyBottomPlayer } from './SpotifyBottomPlayer';
import { SpotifyMobileNav } from './SpotifyMobileNav';
import { SpotifyLyricsModal } from './SpotifyLyricsModal';
import { SpotifyQueueModal } from './SpotifyQueueModal';
import { SpotifyPlayerModal } from './SpotifyPlayerModal';
import { Footer } from '../layout/Footer';

interface SpotifyShellProps {
  children: React.ReactNode;
  onOpenSearch: () => void;
}

export const SpotifyShell: React.FC<SpotifyShellProps> = ({ children, onOpenSearch }) => {
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);

  // GULLYVERSE player visibility
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-black text-[#b3b3b3] flex flex-col p-1.5 sm:p-2 gap-2 overflow-hidden select-none font-sans">
      {/* 1. MAIN MIDDLE ROW (Left Sidebar + Center Content Viewport + Right Panel) */}
      <div className="flex-1 flex gap-2 min-h-0 overflow-hidden">
        {/* Left Sidebar (Desktop / Tablet) */}
        <div className="hidden md:flex shrink-0 h-full min-h-0 overflow-hidden">
          <SpotifyLeftSidebar onOpenSearch={onOpenSearch} />
        </div>

        {/* Center Main Scrollable Viewport */}
        <div className="bg-[#121212] rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden relative shadow-inner h-full">
          {/* Spotify Sticky Top Navbar - Horizontal Scroll */}
          <div className="shrink-0 w-full min-w-0 overflow-x-auto overflow-y-hidden gully-top-scroll">
            <SpotifyTopBar onOpenSearch={onOpenSearch} />
          </div>

          {/* Scrollable Router Page Content */}
          <main className="flex-1 overflow-y-auto custom-scrollbar relative pb-16 md:pb-6">
            {children}
            <Footer />
          </main>
        </div>

        {/* Right Collapsible Panel (Now Playing View / Artist Bio / Queue) */}
        {rightPanelOpen && (
          <div className="hidden lg:flex shrink-0 h-full min-h-0">
            <SpotifyRightSidebar
              onClose={() => setRightPanelOpen(false)}
              onOpenLyrics={() => setLyricsOpen(true)}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          2. GULLYVERSE COLLAPSIBLE MUSIC PLAYER
          ===================================================== */}

      <div className="hidden md:block shrink-0 relative">

        {/* Compact Music Bar */}
        {!playerOpen && (
          <button
            onClick={() => setPlayerOpen(true)}
            className="w-full h-12 flex items-center justify-between px-5
                       bg-[#0b0f18]
                       border-t border-white/10
                       hover:bg-[#111827]
                       transition-all duration-200
                       group"
            aria-label="Open music player"
          >

            <div className="flex items-center gap-3 min-w-0">

              <div className="w-8 h-8 rounded-lg
                              bg-gradient-to-br from-violet-600 to-cyan-500
                              flex items-center justify-center
                              shrink-0
                              shadow-lg shadow-violet-500/20">

                <span className="text-white text-sm">
                  ♪
                </span>

              </div>

              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  Now Playing
                </div>

                <div className="text-[10px] text-slate-400 truncate">
                  Open GULLYVERSE Music Player
                </div>
              </div>

            </div>

            <div
              className="flex items-center gap-2 text-xs
                         text-slate-400
                         group-hover:text-white
                         transition-colors"
            >
              <span className="hidden sm:inline">
                Open Player
              </span>

              <span
                className="w-7 h-7 rounded-full
                           border border-white/10
                           flex items-center justify-center
                           group-hover:border-violet-400/50
                           group-hover:text-violet-300"
              >
                ▲
              </span>
            </div>

          </button>
        )}

        {/* Expanded Full Player */}
        {playerOpen && (
          <div className="relative">

            <button
              onClick={() => setPlayerOpen(false)}
              className="absolute right-4 -top-3 z-50
                         w-8 h-8 rounded-full
                         bg-[#111827]
                         border border-white/10
                         text-slate-300
                         hover:text-white
                         hover:border-violet-400/50
                         hover:bg-violet-600/20
                         transition-all duration-200
                         flex items-center justify-center
                         shadow-xl"
              aria-label="Collapse music player"
              title="Collapse player"
            >
              ▼
            </button>

            <SpotifyBottomPlayer
              rightPanelOpen={rightPanelOpen}
              onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
              onOpenLyrics={() => setLyricsOpen(true)}
              onOpenQueue={() => setQueueOpen(true)}
            />

          </div>
        )}

      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION DOCK & MINI-PLAYER */}
      <SpotifyMobileNav onOpenSearch={onOpenSearch} />

      {/* 4. SPOTIFY FULL KARAOKE LYRICS MODAL */}
      <SpotifyLyricsModal
        isOpen={lyricsOpen}
        onClose={() => setLyricsOpen(false)}
      />

      {/* 5. SPOTIFY PLAY QUEUE MODAL */}
      <SpotifyQueueModal
        isOpen={queueOpen}
        onClose={() => setQueueOpen(false)}
      />

      {/* 6. SPOTIFY OFFICIAL PLAYER MODAL */}
      <SpotifyPlayerModal />
    </div>
  );
};






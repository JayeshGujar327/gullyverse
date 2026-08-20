import React from 'react';
import { Play, Pause } from 'lucide-react';

interface SpotifyCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type?: 'song' | 'artist' | 'playlist' | 'album' | 'cypher';
  isPlaying?: boolean;
  isCurrent?: boolean;
  onPlayClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  badge?: string;
}

export const SpotifyCard: React.FC<SpotifyCardProps> = ({
  title,
  subtitle,
  imageUrl,
  type = 'song',
  isPlaying = false,
  isCurrent = false,
  onPlayClick,
  onClick,
  badge,
}) => {
  const isArtist = type === 'artist';

  return (
    <div
      onClick={onClick}
      className={`group relative p-3 sm:p-4 rounded-lg bg-[#181818] hover:bg-[#282828] transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
        isCurrent ? 'bg-[#222222] ring-1 ring-[#1ed760]/40' : ''
      }`}
    >
      {/* Artwork Container */}
      <div className="relative w-full aspect-square mb-3.5 overflow-hidden shadow-lg bg-[#121212]">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isArtist ? 'rounded-full' : 'rounded-md'
          }`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Badge (if any) */}
        {badge && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-[#1ed760] border border-[#1ed760]/30 shadow">
            {badge}
          </span>
        )}

        {/* Iconic Spotify Floating Green Play Button on Hover */}
        {onPlayClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayClick(e);
            }}
            className={`absolute bottom-2 right-2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-106 text-black flex items-center justify-center shadow-2xl transition-all duration-200 z-10 ${
              isCurrent && isPlaying
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isCurrent && isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="min-w-0">
        <h3
          className={`font-bold text-sm sm:text-base text-white truncate group-hover:underline ${
            isCurrent ? 'text-[#1ed760]' : ''
          }`}
        >
          {title}
        </h3>
        <p className="text-xs text-[#a7a7a7] line-clamp-2 mt-1 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};


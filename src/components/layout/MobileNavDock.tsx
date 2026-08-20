import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Mic2, 
  Disc3, 
  MapPin, 
  Menu, 
  Compass 
} from 'lucide-react';

interface MobileNavDockProps {
  onOpenMobileNav: () => void;
}

export const MobileNavDock: React.FC<MobileNavDockProps> = ({ onOpenMobileNav }) => {
  const location = useLocation();

  const dockItems = [
    { label: 'Discover', path: '/', icon: Sparkles },
    { label: 'Artists', path: '/artists', icon: Mic2 },
    { label: 'Music', path: '/songs', icon: Disc3 },
    { label: 'Map', path: '/map', icon: MapPin },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080a0f]/95 backdrop-blur-2xl border-t border-[#1a2133] px-3 py-2 shadow-[0_-8px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around">
        {dockItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-400 scale-110' : ''}`} />
              <span className="text-[10px] font-mono tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Full Menu Trigger */}
        <button
          onClick={onOpenMobileNav}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-amber-400 transition-colors"
          aria-label="Open full drawer menu"
        >
          <Menu className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-mono tracking-tight">More</span>
        </button>
      </div>
    </div>
  );
};


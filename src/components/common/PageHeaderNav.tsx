import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, X } from 'lucide-react';

interface PageHeaderNavProps {
  title?: string;
  parentLabel?: string;
  parentRoute?: string;
  showHome?: boolean;
  className?: string;
}

export const PageHeaderNav: React.FC<PageHeaderNavProps> = ({
  title,
  parentLabel = 'BACK',
  parentRoute,
  showHome = true,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (parentRoute) {
      navigate(parentRoute);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={`flex items-center justify-between gap-3 pb-4 mb-6 border-b border-[#1b2234] ${className}`}>
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleBack}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121624] hover:bg-[#1a2133] border border-[#20293d] hover:border-amber-400/50 text-xs font-mono font-semibold text-slate-300 hover:text-amber-400 transition-all shadow-sm active:scale-95"
          title="Back to previous page (or click)"
          id="page-header-back-btn"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>{parentLabel.toUpperCase()}</span>
        </button>

        {title && (
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
            / <span className="text-slate-300 font-semibold">{title}</span>
          </span>
        )}
      </div>

      {/* Close / Return to Discover */}
      {showHome && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121624] hover:bg-[#1a2133] border border-[#20293d] hover:border-slate-600 text-xs font-mono text-slate-400 hover:text-white transition-all shadow-sm active:scale-95"
            title="Return to Home Discover Arena"
            id="page-header-close-btn"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">HOME</span>
            <X className="w-3.5 h-3.5 text-slate-400 md:hidden" />
          </button>
        </div>
      )}
    </div>
  );
};


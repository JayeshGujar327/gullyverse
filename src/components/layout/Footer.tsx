import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Disc3, 
  Heart, 
  Radio, 
  MapPin, 
  Mic, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Flame,
  Github,
  Linkedin,
  Instagram,
  Code2,
  ShieldAlert
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to "The Daily Drop" newsletter!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#080a0f] border-t border-[#1a2236] pt-14 pb-28 sm:pb-24 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#1a2236]">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center p-[1.5px]">
                <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                  <Disc3 className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-white">
                GULLY<span className="text-amber-400">VERSE</span>
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded">
                PRO
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              The living digital archive and interactive discovery workstation for Indian Hip-Hop. Documenting the culture, artists, cadences, cyphers, and regional scenes from gully to global.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e121d] border border-[#1e263a] text-[10px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ONE COUNTRY. MANY FLOWS.
              </div>
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold hover:bg-amber-400/20 transition-colors"
              >
                <ShieldAlert className="w-3 h-3 text-amber-400" /> Admin Suite (Jayesh Gujar)
              </Link>
            </div>

            {/* Creator Socials Strip */}
            <div className="pt-1 flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-500 font-bold">LEAD ARCHITECT:</span>
              <a 
                href="https://github.com/JayeshGujar327" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#111624] text-slate-400 hover:text-white hover:bg-[#1a233a] transition-colors"
                title="Jayesh Gujar on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jayesh-gujar-943626315//" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#111624] text-slate-400 hover:text-cyan-400 hover:bg-[#1a233a] transition-colors"
                title="Jayesh Gujar on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com/thejayesh327" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#111624] text-slate-400 hover:text-pink-400 hover:bg-[#1a233a] transition-colors"
                title="Jayesh Gujar on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold">
              EXPLORE DHH
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/artists" className="hover:text-amber-400 transition-colors">Artist Database</Link></li>
              <li><Link to="/songs" className="hover:text-amber-400 transition-colors">Music & Moods</Link></li>
              <li><Link to="/map" className="hover:text-amber-400 transition-colors">Regional Hip-Hop Map</Link></li>
              <li><Link to="/cyphers" className="hover:text-amber-400 transition-colors">Cypher Vault</Link></li>
              <li><Link to="/history" className="hover:text-amber-400 transition-colors">6 Eras Timeline</Link></li>
              <li><Link to="/producers" className="hover:text-amber-400 transition-colors">Behind The Beat</Link></li>
            </ul>
          </div>

          {/* Learn & Play */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold">
              LEARN & INTERACT
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/learn-rap" className="hover:text-amber-400 transition-colors">Learn Rap & Flow Lab</Link></li>
              <li><Link to="/compare" className="hover:text-amber-400 transition-colors">Hip-Hop DNA (Compare)</Link></li>
              <li><Link to="/journey" className="hover:text-amber-400 transition-colors">Rap Journey Recommender</Link></li>
              <li><Link to="/quizzes" className="hover:text-amber-400 transition-colors">Interactive Trivia Quizzes</Link></li>
              <li><Link to="/culture" className="hover:text-amber-400 transition-colors">4 Elements & Culture</Link></li>
              <li><Link to="/awards" className="hover:text-amber-400 transition-colors">Annual DHH Awards</Link></li>
            </ul>
          </div>

          {/* Newsletter & Community */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold">
              THE DAILY DROP
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              Get weekly underground discoveries, new drop alerts, and lyrical breakdowns.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-xl overflow-hidden border border-[#20293d] focus-within:border-amber-400 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@flow.com"
                  className="w-full bg-[#121624] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 px-3 py-1.5 text-black flex items-center justify-center transition-colors font-bold"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="pt-0.5">
              <Link
                to="/submit"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Submit Underground Artist
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Attribution */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Cultural education & discovery workstation. Audio previews powered by Web Audio API synthesizers and official licensed embeds.
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} GULLYVERSE PRO • For the Indian Hip-Hop Community
          </div>
        </div>
      </div>
    </footer>
  );
};


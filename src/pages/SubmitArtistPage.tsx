import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Send, Mic2, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Genre } from '../types';

export const SubmitArtistPage: React.FC = () => {
  const { submitArtist } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [stageName, setStageName] = useState('');
  const [realName, setRealName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('Hindi');
  const [genres, setGenres] = useState<string>('Gully Rap, Boom Bap');
  const [bio, setBio] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [sampleTrackTitle, setSampleTrackTitle] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageName || !city || !bio) {
      showToast('Please fill in the required fields', 'error');
      return;
    }

    submitArtist({
      stageName,
      name: realName || stageName,
      city,
      state: state || 'India',
      primaryLanguage,
      genres: genres.split(',').map((g) => g.trim() as Genre),
      bio,
      streamingLinks: {
        spotify: spotifyUrl,
        youtube: youtubeUrl,
      },
      sampleTrack: sampleTrackTitle,
    });

    setSubmitted(true);
    showToast('Artist profile submitted for review!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title="Submit Underground MC" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
          <Sparkles className="w-4 h-4" /> COMMUNITY UNDERGROUND INITIATIVE
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
          SUBMIT AN UNDERGROUND MC
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
          Help us document every corner of Indian Hip-Hop. Submitted profiles are vetted by community moderators.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            SUBMISSION RECEIVED!
          </h2>
          <p className="text-sm text-zinc-300 max-w-md mx-auto">
            Thank you for contributing to the archive. <strong>{stageName}</strong> has been queued in the moderation dashboard for verification.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setStageName('');
                setBio('');
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
            >
              Submit Another Artist
            </button>
            <button
              onClick={() => navigate('/artists')}
              className="px-6 py-2.5 rounded-xl bg-[#ff334b] text-white text-xs font-mono font-bold"
            >
              Browse Directory
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">Stage / Rap Name *</label>
              <input
                type="text"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="e.g. Rebel 7"
                required
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">Real Name (Optional)</label>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="e.g. Ronit Roy"
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">City *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Pune"
                required
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Maharashtra"
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">Primary Language</label>
              <input
                type="text"
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                placeholder="e.g. Marathi / Hindi"
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-300 uppercase">Genres / Styles (Comma-separated)</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              placeholder="Gully Rap, Boom Bap, Trap, Drill"
              className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-300 uppercase">Artist Bio & Underground Story *</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about their style, breakthrough tracks, local crew, and sound..."
              required
              className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">YouTube Link</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase">Sample Anthem Title</label>
              <input
                type="text"
                value={sampleTrackTitle}
                onChange={(e) => setSampleTrackTitle(e.target.value)}
                placeholder="e.g. Gali Ka Gunda"
                className="w-full mt-1.5 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Vetted by DHH Community
            </span>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white font-bold text-xs font-mono uppercase flex items-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" /> Submit Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


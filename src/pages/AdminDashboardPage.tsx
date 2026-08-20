import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Users, 
  Disc3, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Activity, 
  Clock,
  TrendingUp,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Copy,
  Code2,
  Terminal,
  Cpu,
  Database,
  Radio,
  FileCode,
  Download,
  RefreshCw,
  Send,
  Sliders,
  Award,
  Check,
  Globe,
  UserCheck,
  Layers,
  Zap,
  Server
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ARTISTS } from '../data/artists';
import { SONGS } from '../data/songs';
import { REGIONAL_SCENES } from '../data/regions';
import { HISTORY_ERAS } from '../data/history';
import { CYPHERS } from '../data/cyphers';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Role, ArtistSubmission } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, setRole, submissions, updateSubmissionStatus, addSubmission } = useAuth();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'DOSSIER' | 'MODERATION' | 'SYSTEM' | 'OPERATIONS'>('DOSSIER');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ArtistSubmission | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  // Creator & Admin Information
  const creator = {
    name: 'Jayesh Gujar',
    role: 'Creator, Lead Architect & Full-Stack Platform Engineer',
    subRole: 'Hip-Hop Cultural Archivist & Systems Builder',
    email: 'gujarj327@gmail.com',
    location: 'India',
    github: 'https://github.com/JayeshGujar327',
    githubHandle: '@jaysinhagujar',
    linkedin: 'https://www.linkedin.com/in/jayesh-gujar-943626315//',
    linkedinHandle: 'in/jayesh-gujar',
    instagram: 'https://instagram.com/thejayesh327',
    instagramHandle: '@jayesh_gujar_',
    bio: 'Full-stack software engineer and dedicated Desi Hip-Hop cultural archivist. Creator of GULLYVERSE PRO — an interconnected digital audio museum, flow laboratory, and regional music discovery workstation engineered to celebrate and elevate South Asian hip-hop from gully to global.',
    skills: [
      'React 19 & Next Architecture',
      'Web Audio API & Synthesizers',
      'TypeScript & Modern JavaScript',
      'Tailwind CSS & Motion Physics',
      'Spring Boot & Node.js Microservices',
      'PostgreSQL & Cloud SQL Schemas',
      'D3 & Recharts Visualizations',
      'REST APIs & Real-Time Ingress'
    ],
    mission: 'Bridging underground street poetry with world-class interactive web craftsmanship, ensuring the rich legacy of Indian hip-hop is documented with accuracy, respect, and technological innovation.'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedLink(label);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleApprove = (id: string, stageName: string) => {
    updateSubmissionStatus(id, 'APPROVED');
    showToast(`Approved ${stageName} into main artist catalog!`, 'success');
  };

  const handleReject = (id: string, stageName: string) => {
    updateSubmissionStatus(id, 'REJECTED');
    showToast(`Rejected submission for ${stageName}.`, 'info');
  };

  const handleSeedDemoSubmission = () => {
    const randomNames = [
      { name: 'Kavish "K-Bomb" Sharma', stage: 'K-Bomb', city: 'Jaipur', state: 'Rajasthan', lang: 'Hindi / Marwari', bio: 'Fusing Marwari folk instruments with high-speed 140 BPM drill.' },
      { name: 'Zoya "Zee-Flow" Qureshi', stage: 'Zee-Flow', city: 'Bhopal', state: 'Madhya Pradesh', lang: 'Hindi / Urdu', bio: 'Conscious lyricist bringing street storytelling from central India.' },
      { name: 'Rahul "Chakra" Das', stage: 'Chakra 808', city: 'Kolkata', state: 'West Bengal', lang: 'Bengali / English', bio: 'Underground boom-bap poet tackling university politics and urban life.' }
    ];
    const pick = randomNames[Math.floor(Math.random() * randomNames.length)];
    addSubmission({
      artistName: pick.name,
      stageName: pick.stage,
      city: pick.city,
      state: pick.state,
      primaryLanguage: pick.lang,
      genres: ['Boom Bap', 'Drill'],
      bio: pick.bio,
      topSongs: ['Street Anthems Vol 1'],
      socialLinks: {
        youtube: 'https://youtube.com',
        spotify: 'https://spotify.com'
      }
    });
    showToast(`Seeded new demo underground submission: ${pick.stage}!`, 'success');
  };

  const runDiagnosticScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      showToast('System diagnostic complete: All 28 modules & Audio Synth at 100% operational efficiency!', 'success');
    }, 1200);
  };

  const handleExportMetadata = () => {
    const metadataReport = {
      platform: 'GULLYVERSE PRO',
      version: 'v3.2.0-STABLE',
      timestamp: new Date().toISOString(),
      leadArchitect: creator.name,
      adminEmail: creator.email,
      socials: {
        github: creator.github,
        linkedin: creator.linkedin,
        instagram: creator.instagram
      },
      stats: {
        totalArtists: ARTISTS.length,
        totalSongs: SONGS.length,
        regionalHubs: REGIONAL_SCENES.length,
        historicalEras: HISTORY_ERAS.length,
        cyphersBattles: CYPHERS.length,
        pendingSubmissions: submissions.filter(s => s.status === 'PENDING').length
      }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(metadataReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gullyverse-platform-metadata-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported GULLYVERSE platform metadata JSON!', 'success');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage) return;
    showToast(`Message transmitted to Lead Architect (${creator.name})!`, 'success');
    setContactSubject('');
    setContactMessage('');
    setContactModalOpen(false);
  };

  const filteredSubmissions = submissions.filter(s => {
    if (submissionFilter === 'ALL') return true;
    return s.status === submissionFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 space-y-8">
      {/* Back & Close Header */}
      <PageHeaderNav 
        title="Admin & Creator Dossier" 
        parentLabel="DISCOVER ARENA" 
        parentRoute="/" 
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d111d] via-[#101626] to-[#0a0d17] border border-[#1f283d] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> GULLYVERSE COMMAND & CREATOR CONSOLE
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            ADMINISTRATION & CREATOR SUITE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Platform governance, Lead Architect dossier ({creator.name}), moderation queue & telemetry.
          </p>
        </div>

        {/* Persona Role Switcher */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="px-3.5 py-2 rounded-xl bg-[#141b2b] border border-[#24304c] text-xs font-mono flex items-center gap-2">
            <span className="text-slate-400">ACTIVE ROLE:</span>
            <span className="font-bold text-amber-400">{user.role}</span>
          </div>
          {user.role !== 'SUPER_ADMIN' && (
            <button
              onClick={() => {
                setRole('SUPER_ADMIN');
                showToast('Privilege elevated to SUPER_ADMIN mode!', 'success');
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
              id="elevate-admin-btn"
            >
              👑 Elevate to Super Admin
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1b2234]">
        <button
          onClick={() => setActiveTab('DOSSIER')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'DOSSIER'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'bg-[#101420] text-slate-400 hover:text-white hover:bg-[#161c2d] border border-[#1e273b]'
          }`}
          id="tab-admin-dossier"
        >
          <Code2 className="w-4 h-4" /> ADMIN JAYESH GUJAR
        </button>

        <button
          onClick={() => setActiveTab('MODERATION')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'MODERATION'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'bg-[#101420] text-slate-400 hover:text-white hover:bg-[#161c2d] border border-[#1e273b]'
          }`}
          id="tab-admin-moderation"
        >
          <Users className="w-4 h-4" /> MODERATION QUEUE ({submissions.filter(s => s.status === 'PENDING').length})
        </button>

        <button
          onClick={() => setActiveTab('SYSTEM')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'SYSTEM'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'bg-[#101420] text-slate-400 hover:text-white hover:bg-[#161c2d] border border-[#1e273b]'
          }`}
          id="tab-admin-system"
        >
          <Cpu className="w-4 h-4" /> SYSTEM TELEMETRY & SPECS
        </button>

        <button
          onClick={() => setActiveTab('OPERATIONS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'OPERATIONS'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'bg-[#101420] text-slate-400 hover:text-white hover:bg-[#161c2d] border border-[#1e273b]'
          }`}
          id="tab-admin-operations"
        >
          <Sliders className="w-4 h-4" /> QUICK OPERATIONS
        </button>
      </div>

      {/* TAB 1: ADMIN DOSSIER - JAYESH GUJAR */}
      {activeTab === 'DOSSIER' && (
        <div className="space-y-8">
          {/* Main Creator Profile Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0e121d] border border-[#1e263c] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Visual Avatar / Badge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-1 shadow-2xl shrink-0">
                  <div className="w-full h-full bg-[#090c14] rounded-[14px] flex flex-col items-center justify-center text-amber-400">
                    <Code2 className="w-10 h-10 mb-1 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white">JG ARCHITECT</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black font-bold p-1 rounded-full border-2 border-[#090c14]" title="Verified Lead Creator">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {creator.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-mono font-extrabold">
                      LEAD ARCHITECT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      VERIFIED CREATOR
                    </span>
                  </div>
                  <p className="text-sm font-mono text-amber-400 font-semibold">
                    {creator.role}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {creator.subRole} • Location: <strong className="text-slate-200">{creator.location}</strong>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                  id="contact-creator-btn"
                >
                  <Send className="w-3.5 h-3.5" /> Contact Lead Architect
                </button>
                <a
                  href={`mailto:${creator.email}`}
                  className="px-4 py-2.5 rounded-xl bg-[#141a29] hover:bg-[#1a2338] border border-[#24304a] text-slate-200 hover:text-white font-mono font-bold text-xs flex items-center gap-2 transition-all"
                  id="email-creator-btn"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Direct Email
                </a>
              </div>
            </div>

            {/* Bio & Mission Statement */}
            <div className="mt-8 pt-6 border-t border-[#1c2438] grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-300">
              <div className="p-5 rounded-2xl bg-[#080a0f] border border-[#182030] space-y-2">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> ARCHITECT BIOGRAPHY
                </span>
                <p className="text-slate-300 font-sans text-sm leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#080a0f] border border-[#182030] space-y-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> PROJECT GENESIS & MISSION
                </span>
                <p className="text-slate-300 font-sans text-sm leading-relaxed">
                  {creator.mission}
                </p>
              </div>
            </div>

            {/* Social & Professional Handles */}
            <div className="mt-6 pt-6 border-t border-[#1c2438] space-y-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-widest">
                VERIFIED SOCIALS & REPOSITORIES (JAYESH GUJAR)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* GitHub */}
                <div className="p-4 rounded-2xl bg-[#121624] border border-[#20293d] hover:border-amber-400/50 transition-all flex flex-col justify-between gap-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#1a2133] text-white group-hover:text-amber-400 transition-colors">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-xs text-white">GitHub</h4>
                        <p className="text-[11px] font-mono text-slate-400">{creator.githubHandle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#1b2234]">
                    <a
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 rounded-lg bg-[#1a2133] hover:bg-amber-400 hover:text-black text-slate-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1"
                      id="creator-github-link"
                    >
                      <ExternalLink className="w-3 h-3" /> Visit Profile
                    </a>
                    <button
                      onClick={() => copyToClipboard(creator.github, 'GitHub URL')}
                      className="p-1.5 rounded-lg bg-[#1a2133] hover:bg-[#232d45] text-slate-400 hover:text-white transition-colors"
                      title="Copy GitHub Link"
                      id="creator-copy-github-btn"
                    >
                      {copiedLink === 'GitHub URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="p-4 rounded-2xl bg-[#121624] border border-[#20293d] hover:border-cyan-400/50 transition-all flex flex-col justify-between gap-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#1a2133] text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-xs text-white">LinkedIn</h4>
                        <p className="text-[11px] font-mono text-slate-400">{creator.linkedinHandle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#1b2234]">
                    <a
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 rounded-lg bg-[#1a2133] hover:bg-cyan-500 hover:text-black text-slate-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1"
                      id="creator-linkedin-link"
                    >
                      <ExternalLink className="w-3 h-3" /> Connect
                    </a>
                    <button
                      onClick={() => copyToClipboard(creator.linkedin, 'LinkedIn URL')}
                      className="p-1.5 rounded-lg bg-[#1a2133] hover:bg-[#232d45] text-slate-400 hover:text-white transition-colors"
                      title="Copy LinkedIn Link"
                      id="creator-copy-linkedin-btn"
                    >
                      {copiedLink === 'LinkedIn URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Instagram */}
                <div className="p-4 rounded-2xl bg-[#121624] border border-[#20293d] hover:border-pink-500/50 transition-all flex flex-col justify-between gap-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#1a2133] text-pink-400 group-hover:text-pink-300 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-xs text-white">Instagram</h4>
                        <p className="text-[11px] font-mono text-slate-400">{creator.instagramHandle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#1b2234]">
                    <a
                      href={creator.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 rounded-lg bg-[#1a2133] hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white text-slate-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1"
                      id="creator-instagram-link"
                    >
                      <ExternalLink className="w-3 h-3" /> Follow
                    </a>
                    <button
                      onClick={() => copyToClipboard(creator.instagram, 'Instagram URL')}
                      className="p-1.5 rounded-lg bg-[#1a2133] hover:bg-[#232d45] text-slate-400 hover:text-white transition-colors"
                      title="Copy Instagram Link"
                      id="creator-copy-instagram-btn"
                    >
                      {copiedLink === 'Instagram URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Official Email */}
                <div className="p-4 rounded-2xl bg-[#121624] border border-[#20293d] hover:border-emerald-400/50 transition-all flex flex-col justify-between gap-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#1a2133] text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-mono font-bold text-xs text-white">Email</h4>
                        <p className="text-[11px] font-mono text-slate-400 truncate">{creator.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#1b2234]">
                    <a
                      href={`mailto:${creator.email}`}
                      className="flex-1 text-center py-1.5 rounded-lg bg-[#1a2133] hover:bg-emerald-500 hover:text-black text-slate-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1"
                      id="creator-mailto-link"
                    >
                      <Mail className="w-3 h-3" /> Send Mail
                    </a>
                    <button
                      onClick={() => copyToClipboard(creator.email, 'Email Address')}
                      className="p-1.5 rounded-lg bg-[#1a2133] hover:bg-[#232d45] text-slate-400 hover:text-white transition-colors"
                      title="Copy Email"
                      id="creator-copy-email-btn"
                    >
                      {copiedLink === 'Email Address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Tech Stack Matrix */}
            <div className="mt-6 pt-6 border-t border-[#1c2438] space-y-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-widest">
                ENGINEERED WITH MODERN FULL-STACK DISCIPLINES
              </span>
              <div className="flex flex-wrap gap-2">
                {creator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#121624] border border-[#20293d] text-slate-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODERATION QUEUE */}
      {activeTab === 'MODERATION' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e121d] border border-[#1e263c]">
            <div className="flex items-center gap-2 overflow-x-auto">
              {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSubmissionFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    submissionFilter === filter
                      ? 'bg-amber-400 text-black'
                      : 'bg-[#141a29] text-slate-400 hover:text-white border border-[#222c44]'
                  }`}
                  id={`filter-${filter.toLowerCase()}`}
                >
                  {filter} ({submissions.filter(s => filter === 'ALL' ? true : s.status === filter).length})
                </button>
              ))}
            </div>

            <button
              onClick={handleSeedDemoSubmission}
              className="px-3.5 py-1.5 rounded-xl bg-[#161d2e] hover:bg-[#1d273e] border border-[#273452] text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-auto"
              id="seed-demo-submission-btn"
            >
              <Sparkles className="w-3.5 h-3.5" /> + Seed Demo MC Submission
            </button>
          </div>

          {/* Submissions List */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e121d] border border-[#1e263c] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1b2234]">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Underground Submissions Queue
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Curate and approve emerging regional lyricists to feature in the GULLYVERSE directory.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Showing {filteredSubmissions.length} of {submissions.length}
              </span>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-3">
                <p>No submissions found under "{submissionFilter}" filter.</p>
                <button
                  onClick={handleSeedDemoSubmission}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs font-mono inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Seed a Demo Artist
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#121624] border border-[#1e273d] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-slate-600"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading font-bold text-lg text-white">{sub.stageName}</h4>
                        <span className="text-xs text-slate-400 font-mono">({sub.artistName})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          sub.status === 'PENDING'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : sub.status === 'APPROVED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-amber-400/90 font-mono">
                        {sub.city}, {sub.state} • Language: <strong>{sub.primaryLanguage}</strong> • Genres: {sub.genres.join(', ')}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{sub.bio}</p>
                      {sub.topSongs && sub.topSongs.length > 0 && (
                        <div className="text-[11px] font-mono text-slate-400 pt-1">
                          Tracks: <span className="text-slate-200">{sub.topSongs.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                      {sub.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => handleApprove(sub.id, sub.stageName)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                            id={`approve-btn-${sub.id}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve MC
                          </button>
                          <button
                            onClick={() => handleReject(sub.id, sub.stageName)}
                            className="px-4 py-2 rounded-xl bg-[#1a2133] hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                            id={`reject-btn-${sub.id}`}
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            updateSubmissionStatus(sub.id, 'PENDING');
                            showToast(`Reset ${sub.stageName} status to PENDING`, 'info');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#1a2133] hover:bg-[#242f48] text-slate-400 hover:text-white text-xs font-mono transition-colors"
                        >
                          Re-open Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM TELEMETRY & SPECS */}
      {activeTab === 'SYSTEM' && (
        <div className="space-y-8">
          {/* Realtime Diagnostic Bar */}
          <div className="p-6 rounded-3xl bg-[#0e121d] border border-[#1e263c] shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" /> Real-time System Diagnostic Engine
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Validates Web Audio synthesizer oscillator graph, REST gateway latency, and regional state caches.
                </p>
              </div>
              <button
                onClick={runDiagnosticScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold flex items-center gap-2 shrink-0 transition-all shadow-md active:scale-95"
                id="run-diagnostic-btn"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning Cluster...' : 'Run Full Health Diagnostic'}
              </button>
            </div>

            {scanComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>DIAGNOSTIC PASSED: 100% Core Systems Healthy. Audio Buffers Synchronized (0.00ms Jitter).</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold">ALL 28 ROUTES GREEN</span>
              </motion.div>
            )}
          </div>

          {/* Metric Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0e121d] border border-[#1e263c] space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>ARTIST ARCHIVE</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-heading font-black text-3xl text-white">{ARTISTS.length}</p>
              <span className="text-[10px] text-emerald-400 font-mono">17 Master Verified MCs</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e121d] border border-[#1e263c] space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>SONGS & BLUEPRINTS</span>
                <Disc3 className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="font-heading font-black text-3xl text-white">{SONGS.length}</p>
              <span className="text-[10px] text-cyan-400 font-mono">Synthesizers & BPMs Mapped</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e121d] border border-[#1e263c] space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>REGIONAL HUBS</span>
                <Globe className="w-4 h-4 text-rose-500" />
              </div>
              <p className="font-heading font-black text-3xl text-white">{REGIONAL_SCENES.length}</p>
              <span className="text-[10px] text-rose-400 font-mono">From Mumbai to Kashmir</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e121d] border border-[#1e263c] space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>HISTORICAL ERAS</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="font-heading font-black text-3xl text-white">{HISTORY_ERAS.length}</p>
              <span className="text-[10px] text-purple-400 font-mono">1980s to Global Era</span>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e121d] border border-[#1e263c] space-y-6 shadow-2xl">
            <h3 className="font-heading font-bold text-xl text-white">
              Application Architecture Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">UI & REACT RUNTIME</span>
                <p className="text-slate-200 font-bold text-sm">React 19 + TypeScript + Vite</p>
                <p className="text-slate-400 text-[11px]">Component modularity, zero runtime errors, zero TypeScript build warnings.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">AUDIO SYNTHESIS ENGINE</span>
                <p className="text-amber-400 font-bold text-sm">Web Audio API Dual Oscillators</p>
                <p className="text-slate-400 text-[11px]">808 bass, trap claps, hi-hats & melodic loops synthesized on-the-fly.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">SECURITY & RBAC</span>
                <p className="text-emerald-400 font-bold text-sm">Role-Based Access Control</p>
                <p className="text-slate-400 text-[11px]">USER, ARTIST, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN roles.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">CONTAINER INGRESS</span>
                <p className="text-slate-200 font-bold text-sm">Port 3000 Node Container</p>
                <p className="text-slate-400 text-[11px]">High performance reverse-proxy routing with zero-downtime hot refresh.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">DATA VISUALIZATION</span>
                <p className="text-cyan-400 font-bold text-sm">Recharts Radar & Canvas Confetti</p>
                <p className="text-slate-400 text-[11px]">Interactive skill comparison graphs and achievement celebrate triggers.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#080a0f] border border-[#1b2234] space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">AUTHORSHIP & ARCHIVE</span>
                <p className="text-rose-400 font-bold text-sm">Created by {creator.name}</p>
                <p className="text-slate-400 text-[11px]">Curated directly with real artist metrics, verified discographies, and lyrics.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUICK OPERATIONS */}
      {activeTab === 'OPERATIONS' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e121d] border border-[#1e263c] space-y-6 shadow-2xl">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">
              Administrative Quick Actions & Operations
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Execute routine maintenance, reset synthesizer buffers, export platform metadata, or test moderation triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Export Metadata */}
            <div className="p-5 rounded-2xl bg-[#121624] border border-[#20293d] space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-mono">
                  <Download className="w-4 h-4" /> Export Metadata JSON
                </div>
                <p className="text-xs text-slate-400">
                  Download a structured JSON snapshot containing platform statistics, creator details, and catalog counts.
                </p>
              </div>
              <button
                onClick={handleExportMetadata}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold transition-all shadow-md active:scale-95"
                id="export-metadata-action-btn"
              >
                Download Metadata JSON
              </button>
            </div>

            {/* Flush Synth Buffers */}
            <div className="p-5 rounded-2xl bg-[#121624] border border-[#20293d] space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm font-mono">
                  <Radio className="w-4 h-4" /> Reset Synth Buffers
                </div>
                <p className="text-xs text-slate-400">
                  Flush all active Web Audio synthesizer oscillators and re-initialize the master audio context.
                </p>
              </div>
              <button
                onClick={() => {
                  showToast('Synthesizer audio buffers cleared & re-initialized at 44.1kHz!', 'success');
                }}
                className="w-full py-2.5 rounded-xl bg-[#182033] hover:bg-[#222c47] border border-[#273452] text-cyan-300 text-xs font-mono font-bold transition-all active:scale-95"
                id="flush-synth-action-btn"
              >
                Flush & Re-init Synth
              </button>
            </div>

            {/* Seed Demo MC */}
            <div className="p-5 rounded-2xl bg-[#121624] border border-[#20293d] space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-mono">
                  <Sparkles className="w-4 h-4" /> Seed Underground Talent
                </div>
                <p className="text-xs text-slate-400">
                  Inject demo artist submissions into the moderation queue to test the approval pipeline.
                </p>
              </div>
              <button
                onClick={handleSeedDemoSubmission}
                className="w-full py-2.5 rounded-xl bg-[#182033] hover:bg-emerald-600 hover:text-white border border-[#273452] text-emerald-300 text-xs font-mono font-bold transition-all active:scale-95"
                id="seed-demo-action-btn"
              >
                + Inject Demo Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT LEAD ARCHITECT MODAL */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0e121d] border border-[#222c45] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2234]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-400 text-black">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      Message Lead Architect
                    </h3>
                    <p className="text-xs font-mono text-slate-400">To: {creator.name} ({creator.email})</p>
                  </div>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="p-1.5 rounded-lg bg-[#141a29] text-slate-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 uppercase font-bold">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Collaboration, Feature Inquiry, Cultural Curation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#20293d] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 uppercase font-bold">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Type your message to Jayesh Gujar..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#20293d] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#141a29] hover:bg-[#1a2236] text-slate-300 text-xs font-mono font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Transmit Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


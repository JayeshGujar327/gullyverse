import React from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Code2,
  Music2,
  Globe2,
  Database,
  Sparkles,
  Heart,
  Layers3,
  ArrowRight
} from "lucide-react";

const creator = {
  name: "Jayesh Gujar",
  github: "https://github.com/JayeshGujar327",
  linkedin: "https://www.linkedin.com/in/jayesh-gujar-943626315/",
  instagram: "https://instagram.com/thejayesh327",
  email: "gujarj327@gmail.com"
};

const stack = [
  ["React", "Modern component-based frontend architecture.", Code2],
  ["TypeScript", "Structured and maintainable application development.", Layers3],
  ["Vite", "Fast development and optimized production builds.", Sparkles],
  ["Tailwind CSS", "Responsive and highly customized visual system.", Globe2],
  ["Node.js / Express", "Backend-ready architecture for future APIs and services.", Database],
  ["Web Audio", "Interactive music-player and audio experience architecture.", Music2]
];

const features = [
  "Artist Encyclopedia",
  "Indian Hip-Hop Music Discovery",
  "Regional Hip-Hop Map",
  "Hip-Hop History",
  "Cypher & Battle Archive",
  "Flow Lab / Rap Learning",
  "Producer Discovery",
  "Artist DNA Comparison",
  "Interactive Quizzes",
  "Playlist Experience",
  "Community Artist Submission",
  "Admin & Moderation"
];

export function AboutCreatorPage() {
  return (
    <div className="min-h-screen bg-[#080a0f] text-white px-4 sm:px-6 lg:px-10 py-8 pb-32">

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#10151b] via-[#0b0f14] to-[#07100b] p-7 sm:p-10 lg:p-14">

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1ed760]/10 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#1ed760]/30 bg-[#1ed760]/10 px-4 py-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#1ed760]">
            <Sparkles className="w-3.5 h-3.5" />
            BEHIND GULLYVERSE
          </div>

          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
            Built with code.
            <br />
            <span className="text-[#1ed760]">
              Driven by culture.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-sm sm:text-base lg:text-lg leading-7 text-slate-300">
            GULLYVERSE is an interactive digital universe created to
            document, celebrate and make Indian Hip-Hop culture easier
            to discover.
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Music, artists, regional scenes, history, cyphers, battles,
            education and community — connected inside one immersive
            platform.
          </p>

          {/* REAL SOCIAL LINKS */}
          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href={creator.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black hover:scale-[1.02] transition-transform"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>

            <a
              href={creator.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>

            <a
              href={creator.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>

            <a
              href={`mailto:${creator.email}`}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>

          </div>
        </div>
      </section>

      {/* CREATOR + WHY */}
      <section className="max-w-6xl mx-auto mt-7 grid lg:grid-cols-2 gap-6">

        {/* CREATOR */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1117] p-7 sm:p-9">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-[#1ed760]/10 border border-[#1ed760]/20 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#1ed760]" />
            </div>

            <div>
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#1ed760]">
                CREATOR
              </p>

              <h2 className="text-2xl font-black">
                Jayesh Gujar
              </h2>
            </div>

          </div>

          <p className="mt-6 text-sm font-semibold text-white">
            Creator • Lead Architect • Full-Stack Platform Engineer
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            A developer-focused project combining modern web engineering,
            interactive media, structured cultural data and immersive
            user experience.
          </p>

          <div className="mt-7 space-y-4 text-xs font-mono">

            <div>
              <span className="text-[#1ed760]">GITHUB</span>
              <p className="mt-1 text-slate-300">
                github.com/JayeshGujar327
              </p>
            </div>

            <div>
              <span className="text-[#1ed760]">LINKEDIN</span>
              <p className="mt-1 text-slate-300">
                linkedin.com/in/jayesh-gujar-943626315
              </p>
            </div>

            <div>
              <span className="text-[#1ed760]">INSTAGRAM</span>
              <p className="mt-1 text-slate-300">
                @thejayesh327
              </p>
            </div>

            <div>
              <span className="text-[#1ed760]">EMAIL</span>
              <p className="mt-1 text-slate-300">
                gujarj327@gmail.com
              </p>
            </div>

          </div>
        </div>

        {/* WHY */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1117] p-7 sm:p-9">

          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#1ed760]" />

            <h2 className="text-2xl font-black">
              Why GULLYVERSE?
            </h2>
          </div>

          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300">

            <p>
              Indian Hip-Hop has grown from local streets, underground
              cyphers and independent artists into a powerful national
              cultural movement.
            </p>

            <p>
              But discovering that journey can be fragmented across
              platforms, cities, languages and communities.
            </p>

            <p>
              GULLYVERSE was created to bring these pieces together
              inside one interactive experience.
            </p>

            <p className="font-semibold text-white">
              The goal is to preserve the culture, make discovery
              exciting and create a digital space for Indian Hip-Hop
              that feels as ambitious as the movement itself.
            </p>

          </div>
        </div>

      </section>

      {/* PROJECT VISION */}
      <section className="max-w-6xl mx-auto mt-7 rounded-3xl border border-white/10 bg-[#0d1117] p-7 sm:p-9">

        <p className="text-[10px] font-mono tracking-[0.2em] text-[#1ed760]">
          PROJECT VISION
        </p>

        <h2 className="mt-3 text-3xl sm:text-4xl font-black">
          More than a music website.
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          GULLYVERSE connects music discovery, education, history,
          regional identity and community into one interactive
          Indian Hip-Hop ecosystem.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {features.map((feature) => (
            <div
              key={feature}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:border-[#1ed760]/30 hover:bg-[#1ed760]/5 transition-all"
            >
              <span className="text-sm font-semibold text-slate-200">
                {feature}
              </span>

              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-[#1ed760]" />
            </div>
          ))}

        </div>
      </section>

      {/* TECH STACK */}
      <section className="max-w-6xl mx-auto mt-7">

        <div className="mb-6">

          <p className="text-[10px] font-mono tracking-[0.2em] text-[#1ed760]">
            ENGINEERING
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-black">
            Technology Stack
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            Modern technologies selected for performance,
            maintainability, responsiveness and future scalability.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {stack.map(([name, description, Icon]) => {

            const StackIcon = Icon as React.ElementType;

            return (
              <div
                key={name as string}
                className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 hover:border-[#1ed760]/30 hover:-translate-y-1 transition-all"
              >

                <StackIcon className="w-5 h-5 text-[#1ed760]" />

                <h3 className="mt-5 font-bold text-white">
                  {name as string}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {description as string}
                </p>

              </div>
            );

          })}

        </div>
      </section>

      {/* FINAL */}
      <section className="max-w-6xl mx-auto mt-7">

        <div className="rounded-3xl border border-[#1ed760]/20 bg-[#1ed760]/5 p-8 sm:p-12 text-center">

          <p className="text-[10px] font-mono tracking-[0.3em] text-[#1ed760]">
            FROM GULLY TO GLOBAL
          </p>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black">
            One country. Many flows.
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-7 text-slate-300">
            GULLYVERSE is a tribute to the artists, producers, writers,
            cities, languages and communities that continue to push
            Indian Hip-Hop forward.
          </p>

          <a
            href={`mailto:${creator.email}`}
            className="inline-flex items-center gap-2 mt-8 rounded-xl bg-[#1ed760] px-6 py-3 text-sm font-black text-black hover:brightness-110 transition-all"
          >
            <Mail className="w-4 h-4" />
            Connect with Jayesh
          </a>

        </div>
      </section>

    </div>
  );
}

export default AboutCreatorPage;

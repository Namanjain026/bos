import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
import {
  Sparkles,
  TrendingUp,
  Flame,
  Star,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Compass,
  PenTool,
} from "lucide-react";

export default function HomePage() {
  const featuredWork = MOCK_WORKS[0];
  const mangaWorks = MOCK_WORKS.filter((w) => w.type === "MANGA" || w.type === "COMIC");
  const novelWorks = MOCK_WORKS.filter((w) => w.type === "NOVEL" || w.type === "LIGHT_NOVEL" || w.type === "SHORT_STORY");

  const genresList = [
    { name: "Fantasy", count: "1.4k stories", color: "from-violet-600/20 to-purple-900/30 border-violet-500/30 text-violet-300" },
    { name: "Manga & Comics", count: "890 series", color: "from-fuchsia-600/20 to-pink-900/30 border-fuchsia-500/30 text-fuchsia-300" },
    { name: "Sci-Fi & Cyberpunk", count: "620 stories", color: "from-cyan-600/20 to-blue-900/30 border-cyan-500/30 text-cyan-300" },
    { name: "Horror & Mystery", count: "430 tales", color: "from-rose-600/20 to-red-900/30 border-rose-500/30 text-rose-300" },
    { name: "Light Novels", count: "780 works", color: "from-amber-600/20 to-orange-900/30 border-amber-500/30 text-amber-300" },
    { name: "Short Stories", count: "1.1k pieces", color: "from-emerald-600/20 to-teal-900/30 border-emerald-500/30 text-emerald-300" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600 selection:text-white">
      <Navbar />

      <main className="flex-1 space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-10 lg:p-14 shadow-2xl">
            {/* Background Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Headline & Value Prop */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-700/50 text-violet-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Creator-First Publishing Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                  Read, Write & Monetize <br />
                  <span className="text-gradient">Without Boundaries.</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
                  Discover serialized novels, full-color manga, light novels, and short stories. Support authors through Members-First early access and hone your craft with AI-powered manuscript critique.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/discover"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Compass className="w-4 h-4" /> Start Reading
                  </Link>

                  <Link
                    href="/create"
                    className="px-6 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-sm flex items-center gap-2 transition-all hover:border-violet-500"
                  >
                    <PenTool className="w-4 h-4 text-violet-400" /> Publish Your Work
                  </Link>
                </div>

                {/* Micro Metrics Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 text-left max-w-lg">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-white">100%</span>
                    <p className="text-[11px] text-zinc-400">Creator Owned</p>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-violet-400">Dual</span>
                    <p className="text-[11px] text-zinc-400">Text & Manga Engine</p>
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-amber-400">0% Cut</span>
                    <p className="text-[11px] text-zinc-400">For Platform Free Tier</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Spotlight Card */}
              <div className="lg:col-span-5">
                <div className="relative group p-1.5 rounded-3xl bg-gradient-to-br from-violet-500/40 via-fuchsia-500/20 to-amber-500/40 shadow-2xl">
                  <div className="bg-zinc-950 rounded-[22px] overflow-hidden p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-400" /> #1 Featured Serial
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-violet-950 border border-violet-800 text-violet-300 font-semibold text-[10px]">
                        Members First Active
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredWork.coverUrl!}
                        alt={featuredWork.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded-md text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" /> {featuredWork.averageRating}
                        </div>
                        <span className="bg-black/80 px-2 py-1 rounded-md text-zinc-300 text-[11px]">
                          {featuredWork.chapterCount} Chapters
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">
                        {featuredWork.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {featuredWork.description}
                      </p>
                    </div>

                    <Link
                      href={`/work/${featuredWork.slug}`}
                      className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/30 transition-all"
                    >
                      <span>Read Episode 1 Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Continue Reading Bar (Quick Resume) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-violet-400 font-bold">Continue Reading</span>
                <p className="text-sm font-semibold text-zinc-200 truncate">{featuredWork.title} — Chapter 1</p>
              </div>
            </div>

            <Link
              href={`/read/${featuredWork.id}/ch-1`}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-zinc-800 hover:bg-violet-600 text-xs font-semibold text-white transition-all text-center shrink-0"
            >
              Resume (65% left)
            </Link>
          </div>
        </section>

        {/* Trending Works Section (Deterministic Algorithm) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Trending Now
                </h2>
                <p className="text-xs text-zinc-400">Ranked by recent velocity, reads, and engagement</p>
              </div>
            </div>

            <Link
              href="/rankings"
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 group"
            >
              View Leaderboard <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_WORKS.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        </section>

        {/* Manga & Visual Webtoons Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Manga & Webtoons
                </h2>
                <p className="text-xs text-zinc-400">Full-color visual serials with vertical scroll mode</p>
              </div>
            </div>

            <Link
              href="/discover?type=MANGA"
              className="text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 group"
            >
              Explore Manga <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mangaWorks.concat(MOCK_WORKS.slice(0, 1)).map((work, idx) => (
              <BookCard key={`${work.id}-${idx}`} work={work} aspectRatio="wide" />
            ))}
          </div>
        </section>

        {/* Explore By Genre Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Browse by Universe & Genre
                </h2>
                <p className="text-xs text-zinc-400">From high fantasy epics to cyberpunk mysteries</p>
              </div>
            </div>

            <Link
              href="/genres"
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              All Genres
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {genresList.map((g) => (
              <Link
                key={g.name}
                href={`/discover?genre=${encodeURIComponent(g.name)}`}
                className={`p-4 rounded-2xl bg-gradient-to-b border ${g.color} hover:scale-105 transition-transform flex flex-col justify-between h-28 shadow-sm`}
              >
                <span className="font-bold text-sm text-zinc-100">{g.name}</span>
                <span className="text-[11px] opacity-70">{g.count}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Creator Studio & AI "Rate My Book" Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-violet-800/40 bg-gradient-to-r from-violet-950/50 via-zinc-950 to-fuchsia-950/50 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-700/60 text-violet-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Rate My Book Suite
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Actionable AI Feedback for Authors
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Before publishing your chapter, run it through our multi-dimensional literary critique engine. Get instant feedback on pacing, dialogue naturalism, character voice, and story structure.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/create"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 flex items-center gap-2"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Test Manuscript in Studio
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-violet-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Craft Diagnostic
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    Ready
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Pacing & Tension</span>
                    <span className="text-amber-400 font-bold">92 / 100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[92%]" />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-zinc-400">Dialogue Naturalism</span>
                    <span className="text-violet-400 font-bold">88 / 100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-400 h-full w-[88%]" />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-zinc-400">World-Building Balance</span>
                    <span className="text-emerald-400 font-bold">95 / 100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[95%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

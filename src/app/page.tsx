import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
import {
  TrendingUp,
  Star,
  BookOpen,
  ArrowRight,
  Zap,
  Layers,
  Compass,
  PenTool,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  const featuredWork = MOCK_WORKS[0];
  const mangaWorks = MOCK_WORKS.filter((w) => w.type === "MANGA" || w.type === "COMIC");
  const novelWorks = MOCK_WORKS.filter((w) => w.type === "NOVEL" || w.type === "LIGHT_NOVEL" || w.type === "SHORT_STORY");

  const genresList = [
    { name: "Fantasy", count: "1,420 works" },
    { name: "Manga & Comics", count: "890 series" },
    { name: "Sci-Fi", count: "620 works" },
    { name: "Horror & Mystery", count: "430 works" },
    { name: "Light Novels", count: "780 works" },
    { name: "Short Stories", count: "1,100 pieces" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 space-y-16 pb-16">
        {/* Editorial Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl mx-auto">
          <div className="rounded-2xl border border-[#27272d] bg-[#161619] p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Mission & Headline */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#222227] border border-[#2f2f36] text-zinc-300 text-xs font-mono">
                  <span>Open Publishing Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.15]">
                  Stories written chapter by chapter. <br />
                  <span className="italic text-zinc-400">Read, publish, and support.</span>
                </h1>

                <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
                  Book of Shades brings together serialized novels, original webcomics, and short fiction with creator-controlled early access, clean reading tools, and editorial manuscript critique.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/discover"
                    className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center gap-2 transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5" /> Start Reading
                  </Link>

                  <Link
                    href="/create"
                    className="px-5 py-2.5 rounded-lg bg-[#222227] hover:bg-[#2a2a30] border border-[#34343d] text-zinc-200 font-semibold text-xs flex items-center gap-2 transition-colors"
                  >
                    <PenTool className="w-3.5 h-3.5" /> Creator Studio
                  </Link>
                </div>

                {/* Micro Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#27272d] text-left max-w-md font-mono text-xs">
                  <div>
                    <span className="text-base font-bold text-white block">100%</span>
                    <span className="text-zinc-500 text-[11px]">Creator Owned</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-zinc-200 block">Dual</span>
                    <span className="text-zinc-500 text-[11px]">Text & Manga</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-zinc-200 block">Direct</span>
                    <span className="text-zinc-500 text-[11px]">Members First</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Serial Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#1a1a1e] border border-[#2f2f37] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">#1 Trending Serial</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                      Members First
                    </span>
                  </div>

                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredWork.coverUrl!}
                      alt={featuredWork.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-current" /> {featuredWork.averageRating}
                      </div>
                      <span className="bg-black/80 px-2 py-0.5 rounded text-zinc-300 text-[10px]">
                        {featuredWork.chapterCount} Chapters
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-white">
                      {featuredWork.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {featuredWork.description}
                    </p>
                  </div>

                  <Link
                    href={`/work/${featuredWork.slug}`}
                    className="w-full py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Read First Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Resume Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-8 h-8 rounded-lg bg-[#222227] flex items-center justify-center text-zinc-300 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-semibold">Reading Progress</span>
                <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">{featuredWork.title} — Chapter 1</p>
              </div>
            </div>

            <Link
              href={`/read/${featuredWork.id}/ch-1`}
              className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-[#24242a] hover:bg-[#2e2e36] text-xs font-medium text-zinc-200 transition-colors text-center shrink-0 border border-[#31313a]"
            >
              Resume Reading (65%)
            </Link>
          </div>
        </section>

        {/* Trending Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Trending Serials & Stories
              </h2>
              <p className="text-xs text-zinc-400">Updated hourly based on reader completion and activity</p>
            </div>

            <Link
              href="/rankings"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1"
            >
              All Rankings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_WORKS.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        </section>

        {/* Manga & Visual Comics Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Manga & Webcomics
              </h2>
              <p className="text-xs text-zinc-400">Sequential art with vertical scroll and page-by-page modes</p>
            </div>

            <Link
              href="/discover?type=MANGA"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1"
            >
              Browse Comics <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mangaWorks.concat(MOCK_WORKS.slice(0, 1)).map((work, idx) => (
              <BookCard key={`${work.id}-${idx}`} work={work} aspectRatio="wide" />
            ))}
          </div>
        </section>

        {/* Browse by Genre */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Browse Genres
              </h2>
              <p className="text-xs text-zinc-400">Find your next obsession by category</p>
            </div>

            <Link
              href="/genres"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1"
            >
              Directory <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {genresList.map((g) => (
              <Link
                key={g.name}
                href={`/discover?genre=${encodeURIComponent(g.name)}`}
                className="p-3.5 rounded-xl bg-[#161619] hover:bg-[#1f1f24] border border-[#27272d] hover:border-[#3d3d46] transition-colors flex flex-col justify-between h-24"
              >
                <span className="font-semibold text-xs text-zinc-200">{g.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{g.count}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

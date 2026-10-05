import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_WORKS } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import {
  Star,
  BookOpen,
  Bookmark,
  Share2,
  Lock,
  Sparkles,
  Clock,
  Heart,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = MOCK_WORKS.find((w) => w.slug === slug) || MOCK_WORKS[0];

  if (!work) {
    notFound();
  }

  const isManga = work.type === "MANGA" || work.type === "COMIC";

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Work Hero Header Banner */}
        <section className="relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Cover Art Card */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.coverUrl!}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-violet-600 text-white shadow">
                    {work.type.replace("_", " ")}
                  </span>
                  {work.isExclusive && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-zinc-950 flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3 fill-current" /> Exclusive
                    </span>
                  )}
                </div>
              </div>

              {/* Start Reading Button CTA */}
              <div className="w-full max-w-[280px] mt-4 space-y-2">
                <Link
                  href={`/read/${work.id}/${work.chaptersList[0]?.id || "ch-1"}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Reading Ch. 1</span>
                </Link>

                <button className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2 transition-colors">
                  <Bookmark className="w-4 h-4 text-violet-400" />
                  <span>Add to Library</span>
                </button>
              </div>
            </div>

            {/* Right: Info & Metadata */}
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-zinc-400">Language: <strong className="text-zinc-200">{work.language}</strong></span>
                  <span>•</span>
                  <span className="text-zinc-400">Rating: <strong className="text-amber-400">{work.ageRating}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ongoing Serialization
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {work.title}
                </h1>

                {/* Creator Attribution & Follow */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={work.creator.avatarUrl!}
                      alt={work.creator.displayName}
                      className="w-8 h-8 rounded-full object-cover border border-violet-500/40"
                    />
                    <div>
                      <span className="text-xs text-zinc-400 block">Created by</span>
                      <strong className="text-sm text-zinc-100">{work.creator.displayName}</strong>
                    </div>
                  </div>

                  <button className="px-3.5 py-1 rounded-full bg-violet-950 border border-violet-700/60 hover:bg-violet-900 text-violet-200 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> Follow Creator
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating
                  </span>
                  <p className="text-base font-bold text-zinc-100">{work.averageRating} <span className="text-xs font-normal text-zinc-400">({work.ratingCount})</span></p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-violet-400" /> Chapters
                  </span>
                  <p className="text-base font-bold text-zinc-100">{work.chapterCount}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Updated
                  </span>
                  <p className="text-base font-bold text-zinc-100">{work.updatedAt}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Access
                  </span>
                  <p className="text-base font-bold text-emerald-400">Free + Early Access</p>
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Synopsis</h3>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {work.synopsisLong}
                </p>
              </div>

              {/* Genre & Tag Pills */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Genres & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {work.genres.map((g) => (
                    <Link
                      key={g}
                      href={`/discover?genre=${encodeURIComponent(g)}`}
                      className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-violet-950 border border-zinc-800 hover:border-violet-700 text-xs font-medium text-zinc-300 transition-colors"
                    >
                      {g}
                    </Link>
                  ))}
                  <span className="px-3 py-1 rounded-lg bg-violet-950/40 border border-violet-800/40 text-xs font-medium text-violet-300">
                    #WebSerial
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-violet-950/40 border border-violet-800/40 text-xs font-medium text-violet-300">
                    #MagicRealism
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Table of Contents ({work.chaptersList.length} Chapters)
              </h2>
              <p className="text-xs text-zinc-400">Read chapters instantly or support author via Members-First</p>
            </div>
          </div>

          <div className="space-y-3">
            {work.chaptersList.map((ch) => (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  ch.isMembersOnly
                    ? "bg-amber-950/10 border-amber-500/30 hover:border-amber-500/60"
                    : "bg-zinc-900/60 border-zinc-800/80 hover:border-violet-500/50 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      ch.isMembersOnly
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {ch.chapterNumber}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">
                        {ch.title}
                      </h4>
                      {ch.isMembersOnly && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-amber-500/40 shrink-0">
                          <Lock className="w-3 h-3" /> Members First ({ch.publicAt})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      {ch.wordCount > 0 && <span>{ch.wordCount} words</span>}
                      <span>•</span>
                      <span>Released {ch.releasedAt}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/read/${work.id}/${ch.id}`}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      ch.isMembersOnly
                        ? "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20"
                        : "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20"
                    }`}
                  >
                    <span>{ch.isMembersOnly ? "Unlock" : "Read"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

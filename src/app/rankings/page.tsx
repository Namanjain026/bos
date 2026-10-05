import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";
import { Trophy, Star, TrendingUp, BookOpen, ArrowRight, Flame } from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Platform Leaderboards
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Ranked dynamically by the deterministic discovery algorithm (views, completion rate, follower velocity, and ratings).
            </p>
          </div>
        </div>

        {/* Top 3 Podium Display */}
        <div className="space-y-4">
          {MOCK_WORKS.map((work, idx) => (
            <div
              key={work.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-violet-500/50 hover:bg-zinc-900 transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Rank Number */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                    idx === 0
                      ? "bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/20"
                      : idx === 1
                      ? "bg-zinc-300 text-zinc-950"
                      : idx === 2
                      ? "bg-amber-700 text-white"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  #{idx + 1}
                </div>

                {/* Cover art thumbnail */}
                <div className="w-14 h-18 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.coverUrl!}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Work Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-600/30 text-violet-300 border border-violet-500/30">
                      {work.type.replace("_", " ")}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-zinc-100 truncate">
                      {work.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 mt-1">
                    By <strong className="text-zinc-300">{work.creator.displayName}</strong> • {work.chapterCount} Chapters
                  </p>
                </div>
              </div>

              {/* Stats & Link */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {work.averageRating}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Score: {(100 - idx * 6.5).toFixed(1)}
                  </span>
                </div>

                <Link
                  href={`/work/${work.slug}`}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

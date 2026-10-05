import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="pb-4 border-b border-[#27272d]">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Leaderboard
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5 font-mono">
            Trending ranking computed from reader completion velocity, bookmarks, and ratings.
          </p>
        </div>

        <div className="space-y-2.5">
          {MOCK_WORKS.map((work, idx) => (
            <div
              key={work.id}
              className="p-4 rounded-xl bg-[#161619] border border-[#27272d] hover:border-[#383842] transition-colors flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                {/* Rank Number */}
                <div className="w-7 text-center font-mono font-bold text-sm text-zinc-400 shrink-0">
                  #{idx + 1}
                </div>

                {/* Cover thumbnail */}
                <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-[#27272d]">
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
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#222227] text-zinc-300">
                      {work.type.replace("_", " ")}
                    </span>
                    <h3 className="font-semibold text-xs sm:text-sm text-zinc-100 truncate">
                      {work.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 mt-0.5">
                    {work.creator.displayName} • {work.chapterCount} Chapters
                  </p>
                </div>
              </div>

              {/* Stats & Read CTA */}
              <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right font-mono text-xs">
                  <span className="font-semibold text-zinc-200 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {work.averageRating}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Score: {(100 - idx * 6.5).toFixed(1)}
                  </span>
                </div>

                <Link
                  href={`/work/${work.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#222227] hover:bg-zinc-100 hover:text-zinc-950 text-zinc-200 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
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

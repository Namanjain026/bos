import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getPublishedWorks } from "@/lib/works-service";
import {
  Star,
  BookOpen,
  ArrowRight,
  Zap,
  Layers,
  Compass,
  PenTool,
  Clock,
  Flame,
} from "lucide-react";

export default async function HomePage() {
  const allWorks = await getPublishedWorks({ limit: 12 });

  const featuredWork = allWorks[0];
  const recentlyUploaded = allWorks.slice(0, 4);
  const mangaWorks = allWorks.filter((w) => w.type === "MANGA" || w.type === "COMIC");

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
              {featuredWork && (
                <div className="lg:col-span-5">
                  <div className="bg-[#1a1a1e] border border-[#2f2f37] rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Featured Release</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                        {featuredWork.type.replace("_", " ")}
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
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recently Uploaded Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400" />
                Recently Uploaded & Updated
              </h2>
              <p className="text-xs text-zinc-400">Fresh serialized chapters from community creators</p>
            </div>

            <Link
              href="/discover?sort=latest"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyUploaded.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        </section>

        {/* Trending Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Trending Stories & Serials
              </h2>
              <p className="text-xs text-zinc-400">Ranked by reader completion rate and follower velocity</p>
            </div>

            <Link
              href="/rankings"
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1"
            >
              All Rankings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allWorks.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        </section>

        {/* Manga & Visual Comics Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-zinc-400" />
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
            {(mangaWorks.length > 0 ? mangaWorks : allWorks.slice(0, 3)).map((work, idx) => (
              <BookCard key={`${work.id}-${idx}`} work={work} aspectRatio="wide" />
            ))}
          </div>
        </section>

        {/* Browse by Genre */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-400" />
                Browse Genres
              </h2>
              <p className="text-xs text-zinc-400">Find stories by category</p>
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

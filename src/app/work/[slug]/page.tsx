import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_WORKS } from "@/lib/mock-data";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import {
  Star,
  BookOpen,
  Bookmark,
  Lock,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;

  // Try fetching from live Supabase database first
  let dbWork = null;
  try {
    dbWork = await db.work.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: {
        creator: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        chapters: {
          orderBy: { chapterNumber: "asc" },
        },
        genres: { include: { genre: true } },
      },
    });
  } catch (err) {
    console.error("Failed to query db for work:", err);
  }

  // Fallback to mock works if not in DB
  const mockWork = MOCK_WORKS.find((w) => w.slug === slug || w.id === slug);

  if (!dbWork && !mockWork) {
    notFound();
  }

  const work = dbWork
    ? {
        id: dbWork.id,
        title: dbWork.title,
        slug: dbWork.slug,
        description: dbWork.description,
        synopsisLong: dbWork.description,
        coverUrl: dbWork.coverUrl || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        type: dbWork.type,
        ageRating: dbWork.ageRating,
        language: dbWork.language,
        creator: dbWork.creator,
        genres: dbWork.genres.map((g) => g.genre.name),
        averageRating: 5.0,
        ratingCount: 1,
        chapterCount: dbWork.chapters.length,
        updatedAt: "Recently",
        chaptersList: dbWork.chapters.map((ch) => ({
          id: ch.id,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          wordCount: ch.wordCount,
          isMembersOnly: ch.isMembersOnly,
          releasedAt: ch.createdAt.toISOString().split("T")[0],
          publicAt: ch.publicAt ? `In ${Math.ceil((ch.publicAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days` : undefined,
        })),
      }
    : mockWork!;

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Work Overview Header */}
        <section className="bg-[#161619] border border-[#27272d] rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Cover Card */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] max-w-[240px] rounded-xl overflow-hidden shadow-md border border-[#2c2c33]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.coverUrl!}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 font-mono text-[10px]">
                  <span className="font-semibold px-2 py-0.5 rounded bg-black/80 text-white border border-white/10">
                    {work.type.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-[240px] mt-4 space-y-2">
                {work.chaptersList.length > 0 ? (
                  <Link
                    href={`/read/${work.id}/${work.chaptersList[0]?.id || "ch-1"}`}
                    className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Start Reading Ch. 1</span>
                  </Link>
                ) : (
                  <Link
                    href={`/studio/${work.id}`}
                    className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Add Chapter 1 in Studio</span>
                  </Link>
                )}

                <button
                  onClick={() => alert("Added to your reading bookmarks.")}
                  className="w-full py-2 rounded-lg bg-[#222227] hover:bg-[#2a2a30] border border-[#31313a] text-xs font-medium text-zinc-300 flex items-center justify-center gap-2 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Add to Library</span>
                </button>
              </div>
            </div>

            {/* Right: Info & Metadata */}
            <div className="md:col-span-8 lg:col-span-9 space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>Language: <strong className="text-zinc-300 font-normal">{work.language}</strong></span>
                  <span>•</span>
                  <span>Rating: <strong className="text-amber-400 font-normal">{work.ageRating}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ongoing
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                  {work.title}
                </h1>

                {/* Creator Attribution */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    {work.creator.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={work.creator.avatarUrl}
                        alt={work.creator.displayName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">
                        {work.creator.displayName.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs text-zinc-300">{work.creator.displayName}</span>
                  </div>

                  <button className="px-3 py-1 rounded-md bg-[#222227] border border-[#31313a] hover:bg-[#2b2b33] text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors">
                    <Heart className="w-3 h-3 text-rose-400" /> Follow Author
                  </button>

                  <Link
                    href={`/studio/${work.id}`}
                    className="px-3 py-1 rounded-md bg-[#222227] border border-[#31313a] hover:bg-[#2b2b33] text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" /> Edit in Studio
                  </Link>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#0f0f11] border border-[#27272d] font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Rating</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{work.averageRating} ({work.ratingCount})</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Chapters</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{work.chapterCount}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Updated</span>
                  <p className="font-bold text-zinc-200 mt-0.5">{work.updatedAt}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Access</span>
                  <p className="font-bold text-zinc-200 mt-0.5">Members First</p>
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Synopsis</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {work.synopsisLong}
                </p>
              </div>

              {/* Genres */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {work.genres.map((g) => (
                    <Link
                      key={g}
                      href={`/discover?genre=${encodeURIComponent(g)}`}
                      className="px-2.5 py-1 rounded bg-[#222227] hover:bg-[#2c2c34] text-xs text-zinc-300 transition-colors"
                    >
                      {g}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-[#27272d]">
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              Chapters ({work.chaptersList.length})
            </h2>
          </div>

          <div className="space-y-2">
            {work.chaptersList.length > 0 ? (
              work.chaptersList.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3.5 rounded-xl bg-[#161619] border border-[#27272d] hover:border-[#383842] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs text-zinc-500 w-6 shrink-0">
                      #{ch.chapterNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                          {ch.title}
                        </h4>
                        {ch.isMembersOnly && (
                          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono flex items-center gap-1 border border-amber-800 shrink-0">
                            <Lock className="w-2.5 h-2.5" /> Early Access ({ch.publicAt})
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {ch.wordCount > 0 && `${ch.wordCount} words • `}
                        Released {ch.releasedAt}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/read/${work.id}/${ch.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-zinc-100 hover:text-zinc-950 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>{ch.isMembersOnly ? "Unlock" : "Read"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-[#161619] border border-[#27272d] rounded-xl text-xs text-zinc-400">
                No chapters published yet. Use the Studio to publish Chapter 1.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

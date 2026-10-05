import Link from "next/link";
import { Star, BookOpen, Clock, Sparkles } from "lucide-react";
import { WorkCardData } from "@/types";

interface BookCardProps {
  work: WorkCardData;
  aspectRatio?: "portrait" | "wide";
}

export default function BookCard({ work, aspectRatio = "portrait" }: BookCardProps) {
  const isManga = work.type === "MANGA" || work.type === "COMIC";

  return (
    <Link
      href={`/work/${work.slug}`}
      className="group flex flex-col bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-violet-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-950/30 hover:-translate-y-1"
    >
      {/* Cover Image Container */}
      <div
        className={`relative w-full overflow-hidden bg-zinc-950 ${
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
        }`}
      >
        {work.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.coverUrl}
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-600">
            <BookOpen className="w-12 h-12" />
          </div>
        )}

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

        {/* Type & Exclusive Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md backdrop-blur-md ${
              isManga
                ? "bg-fuchsia-600/90 text-white"
                : "bg-violet-600/90 text-white"
            }`}
          >
            {work.type.replace("_", " ")}
          </span>
          {work.isExclusive && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-zinc-950 flex items-center gap-1 shadow-md backdrop-blur-md">
              <Sparkles className="w-3 h-3 fill-current" /> Exclusive
            </span>
          )}
        </div>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-zinc-100">
            {work.averageRating.toFixed(1)}
          </span>
          <span className="text-[10px] text-zinc-400">({work.ratingCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-zinc-100 text-base line-clamp-1 group-hover:text-violet-400 transition-colors">
            {work.title}
          </h3>

          {/* Creator Attribution */}
          <div className="flex items-center gap-2 mt-1.5">
            {work.creator.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={work.creator.avatarUrl}
                alt={work.creator.displayName}
                className="w-4 h-4 rounded-full object-cover"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-violet-600/50 flex items-center justify-center text-[9px] font-bold text-white">
                {work.creator.displayName.charAt(0)}
              </div>
            )}
            <span className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
              {work.creator.displayName}
            </span>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {work.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            {work.chapterCount} Chapters
          </span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Clock className="w-3 h-3" />
            {work.updatedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}

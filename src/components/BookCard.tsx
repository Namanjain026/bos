import Link from "next/link";
import { Star, BookOpen, Clock } from "lucide-react";
import { WorkCardData } from "@/types";

interface BookCardProps {
  work: WorkCardData;
  aspectRatio?: "portrait" | "wide";
}

export default function BookCard({ work, aspectRatio = "portrait" }: BookCardProps) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className="group flex flex-col bg-[#161619] hover:bg-[#1a1a1e] border border-[#27272d] hover:border-[#3d3d46] rounded-xl overflow-hidden transition-all duration-200"
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
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
            <BookOpen className="w-10 h-10" />
          </div>
        )}

        {/* Subtle Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Format Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/80 text-zinc-200 border border-white/10 uppercase tracking-wider font-mono">
            {work.type.replace("_", " ")}
          </span>
          {work.isExclusive && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-800/60 font-mono">
              Exclusive
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/80 border border-white/10 px-2 py-0.5 rounded flex items-center gap-1.5">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-zinc-200 font-mono">
            {work.averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-zinc-100 text-sm line-clamp-1 group-hover:text-white transition-colors">
            {work.title}
          </h3>

          {/* Creator Attribution */}
          <div className="flex items-center gap-2 mt-1">
            {work.creator.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={work.creator.avatarUrl}
                alt={work.creator.displayName}
                className="w-3.5 h-3.5 rounded-full object-cover"
              />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-white">
                {work.creator.displayName.charAt(0)}
              </div>
            )}
            <span className="text-xs text-zinc-400">
              {work.creator.displayName}
            </span>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {work.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-2 border-t border-[#27272d] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>{work.chapterCount} Chapters</span>
          <span>{work.updatedAt}</span>
        </div>
      </div>
    </Link>
  );
}

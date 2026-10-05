"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Columns,
  Rows,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Bookmark,
} from "lucide-react";
import { ChapterDetails, WorkCardData } from "@/types";

interface MangaReaderProps {
  work: WorkCardData;
  chapter: ChapterDetails;
  prevChapterId?: string;
  nextChapterId?: string;
}

export default function MangaReader({
  work,
  chapter,
  prevChapterId,
  nextChapterId,
}: MangaReaderProps) {
  const pages = chapter.mangaPages || [];
  const [readingMode, setReadingMode] = useState<"webtoon" | "paged">("webtoon");
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    if (readingMode === "webtoon") {
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          setReadingProgress(Math.min(100, Math.max(0, progress)));
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setReadingProgress(((currentPageIndex + 1) / Math.max(1, pages.length)) * 100);
    }
  }, [readingMode, currentPageIndex, pages.length]);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-fuchsia-600">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 to-amber-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader Nav Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/work/${work.slug}`}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-semibold truncate text-zinc-100">{work.title}</h1>
              <p className="text-[11px] text-zinc-400 truncate">{chapter.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switch: Webtoon Continuous vs Paged */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-0.5 flex items-center">
              <button
                onClick={() => setReadingMode("webtoon")}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  readingMode === "webtoon"
                    ? "bg-fuchsia-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Rows className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Webtoon</span>
              </button>
              <button
                onClick={() => setReadingMode("paged")}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  readingMode === "paged"
                    ? "bg-fuchsia-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Paged</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-0.5">
              <button
                onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                className="p-1.5 text-zinc-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-2 text-zinc-300">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                className="p-1.5 text-zinc-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 transition-colors"
              title="Bookmark Chapter"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Manga Body Content */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        {readingMode === "webtoon" ? (
          /* Webtoon Continuous Vertical Scroll */
          <div
            className="flex flex-col items-center mx-auto transition-all"
            style={{ maxWidth: `${Math.round(800 * (zoomLevel / 100))}px` }}
          >
            {pages.length > 0 ? (
              pages.map((page) => (
                <div key={page.id} className="w-full relative bg-zinc-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.assetUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-auto block select-none"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 px-1.5 py-0.5 rounded text-zinc-400 font-mono">
                    {page.pageNumber} / {pages.length}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-16 text-center text-zinc-500">
                No manga pages uploaded for this chapter.
              </div>
            )}
          </div>
        ) : (
          /* Traditional Paged Mode */
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
            {pages.length > 0 ? (
              <div
                className="relative max-w-2xl bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
                style={{ width: `${zoomLevel}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pages[currentPageIndex]?.assetUrl}
                  alt={`Page ${currentPageIndex + 1}`}
                  className="w-full h-auto object-contain max-h-[85vh] mx-auto select-none"
                />

                {/* Left/Right Click Nav Zones */}
                <div
                  className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
                  onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                  title="Previous Page"
                />
                <div
                  className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
                  onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
                  title="Next Page"
                />
              </div>
            ) : null}

            {/* Paged Control Bar */}
            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full shadow-lg">
              <button
                disabled={currentPageIndex === 0}
                onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
                className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-zinc-300">
                Page {currentPageIndex + 1} of {pages.length}
              </span>
              <button
                disabled={currentPageIndex === pages.length - 1}
                onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
                className="p-1.5 rounded-full hover:bg-zinc-800 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Next / Prev Chapter Footer */}
        <div className="max-w-xl mx-auto mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 gap-4">
          {prevChapterId ? (
            <Link
              href={`/read/${work.id}/${prevChapterId}`}
              className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-fuchsia-500/50 transition-all flex items-center gap-3 group"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Previous Episode</span>
                <p className="text-xs sm:text-sm font-semibold truncate">Chapter {chapter.chapterNumber - 1}</p>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl border border-dashed border-zinc-800/40 opacity-40 flex items-center justify-center text-xs">
              First Episode
            </div>
          )}

          {nextChapterId ? (
            <Link
              href={`/read/${work.id}/${nextChapterId}`}
              className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-fuchsia-500/50 transition-all flex items-center justify-end gap-3 group text-right"
            >
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-fuchsia-400">Next Episode</span>
                <p className="text-xs sm:text-sm font-semibold truncate">Chapter {chapter.chapterNumber + 1}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-fuchsia-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href={`/work/${work.slug}`}
              className="p-4 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-950/20 hover:bg-fuchsia-950/40 transition-all flex items-center justify-center text-xs font-semibold text-fuchsia-300 gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Finished Episode!
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

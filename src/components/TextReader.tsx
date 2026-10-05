"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Settings,
  Maximize2,
  Minimize2,
  Bookmark,
  Share2,
  MessageSquare,
  Sparkles,
  Type,
} from "lucide-react";
import { ChapterDetails, WorkCardData } from "@/types";

interface TextReaderProps {
  work: WorkCardData;
  chapter: ChapterDetails;
  prevChapterId?: string;
  nextChapterId?: string;
}

export default function TextReader({
  work,
  chapter,
  prevChapterId,
  nextChapterId,
}: TextReaderProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.8);
  const [theme, setTheme] = useState<"dark" | "sepia" | "cream" | "light" | "charcoal">("dark");
  const [fontFamily, setFontFamily] = useState<"sans" | "serif" | "mono">("serif");
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Calculate reading time (~250 wpm)
  const estMinutes = Math.max(1, Math.round(chapter.wordCount / 250));

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeClasses = {
    dark: "theme-dark bg-[#0c0d11] text-[#e2e8f0]",
    sepia: "theme-sepia bg-[#fbf0d9] text-[#433422]",
    cream: "theme-cream bg-[#f4ecd8] text-[#2b2520]",
    light: "theme-light bg-[#ffffff] text-[#1a1a1a]",
    charcoal: "theme-charcoal bg-[#1a1b26] text-[#c0caf5]",
  };

  const fontClasses = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Top Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-amber-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isFocusMode ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        } ${
          theme === "light" || theme === "sepia" || theme === "cream"
            ? "bg-white/80 border-b border-black/10 text-zinc-800 backdrop-blur-md"
            : "bg-zinc-950/80 border-b border-zinc-800 text-zinc-100 backdrop-blur-md"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/work/${work.slug}`}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Overview</span>
            </Link>
            <div className="h-4 w-px bg-zinc-700/50 hidden sm:block" />
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-semibold truncate">{work.title}</h1>
              <p className="text-[11px] opacity-70 truncate">{chapter.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Est Time */}
            <span className="text-[11px] opacity-70 hidden sm:inline-block">
              {estMinutes} min read ({chapter.wordCount} words)
            </span>

            {/* Settings Toggle */}
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              title="Reader Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Focus Mode Toggle */}
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              title={isFocusMode ? "Exit Focus Mode" : "Focus Mode"}
            >
              {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Settings Drawer / Flyout */}
      {settingsOpen && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 w-80 p-5 rounded-2xl glass-panel shadow-2xl border border-zinc-700/80 bg-zinc-950/95 text-zinc-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Type className="w-4 h-4 text-violet-400" /> Typography & Theme
            </h3>
            <button
              onClick={() => setSettingsOpen(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">Color Palette</label>
            <div className="grid grid-cols-5 gap-2">
              {(["dark", "charcoal", "sepia", "cream", "light"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`h-9 rounded-xl border text-xs font-medium capitalize flex items-center justify-center transition-all ${
                    theme === t ? "ring-2 ring-violet-500 scale-105" : "border-zinc-800 opacity-80"
                  } ${
                    t === "dark"
                      ? "bg-[#0c0d11] text-zinc-200 border-zinc-800"
                      : t === "charcoal"
                      ? "bg-[#1a1b26] text-zinc-200 border-zinc-700"
                      : t === "sepia"
                      ? "bg-[#fbf0d9] text-[#433422] border-[#deb887]"
                      : t === "cream"
                      ? "bg-[#f4ecd8] text-[#2b2520] border-[#d8caa8]"
                      : "bg-white text-zinc-900 border-zinc-300"
                  }`}
                >
                  {t.slice(0, 1).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">Font Style</label>
            <div className="grid grid-cols-3 gap-2">
              {(["serif", "sans", "mono"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFontFamily(f)}
                  className={`py-1.5 rounded-lg border text-xs capitalize ${
                    fontFamily === f
                      ? "bg-violet-600/30 border-violet-500 text-violet-200 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Text Size</span>
              <span>{fontSize}px</span>
            </div>
            <input
              type="range"
              min={14}
              max={28}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>

          {/* Line Height Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Line Spacing</span>
              <span>{lineHeight}x</span>
            </div>
            <input
              type="range"
              min={1.4}
              max={2.4}
              step={0.1}
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Focus Mode Exit Floating Pill */}
      {isFocusMode && (
        <button
          onClick={() => setIsFocusMode(false)}
          className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full glass-panel bg-zinc-950/90 text-zinc-200 text-xs font-semibold shadow-xl border border-zinc-700 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Minimize2 className="w-3.5 h-3.5" /> Exit Focus
        </button>
      )}

      {/* Main Chapter Content Area */}
      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Chapter Header */}
        <div className="text-center pb-12 mb-12 border-b border-black/10 dark:border-white/10">
          <span className="text-xs uppercase tracking-widest font-semibold opacity-60">
            Chapter {chapter.chapterNumber}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mt-2 tracking-tight">
            {chapter.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs opacity-70">
            <span>By {work.creator.displayName}</span>
            <span>•</span>
            <span>{estMinutes} min read</span>
            <span>•</span>
            <span>{chapter.wordCount} words</span>
          </div>
        </div>

        {/* Text Body */}
        <article
          className={`${fontClasses[fontFamily]} prose max-w-none transition-all`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
        >
          {chapter.body ? (
            chapter.body.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-6 indent-4 text-justify leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="italic opacity-60 text-center py-12">
              No text content available for this chapter.
            </p>
          )}
        </article>

        {/* Chapter Bottom Navigation & Reaction Bar */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 space-y-8">
          {/* Reaction / Bookmark Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <button className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                <Bookmark className="w-3.5 h-3.5" /> Bookmark Page
              </button>
              <button className="px-3.5 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/work/${work.slug}#comments`}
                className="text-xs font-semibold opacity-80 hover:opacity-100 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" /> Discussion (28)
              </Link>
            </div>
          </div>

          {/* Chapter Prev / Next Navigator */}
          <div className="grid grid-cols-2 gap-4">
            {prevChapterId ? (
              <Link
                href={`/read/${work.id}/${prevChapterId}`}
                className="p-4 rounded-2xl border border-black/10 dark:border-zinc-800 bg-black/5 dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex items-center gap-3 group"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Previous</span>
                  <p className="text-xs sm:text-sm font-semibold line-clamp-1">Chapter {chapter.chapterNumber - 1}</p>
                </div>
              </Link>
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-zinc-800/50 opacity-40 flex items-center justify-center text-xs">
                First Chapter
              </div>
            )}

            {nextChapterId ? (
              <Link
                href={`/read/${work.id}/${nextChapterId}`}
                className="p-4 rounded-2xl border border-black/10 dark:border-zinc-800 bg-black/5 dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex items-center justify-end gap-3 group text-right"
              >
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-violet-400">Next Up</span>
                  <p className="text-xs sm:text-sm font-semibold line-clamp-1">Chapter {chapter.chapterNumber + 1}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                href={`/work/${work.slug}`}
                className="p-4 rounded-2xl border border-violet-500/30 bg-violet-950/20 hover:bg-violet-950/40 transition-all flex items-center justify-center text-xs font-semibold text-violet-300 gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> Completed latest chapter!
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

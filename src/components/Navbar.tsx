"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Compass,
  Layers,
  Trophy,
  PenTool,
  Search,
  Bell,
  Sparkles,
  Bookmark,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-amber-500 p-0.5 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-violet-400 group-hover:text-amber-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                BOOK OF <span className="text-violet-400">SHADES</span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest -mt-1 font-medium">
                Publish & Read
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/discover"
              className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-violet-400" />
              Discover
            </Link>
            <Link
              href="/genres"
              className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-fuchsia-400" />
              Genres
            </Link>
            <Link
              href="/rankings"
              className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Rankings
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search novels, manga, creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 rounded-full focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>

          {/* Right Action Icons & Creator Studio CTA */}
          <div className="flex items-center gap-3">
            {/* Create CTA Button */}
            <Link
              href="/create"
              className="relative group px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-semibold shadow-md shadow-violet-600/25 flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Publish</span>
              <span className="hidden sm:inline text-xs bg-white/20 px-1.5 py-0.5 rounded-full text-violet-100 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            </Link>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            </button>

            {/* Bookmarks */}
            <Link
              href="/dashboard?tab=bookmarks"
              aria-label="Bookmarks"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-colors hidden sm:block"
            >
              <Bookmark className="w-5 h-5" />
            </Link>

            {/* Unified User Profile Button */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 p-1 pl-2 pr-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-full transition-all group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-amber-500 flex items-center justify-center text-xs font-bold text-white shadow">
                U
              </div>
              <span className="text-xs font-medium text-zinc-300 group-hover:text-white hidden md:inline">
                My Space
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-zinc-800 px-4 pt-3 pb-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search novels, manga, creators..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 text-sm text-zinc-200"
            >
              <Compass className="w-4 h-4 text-violet-400" />
              Discover
            </Link>
            <Link
              href="/genres"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 text-sm text-zinc-200"
            >
              <Layers className="w-4 h-4 text-fuchsia-400" />
              Genres
            </Link>
            <Link
              href="/rankings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 text-sm text-zinc-200"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Rankings
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 text-sm text-zinc-200"
            >
              <User className="w-4 h-4 text-emerald-400" />
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

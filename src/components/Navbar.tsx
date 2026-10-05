"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  PenTool,
  Search,
  Bell,
  Bookmark,
  LogOut,
  User,
  Menu,
  X,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f11]/95 border-b border-[#24242a] backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-black text-sm">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                Book of Shades
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                Publishing Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/discover"
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-md transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/genres"
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-md transition-colors"
            >
              Genres
            </Link>
            <Link
              href="/rankings"
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-md transition-colors"
            >
              Rankings
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, author, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#17171a] border border-[#2c2c32] text-xs text-zinc-200 placeholder-zinc-400 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Right Action Icons & Live Auth */}
          <div className="flex items-center gap-3">
            {/* Write CTA Button */}
            <Link
              href="/create"
              className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write</span>
            </Link>

            {user ? (
              <>
                {/* Bookmarks */}
                <Link
                  href="/dashboard?tab=bookmarks"
                  aria-label="Bookmarks"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors hidden sm:block"
                >
                  <Bookmark className="w-4 h-4" />
                </Link>

                {/* Notifications */}
                <button
                  aria-label="Notifications"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                </button>

                {/* Logged-In User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 pr-3 bg-[#17171a] border border-[#2c2c32] hover:border-zinc-600 rounded-lg transition-colors"
                  >
                    <div className="w-5 h-5 rounded-md bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">
                      {user.displayName.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-zinc-200 max-w-[100px] truncate hidden md:inline">
                      {user.displayName}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#161619] border border-[#27272d] rounded-xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-[#27272d]">
                        <p className="font-semibold text-white truncate">{user.displayName}</p>
                        <p className="text-[11px] text-zinc-400 truncate">@{user.username}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-[#222227] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/create"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-[#222227] transition-colors"
                      >
                        <PenTool className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Author Studio</span>
                      </Link>
                      <div className="border-t border-[#27272d] my-1" />
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-[#222227] transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : !loading ? (
              /* Logged-Out Actions */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2b2b33] border border-[#31313a] text-xs font-semibold text-zinc-200 transition-colors hidden sm:inline-block"
                >
                  Get Started
                </Link>
              </div>
            ) : null}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#17171a] border-b border-[#2c2c32] px-4 pt-3 pb-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author..."
              className="w-full pl-9 pr-4 py-2 bg-[#0f0f11] border border-[#2c2c32] text-xs text-zinc-200 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#0f0f11] text-zinc-200"
            >
              Discover
            </Link>
            <Link
              href="/genres"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#0f0f11] text-zinc-200"
            >
              Genres
            </Link>
            <Link
              href="/rankings"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#0f0f11] text-zinc-200"
            >
              Rankings
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#0f0f11] text-zinc-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-[#0f0f11] text-zinc-200 font-semibold"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

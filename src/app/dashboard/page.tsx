"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  BookOpen,
  Bookmark,
  PenTool,
  BarChart2,
  DollarSign,
  User,
  LogIn,
  Plus,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";

interface UserLibraryData {
  works: {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverUrl?: string | null;
    type: string;
    status: string;
    ageRating: string;
    createdAt: string;
    updatedAt: string;
    chapters: {
      id: string;
      chapterNumber: number;
      title: string;
      wordCount: number;
      status: string;
      isMembersOnly: boolean;
      createdAt: string;
    }[];
    genres: { genre: { name: string } }[];
    _count: { chapters: number; ratings: number; bookmarks: number };
  }[];
  bookmarks: {
    id: string;
    createdAt: string;
    work: any;
    chapter?: any;
  }[];
  readingHistory: {
    id: string;
    position: number;
    percent: number;
    updatedAt: string;
    work: any;
    chapter?: any;
  }[];
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"reading" | "bookmarks" | "works" | "analytics" | "earnings">("works");
  const [libraryData, setLibraryData] = useState<UserLibraryData | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetch("/api/user/library")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setLibraryData(data);
        })
        .catch((err) => console.error("Error loading library:", err))
        .finally(() => setLoadingData(false));
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="w-8 h-8 border-2 border-zinc-500 border-t-white rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-zinc-400 font-mono">Loading your account...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-md mx-auto px-4 py-24 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#161619] border border-[#27272d] flex items-center justify-center mx-auto text-zinc-400">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-white">Sign In Required</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Please sign in or create an account to access your personal reading library, bookmarks, and creator studio.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-[#222227] hover:bg-[#2b2b33] border border-[#31313a] text-zinc-200 text-xs font-medium transition-colors"
            >
              Create Account
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const myWorks = libraryData?.works || [];
  const myBookmarks = libraryData?.bookmarks || [];
  const readingHistory = libraryData?.readingHistory || [];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Real User Profile Card */}
        <div className="p-6 rounded-2xl bg-[#161619] border border-[#27272d] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center text-lg font-bold text-white font-mono uppercase">
              {user.displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">{user.displayName}</h1>
                <span className="px-2 py-0.5 rounded bg-[#222227] text-zinc-400 border border-[#2f2f36] text-[10px] font-mono">
                  {myWorks.length > 0 ? "Author & Reader" : "Reader"}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">@{user.username} • {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Publish New Work
            </Link>
          </div>
        </div>

        {/* Dashboard Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[#27272d] pb-3 text-xs">
          <button
            onClick={() => setActiveTab("works")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "works" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <PenTool className="w-3.5 h-3.5 inline mr-1.5" />
            My Stories & Drafts ({myWorks.length})
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "bookmarks" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 inline mr-1.5" />
            Bookmarks ({myBookmarks.length})
          </button>

          <button
            onClick={() => setActiveTab("reading")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "reading" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
            Reading History ({readingHistory.length})
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "analytics" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 inline mr-1.5" />
            Analytics
          </button>

          <button
            onClick={() => setActiveTab("earnings")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "earnings" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 inline mr-1.5" />
            Revenue Ledger
          </button>
        </div>

        {/* Tab 1: My Works (Live Database) */}
        {activeTab === "works" && (
          <div className="space-y-4">
            {loadingData ? (
              <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                Loading your published stories...
              </div>
            ) : myWorks.length > 0 ? (
              <div className="space-y-3">
                {myWorks.map((work) => (
                  <div
                    key={work.id}
                    className="p-4 rounded-xl bg-[#161619] border border-[#27272d] hover:border-[#383842] transition-colors flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-[#27272d]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={work.coverUrl || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80"}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            {work.status}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {work.type.replace("_", " ")}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm text-zinc-100 mt-1 truncate">
                          {work.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          {work._count.chapters} Chapters • {work.genres.map((g) => g.genre.name).join(", ") || "General"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Link
                        href={`/work/${work.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2b2b33] text-zinc-300 text-xs font-medium"
                      >
                        View Public
                      </Link>
                      <Link
                        href={`/studio/${work.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <PenTool className="w-3.5 h-3.5" /> Manage Studio
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#161619] border border-[#27272d] rounded-2xl p-8 space-y-3">
                <PenTool className="w-8 h-8 text-zinc-500 mx-auto" />
                <h3 className="text-sm font-bold text-zinc-200">You haven&apos;t published any stories yet</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Start serializing your novel, light novel, poetry, or webcomic with direct reader subscriptions.
                </p>
                <div className="pt-2">
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish Your First Story
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bookmarks (Live Database) */}
        {activeTab === "bookmarks" && (
          <div>
            {loadingData ? (
              <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                Loading bookmarks...
              </div>
            ) : myBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myBookmarks.map((bm) => (
                  <BookCard key={bm.id} work={bm.work} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#161619] border border-[#27272d] rounded-2xl p-8 space-y-3">
                <Bookmark className="w-8 h-8 text-zinc-500 mx-auto" />
                <h3 className="text-sm font-bold text-zinc-200">No saved bookmarks yet</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Browse discover feeds and click &ldquo;Add to Library&rdquo; to save stories here for quick access.
                </p>
                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#222227] hover:bg-[#2b2b33] text-zinc-200 font-medium text-xs transition-colors"
                  >
                    Explore Discover Feed →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Reading History (Live Database) */}
        {activeTab === "reading" && (
          <div>
            {loadingData ? (
              <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                Loading reading history...
              </div>
            ) : readingHistory.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {readingHistory.map((rh) => (
                  <div
                    key={rh.id}
                    className="p-3.5 rounded-xl bg-[#161619] border border-[#27272d] flex items-center gap-3.5"
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rh.work.coverUrl!} alt={rh.work.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="font-semibold text-xs text-zinc-100 truncate">{rh.work.title}</h3>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        {rh.chapter ? rh.chapter.title : "Chapter 1"} • {Math.round(rh.percent)}%
                      </p>
                      <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-zinc-400 h-full" style={{ width: `${rh.percent}%` }} />
                      </div>
                      <Link
                        href={`/read/${rh.work.id}/${rh.chapter?.id || "ch-1"}`}
                        className="inline-block text-xs text-zinc-300 hover:text-white font-medium pt-0.5"
                      >
                        Resume →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#161619] border border-[#27272d] rounded-2xl p-8 space-y-3">
                <BookOpen className="w-8 h-8 text-zinc-500 mx-auto" />
                <h3 className="text-sm font-bold text-zinc-200">No reading progress recorded</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Start reading any serial or comic to automatically track your chapter progress here.
                </p>
                <div className="pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#222227] hover:bg-[#2b2b33] text-zinc-200 font-medium text-xs transition-colors"
                  >
                    Find a Story to Read →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
                <span className="text-xs text-zinc-400">Total Published Works</span>
                <p className="text-xl font-bold text-white font-mono">{myWorks.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
                <span className="text-xs text-zinc-400">Total Chapters</span>
                <p className="text-xl font-bold text-zinc-200 font-mono">
                  {myWorks.reduce((acc, w) => acc + (w.chapters?.length || 0), 0)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
                <span className="text-xs text-zinc-400">Total Readers</span>
                <p className="text-xl font-bold text-zinc-200 font-mono">
                  {myWorks.reduce((acc, w) => acc + (w._count?.ratings || 0), 0)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
                <span className="text-xs text-zinc-400">Followers</span>
                <p className="text-xl font-bold text-zinc-200 font-mono">{user._count?.followers || 0}</p>
              </div>
            </div>

            {myWorks.length === 0 && (
              <p className="text-xs text-zinc-500 font-mono text-center py-4">
                Detailed engagement and chapter completion stats will populate as readers view your works.
              </p>
            )}
          </div>
        )}

        {/* Tab 5: Revenue & Ledger */}
        {activeTab === "earnings" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-mono">Creator Net Balance</span>
                <h2 className="text-2xl font-bold text-white font-mono mt-1">$0.00 USD</h2>
              </div>
              <button
                disabled
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-500 text-xs font-semibold cursor-not-allowed"
              >
                Request Payout
              </button>
            </div>

            <div className="pt-4 border-t border-[#27272d] space-y-2 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Transaction Ledger</h3>
              <p className="text-xs text-zinc-500 font-mono py-4 text-center">
                No transactions recorded yet. Early-access and creator subscription purchases will appear here as immutable ledger records.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

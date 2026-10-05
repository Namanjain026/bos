"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
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
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"reading" | "bookmarks" | "works" | "analytics" | "earnings">("reading");

  const myPublishedWork = MOCK_WORKS[0];

  if (loading) {
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
                  Member
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">@{user.username} • {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" /> New Story / Series
            </Link>
          </div>
        </div>

        {/* Dashboard Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[#27272d] pb-3 text-xs">
          <button
            onClick={() => setActiveTab("reading")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "reading" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Reading History
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "bookmarks" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Bookmarks ({user._count?.bookmarks ?? 4})
          </button>

          <button
            onClick={() => setActiveTab("works")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "works" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            My Works & Drafts ({user._count?.works ?? 1})
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "analytics" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Creator Analytics
          </button>

          <button
            onClick={() => setActiveTab("earnings")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "earnings" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Revenue Ledger
          </button>
        </div>

        {/* Tab 1: Reading */}
        {activeTab === "reading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_WORKS.slice(0, 2).map((work) => (
              <div
                key={work.id}
                className="p-3.5 rounded-xl bg-[#161619] border border-[#27272d] flex items-center gap-3.5"
              >
                <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={work.coverUrl!} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="font-semibold text-xs text-zinc-100 truncate">{work.title}</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Chapter 1 • 65%</p>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-zinc-400 h-full w-[65%]" />
                  </div>
                  <Link
                    href={`/read/${work.id}/ch-1`}
                    className="inline-block text-xs text-zinc-300 hover:text-white font-medium pt-0.5"
                  >
                    Resume →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === "bookmarks" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_WORKS.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        )}

        {/* Tab 3: Works */}
        {activeTab === "works" && (
          <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-16 rounded-lg overflow-hidden bg-zinc-950 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={myPublishedWork.coverUrl!} alt={myPublishedWork.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  PUBLISHED
                </span>
                <h3 className="font-semibold text-sm text-zinc-100 mt-1">{myPublishedWork.title}</h3>
                <p className="text-xs text-zinc-400 font-mono">42 Chapters • 1,420 readers</p>
              </div>
            </div>

            <Link
              href={`/studio/${myPublishedWork.id}`}
              className="px-3.5 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2b2b33] text-zinc-200 text-xs font-medium flex items-center gap-1.5"
            >
              <PenTool className="w-3.5 h-3.5" /> Manage & Edit Chapters
            </Link>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
              <span className="text-xs text-zinc-400">Unique Readers</span>
              <p className="text-xl font-bold text-white font-mono">14,820</p>
            </div>
            <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
              <span className="text-xs text-zinc-400">Completion Rate</span>
              <p className="text-xl font-bold text-zinc-200 font-mono">86.4%</p>
            </div>
            <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
              <span className="text-xs text-zinc-400">Avg. Read Time</span>
              <p className="text-xl font-bold text-zinc-200 font-mono">12.5m</p>
            </div>
            <div className="p-4 rounded-xl bg-[#161619] border border-[#27272d] space-y-1">
              <span className="text-xs text-zinc-400">Members First</span>
              <p className="text-xl font-bold text-zinc-200 font-mono">128</p>
            </div>
          </div>
        )}

        {/* Tab 5: Revenue */}
        {activeTab === "earnings" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-mono">Net Creator Balance</span>
                <h2 className="text-2xl font-bold text-white font-mono mt-1">$482.50 USD</h2>
              </div>
              <button
                onClick={() => alert("Payout request submitted.")}
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs"
              >
                Request Payout
              </button>
            </div>

            <div className="pt-4 border-t border-[#27272d] space-y-2 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Transaction Ledger</h3>
              <div className="p-3 rounded-lg bg-[#0f0f11] border border-[#27272d] flex justify-between items-center font-mono">
                <div>
                  <span className="text-zinc-200 block">Monthly Member Support (Tier 1)</span>
                  <span className="text-[10px] text-zinc-500">Oct 04, 2026</span>
                </div>
                <span className="font-bold text-zinc-200">+$4.99</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

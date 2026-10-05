"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";
import {
  User,
  BookOpen,
  Bookmark,
  Heart,
  PenTool,
  BarChart2,
  DollarSign,
  Sparkles,
  Settings,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"reading" | "bookmarks" | "works" | "analytics" | "earnings">("reading");

  const myPublishedWork = MOCK_WORKS[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* User Identity Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-amber-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-xl font-bold text-white">
                N
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">Naman Jain</h1>
                <span className="px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/30 text-[10px] font-bold">
                  Creator & Reader
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">@namanjain • Joined October 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <PenTool className="w-3.5 h-3.5" /> Publish New Chapter
            </Link>
          </div>
        </div>

        {/* Unified Dashboard Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("reading")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "reading"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Reading History
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "bookmarks"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Bookmark className="w-4 h-4" /> Bookmarks (4)
          </button>

          <button
            onClick={() => setActiveTab("works")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "works"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <PenTool className="w-4 h-4" /> My Works & Drafts (1)
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "analytics"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Creator Analytics
          </button>

          <button
            onClick={() => setActiveTab("earnings")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "earnings"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" /> Revenue & Ledger
          </button>
        </div>

        {/* Tab 1: Reading History */}
        {activeTab === "reading" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_WORKS.slice(0, 2).map((work) => (
                <div
                  key={work.id}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-4 hover:border-violet-500/50 transition-all"
                >
                  <div className="w-14 h-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={work.coverUrl!} alt={work.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-bold text-sm text-zinc-100 truncate">{work.title}</h3>
                    <p className="text-xs text-zinc-400">Chapter 1 • 65% finished</p>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-violet-500 h-full w-[65%]" />
                    </div>
                    <Link
                      href={`/read/${work.id}/ch-1`}
                      className="inline-block text-xs text-violet-400 hover:text-violet-300 font-semibold pt-1"
                    >
                      Resume →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === "bookmarks" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_WORKS.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        )}

        {/* Tab 3: Creator Works & Drafts */}
        {activeTab === "works" && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={myPublishedWork.coverUrl!} alt={myPublishedWork.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    PUBLISHED
                  </span>
                  <h3 className="font-bold text-base text-zinc-100 mt-1">{myPublishedWork.title}</h3>
                  <p className="text-xs text-zinc-400">42 Chapters • 1,420 readers • Rating 4.92</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/create"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                >
                  Manage Chapters
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Creator Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Unique Readers</span>
                <p className="text-2xl font-black text-white">14,820</p>
                <span className="text-[11px] text-emerald-400 font-bold">+24% this week</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Chapter Completion</span>
                <p className="text-2xl font-black text-violet-400">86.4%</p>
                <span className="text-[11px] text-zinc-400">High engagement</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Average Read Time</span>
                <p className="text-2xl font-black text-amber-400">12.5m</p>
                <span className="text-[11px] text-zinc-400">Per session</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Active Subscribers</span>
                <p className="text-2xl font-black text-emerald-400">128</p>
                <span className="text-[11px] text-emerald-400 font-bold">Members First</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Revenue & Ledger */}
        {activeTab === "earnings" && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400">Total Net Creator Balance</span>
                <h2 className="text-3xl font-black text-emerald-400 mt-1">$482.50 USD</h2>
              </div>
              <button
                onClick={() => alert("Payout request submitted to payment provider.")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Request Payout
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Immutable Transaction Ledger</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-zinc-200">Monthly Member Support (Tier 1)</span>
                    <p className="text-[10px] text-zinc-500">Oct 04, 2026 • Stripe webhook ref_92812</p>
                  </div>
                  <span className="font-bold text-emerald-400">+$4.99</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-zinc-200">Early Access Chapter Unlock</span>
                    <p className="text-[10px] text-zinc-500">Oct 03, 2026 • Stripe webhook ref_88192</p>
                  </div>
                  <span className="font-bold text-emerald-400">+$1.99</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

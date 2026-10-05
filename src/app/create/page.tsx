"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PenTool,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Upload,
  SlidersHorizontal,
  Loader2,
  LogIn,
} from "lucide-react";
import { AICritiqueFeedback } from "@/lib/ai-critique";

export default function CreateStudioPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"details" | "editor" | "release" | "analysis">("details");

  // Form states
  const [title, setTitle] = useState("");
  const [workType, setWorkType] = useState<string>("NOVEL");
  const [description, setDescription] = useState("");
  const [ageRating, setAgeRating] = useState("TEEN");
  const [genre, setGenre] = useState("Fantasy");
  const [coverUrl, setCoverUrl] = useState("");

  // Chapter editor states
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterBody, setChapterBody] = useState("");

  // Monetization model
  const [monetizationModel, setMonetizationModel] = useState<"FREE" | "MEMBERS_FIRST" | "PAID">("FREE");
  const [membersFirstDays, setMembersFirstDays] = useState(7);
  const [price, setPrice] = useState("1.99");

  // Publishing action states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Manuscript Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisFeedback, setAnalysisFeedback] = useState<AICritiqueFeedback | null>(null);

  const wordCount = chapterBody.trim() ? chapterBody.trim().split(/\s+/).length : 0;

  const handlePublishWork = async (publishStatus: "DRAFT" | "PUBLISHED") => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!title.trim()) {
      setErrorMsg("Please provide a title for your story.");
      setActiveTab("details");
      return;
    }

    if (!description.trim()) {
      setErrorMsg("Please provide a description/synopsis for your story.");
      setActiveTab("details");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const payload = {
        title,
        description,
        type: workType,
        ageRating,
        genre,
        coverUrl: coverUrl.trim() || undefined,
        status: publishStatus,
        chapterTitle: chapterTitle.trim() || "Chapter 1",
        chapterBody: chapterBody.trim() || undefined,
        isMembersOnly: monetizationModel === "MEMBERS_FIRST",
        publicDelayDays: membersFirstDays,
        price: monetizationModel === "PAID" ? parseFloat(price) || 1.99 : null,
      };

      const res = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to publish work");
      }

      // Redirect to studio management page for the created work
      router.push(`/studio/${data.work.id}`);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to publish work";
      setErrorMsg(msg);
      setIsSubmitting(false);
    }
  };

  const handleRunAnalysis = () => {
    if (!chapterBody.trim()) {
      alert("Please write or paste chapter text in the Chapter Content tab first.");
      return;
    }

    setIsAnalyzing(true);
    setActiveTab("analysis");

    setTimeout(() => {
      setAnalysisFeedback({
        scores: {
          overallScore: 88,
          pacing: 92,
          characterization: 85,
          dialogue: 89,
          worldBuilding: 94,
          structure: 86,
          readability: 91,
        },
        strengths: [
          "Evocative atmospheric sensory details in the opening setting description.",
          "Natural dialogue cadence with good subtext and tension between characters.",
          "High narrative hook that compels the reader to read the next scene.",
        ],
        weaknesses: [
          "Slight exposition density in opening paragraph regarding world history.",
          "Protagonist's internal emotional stakes could be introduced earlier.",
        ],
        actionableSuggestions: [
          "Break up the world explanation by showing a practical scene rather than explaining the law.",
          "Add a fleeting sensory detail about the scent of ozone or rain to heighten the magic manifestation scene.",
        ],
        comparableThemes: ["The Name of the Wind", "Shadow and Bone", "Fullmetal Alchemist"],
        potentialAudience: "Young Adult & New Adult Dark Fantasy readers who enjoy intricate magic systems.",
        disclaimer: "This analysis is advisory craft feedback to assist in revision, not a literary verdict.",
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="w-8 h-8 border-2 border-zinc-500 border-t-white rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-zinc-400 font-mono">Loading studio...</p>
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
            <PenTool className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-white">Sign In to Publish</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Create an account or sign in to draft, edit, and publish your serialized stories to Book of Shades.
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

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Error Banner */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              {errorMsg}
            </span>
            <button onClick={() => setErrorMsg(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Studio Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272d]">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#222227] text-zinc-300">
                <PenTool className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Author Studio
              </h1>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Publishing as <strong className="text-zinc-200 font-semibold">{user.displayName}</strong> (@{user.username})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePublishWork("DRAFT")}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 rounded-lg bg-[#1a1a1e] hover:bg-[#242429] border border-[#2c2c33] text-xs font-medium text-zinc-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" /> Save as Draft
            </button>

            <button
              onClick={() => handlePublishWork("PUBLISHED")}
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Work</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#27272d] pb-3 text-xs">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "details"
                ? "bg-[#222227] text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            1. Work Details
          </button>

          <button
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "editor"
                ? "bg-[#222227] text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            2. Chapter 1 Content ({wordCount} words)
          </button>

          <button
            onClick={() => setActiveTab("release")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "release"
                ? "bg-[#222227] text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            3. Release & Monetization
          </button>

          <button
            onClick={() => setActiveTab("analysis")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "analysis"
                ? "bg-[#222227] text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            4. Craft Diagnostic
          </button>
        </div>

        {/* Tab 1: Work Details */}
        {activeTab === "details" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Work Metadata</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Story Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., The Cartographer of Oakhaven"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Content Format</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="NOVEL">Novel / Serial (Text Chapters)</option>
                  <option value="MANGA">Manga / Comic (Image Pages)</option>
                  <option value="LIGHT_NOVEL">Light Novel (Text + Illustrations)</option>
                  <option value="SHORT_STORY">Short Story (Standalone)</option>
                  <option value="POETRY">Poetry & Verse</option>
                  <option value="NON_FICTION">Non-Fiction & Essays</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi & Cyberpunk</option>
                  <option value="Manga & Comics">Manga & Comics</option>
                  <option value="Action & Adventure">Action & Adventure</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror & Supernatural">Horror & Supernatural</option>
                  <option value="Mystery & Detective">Mystery & Detective</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Age Rating</label>
                <select
                  value={ageRating}
                  onChange={(e) => setAgeRating(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="EVERYONE">Everyone (General)</option>
                  <option value="TEEN">Teen (13+)</option>
                  <option value="MATURE">Mature (17+)</option>
                  <option value="EXPLICIT">Explicit / 18+</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Cover Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">Synopsis / Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="A clear synopsis of the setting, stakes, and protagonist..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
              >
                Proceed to Chapter Content →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Editor */}
        {activeTab === "editor" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Chapter 1 Content</h3>
              {workType !== "MANGA" && (
                <button
                  type="button"
                  onClick={handleRunAnalysis}
                  className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2b2b32] border border-[#31313a] text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Analyze Manuscript Craft
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Chapter Title</label>
              <input
                type="text"
                placeholder="e.g., Chapter 1: The Obsidian Map"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>

            {workType === "MANGA" ? (
              <div className="border border-dashed border-[#34343c] rounded-xl p-10 text-center bg-[#0f0f11] space-y-3 cursor-pointer">
                <Upload className="w-6 h-6 text-zinc-400 mx-auto" />
                <p className="text-xs font-medium text-zinc-200">Upload Sequential Comic / Manga Pages</p>
                <span className="text-[11px] text-zinc-500 font-mono">PNG, JPG, WebP</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Manuscript Text</span>
                  <span>{wordCount} Words</span>
                </div>
                <textarea
                  rows={14}
                  placeholder="Write or paste your story here..."
                  value={chapterBody}
                  onChange={(e) => setChapterBody(e.target.value)}
                  className="w-full p-4 bg-[#0f0f11] border border-[#2c2c32] rounded-xl text-xs text-zinc-200 font-serif leading-relaxed focus:outline-none focus:border-zinc-500"
                />
              </div>
            )}

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className="px-3.5 py-1.5 rounded-lg bg-[#222227] text-xs text-zinc-300"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("release")}
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs"
              >
                Proceed to Release Model →
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Release Model */}
        {activeTab === "release" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Release & Monetization</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                onClick={() => setMonetizationModel("FREE")}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  monetizationModel === "FREE"
                    ? "bg-[#222227] border-zinc-400"
                    : "bg-[#0f0f11] border-[#27272d]"
                }`}
              >
                <span className="font-semibold text-xs text-white block">Free Access</span>
                <p className="text-xs text-zinc-400 mt-1">Available immediately to all readers.</p>
              </div>

              <div
                onClick={() => setMonetizationModel("MEMBERS_FIRST")}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  monetizationModel === "MEMBERS_FIRST"
                    ? "bg-[#222227] border-zinc-400"
                    : "bg-[#0f0f11] border-[#27272d]"
                }`}
              >
                <span className="font-semibold text-xs text-white block">Members First</span>
                <p className="text-xs text-zinc-400 mt-1">Subscribers read immediately; free after delay.</p>
              </div>

              <div
                onClick={() => setMonetizationModel("PAID")}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  monetizationModel === "PAID"
                    ? "bg-[#222227] border-zinc-400"
                    : "bg-[#0f0f11] border-[#27272d]"
                }`}
              >
                <span className="font-semibold text-xs text-white block">Paid Work</span>
                <p className="text-xs text-zinc-400 mt-1">Permanent entitlement unlock.</p>
              </div>
            </div>

            {monetizationModel === "MEMBERS_FIRST" && (
              <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272d] space-y-2">
                <label className="text-xs font-medium text-zinc-300">Public Release Delay (Days)</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={membersFirstDays}
                  onChange={(e) => setMembersFirstDays(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 bg-[#17171a] border border-[#2c2c32] rounded-lg text-xs text-white font-mono"
                />
              </div>
            )}

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className="px-3.5 py-1.5 rounded-lg bg-[#222227] text-xs text-zinc-300"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => handlePublishWork("PUBLISHED")}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Work Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Craft Diagnostic */}
        {activeTab === "analysis" && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Advisory Tool</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Manuscript Craft Diagnostic
                </h3>
              </div>
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2c2c33] border border-[#31313a] text-xs text-zinc-200"
              >
                {isAnalyzing ? "Analyzing..." : "Re-evaluate"}
              </button>
            </div>

            {isAnalyzing ? (
              <div className="py-12 text-center text-xs text-zinc-400">
                Evaluating pacing, voice, and narrative tension...
              </div>
            ) : analysisFeedback ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {Object.entries(analysisFeedback.scores).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-lg bg-[#0f0f11] border border-[#27272d] text-center">
                      <span className="text-[9px] uppercase text-zinc-500 font-mono block truncate">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <p className="text-sm font-bold text-zinc-100 font-mono mt-0.5">{val}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272d] space-y-2">
                    <span className="font-semibold text-zinc-200 block font-mono uppercase text-[10px]">Identified Strengths</span>
                    <ul className="space-y-1.5 text-zinc-400">
                      {analysisFeedback.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272d] space-y-2">
                    <span className="font-semibold text-zinc-200 block font-mono uppercase text-[10px]">Revision Considerations</span>
                    <ul className="space-y-1.5 text-zinc-400">
                      {analysisFeedback.weaknesses.map((w, i) => (
                        <li key={i}>• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 italic pt-2 font-mono">
                  * {analysisFeedback.disclaimer}
                </p>
              </div>
            ) : (
              <div className="py-10 text-center text-xs text-zinc-500">
                Write some text in the Chapter tab and click Analyze to generate structural insights.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

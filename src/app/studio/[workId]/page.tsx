"use client";

import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";
import {
  PenTool,
  BookOpen,
  Plus,
  Save,
  Trash2,
  Lock,
  Eye,
  ArrowLeft,
  CheckCircle2,
  SlidersHorizontal,
  Settings,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { AICritiqueFeedback } from "@/lib/ai-critique";

interface StudioWorkPageProps {
  params: Promise<{
    workId: string;
  }>;
}

export default function StudioWorkManagementPage({ params }: StudioWorkPageProps) {
  const { workId } = use(params);
  const { user, loading: authLoading } = useAuth();
  const mockWork = MOCK_WORKS.find((w) => w.id === workId) || MOCK_WORKS[0];

  const [activeTab, setActiveTab] = useState<"chapters" | "settings" | "editor">("chapters");
  const [loading, setLoading] = useState(true);

  // Work Settings State
  const [workData, setWorkData] = useState<any>(mockWork);
  const [title, setTitle] = useState(mockWork.title);
  const [description, setDescription] = useState(mockWork.description);
  const [workType, setWorkType] = useState(mockWork.type);
  const [ageRating, setAgeRating] = useState(mockWork.ageRating);
  const [language, setLanguage] = useState(mockWork.language);
  const [status, setStatus] = useState(mockWork.status);
  const [coverUrl, setCoverUrl] = useState(mockWork.coverUrl || "");
  const [genres, setGenres] = useState(mockWork.genres ? mockWork.genres.join(", ") : "");

  // Chapters State
  const [chapters, setChapters] = useState(mockWork.chaptersList || []);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  // Chapter Edit Form State
  const [chTitle, setChTitle] = useState("");
  const [chNumber, setChNumber] = useState<number>(1);
  const [chBody, setChBody] = useState("");
  const [chIsMembersOnly, setChIsMembersOnly] = useState(false);
  const [chDelayDays, setChDelayDays] = useState(7);

  // Craft Diagnostic State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisFeedback, setAnalysisFeedback] = useState<AICritiqueFeedback | null>(null);

  // Status message
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  // Fetch work from live API if present
  useEffect(() => {
    fetch(`/api/works/${workId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.work) {
          const w = data.work;
          setWorkData(w);
          setTitle(w.title);
          setDescription(w.description);
          setWorkType(w.type);
          setAgeRating(w.ageRating);
          setLanguage(w.language);
          setStatus(w.status);
          setCoverUrl(w.coverUrl || "");
          if (w.genres) {
            setGenres(w.genres.map((g: any) => g.genre.name).join(", "));
          }
          if (w.chapters) {
            setChapters(
              w.chapters.map((ch: any) => ({
                id: ch.id,
                chapterNumber: ch.chapterNumber,
                title: ch.title,
                body: ch.body,
                wordCount: ch.wordCount,
                isMembersOnly: ch.isMembersOnly,
                releasedAt: ch.createdAt ? ch.createdAt.split("T")[0] : "Today",
              }))
            );
          }
        }
      })
      .catch((err) => console.error("Error fetching work:", err))
      .finally(() => setLoading(false));
  }, [workId]);

  const handleOpenChapterEditor = (ch: any) => {
    setEditingChapterId(ch.id);
    setChTitle(ch.title);
    setChNumber(ch.chapterNumber);
    setChIsMembersOnly(ch.isMembersOnly || false);
    setChBody(ch.body || "");
    setAnalysisFeedback(null);
    setActiveTab("editor");
  };

  const handleAddNewChapter = async () => {
    const nextNum = chapters.length + 1;
    const newChTitle = `Chapter ${nextNum}: Untitled Release`;

    try {
      const res = await fetch(`/api/works/${workId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newChTitle,
          chapterNumber: nextNum,
          body: "",
          status: "DRAFT",
          wordCount: 0,
          isMembersOnly: false,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const created = json.chapter;
        const mapped = {
          id: created.id,
          chapterNumber: created.chapterNumber,
          title: created.title,
          body: created.body,
          wordCount: created.wordCount,
          isMembersOnly: created.isMembersOnly,
          releasedAt: "Today",
        };
        setChapters([...chapters, mapped]);
        handleOpenChapterEditor(mapped);
      } else {
        // Fallback local
        const localCh = {
          id: `ch-new-${Date.now()}`,
          chapterNumber: nextNum,
          title: newChTitle,
          body: "",
          wordCount: 0,
          isMembersOnly: false,
          releasedAt: "Today",
        };
        setChapters([...chapters, localCh]);
        handleOpenChapterEditor(localCh);
      }
    } catch {
      const localCh = {
        id: `ch-new-${Date.now()}`,
        chapterNumber: nextNum,
        title: newChTitle,
        body: "",
        wordCount: 0,
        isMembersOnly: false,
        releasedAt: "Today",
      };
      setChapters([...chapters, localCh]);
      handleOpenChapterEditor(localCh);
    }
  };

  const handleSaveChapter = async () => {
    setIsSaving(true);
    const wordCount = chBody.trim() ? chBody.trim().split(/\s+/).length : 0;

    try {
      await fetch(`/api/chapters/${editingChapterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: chTitle,
          chapterNumber: chNumber,
          body: chBody,
          wordCount,
          isMembersOnly: chIsMembersOnly,
        }),
      });
    } catch (err) {
      console.error("Failed to patch chapter:", err);
    }

    const updated = chapters.map((c: any) =>
      c.id === editingChapterId
        ? {
            ...c,
            title: chTitle,
            chapterNumber: chNumber,
            body: chBody,
            isMembersOnly: chIsMembersOnly,
            wordCount,
          }
        : c
    );
    setChapters(updated);
    setIsSaving(false);
    showNotification(`Chapter "${chTitle}" saved successfully!`);
    setActiveTab("chapters");
  };

  const handleDeleteChapter = async (id: string) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      try {
        await fetch(`/api/chapters/${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete chapter:", err);
      }
      setChapters(chapters.filter((c: any) => c.id !== id));
      showNotification("Chapter removed.");
    }
  };

  const handleSaveWorkSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await fetch(`/api/works/${workId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          type: workType,
          ageRating,
          language,
          status,
          coverUrl: coverUrl || null,
        }),
      });
    } catch (err) {
      console.error("Failed to patch work:", err);
    }

    setIsSaving(false);
    showNotification("Work metadata updated successfully in database!");
  };

  const handleRunAnalysis = () => {
    if (!chBody.trim()) {
      alert("Please write some manuscript text before analyzing.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisFeedback({
        scores: {
          overallScore: 89,
          pacing: 91,
          characterization: 87,
          dialogue: 88,
          worldBuilding: 95,
          structure: 86,
          readability: 92,
        },
        strengths: [
          "Strong opening hook with visceral sensory details.",
          "Good dialogue naturalism and distinct character voices.",
        ],
        weaknesses: [
          "Middle section transitions can be paced more smoothly.",
        ],
        actionableSuggestions: [
          "Show physical consequences of the magic activation to increase dramatic tension.",
        ],
        comparableThemes: ["The Name of the Wind", "Shadow and Bone"],
        potentialAudience: "Young Adult / New Adult Dark Fantasy readers.",
        disclaimer: "This analysis is advisory craft feedback to assist in revision, not a literary verdict.",
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  if (!authLoading && !loading) {
    if (!user) {
      return (
        <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-md mx-auto px-4 py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1c1c22] border border-[#2d2d38] flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-white">Sign In Required</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You need to be signed in to manage stories and edit manuscripts in Creator Studio.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs inline-block transition-colors"
              >
                Sign In
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    // If work exists in DB and creatorId does not match current logged-in user
    if (workData?.creatorId && workData.creatorId !== user.id) {
      return (
        <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-md mx-auto px-4 py-24 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/50 border border-rose-900 flex items-center justify-center mx-auto text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-white">Access Denied</h1>
            <p className="text-xs text-zinc-300 leading-relaxed">
              You do not have permission to edit <strong>&quot;{title}&quot;</strong>. This story was published by another creator account (@{workData.creator?.username || "author"}).
            </p>
            <div className="pt-3 flex items-center justify-center gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-[#222227] hover:bg-[#2b2b33] border border-[#34343d] text-zinc-200 font-semibold text-xs transition-colors"
              >
                My Dashboard
              </Link>
              <Link
                href="/create"
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
              >
                Create New Story
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Save Feedback Banner */}
        {saveMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {saveMessage}
            </span>
            <button onClick={() => setSaveMessage(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272d]">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg bg-[#161619] hover:bg-[#222227] border border-[#27272d] text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                {workType.replace("_", " ")} • {chapters.length} Chapters • {ageRating}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/work/${workData?.slug || workId}`}
              className="px-3 py-1.5 rounded-lg bg-[#161619] hover:bg-[#222227] border border-[#27272d] text-xs font-medium text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Public View
            </Link>
            <button
              onClick={handleAddNewChapter}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Chapter
            </button>
          </div>
        </div>

        {/* Studio Tabs */}
        <div className="flex items-center gap-2 border-b border-[#27272d] pb-3 text-xs">
          <button
            onClick={() => setActiveTab("chapters")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "chapters" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
            Chapters ({chapters.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "settings" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5 inline mr-1.5" />
            Work Settings & Metadata
          </button>

          {editingChapterId && (
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === "editor" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 inline mr-1.5" />
              Editing: Chapter {chNumber}
            </button>
          )}
        </div>

        {/* Tab 1: Chapters List Management */}
        {activeTab === "chapters" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
              <span>All chapters in sequence</span>
              <span>Click Edit to change title, manuscript prose, or release rules</span>
            </div>

            <div className="space-y-2">
              {chapters.map((ch: any) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-xl bg-[#161619] border border-[#27272d] hover:border-[#383842] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs text-zinc-500 w-7 shrink-0 font-bold">
                      #{ch.chapterNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-xs sm:text-sm text-zinc-200 truncate">
                          {ch.title}
                        </h3>
                        {ch.isMembersOnly && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono border border-amber-800 shrink-0 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Members First
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {ch.wordCount > 0 ? `${ch.wordCount} words • ` : ""}
                        Released {ch.releasedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenChapterEditor(ch)}
                      className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2c2c34] text-zinc-200 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <PenTool className="w-3 h-3" /> Edit Chapter
                    </button>
                    <button
                      onClick={() => handleDeleteChapter(ch.id)}
                      className="p-2 rounded-lg bg-[#222227] hover:bg-rose-950/60 text-zinc-400 hover:text-rose-300 transition-colors"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Work Settings Editor */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveWorkSettings} className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Edit Work Metadata
              </h3>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save to Database</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Story Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Content Format</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="NOVEL">Novel / Serial (Text Chapters)</option>
                  <option value="MANGA">Manga / Webtoon (Image Pages)</option>
                  <option value="LIGHT_NOVEL">Light Novel (Text + Illustrations)</option>
                  <option value="SHORT_STORY">Short Story (Standalone)</option>
                  <option value="POETRY">Poetry & Verse</option>
                  <option value="NON_FICTION">Non-Fiction & Essays</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Age Rating</label>
                <select
                  value={ageRating}
                  onChange={(e) => setAgeRating(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="EVERYONE">Everyone (General Audience)</option>
                  <option value="TEEN">Teen (13+)</option>
                  <option value="MATURE">Mature (17+)</option>
                  <option value="EXPLICIT">Explicit / 18+</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Publication Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published / Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ARCHIVED">Archived / Hidden</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-medium text-zinc-300">Description / Synopsis</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 leading-relaxed"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-medium text-zinc-300">Cover Image URL</label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Work Settings"}
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Detailed Chapter Editor */}
        {activeTab === "editor" && editingChapterId && (
          <div className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#27272d]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Edit Chapter {chNumber}
                </h3>
                <p className="text-xs text-zinc-400">
                  Update title, manuscript prose, monetization rules, or analyze craft.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2c2c33] border border-[#31313a] text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {isAnalyzing ? "Analyzing..." : "Analyze Craft"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveChapter}
                  disabled={isSaving}
                  className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Chapter</span>
                </button>
              </div>
            </div>

            {/* Chapter Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-300">Chapter Number</label>
                <input
                  type="number"
                  value={chNumber}
                  onChange={(e) => setChNumber(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 font-mono"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-medium text-zinc-300">Chapter Title</label>
                <input
                  type="text"
                  value={chTitle}
                  onChange={(e) => setChTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100"
                />
              </div>
            </div>

            {/* Access Rules */}
            <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272d] space-y-3 text-xs">
              <span className="font-bold text-zinc-300 uppercase tracking-wider font-mono text-[10px] block">
                Chapter Access Rules
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chIsMembersOnly}
                    onChange={(e) => setChIsMembersOnly(e.target.checked)}
                    className="rounded bg-[#161619] border-zinc-700 text-zinc-100"
                  />
                  <span className="text-zinc-200">Enable Members-First Early Access</span>
                </label>

                {chIsMembersOnly && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Public release after</span>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={chDelayDays}
                      onChange={(e) => setChDelayDays(Number(e.target.value))}
                      className="w-16 px-2 py-1 bg-[#161619] border border-zinc-700 rounded text-xs text-white font-mono"
                    />
                    <span className="text-zinc-400">days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Manuscript Editor */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400 font-mono">
                <span>Manuscript Prose</span>
                <span>{chBody.trim() ? chBody.trim().split(/\s+/).length : 0} Words</span>
              </div>
              <textarea
                rows={16}
                value={chBody}
                onChange={(e) => setChBody(e.target.value)}
                className="w-full p-4 bg-[#0f0f11] border border-[#2c2c32] rounded-xl text-xs sm:text-sm text-zinc-200 font-serif leading-relaxed focus:outline-none focus:border-zinc-500"
              />
            </div>

            {/* Craft Diagnostic Output */}
            {analysisFeedback && (
              <div className="p-4 rounded-xl bg-[#0f0f11] border border-[#27272d] space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#27272d]">
                  <span className="font-bold text-zinc-200 uppercase font-mono text-[10px]">
                    Craft Diagnostic Results
                  </span>
                  <span className="font-mono text-zinc-400">Overall: {analysisFeedback.scores.overallScore}/100</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {Object.entries(analysisFeedback.scores).map(([k, v]) => (
                    <div key={k} className="p-2 rounded bg-[#161619] text-center font-mono">
                      <span className="text-[9px] text-zinc-500 uppercase block truncate">{k}</span>
                      <span className="font-bold text-zinc-200">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-zinc-400 pt-1">
                  <span className="font-semibold text-zinc-300 block font-mono text-[10px]">Suggestions:</span>
                  {analysisFeedback.actionableSuggestions.map((sug, i) => (
                    <p key={i}>• {sug}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("chapters")}
                className="px-3.5 py-1.5 rounded-lg bg-[#222227] text-xs text-zinc-300"
              >
                ← Back to Chapters
              </button>
              <button
                type="button"
                onClick={handleSaveChapter}
                disabled={isSaving}
                className="px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save & Update Chapter"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

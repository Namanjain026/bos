"use client";

import { useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";
import {
  PenTool,
  BookOpen,
  Plus,
  Save,
  Trash2,
  Lock,
  Clock,
  Eye,
  ArrowLeft,
  CheckCircle2,
  SlidersHorizontal,
  Settings,
  Layers,
  FileText,
  Upload,
} from "lucide-react";
import { AICritiqueFeedback } from "@/lib/ai-critique";

interface StudioWorkPageProps {
  params: Promise<{
    workId: string;
  }>;
}

export default function StudioWorkManagementPage({ params }: StudioWorkPageProps) {
  const { workId } = use(params);
  const initialWork = MOCK_WORKS.find((w) => w.id === workId) || MOCK_WORKS[0];

  const [activeTab, setActiveTab] = useState<"chapters" | "settings" | "editor">("chapters");

  // Work Settings State
  const [title, setTitle] = useState(initialWork.title);
  const [description, setDescription] = useState(initialWork.description);
  const [synopsisLong, setSynopsisLong] = useState(initialWork.synopsisLong);
  const [workType, setWorkType] = useState(initialWork.type);
  const [ageRating, setAgeRating] = useState(initialWork.ageRating);
  const [language, setLanguage] = useState(initialWork.language);
  const [status, setStatus] = useState(initialWork.status);
  const [coverUrl, setCoverUrl] = useState(initialWork.coverUrl || "");
  const [genres, setGenres] = useState(initialWork.genres.join(", "));

  // Chapters State
  const [chapters, setChapters] = useState(initialWork.chaptersList);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  // Chapter Edit Form State
  const [chTitle, setChTitle] = useState("");
  const [chNumber, setChNumber] = useState<number>(1);
  const [chBody, setChBody] = useState("");
  const [chIsMembersOnly, setChIsMembersOnly] = useState(false);
  const [chDelayDays, setChDelayDays] = useState(7);
  const [chStatus, setChStatus] = useState<string>("PUBLISHED");

  // Craft Diagnostic State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisFeedback, setAnalysisFeedback] = useState<AICritiqueFeedback | null>(null);

  // Status message
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleOpenChapterEditor = (ch: typeof initialWork.chaptersList[0]) => {
    setEditingChapterId(ch.id);
    setChTitle(ch.title);
    setChNumber(ch.chapterNumber);
    setChIsMembersOnly(ch.isMembersOnly);
    setChStatus(ch.isMembersOnly ? "MEMBERS_FIRST" : "PUBLISHED");
    setChBody(
      ch.id === "ch-1"
        ? `The ink smelled of scorched copper and rain.\n\nKaelen dipped his glass-tipped stylus into the vial, letting the luminescent charcoal liquid pool upon the parchment of sheepskin. Outside the high arched windows of the cartographer's garret, the towers of High Oakhaven bled into twilight, their obsidian spires catching the dying amethyst rays of the twin suns.\n\n"You're drawing it wrong," a voice muttered from the lintel.`
        : `New draft content for Chapter ${ch.chapterNumber}...`
    );
    setAnalysisFeedback(null);
    setActiveTab("editor");
  };

  const handleAddNewChapter = () => {
    const nextNum = chapters.length + 1;
    const newCh = {
      id: `ch-new-${Date.now()}`,
      chapterNumber: nextNum,
      title: `Chapter ${nextNum}: Untitled Release`,
      wordCount: 0,
      isMembersOnly: false,
      releasedAt: new Date().toISOString().split("T")[0],
    };
    setChapters([...chapters, newCh]);
    handleOpenChapterEditor(newCh);
  };

  const handleSaveChapter = () => {
    const updated = chapters.map((c) =>
      c.id === editingChapterId
        ? {
            ...c,
            title: chTitle,
            chapterNumber: chNumber,
            isMembersOnly: chIsMembersOnly,
            wordCount: chBody.trim() ? chBody.trim().split(/\s+/).length : 0,
          }
        : c
    );
    setChapters(updated);
    showNotification(`Chapter "${chTitle}" saved successfully!`);
    setActiveTab("chapters");
  };

  const handleDeleteChapter = (id: string) => {
    if (confirm("Are you sure you want to delete this chapter? This action cannot be undone.")) {
      setChapters(chapters.filter((c) => c.id !== id));
      showNotification("Chapter deleted.");
    }
  };

  const handleSaveWorkSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Work metadata & settings updated successfully!");
  };

  const handleRunAnalysis = () => {
    if (!chBody.trim()) {
      alert("Please enter some text in the chapter manuscript before running craft analysis.");
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
          "Strong scene opening with immersive sensory imagery.",
          "Tight dialogue rhythm and distinctive character voice.",
          "Clean paragraph pacing that maintains narrative forward drive.",
        ],
        weaknesses: [
          "Exposition in middle section could weave more action beats.",
        ],
        actionableSuggestions: [
          "Show Kaelen's physical reaction to the magic shock to heighten the emotional stakes.",
          "Ensure the transition between the room dialogue and the flashback remains clear.",
        ],
        comparableThemes: ["The Name of the Wind", "Shadow and Bone"],
        potentialAudience: "Dark Fantasy readers and progression fantasy enthusiasts.",
        disclaimer: "This analysis is advisory craft feedback to assist in revision, not a literary verdict.",
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Save Feedback Banner */}
        {saveMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200">
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
              href={`/work/${initialWork.slug}`}
              target="_blank"
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
            Chapters & Episodes ({chapters.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === "settings" ? "bg-[#222227] text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5 inline mr-1.5" />
            Work Metadata & Settings
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
              <span>Click Edit to change title, manuscript, or release rules</span>
            </div>

            <div className="space-y-2">
              {chapters.map((ch) => (
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

        {/* Tab 2: Work Settings & Metadata Editor */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveWorkSettings} className="bg-[#161619] border border-[#27272d] p-6 rounded-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272d]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Edit Work Metadata
              </h3>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
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
                <label className="font-medium text-zinc-300">Content Format / Medium</label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value as typeof initialWork.type)}
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
                <label className="font-medium text-zinc-300">Genres (Comma separated)</label>
                <input
                  type="text"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
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
                <label className="font-medium text-zinc-300">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
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
                <label className="font-medium text-zinc-300">Short Hook / Card Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-medium text-zinc-300">Full Synopsis</label>
                <textarea
                  rows={4}
                  value={synopsisLong}
                  onChange={(e) => setSynopsisLong(e.target.value)}
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
                className="px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors"
              >
                Save Work Settings
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
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 rounded-lg bg-[#222227] hover:bg-[#2c2c33] border border-[#31313a] text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {isAnalyzing ? "Analyzing..." : "Analyze Craft"}
                </button>
                <button
                  onClick={handleSaveChapter}
                  className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Save Chapter
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

            {/* Monetization & Release Rules */}
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
                    className="rounded bg-[#161619] border-zinc-700 text-zinc-100 focus:ring-0"
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
                onClick={() => setActiveTab("chapters")}
                className="px-3.5 py-1.5 rounded-lg bg-[#222227] text-xs text-zinc-300"
              >
                ← Back to Chapters
              </button>
              <button
                onClick={handleSaveChapter}
                className="px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs"
              >
                Save & Update Chapter
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

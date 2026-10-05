import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getPublishedWorks } from "@/lib/works-service";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Layers, BookOpen } from "lucide-react";

interface GenrePageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    type?: string;
    q?: string;
  }>;
}

const GENRE_MAP: Record<string, { title: string; desc: string }> = {
  "action-adventure": {
    title: "Action & Adventure",
    desc: "Thrilling quests, martial progression, dungeon raids, high-stakes battles, and expansive journeys.",
  },
  "fantasy": {
    title: "Fantasy",
    desc: "Magic systems, mythical beasts, kingdoms, enchanted artifacts, and supernatural sagas.",
  },
  "dark-fantasy": {
    title: "Dark Fantasy",
    desc: "Grim realism, moral dilemmas, necromancy, and survival against monstrous odds.",
  },
  "sci-fi": {
    title: "Sci-Fi & Cyberpunk",
    desc: "Futuristic mega-cities, advanced cybernetics, space odysseys, and synthetic intelligence.",
  },
  "manga-comics": {
    title: "Manga & Comics",
    desc: "Visual storytelling, vertical webtoons, episodic comic chapters, and graphic serials.",
  },
  "light-novels": {
    title: "Light Novels",
    desc: "Fast-paced serialized prose, character illustrations, and popular episodic adventures.",
  },
  "romance": {
    title: "Romance",
    desc: "Emotional journeys, slow burns, character bonds, dramatic rivalries, and love stories.",
  },
  "mystery-detective": {
    title: "Mystery & Detective",
    desc: "Unsolved cases, dark noir investigators, psychological twists, and hidden secrets.",
  },
  "horror-supernatural": {
    title: "Horror & Supernatural",
    desc: "Cosmic dread, chilling hauntings, paranormal anomalies, and psychological suspense.",
  },
  "slice-of-life": {
    title: "Slice of Life",
    desc: "Cozy daily living, character relationships, artisan crafts, and wholesome moments.",
  },
  "short-stories": {
    title: "Short Stories",
    desc: "Bite-sized standalone fiction, thematic anthologies, and quick compelling reads.",
  },
  "poetry": {
    title: "Poetry & Verse",
    desc: "Poetic collections, lyrical prose, emotional reflections, and rhythmic storytelling.",
  },
  "non-fiction": {
    title: "Non-Fiction & Essays",
    desc: "Guides, craft essays, philosophical commentary, historical reflections, and author journals.",
  },
};

export default async function GenreDetailsPage({ params, searchParams }: GenrePageProps) {
  const { slug } = await params;
  const { type, q } = await searchParams;

  const genreInfo = GENRE_MAP[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    desc: `Explore serialized novels, manga, light novels, and stories in ${slug.replace(/-/g, " ")}.`,
  };

  // 1. Fetch all works for this genre first
  const allGenreWorks = await getPublishedWorks({
    genre: genreInfo.title,
    search: q,
    limit: 50,
  });

  // 2. Count availability across types within this specific genre
  const typeCounts: Record<string, number> = {
    ALL: allGenreWorks.length,
    NOVEL: allGenreWorks.filter((w) => w.type === "NOVEL" || w.type === "NOVELLA").length,
    MANGA: allGenreWorks.filter((w) => w.type === "MANGA" || w.type === "COMIC").length,
    LIGHT_NOVEL: allGenreWorks.filter((w) => w.type === "LIGHT_NOVEL").length,
    SHORT_STORY: allGenreWorks.filter((w) => w.type === "SHORT_STORY").length,
    POETRY: allGenreWorks.filter((w) => w.type === "POETRY").length,
    NON_FICTION: allGenreWorks.filter((w) => w.type === "NON_FICTION").length,
  };

  // 3. Filter by the selected type
  const displayedWorks = type
    ? allGenreWorks.filter((w) => {
        if (type === "NOVEL") return w.type === "NOVEL" || w.type === "NOVELLA";
        if (type === "MANGA") return w.type === "MANGA" || w.type === "COMIC";
        return w.type === type;
      })
    : allGenreWorks;

  const typeTabs = [
    { label: "All Formats", value: "", count: typeCounts.ALL },
    { label: "Novels & Serials", value: "NOVEL", count: typeCounts.NOVEL },
    { label: "Manga & Comics", value: "MANGA", count: typeCounts.MANGA },
    { label: "Light Novels", value: "LIGHT_NOVEL", count: typeCounts.LIGHT_NOVEL },
    { label: "Short Stories", value: "SHORT_STORY", count: typeCounts.SHORT_STORY },
    { label: "Poetry", value: "POETRY", count: typeCounts.POETRY },
    { label: "Non-Fiction & Essays", value: "NON_FICTION", count: typeCounts.NON_FICTION },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/genres"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Genre Directory
          </Link>
        </div>

        {/* Genre Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161619] border border-[#27272d] space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#222227] text-zinc-300">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Genre Category</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white">
            {genreInfo.title}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            {genreInfo.desc}
          </p>

          <div className="pt-2 text-xs font-mono text-zinc-400">
            <span>{allGenreWorks.length} total titles in this genre</span>
          </div>
        </div>

        {/* In-Genre Search Bar */}
        <form method="GET" action={`/genres/${slug}`} className="relative max-w-md">
          {type && <input type="hidden" name="type" value={type} />}
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder={`Search within ${genreInfo.title}...`}
            className="w-full pl-9 pr-4 py-2 bg-[#161619] border border-[#27272d] rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </form>

        {/* Step 2: Format Sub-Filter Tabs */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Filter by Format:
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pb-2">
            {typeTabs.map((tab) => {
              const isSelected = (!type && !tab.value) || type === tab.value;
              const params = new URLSearchParams();
              if (tab.value) params.set("type", tab.value);
              if (q) params.set("q", q);

              return (
                <Link
                  key={tab.label}
                  href={`/genres/${slug}${params.toString() ? `?${params.toString()}` : ""}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                      : "bg-[#161619] border border-[#27272d] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? "bg-zinc-300 text-zinc-900 font-bold" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Works Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>
              Showing {displayedWorks.length} {displayedWorks.length === 1 ? "title" : "titles"}
              {type ? ` for ${type.replace("_", " ")}` : ""}
            </span>
          </div>

          {displayedWorks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedWorks.map((work) => (
                <BookCard key={work.id} work={work} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-[#161619] border border-[#27272d] rounded-2xl p-8 space-y-3">
              <BookOpen className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="text-sm font-bold text-zinc-200">
                No {type ? type.replace("_", " ").toLowerCase() : "works"} found in {genreInfo.title}
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Be the first author to publish a {type ? type.replace("_", " ").toLowerCase() : "story"} in this category!
              </p>
              <div className="pt-2">
                <Link
                  href="/create"
                  className="inline-block px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs"
                >
                  Publish in {genreInfo.title}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

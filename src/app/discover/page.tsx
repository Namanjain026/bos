import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
import { Compass, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface DiscoverPageProps {
  searchParams: Promise<{
    type?: string;
    genre?: string;
    sort?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const { type, genre, sort } = await searchParams;

  let filteredWorks = [...MOCK_WORKS];

  if (type) {
    filteredWorks = filteredWorks.filter((w) => w.type === type);
  }

  if (genre) {
    filteredWorks = filteredWorks.filter((w) =>
      w.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
    );
  }

  const typesList = [
    { label: "All Formats", value: "" },
    { label: "Novels & Serials", value: "NOVEL" },
    { label: "Manga & Comics", value: "MANGA" },
    { label: "Light Novels", value: "LIGHT_NOVEL" },
    { label: "Short Stories", value: "SHORT_STORY" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Compass className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Discover Stories & Manga
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Explore ongoing web serials, completed graphic novels, and trending indie works.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {typesList.map((t) => {
            const isSelected = (!type && !t.value) || type === t.value;
            return (
              <Link
                key={t.label}
                href={`/discover${t.value ? `?type=${t.value}` : ""}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing {filteredWorks.length} titles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWorks.map((work) => (
              <BookCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { MOCK_WORKS } from "@/lib/mock-data";
import Link from "next/link";

interface DiscoverPageProps {
  searchParams: Promise<{
    type?: string;
    genre?: string;
    sort?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const { type, genre } = await searchParams;

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
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="pb-4 border-b border-[#27272d]">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Discover
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Browse published stories, serialized novels, and manga by format or category.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          {typesList.map((t) => {
            const isSelected = (!type && !t.value) || type === t.value;
            return (
              <Link
                key={t.label}
                href={`/discover${t.value ? `?type=${t.value}` : ""}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "bg-[#161619] border border-[#27272d] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Works Grid */}
        <div className="space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            {filteredWorks.length} works available
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

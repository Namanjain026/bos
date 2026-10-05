import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getPublishedWorks } from "@/lib/works-service";
import Link from "next/link";
import { Search, X } from "lucide-react";

interface DiscoverPageProps {
  searchParams: Promise<{
    type?: string;
    genre?: string;
    q?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const { type, genre, q, search, sort } = await searchParams;
  const searchQuery = q || search;

  const works = await getPublishedWorks({
    search: searchQuery,
    genre,
    type,
    sort: sort as any,
    limit: 30,
  });

  const typesList = [
    { label: "All Formats", value: "" },
    { label: "Novels & Serials", value: "NOVEL" },
    { label: "Manga & Comics", value: "MANGA" },
    { label: "Light Novels", value: "LIGHT_NOVEL" },
    { label: "Short Stories", value: "SHORT_STORY" },
  ];

  const popularGenres = [
    "Fantasy",
    "Action & Adventure",
    "Sci-Fi",
    "Cyberpunk",
    "Romance",
    "Horror & Supernatural",
    "Mystery & Detective",
    "Slice of Life",
    "Poetry",
  ];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="pb-4 border-b border-[#27272d]">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Discover Stories & Comics
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Search and filter published works across all formats, genres, and community creators.
          </p>
        </div>

        {/* Active Filter Tags Bar */}
        {(searchQuery || genre || type) && (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#161619] border border-[#27272d] text-xs">
            <span className="text-zinc-400 font-mono text-[11px]">Active Filters:</span>
            {searchQuery && (
              <Link
                href={`/discover?${new URLSearchParams({ ...(genre && { genre }), ...(type && { type }) }).toString()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#222227] text-zinc-200 border border-[#31313a] hover:border-zinc-500"
              >
                Search: &ldquo;{searchQuery}&rdquo; <X className="w-3 h-3" />
              </Link>
            )}
            {genre && (
              <Link
                href={`/discover?${new URLSearchParams({ ...(searchQuery && { q: searchQuery }), ...(type && { type }) }).toString()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#222227] text-zinc-200 border border-[#31313a] hover:border-zinc-500"
              >
                Genre: {genre} <X className="w-3 h-3" />
              </Link>
            )}
            {type && (
              <Link
                href={`/discover?${new URLSearchParams({ ...(searchQuery && { q: searchQuery }), ...(genre && { genre }) }).toString()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#222227] text-zinc-200 border border-[#31313a] hover:border-zinc-500"
              >
                Format: {type.replace("_", " ")} <X className="w-3 h-3" />
              </Link>
            )}
            <Link
              href="/discover"
              className="text-[11px] text-zinc-500 hover:text-zinc-300 underline ml-2 font-mono"
            >
              Clear all filters
            </Link>
          </div>
        )}

        {/* Format Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {typesList.map((t) => {
            const isSelected = (!type && !t.value) || type === t.value;
            const params = new URLSearchParams();
            if (t.value) params.set("type", t.value);
            if (genre) params.set("genre", genre);
            if (searchQuery) params.set("q", searchQuery);

            return (
              <Link
                key={t.label}
                href={`/discover${params.toString() ? `?${params.toString()}` : ""}`}
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

        {/* Quick Genre Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          <span className="text-[11px] font-mono text-zinc-500 mr-1">Genres:</span>
          {popularGenres.map((g) => {
            const isSelected = genre?.toLowerCase() === g.toLowerCase();
            const params = new URLSearchParams();
            if (type) params.set("type", type);
            if (!isSelected) params.set("genre", g);
            if (searchQuery) params.set("q", searchQuery);

            return (
              <Link
                key={g}
                href={`/discover${params.toString() ? `?${params.toString()}` : ""}`}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                  isSelected
                    ? "bg-[#27272e] text-white border border-zinc-500 font-medium"
                    : "bg-[#131316] text-zinc-400 hover:text-zinc-200 border border-[#222227]"
                }`}
              >
                {g}
              </Link>
            );
          })}
        </div>

        {/* Works Grid */}
        <div className="space-y-3">
          <div className="text-xs text-zinc-500 font-mono">
            {works.length} {works.length === 1 ? "work" : "works"} found
          </div>

          {works.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {works.map((work) => (
                <BookCard key={work.id} work={work} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#161619] border border-[#27272d] rounded-2xl p-8 space-y-3">
              <Search className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="text-sm font-bold text-zinc-200">No matching stories found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try searching with different keywords or clearing your active filters.
              </p>
              <div className="pt-2">
                <Link
                  href="/discover"
                  className="inline-block px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs"
                >
                  View All Works
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

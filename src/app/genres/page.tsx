import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function GenresPage() {
  const GENRE_CATEGORIES = [
    {
      title: "Speculative Fiction",
      items: [
        { name: "Fantasy", slug: "fantasy", count: "1,420 works", desc: "Epic worldbuilding, high magic, and sword & sorcery." },
        { name: "Action & Adventure", slug: "action-adventure", count: "890 works", desc: "Martial progression, high-stakes quests, and battles." },
        { name: "Dark Fantasy", slug: "dark-fantasy", count: "650 works", desc: "Grimdark worlds, necromancy, and moral ambiguity." },
        { name: "Sci-Fi & Cyberpunk", slug: "sci-fi", count: "890 works", desc: "Mega-cities, synthetic intelligence, and space exploration." },
      ],
    },
    {
      title: "Visual Formats & Light Novels",
      items: [
        { name: "Manga & Comics", slug: "manga-comics", count: "980 series", desc: "Full-color vertical webtoons and episodic manga." },
        { name: "Light Novels", slug: "light-novels", count: "540 works", desc: "Fast-paced serialized fiction with character art." },
      ],
    },
    {
      title: "Drama, Suspense & Prose",
      items: [
        { name: "Romance", slug: "romance", count: "840 works", desc: "Slow-burn relationships, rivalries, and emotional bonds." },
        { name: "Mystery & Detective", slug: "mystery-detective", count: "390 works", desc: "Clues, noir detectives, and supernatural puzzles." },
        { name: "Horror & Supernatural", slug: "horror-supernatural", count: "480 works", desc: "Cosmic terror, eerie folklore, and psychological dread." },
        { name: "Slice of Life", slug: "slice-of-life", count: "610 works", desc: "Wholesome days, cozy crafting, and character moments." },
        { name: "Short Stories", slug: "short-stories", count: "1,100 pieces", desc: "Standalone short fiction and anthologies." },
        { name: "Non-Fiction & Essays", slug: "non-fiction", count: "340 pieces", desc: "Craft guides, commentary, and essays." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col selection:bg-zinc-700">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="pb-4 border-b border-[#27272d]">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Genres & Categories
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Select a genre to explore stories, novels, manga, and essays within that universe.
          </p>
        </div>

        <div className="space-y-8">
          {GENRE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">{cat.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {cat.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/genres/${item.slug}`}
                    className="p-4 rounded-xl bg-[#161619] hover:bg-[#1c1c20] border border-[#27272d] hover:border-[#3a3a44] transition-colors flex flex-col justify-between h-28 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-xs text-zinc-200 group-hover:text-white transition-colors">
                          {item.name}
                        </h3>
                        <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

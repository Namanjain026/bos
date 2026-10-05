import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Layers, Sparkles, BookOpen } from "lucide-react";

export default function GenresPage() {
  const GENRE_CATEGORIES = [
    {
      title: "Speculative Fiction",
      items: [
        { name: "Fantasy", count: "1,420 stories", desc: "Epic worldbuilding, high magic, and sword & sorcery." },
        { name: "Dark Fantasy", count: "650 stories", desc: "Grimdark worlds, necromancy, and moral ambiguity." },
        { name: "Sci-Fi & Cyberpunk", count: "890 stories", desc: "Mega-cities, synthetic intelligence, and space exploration." },
        { name: "Progression & LitRPG", count: "720 stories", desc: "Level-ups, cultivation, and magical mastery." },
      ],
    },
    {
      title: "Visual Formats & Comics",
      items: [
        { name: "Manga & Comics", count: "980 series", desc: "Full-color vertical webtoons and episodic manga." },
        { name: "Light Novels", count: "540 works", desc: "Fast-paced serialized fiction with character art." },
      ],
    },
    {
      title: "Suspense & Emotion",
      items: [
        { name: "Romance", count: "840 stories", desc: "Slow-burn relationships, rivalries, and emotional bonds." },
        { name: "Mystery & Detective", count: "390 stories", desc: "Clues, noir detectives, and supernatural puzzles." },
        { name: "Horror & Supernatural", count: "480 stories", desc: "Cosmic terror, eerie folklore, and psychological dread." },
        { name: "Slice of Life", count: "610 stories", desc: "Wholesome days, cozy crafting, and character moments." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-violet-600">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
          <span className="p-2 rounded-xl bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30">
            <Layers className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Genre & Universe Directory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Browse curated storytelling universes across all formats.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {GENRE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-200">{cat.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <Link
                    key={item.name}
                    href={`/discover?genre=${encodeURIComponent(item.name)}`}
                    className="p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-violet-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between group space-y-3"
                  >
                    <div>
                      <h3 className="font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-violet-400">
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

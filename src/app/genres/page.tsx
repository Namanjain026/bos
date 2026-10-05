import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GenresPage() {
  const GENRE_CATEGORIES = [
    {
      title: "Speculative Fiction",
      items: [
        { name: "Fantasy", count: "1,420 works", desc: "Epic worldbuilding, high magic, and sword & sorcery." },
        { name: "Dark Fantasy", count: "650 works", desc: "Grimdark worlds, necromancy, and moral ambiguity." },
        { name: "Sci-Fi & Cyberpunk", count: "890 works", desc: "Mega-cities, synthetic intelligence, and space exploration." },
        { name: "Progression & LitRPG", count: "720 works", desc: "Level-ups, cultivation, and magical mastery." },
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
      title: "Drama & Suspense",
      items: [
        { name: "Romance", count: "840 works", desc: "Slow-burn relationships, rivalries, and emotional bonds." },
        { name: "Mystery & Detective", count: "390 works", desc: "Clues, noir detectives, and supernatural puzzles." },
        { name: "Horror & Supernatural", count: "480 works", desc: "Cosmic terror, eerie folklore, and psychological dread." },
        { name: "Slice of Life", count: "610 works", desc: "Wholesome days, cozy crafting, and character moments." },
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
            Explore stories organized across literary genres and formats.
          </p>
        </div>

        <div className="space-y-8">
          {GENRE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">{cat.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {cat.items.map((item) => (
                  <Link
                    key={item.name}
                    href={`/discover?genre=${encodeURIComponent(item.name)}`}
                    className="p-4 rounded-xl bg-[#161619] hover:bg-[#1c1c20] border border-[#27272d] hover:border-[#3a3a44] transition-colors flex flex-col justify-between h-28 group"
                  >
                    <div>
                      <h3 className="font-semibold text-xs text-zinc-200 group-hover:text-white transition-colors">
                        {item.name}
                      </h3>
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

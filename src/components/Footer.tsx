import Link from "next/link";
import { BookOpen, Sparkles, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/60 pt-12 pb-8 mt-20 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-amber-500 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                BOOK OF <span className="text-violet-400">SHADES</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              A creator-first social publishing platform where everyone can read, write, publish, and monetize serialized novels, manga, webtoons, light novels, and short stories.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-800/50 text-violet-300">
                <Sparkles className="w-3 h-3" /> AI Critique Suite
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300">
                <Shield className="w-3 h-3" /> Creator Owned
              </span>
            </div>
          </div>

          {/* Column 1: Read */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Read</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/discover" className="hover:text-violet-400 transition-colors">Popular Novels</Link></li>
              <li><Link href="/discover?type=MANGA" className="hover:text-violet-400 transition-colors">Manga & Comics</Link></li>
              <li><Link href="/rankings" className="hover:text-violet-400 transition-colors">Trending Leaderboard</Link></li>
              <li><Link href="/genres" className="hover:text-violet-400 transition-colors">Genre Directory</Link></li>
            </ul>
          </div>

          {/* Column 2: Creators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Creators</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/create" className="hover:text-violet-400 transition-colors">Publish a Work</Link></li>
              <li><Link href="/create?tab=ai" className="hover:text-violet-400 transition-colors">AI Rate My Book</Link></li>
              <li><Link href="/dashboard" className="hover:text-violet-400 transition-colors">Creator Studio & Stats</Link></li>
              <li><Link href="/monetization" className="hover:text-violet-400 transition-colors">Members First Setup</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-violet-400 transition-colors">About Book of Shades</Link></li>
              <li><Link href="/terms" className="hover:text-violet-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-violet-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/moderation" className="hover:text-violet-400 transition-colors">Content Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Book of Shades Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 text-zinc-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for storytellers and readers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

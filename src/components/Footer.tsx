import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#24242a] bg-[#0c0c0e] pt-12 pb-8 mt-20 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Book of Shades
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              An open platform for reading and publishing serialized novels, original webcomics, manga, and short fiction.
            </p>
          </div>

          {/* Column 1: Read */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 font-mono">Read</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/discover" className="hover:text-white transition-colors">Novels</Link></li>
              <li><Link href="/discover?type=MANGA" className="hover:text-white transition-colors">Manga & Webcomics</Link></li>
              <li><Link href="/rankings" className="hover:text-white transition-colors">Rankings</Link></li>
              <li><Link href="/genres" className="hover:text-white transition-colors">Genres</Link></li>
            </ul>
          </div>

          {/* Column 2: Authors */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 font-mono">Authors</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/create" className="hover:text-white transition-colors">Author Studio</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/monetization" className="hover:text-white transition-colors">Members First</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 font-mono">Platform</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/moderation" className="hover:text-white transition-colors">Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#24242a] pt-6 flex flex-col sm:flex-row items-center justify-between text-zinc-500 gap-3 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Book of Shades. All creator works remain the property of their respective authors.</p>
        </div>
      </div>
    </footer>
  );
}

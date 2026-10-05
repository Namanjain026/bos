"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, ArrowRight, AlertCircle, Loader2, Check } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await register({
      username,
      displayName,
      email,
      password,
    });

    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res.error || "Registration failed. Please verify your details.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-zinc-700">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-black text-sm">
          <BookOpen className="w-4 h-4 stroke-[2.5]" />
        </div>
        <span className="text-base font-bold text-white group-hover:text-zinc-300 transition-colors">
          Book of Shades
        </span>
      </Link>

      <div className="w-full max-w-md bg-[#161619] border border-[#27272d] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-xs text-zinc-400">
            One unified account for reading, following authors, and publishing your stories.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-medium text-zinc-300">Display Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Elena Vance"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-zinc-300">Username (Unique handle)</label>
            <input
              type="text"
              required
              placeholder="e.g., elena_vance"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-zinc-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="author@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-zinc-300">Password (Min. 6 characters)</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#27272d] text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

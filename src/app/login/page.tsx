"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(identifier, password);
    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res.error || "Failed to sign in. Please check your credentials.");
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
          <h1 className="text-xl font-bold text-white tracking-tight">Sign in to your account</h1>
          <p className="text-xs text-zinc-400">
            Access your reading library, author drafts, and creator earnings.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-zinc-300">Email or Username</label>
            <input
              type="text"
              required
              placeholder="e.g., elena_vance or author@domain.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-medium text-zinc-300">Password</label>
              <Link href="#" className="text-[11px] text-zinc-400 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0f0f11] border border-[#2c2c32] rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#27272d] text-center text-xs text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white font-semibold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

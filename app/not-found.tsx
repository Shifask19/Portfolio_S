import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          This page doesn&apos;t exist — or maybe it moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}

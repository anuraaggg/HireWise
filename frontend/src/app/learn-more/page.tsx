import Link from "next/link";
import Aurora from "@/components/Aurora";
import { BlockMath } from "react-katex";

export default function LearnMorePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-6 text-zinc-100 md:px-8 md:py-8">
      <Aurora colorStops={["#0ea5e9", "#22c55e", "#f97316"]} amplitude={0.42} blend={0.35} speed={0.5} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_12%_78%,rgba(249,115,22,0.14),transparent_42%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl space-y-4">
        <header className="rounded-3xl border border-white/10 bg-black/55 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">HireWise</p>
              <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-zinc-100 md:text-4xl">Learn More</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
                Understand exactly how the analyzer processes resumes and job descriptions, how scoring is calculated, and how to interpret results.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                Home
              </Link>
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                Start Analysis
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-zinc-900/78 p-5 shadow-[0_22px_55px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-6">
          <h2 className="font-display text-2xl font-semibold text-zinc-100">Step-by-Step Workflow</h2>
          <ol className="mt-4 grid gap-3 text-sm text-zinc-200 md:grid-cols-2">
            <li className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Step 1</p>
              <p className="mt-2">Upload a resume file in PDF, DOCX, or TXT format.</p>
              <p className="mt-1 text-zinc-400">The backend extracts plain text from the file so it can be analyzed consistently.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Step 2</p>
              <p className="mt-2">Paste the full job description.</p>
              <p className="mt-1 text-zinc-400">Including responsibilities and required tools improves skill extraction quality.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Step 3</p>
              <p className="mt-2">Set similarity threshold (recommended 0.65 to 0.80).</p>
              <p className="mt-1 text-zinc-400">Higher values are stricter and reduce weak semantic matches.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Step 4</p>
              <p className="mt-2">Run analysis and review output cards.</p>
              <p className="mt-1 text-zinc-400">Use missing skills and explanations to understand readiness gaps quickly.</p>
            </li>
          </ol>
        </section>

        <section className="rounded-3xl border border-white/10 bg-zinc-900/78 p-5 shadow-[0_22px_55px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-6">
          <h2 className="font-display text-2xl font-semibold text-zinc-100">How It Works</h2>
          <div className="mt-4 grid gap-3 text-sm text-zinc-200 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Extraction</p>
              <p className="mt-2">Skills are extracted from both resume and job text using pattern-based NLP rules.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Normalization</p>
              <p className="mt-2">Skill variants are normalized so equivalent terms map to the same canonical skill.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Matching</p>
              <p className="mt-2">Semantic embeddings compare each job skill against resume skills to find best-fit matches.</p>
            </article>
          </div>
          <div className="mt-3 grid gap-3 text-sm text-zinc-200 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Scoring</p>
              <p className="mt-2">Each matched skill contributes weight × similarity. The final readiness score is normalized to 0 to 100.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Explainability</p>
              <p className="mt-2">The app returns deterministic explanations for matched and missing skills so decisions remain transparent.</p>
            </article>
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-300/35 bg-cyan-500/10 p-4 text-cyan-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Readiness Score Formula</p>
            <div className="mt-3 overflow-x-auto text-sm">
              <BlockMath math={"\\text{Readiness Score} = \\left(\\frac{\\sum_{i=1}^{n}(w_i \\cdot s_i)}{\\sum_{i=1}^{n} w_i}\\right) \\times 100"} />
            </div>
            <p className="mt-2 text-xs text-cyan-100/90">
              where w_i is the weight of skill i and s_i is the matched similarity score for that skill.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

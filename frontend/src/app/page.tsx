import Link from "next/link";
import Aurora from "@/components/Aurora";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-12 text-zinc-100 md:px-8 md:py-16">
      <Aurora colorStops={["#0ea5e9", "#22c55e", "#f97316"]} amplitude={0.42} blend={0.35} speed={0.5} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_12%_78%,rgba(249,115,22,0.14),transparent_42%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center">
        <section className="w-full rounded-3xl border border-white/10 bg-black/55 p-8 shadow-[0_22px_60px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-14">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">HireWise</p>
            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight text-zinc-100 md:text-7xl">
              Hiring decisions with sharper skill signal
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
              Semantic matching and explainable scoring for resume-to-role fit, designed for faster and more confident screening.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/analyze"
                className="rounded-xl border border-white/20 bg-black/35 px-7 py-4 text-base font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                Start Analysis
              </Link>
              <Link
                href="/learn-more"
                className="rounded-xl border border-white/20 bg-black/35 px-7 py-4 text-base font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

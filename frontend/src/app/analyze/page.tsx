"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import Aurora from "@/components/Aurora";

type AnalyzerResponse = {
  inputs?: {
    job_skills_normalized?: string[];
    resume_skills_normalized?: string[];
  };
  score?: {
    readiness_score?: number;
    explanations?: string[];
    matched_skills?: Array<{ skill: string; contribution: number }>;
    missing_skills?: Array<{ skill: string; weight: number }>;
  };
  explanation?: {
    final_summary?: {
      strength_areas?: string[];
      major_skill_gaps?: string[];
      overall_candidate_assessment?: string;
    };
  };
};

export default function AnalyzePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState("0.7");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzerResponse | null>(null);

  const apiBaseUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!resumeFile) {
      setError("Please upload a resume file (.pdf, .docx, or .txt).");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume_file", resumeFile);
      formData.append("job_description", jobDescription);
      formData.append("similarity_threshold", threshold);

      const response = await fetch(`${apiBaseUrl}/skill_gap_analyzer/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: AnalyzerResponse = await response.json();
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to call analyzer API.");
    } finally {
      setLoading(false);
    }
  };

  const readinessScore = result?.score?.readiness_score ?? 0;
  const readinessToneClass =
    readinessScore >= 80
      ? "text-emerald-300"
      : readinessScore >= 60
        ? "text-amber-300"
        : "text-rose-300";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-6 text-zinc-100 md:px-8 md:py-8">
      <Aurora colorStops={["#0ea5e9", "#22c55e", "#f97316"]} amplitude={0.42} blend={0.35} speed={0.5} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_12%_78%,rgba(249,115,22,0.14),transparent_42%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <header className="rounded-3xl border border-white/10 bg-black/55 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">HireWise</p>
              <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-zinc-100 md:text-4xl">
                Candidate Analyzer
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
                Upload a resume, paste the job description, and receive a weighted readiness score, matched skills, missing skills, and interpretable explanations.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
            >
              Back to Home
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
            >
              How It Works
            </Link>
          </div>
        </header>

        <section className="mt-5 space-y-4">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-white/10 bg-zinc-900/75 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-6"
          >
            <div className="border-b border-white/10 pb-3">
              <h2 className="font-display text-xl font-semibold text-zinc-100">Analyzer Input</h2>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-200">Job Description</span>
                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  rows={11}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/45 p-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:bg-black/65"
                  placeholder="Paste responsibilities, required tech stack, and preferred qualifications"
                />
              </label>

              <div className="space-y-4">
                <label className="block rounded-2xl border border-white/10 bg-black/35 p-4">
                  <span className="text-sm font-semibold text-zinc-200">Resume File (.pdf, .docx, .txt)</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/45 p-3 text-sm text-zinc-100 file:mr-3 file:rounded-xl file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-zinc-300"
                  />
                  <p className="mt-2 text-xs text-zinc-400">
                    {resumeFile ? `Selected file: ${resumeFile.name}` : "No file selected"}
                  </p>
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <label className="text-sm font-semibold text-zinc-200" htmlFor="threshold">
                    Similarity Threshold
                  </label>
                  <input
                    id="threshold"
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={threshold}
                    onChange={(event) => setThreshold(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-black/45 p-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 w-full rounded-xl bg-zinc-100 px-5 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <p className="mt-4 rounded-2xl border border-rose-300/45 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>
            ) : null}
          </form>
        </section>

        {result ? (
          <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-900/78 p-5 shadow-[0_22px_55px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-6">
            <div className="grid gap-4 md:grid-cols-[0.55fr_1.45fr]">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Readiness Score</p>
                <p className={`font-display mt-2 text-5xl font-semibold ${readinessToneClass}`}>{readinessScore}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Overall Assessment</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                  {result.explanation?.final_summary?.overall_candidate_assessment || "Assessment unavailable."}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-300/45 bg-rose-500/10 p-4">
                <h3 className="font-display text-lg font-semibold text-rose-200">Missing Skills</h3>
                {(result.score?.missing_skills || []).length === 0 ? (
                  <p className="mt-2 text-sm text-emerald-300">No missing skills detected.</p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-2 text-sm text-rose-100">
                    {(result.score?.missing_skills || []).map((item) => (
                      <li key={item.skill} className="rounded-full border border-rose-300/45 bg-black/35 px-3 py-1">
                        {item.skill} • w{item.weight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-emerald-300/45 bg-emerald-500/10 p-4">
                <h3 className="font-display text-lg font-semibold text-emerald-200">Matched Skills</h3>
                {(result.score?.matched_skills || []).length === 0 ? (
                  <p className="mt-2 text-sm text-amber-300">No strong semantic matches found.</p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-2 text-sm text-emerald-100">
                    {(result.score?.matched_skills || []).map((item) => (
                      <li key={item.skill} className="rounded-full border border-emerald-300/45 bg-black/35 px-3 py-1">
                        {item.skill} • +{item.contribution}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="font-display text-lg font-semibold text-zinc-100">Deterministic Explanations</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {(result.score?.explanations || []).map((text, index) => (
                  <li key={index} className="rounded-xl border border-white/10 bg-black/40 p-3">
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {result.inputs?.job_skills_normalized?.length ? (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                <h3 className="font-display text-lg font-semibold text-zinc-100">Parsed Job Skills</h3>
                <ul className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-200">
                  {result.inputs.job_skills_normalized.map((skill) => (
                    <li key={skill} className="rounded-full border border-white/15 bg-black/45 px-3 py-1">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}

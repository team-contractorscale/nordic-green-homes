import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/home/shared";
import { getSurvey } from "@/lib/estimate/surveys";
import { loadState } from "@/lib/estimate/state";
import type { Answers, ProjectType } from "@/lib/estimate/types";
import { EstimateSidebar } from "./estimate-sidebar";
import { SurveyFlow } from "./survey-flow";

// Shared shell for both wizard routes. No photo header on purpose: the question should sit above
// the fold on a page whose only job is to get it answered.
export function SurveyPage({ projectType }: { projectType: ProjectType }) {
  const survey = getSurvey(projectType);

  // Mirrors SurveyFlow's answers so the sidebar can show a live running estimate.
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = loadState();
    return saved.projectType === projectType && saved.answers ? saved.answers : {};
  });

  return (
    <section className="bg-secondary/50 pb-24 sm:pb-28">
      {/* Dark band so the floating nav stays legible; the wizard overlaps its lower edge. */}
      <div className="bg-primary pt-32 pb-28 text-white sm:pt-40">
        <div className="wrap">
          <Link
            to="/estimate"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to estimate
          </Link>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow dark>Instant estimate</Eyebrow>
            </div>
            <h1 className="mt-3 font-serif text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.15]">
              Your {survey.label} estimate in a few minutes
            </h1>
            <p className="mt-3 text-base text-white/80">{survey.description}</p>
          </div>
        </div>
      </div>

      <div className="wrap -mt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <SurveyFlow projectType={projectType} onAnswersChange={setAnswers} />
          </div>
          <EstimateSidebar projectType={projectType} answers={answers} />
        </div>
      </div>
    </section>
  );
}

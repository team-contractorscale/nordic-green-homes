import { createFileRoute } from "@tanstack/react-router";
import { SurveyPage } from "@/components/estimate/survey-page";

export const Route = createFileRoute("/estimate/garden-suite")({
  head: () => ({
    meta: [
      { title: "Garden Suite Estimate | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <SurveyPage projectType="gardenSuite" />,
});

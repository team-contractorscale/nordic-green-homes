import { createFileRoute } from "@tanstack/react-router";
import { SurveyPage } from "@/components/estimate/survey-page";

export const Route = createFileRoute("/estimate/custom-home")({
  head: () => ({
    meta: [
      { title: "Luxury Custom Home Estimate | Nordic Green Homes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <SurveyPage projectType="customHome" />,
});

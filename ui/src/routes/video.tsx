import { createFileRoute } from "@tanstack/react-router";
import { GeneratorPage } from "@/app/GeneratorPage";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Generator din video — Captionly" },
      { name: "description", content: "Incarca un video si primeste caption-uri si hashtag-uri optimizate." },
    ],
  }),
  component: () => (
    <GeneratorPage
      mode="video"
      title="Din video in caption-uri"
      subtitle="Incarca un fisier video — il transcriem si scriem postarile."
    />
  ),
});

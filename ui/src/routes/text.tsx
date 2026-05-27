import { createFileRoute } from "@tanstack/react-router";
import { GeneratorPage } from "@/app/GeneratorPage";

export const Route = createFileRoute("/text")({
  head: () => ({
    meta: [
      { title: "Generator din text — Captionly" },
      { name: "description", content: "Genereaza caption-uri si hashtag-uri pornind de la un articol sau text lung." },
    ],
  }),
  component: () => (
    <GeneratorPage
      mode="text"
      title="Din articol in caption-uri"
      subtitle="Lipeste articolul tau si alege platformele tinta."
    />
  ),
});

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Captionly — Caption & Hashtag Generator" },
      { name: "description", content: "Genereaza caption-uri si hashtag-uri pentru LinkedIn, TikTok si Instagram pornind de la un articol sau un video." },
    ],
  }),
  component: HomePage,
});

function ChoiceCard({
  to, eyebrow, title, description, icon, accent,
}: {
  to: "/text" | "/video";
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-7 shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
    >
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="text-5xl mb-4 animate-float">{icon}</div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">{eyebrow}</p>
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:gap-2 transition-all">
          Incepe <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/60 backdrop-blur text-xs font-semibold text-foreground border border-border/60 mb-6">
          ✨ Powered by AI · pentru content creators
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Transforma orice idee in<br />
          <span className="text-gradient">caption-uri virale</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Lipeste un articol sau urca un video. Primesti instant caption-uri
          si hashtag-uri optimizate pentru LinkedIn, TikTok si Instagram.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <ChoiceCard
          to="/text"
          eyebrow="Sursa text"
          title="Articol / Text"
          description="Lipeste un articol, un blog post sau orice text lung. Extragem ideile si scriem caption-urile pentru tine."
          icon="📝"
          accent="oklch(0.72 0.22 320 / 0.6)"
        />
        <ChoiceCard
          to="/video"
          eyebrow="Sursa video"
          title="Video"
          description="Incarca un fisier video. Il transcriem, rezumam continutul si generam caption-uri pentru fiecare platforma."
          icon="🎬"
          accent="oklch(0.78 0.18 200 / 0.6)"
        />
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 text-center">
        {[
          { k: "3", v: "platforme" },
          { k: "4", v: "tonuri" },
          { k: "∞", v: "variante" },
        ].map((s) => (
          <div key={s.v} className="rounded-xl border border-border/40 bg-card/40 backdrop-blur py-4">
            <div className="text-2xl font-bold text-gradient">{s.k}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

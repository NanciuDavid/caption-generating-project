import { createFileRoute, Link } from "@tanstack/react-router";
import { TextInput } from "@/components/generator/TextInput";
import { VideoUpload } from "@/components/generator/VideoUpload";
import { VideoPlayer } from "@/components/generator/VideoPlayer";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Scripty" }] }),
  component: HomePage,
});

/* ── Primitive reutilizabile ────────────────────────────────────────── */

function AccentHeading({ children }: { children: string }) {
  const words = children.trim().split(/\s+/);
  const accent = words.slice(0, 2).join(" ");
  const rest   = words.slice(2).join(" ");
  return (
    <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
      <span className="text-accent">{accent}</span>
      {rest && <span className="text-foreground"> {rest}</span>}
    </h2>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block glass-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span
        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]"
        style={{ background: "linear-gradient(135deg, oklch(0.52 0.24 295), oklch(0.67 0.20 48))" }}
      />
      {children}
    </li>
  );
}

type AllRoutes = "/text" | "/video" | "/hook" | "/bio" | "/thread";

function CtaButton({ to, children }: { to: AllRoutes; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 bg-accent rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-[0.98] transition-all w-fit"
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

const DIVIDER = (
  <div className="h-px mb-20" style={{
    background: "linear-gradient(90deg, transparent, oklch(0.52 0.24 295 / 0.18), oklch(0.67 0.20 48 / 0.18), transparent)"
  }} />
);

/* ── Sectiunea Text ─────────────────────────────────────────────────── */
function TextSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-7">
          <Badge>Sursa: Text</Badge>
          <AccentHeading>Articol transformat in posturi</AccentHeading>
          <p className="text-muted-foreground leading-relaxed text-base">
            Lipeste orice text lung — un blog post, un articol de stiri, notite sau extrage
            direct dintr-un URL. Generam caption-uri distincte per platforma si ton.
          </p>
          <ul className="flex flex-col gap-3">
            <Bullet>Caption-uri distincte per platforma si ton</Bullet>
            <Bullet>Extragere automata din URL articol</Bullet>
            <Bullet>Hashtag-uri relevante incluse automat</Bullet>
          </ul>
          <CtaButton to="/text">Deschide generatorul</CtaButton>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Previzualizare
          </p>
          <TextInput />
          <Link
            to="/text"
            className="text-center rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Continua in generator →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sectiunea Video ────────────────────────────────────────────────── */
function VideoSection() {
  const { videoFile, result } = useApp();
  const segments = result?.segments ?? [];
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      {DIVIDER}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-7">
          <div className="flex gap-2 flex-wrap">
            <Badge>Sursa: Video</Badge>
            <Badge>YouTube</Badge>
            <Badge>Live captions</Badge>
          </div>
          <AccentHeading>Video transcris cu subtitrari live</AccentHeading>
          <p className="text-muted-foreground leading-relaxed text-base">
            Incarca orice fisier video/audio sau da paste la un link YouTube.
            Il transcriem cu Whisper si generam caption-uri cu subtitrari sincronizate live in player.
          </p>
          <ul className="flex flex-col gap-3">
            <Bullet>Transcriere automata cu Whisper-large-v3</Bullet>
            <Bullet>Suport YouTube URL — fara descarcare manuala</Bullet>
            <Bullet>Subtitrari sincronizate in timp real in player</Bullet>
          </ul>
          <CtaButton to="/video">Deschide generatorul</CtaButton>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Previzualizare
          </p>
          <VideoUpload />
          {videoFile && (
            <div className="rounded-xl overflow-hidden bg-black/5">
              <VideoPlayer file={videoFile} segments={segments} />
              {segments.length === 0 && (
                <p className="px-4 py-2 text-xs text-muted-foreground">
                  Mergi pe pagina dedicata pentru a genera subtitrari sincronizate.
                </p>
              )}
            </div>
          )}
          <Link
            to="/video"
            className="text-center rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            {videoFile ? "Genereaza subtitrari →" : "Continua in generator →"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sectiunea Hook-uri ─────────────────────────────────────────────── */
const EXAMPLE_HOOKS = [
  "99% dintre postari sunt ignorate. Ale tale nu trebuie sa fie.",
  "Ce s-ar intampla daca ai putea dubla engagement-ul in 30 de zile?",
  "Nimeni nu iti citeste caption-urile. Iata cum sa schimbi asta.",
];

function HookSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      {DIVIDER}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-7 md:order-2">
          <Badge>Generator: Hook-uri</Badge>
          <AccentHeading>Hook-uri care opresc scrollul</AccentHeading>
          <p className="text-muted-foreground leading-relaxed text-base">
            Prima propozitie decide daca cineva citeste sau trece mai departe.
            Generam hook-uri captivante si variate — intrebari, statistici, claim-uri bold — adaptate subiectului tau.
          </p>
          <ul className="flex flex-col gap-3">
            <Bullet>Pana la 10 variante de hook per subiect</Bullet>
            <Bullet>Stiluri: intrebare, afirmatie bold, statistica</Bullet>
            <Bullet>Disponibil in 5 limbi</Bullet>
          </ul>
          <CtaButton to="/hook">Genereaza hook-uri</CtaButton>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-3 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Previzualizare
          </p>
          {EXAMPLE_HOOKS.map((hook, i) => (
            <div key={i} className="glass-sm rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-xs font-bold text-primary/40 tabular-nums mt-0.5 flex-shrink-0 w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{hook}</p>
            </div>
          ))}
          <Link
            to="/hook"
            className="text-center rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-1"
          >
            Genereaza hook-uri proprii →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sectiunea Bio ──────────────────────────────────────────────────── */
const EXAMPLE_BIOS = [
  { platform: "LinkedIn", bio: "Co-fondator @ TechStart | Ajut echipele sa creasca cu AI | Mentor · Speaker | #SaaS #B2B" },
  { platform: "Instagram", bio: "✨ Building in public | AI & Growth | DM pentru colaborari 🚀" },
  { platform: "TikTok", bio: "CEO la 26 ani 🔥 | Tips antreprenoriat zilnic | Urmărește!" },
];

function BioSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      {DIVIDER}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-7">
          <Badge>Generator: Bio</Badge>
          <AccentHeading>Bio profesional pe orice platforma</AccentHeading>
          <p className="text-muted-foreground leading-relaxed text-base">
            Descrie-te sau brandul tau o singura data si generam bio-uri optimizate
            separat pentru LinkedIn, Instagram si TikTok — fiecare respectand
            stilul si limitele platformei.
          </p>
          <ul className="flex flex-col gap-3">
            <Bullet>Bio adaptat per platforma si limita de caractere</Bullet>
            <Bullet>Ton profesional pe LinkedIn, creativ pe Instagram</Bullet>
            <Bullet>Genereaza in orice limba</Bullet>
          </ul>
          <CtaButton to="/bio">Genereaza bio-ul tau</CtaButton>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Previzualizare
          </p>
          {EXAMPLE_BIOS.map(({ platform, bio }) => (
            <div key={platform} className="glass-sm rounded-xl px-4 py-3 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                {platform}
              </p>
              <p className="text-sm text-foreground leading-relaxed">{bio}</p>
              <p className="text-[10px] text-muted-foreground tabular-nums">{bio.length} caractere</p>
            </div>
          ))}
          <Link
            to="/bio"
            className="text-center rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-1"
          >
            Creeaza bio-ul tau →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sectiunea Thread ───────────────────────────────────────────────── */
const EXAMPLE_THREAD = [
  "1/ Nimeni nu iti spune ca sa construiesti o prezenta online e greu. Eu iti spun. Si iti spun si cum.",
  "2/ Am inceput cu 0 urmăritori, 0 experienta si 0 buget. Acum am o comunitate de 40k+.",
  "3/ Iata ce am invatat in 3 ani si ce functioneaza cu adevarat ↓",
  "4/ Consistenta bate viralitatea. Fiecare. Data. Fara exceptie.",
];

function ThreadSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32">
      {DIVIDER}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex flex-col gap-7 md:order-2">
          <Badge>Generator: Thread X</Badge>
          <AccentHeading>Thread viral din orice articol</AccentHeading>
          <p className="text-muted-foreground leading-relaxed text-base">
            Transforma un blog post, un articol sau o idee intr-un thread structurat
            pentru X (Twitter). Fiecare postare sub 280 de caractere, cu hook la inceput
            si call-to-action la final.
          </p>
          <ul className="flex flex-col gap-3">
            <Bullet>Pana la 15 postari per thread</Bullet>
            <Bullet>Hook captivant la prima postare automat</Bullet>
            <Bullet>Copiaza tot thread-ul dintr-un click</Bullet>
          </ul>
          <CtaButton to="/thread">Genereaza thread</CtaButton>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col gap-1 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Previzualizare
          </p>
          {EXAMPLE_THREAD.map((post, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-0.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: i === 0 ? "linear-gradient(135deg, oklch(0.52 0.24 295), oklch(0.67 0.20 48))" : "oklch(0.89 0.010 268)" }}
                />
                {i < EXAMPLE_THREAD.length - 1 && (
                  <div className="w-px flex-1 min-h-[20px] mt-1" style={{ background: "oklch(0.89 0.010 268)" }} />
                )}
              </div>
              <p className="text-sm text-foreground leading-relaxed pb-3">{post}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pl-5 mt-1">🧵 + mai multe postari generate automat</p>
          <Link
            to="/thread"
            className="text-center rounded-xl bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-3"
          >
            Creeaza thread-ul tau →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Homepage ───────────────────────────────────────────────────────── */
const FEATURE_CHIPS: { to: AllRoutes; label: string; emoji: string }[] = [
  { to: "/text",   label: "Caption text",   emoji: "✍️" },
  { to: "/video",  label: "Caption video",  emoji: "🎬" },
  { to: "/hook",   label: "Hook-uri",       emoji: "🪝" },
  { to: "/bio",    label: "Bio",            emoji: "👤" },
  { to: "/thread", label: "Thread X",       emoji: "🧵" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="text-center pt-16 pb-12 px-6">
        <div className="inline-block mb-5">
          <span className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Built with Groq · Whisper · Llama 3.3
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.05]">
          <span className="text-accent">Continut gata</span>
          <br />
          <span className="text-foreground">de postat, instant</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Caption-uri, hook-uri, bio-uri si thread-uri generate cu AI
          din orice text, video sau URL — pentru LinkedIn, TikTok si Instagram.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FEATURE_CHIPS.map(({ to, label, emoji }) => (
            <Link
              key={to}
              to={to}
              className="glass rounded-full px-4 py-2 text-sm font-medium text-foreground hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <span className="mr-1.5">{emoji}</span>{label}
            </Link>
          ))}
        </div>
      </div>

      <TextSection />
      <VideoSection />
      <HookSection />
      <BioSection />
      <ThreadSection />
    </>
  );
}

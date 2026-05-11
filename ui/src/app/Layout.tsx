import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppProvider } from "@/context/AppContext";

function Header() {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  return (
    <header className="border-b border-border/40 backdrop-blur-md bg-background/40 sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block w-8 h-8 rounded-lg bg-gradient-hero shadow-glow group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-tight text-foreground">Captionly</span>
        </Link>
        {!isHome && (
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/text"
              className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-1.5 rounded-full bg-secondary text-foreground" }}
            >
              Text
            </Link>
            <Link
              to="/video"
              className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-1.5 rounded-full bg-secondary text-foreground" }}
            >
              Video
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export function Layout() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="py-8 text-center text-xs text-muted-foreground">
          Captionly · genereaza caption-uri & hashtag-uri instant
        </footer>
      </div>
    </AppProvider>
  );
}

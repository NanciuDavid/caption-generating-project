import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppProvider, useApp } from "@/context/AppContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Comuta tema"
      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8 transition-colors flex-shrink-0"
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42zm12.72 12.72a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41zM2 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0zM17.66 6.34a1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0z"/>
        </svg>
      )}
    </button>
  );
}

const NAV_LINKS = [
  { to: "/text" as const,   label: "Text" },
  { to: "/video" as const,  label: "Video" },
  { to: "/hook" as const,   label: "Hook-uri" },
  { to: "/bio" as const,    label: "Bio" },
  { to: "/thread" as const, label: "Thread" },
];

function Header() {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--glass-nav-bg)",
        backdropFilter: "blur(40px) saturate(1.5)",
        WebkitBackdropFilter: "blur(40px) saturate(1.5)",
        borderBottom: "1px solid oklch(0 0 0 / 0.10)",
        boxShadow: "0 1px 12px oklch(0 0 0 / 0.06)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-sm font-bold text-foreground tracking-tight hover:opacity-70 transition-opacity flex-shrink-0 mr-2"
        >
          Scripty
        </Link>

        {/* Nav — toata lumea vede toate link-urile */}
        <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-none">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                isHome
                  ? "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              activeProps={{
                className: "px-3 py-1.5 rounded-full text-sm whitespace-nowrap glass-pill text-foreground font-semibold transition-all",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
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
      </div>
    </AppProvider>
  );
}

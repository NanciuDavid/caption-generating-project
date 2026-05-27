import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Layout } from "@/app/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 max-w-sm text-center">
        <p className="text-5xl font-bold text-foreground mb-3">404</p>
        <p className="text-muted-foreground text-sm mb-6">Pagina nu a fost gasita.</p>
        <Link to="/" className="text-sm font-medium text-primary hover:opacity-70 transition-opacity">
          ← Acasa
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 max-w-sm text-center">
        <p className="text-foreground font-semibold mb-2">Ceva nu a mers bine</p>
        <p className="text-muted-foreground text-sm mb-6">Incearca sa reimprospatezi pagina.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-sm font-medium text-primary hover:opacity-70 transition-opacity"
          >
            Reincearca
          </button>
          <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Acasa
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Scripty" },
      { name: "description", content: "Caption-uri, hook-uri, bio-uri si thread-uri generate cu AI pentru social media." },
      { property: "og:title", content: "Scripty" },
      { property: "og:description", content: "Transforma orice text sau video in continut gata de postat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

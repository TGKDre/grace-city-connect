import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <SiteHeader />
      <main className="flex-1">{/* Outlet handled by router */}</main>
      <SiteFooter />
    </div>
  ),
});

export const routeTree = rootRoute;

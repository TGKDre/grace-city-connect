import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="container-page py-24">
      <h1 className="font-display text-5xl text-ink">Grace City</h1>
      <p className="mt-4 text-lg text-ink-muted">
        One church, many cities. Welcome home.
      </p>
    </section>
  );
}

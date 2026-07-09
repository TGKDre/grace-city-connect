import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "../components/sign-in-form";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="container-page flex items-center justify-center py-24">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-ink mb-6 text-center">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}

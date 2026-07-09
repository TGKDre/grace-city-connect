import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "../components/admin-dashboard";

export const Route = createFileRoute("/admin")({
  component: AdminRoute,
});

function AdminRoute() {
  return <AdminDashboard />;
}

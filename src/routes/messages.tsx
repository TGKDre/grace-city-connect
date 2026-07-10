import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";

export default function Messages() {
  return (
    <div className="container-page">
      <h1>Messages</h1>
      <p>Watch our latest messages from Grace City campuses</p>
      <div className="grid">
        {/* Message cards will go here */}
      </div>
    </div>
  );
}

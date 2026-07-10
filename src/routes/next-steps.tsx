import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";

export default function NextSteps() {
  return (
    <div className="container-page">
      <h1>Plan Your Visit</h1>
      <section>
        <h2>New Here?</h2>
        <p>Welcome to Grace City! We're glad you're considering visiting our church.</p>
      </section>
      <section>
        <h2>Next Steps</h2>
        <ol>
          <li>Find a campus near you</li>
          <li>Check service times</li>
          <li>Let us know you're coming</li>
        </ol>
      </section>
      <section>
        <h2>Visit Form</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Campus:
            <select name="campus">
              {/* Campus options will go here */}
            </select>
          </label>
          <label>
            Message:
            <textarea name="message" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        <h2>Useful Links</h2>
        <ul>
          <li><Link to="/campuses">Campuses</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/messages">Watch Messages</Link></li>
        </ul>
      </section>
    </div>
  );
}

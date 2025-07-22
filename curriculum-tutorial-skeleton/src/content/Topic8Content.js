import React from "react";
import "./CustomSectionStyles.css";

const Topic8Content = () => {
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🛡️ Section 8 – Security Configuration & Best Practices
      </h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll take our JWT-based authentication system to the
        next level with advanced security tools and configuration strategies.
        This includes:
        <ul className="topic-checklist">
          <li>Fine-grained role-based access control</li>
          <li>Method-level security annotations</li>
          <li>Custom annotations to secure business logic</li>
          <li>CORS setup for frontend integration</li>
          <li>Best practices to avoid common security flaws</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why This Section Matters?
      </h3>
      <div className="blue-card-section">
        <p>
          So far, we've protected routes using JWT tokens. But real-world
          applications need <b>more control</b>:
        </p>
        <ul className="topic-checklist">
          <li>
            🔑 What if only an <b>admin</b> should delete a URL?
          </li>
          <li>
            🔒 What if some logic must be protected at the <b>method level</b>?
          </li>
          <li>
            🛡️ How do we prevent CORS issues when frontend and backend are on
            different domains?
          </li>
          <li>
            🔄 What utilities can simplify role checking inside
            services/controllers?
          </li>
        </ul>
        <p>
          That's what Section 8 solves — making your security{" "}
          <b>robust, reusable, and future-proof</b>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 What You'll Learn
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Subsection</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>8.1</b>
            </td>
            <td>
              <code>Spring Security Configuration</code> – Expand and tweak our
              main <code>SecurityFilterChain</code>
            </td>
          </tr>
          <tr>
            <td>
              <b>8.2</b>
            </td>
            <td>
              <code>JWT Security Filter</code> – How our custom{" "}
              <code>JwtTokenValidator</code> powers protection
            </td>
          </tr>
          <tr>
            <td>
              <b>8.3</b>
            </td>
            <td>
              <code>Method-Level Security</code> – Using{" "}
              <code>@PreAuthorize</code>, <code>@Secured</code>, and more
            </td>
          </tr>
          <tr>
            <td>
              <b>8.4</b>
            </td>
            <td>
              <code>URL-based Security</code> – Using Ant matchers to restrict
              by path and role
            </td>
          </tr>
          <tr>
            <td>
              <b>8.5</b>
            </td>
            <td>
              <code>Security Utilities</code> – Utility methods to get current
              user, check role etc.
            </td>
          </tr>
          <tr>
            <td>
              <b>8.6</b>
            </td>
            <td>
              <code>Custom Annotations</code> – Make your own{" "}
              <code>@AdminOnly</code> annotation!
            </td>
          </tr>
          <tr>
            <td>
              <b>8.7</b>
            </td>
            <td>
              <code>CORS Configuration</code> – Handle cross-origin requests for
              frontend integration
            </td>
          </tr>
          <tr>
            <td>
              <b>8.8</b>
            </td>
            <td>
              <code>Security Testing</code> – Try breaking your app and securing
              it better
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 By The End Of This Section
      </h3>
      <div className="blue-card-section">
        You'll be able to:
        <ul className="topic-checklist">
          <li>
            ✅ Apply <b>role-based restrictions</b> to both endpoints and
            internal service methods
          </li>
          <li>
            ✅ Use <b>custom security annotations</b> for cleaner code
          </li>
          <li>✅ Retrieve logged-in user's details anywhere in the app</li>
          <li>
            ✅ Solve frontend/backend communication via <b>CORS</b>
          </li>
          <li>✅ Think like a hacker to test your own app's weaknesses</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Real-World Scenarios We'll Handle
      </h3>
      <div className="blue-card-section">
        <ul className="topic-bullets">
          <li>🔓 A normal user tries to call an admin-only endpoint</li>
          <li>🔄 Frontend calls an API and fails due to CORS</li>
          <li>🕵️ You want to log user behavior only if they're logged in</li>
          <li>
            💡 You want to protect business logic inside a service, not just
            controller
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Summary of Key Concepts
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Why It's Important</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>@PreAuthorize</code>
            </td>
            <td>Enforce roles at method level</td>
          </tr>
          <tr>
            <td>
              <code>SecurityContextHolder</code>
            </td>
            <td>Get logged-in user's identity anywhere</td>
          </tr>
          <tr>
            <td>
              <code>Custom Annotations</code>
            </td>
            <td>Makes your code DRY and expressive</td>
          </tr>
          <tr>
            <td>
              <code>CORS Configuration</code>
            </td>
            <td>Lets frontend apps talk to your backend securely</td>
          </tr>
          <tr>
            <td>
              <code>JwtTokenValidator</code>
            </td>
            <td>Core piece of verifying tokens</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Content;

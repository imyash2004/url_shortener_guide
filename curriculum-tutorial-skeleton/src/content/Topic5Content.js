import React from "react";
import "./CustomSectionStyles.css";

const Topic5Content = () => {
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🏢 Section 5 – Organization API</h2>
      <hr />
      <div className="yellow-callout">
        In real-world applications, especially those built for{" "}
        <b>teams or businesses</b>, we often need to group users, resources, or
        data under an <b>"Organization"</b> (or "Tenant"). This section
        introduces the <b>multi-tenant design</b> using the{" "}
        <b>Organization API</b>, helping us support things like:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Multiple companies using your URL shortener.</li>
          <li>Isolating data per organization.</li>
          <li>Managing users and links under each organization.</li>
          <li>Filtering URLs and analytics per organization.</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Why Do We Need Organizations?
      </h3>
      <div className="blue-card-section">
        Let’s say you’re building a URL shortener that’s used by:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>Startup A</b> (for marketing links)
          </li>
          <li>
            <b>College B</b> (for student project links)
          </li>
          <li>
            <b>NGO C</b> (for donation campaigns)
          </li>
        </ul>
        Each one wants to manage their own URLs separately. We need to group
        them under <b>organizations</b>, and that's exactly what this section
        helps you achieve.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 What You’ll Build in Section 5
      </h3>
      <div className="blue-card-section">
        Throughout this section, we will:
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            <b>Design the Organization entity</b> – how it’s represented in our
            system.
          </li>
          <li>
            <b>Connect URLs to organizations</b> – so we know which link belongs
            to whom.
          </li>
          <li>
            <b>Create Organization DTOs and Repositories</b> – to fetch and send
            clean data.
          </li>
          <li>
            <b>Implement service & controller logic</b> – with full CRUD
            support.
          </li>
          <li>
            <b>Enable filtering of URLs by organization</b> – to ensure
            separation.
          </li>
          <li>
            <b>Test the full workflow</b> – from creation to association and
            filtering.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Learning Goals
      </h3>
      <ul className="topic-checklist">
        <li>✅ Design a new entity with clean relationships (one-to-many).</li>
        <li>
          ✅ Implement role-based access (e.g., only certain users can modify an
          org).
        </li>
        <li>✅ Apply DTO mapping and service layering to a new domain.</li>
        <li>✅ Test organization-scoped APIs properly.</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Real-World Mapping
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            🏢 Slack, Notion, GitHub → All allow orgs or teams to manage users
            and resources.
          </li>
          <li>
            🔗 Your URL Shortener → Will now support multiple orgs, each with
            their own links.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topic5Content;

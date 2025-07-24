import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic9Content = () => {
  const [copied, setCopied] = useState({});

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="">
      <div className="topic-animated-content">
        <h2 style={{ color: "#1769aa" }}>
          🏢 9 – User-Organization Relationship
        </h2>
        <hr />
        <div className="yellow-callout">
          In this section, we'll implement a{" "}
          <strong>many-to-many relationship</strong> between Users and
          Organizations — enabling features like:
          <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
            <li>Assigning users to multiple organizations</li>
            <li>Role-based access inside each organization</li>
            <li>Managing memberships (add/remove users)</li>
            <li>Filtering resources like URLs by organization</li>
          </ul>
          <div style={{ marginTop: "1rem" }}>
            This is <strong>crucial</strong> for enterprise-level features and
            scalable multi-tenant systems.
          </div>
        </div>

        <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
          🧩 What You'll Build
        </h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>UserOrganization</code> entity
              </td>
              <td>Join table to connect users &amp; orgs</td>
            </tr>
            <tr>
              <td>Assign user to org</td>
              <td>Create relationship entries</td>
            </tr>
            <tr>
              <td>Fetch user's organizations</td>
              <td>Show where user belongs</td>
            </tr>
            <tr>
              <td>Role field per relationship</td>
              <td>
                Allow user to be <strong>Admin/Member</strong>
              </td>
            </tr>
            <tr>
              <td>Authorization check on org access</td>
              <td>Prevent unauthorized access to org data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🌐 Real-World Use Case
      </h3>
      <div className="">
        <p>
          Imagine your platform is used by{" "}
          <strong>multiple brands (organizations)</strong> like Flipkart,
          Zomato, or Spotify.
        </p>
        <p style={{ marginTop: "1rem" }}>Each brand wants:</p>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Private access to <strong>their own</strong> short links
          </li>
          <li>
            Ability to invite and manage <strong>their own team members</strong>
          </li>
          <li>
            Analytics specific to their <strong>organization only</strong>
          </li>
        </ul>
        <p style={{ marginTop: "1rem" }}>
          To achieve this, we'll build a solid User ↔ Organization model with
          access controls.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚧 Key Challenges We'll Solve
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            ✅ How to design a many-to-many relationship with extra fields
            (e.g., <code>role</code>)
          </li>
          <li>✅ How to assign users to organizations securely</li>
          <li>✅ How to restrict data access per user-organization mapping</li>
          <li>
            ✅ How to allow role-based actions (e.g., only org admins can invite
            users)
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔢 Subtopics Covered
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.1. UserOrganization Entity</strong>
          </h4>
          <p>
            → Build a join entity that connects users and organizations, storing
            their relationship.
          </p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.2. Many-to-Many Relationship</strong>
          </h4>
          <p>→ Properly map both sides (User &amp; Organization) using JPA.</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.3. User-Organization Service</strong>
          </h4>
          <p>→ Write services to assign, remove, and list members.</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.4. User-Organization Controller</strong>
          </h4>
          <p>
            → Expose APIs to fetch org users, add/remove users, and view
            memberships.
          </p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.5. Role-based Access</strong>
          </h4>
          <p>
            → Use <code>ADMIN</code>, <code>MEMBER</code>, or custom roles to
            restrict features.
          </p>
        </div>

        <div>
          <h4 style={{ color: "#1769aa" }}>
            <strong>9.6. Organization Membership Management</strong>
          </h4>
          <p>→ Add users, remove users, fetch user list — with permissions!</p>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>

        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>Q1: Why is the UserOrganization entity needed?</b>
          </div>
          <div className="yellow-callout">
            → To model a many-to-many relationship with extra fields like{" "}
            <code>role</code>.
          </div>
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>Q2: What is the purpose of roles in this relationship?</b>
          </div>
          <div className="yellow-callout">
            → To control what each user can do in that organization (e.g., Admin
            vs Viewer).
          </div>
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>Q3: Can a user be part of multiple organizations?</b>
          </div>
          <div className="yellow-callout">→ ✅ Yes.</div>
        </div>

        <div>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>Q4: Can we restrict URL access based on user's org?</b>
          </div>
          <div className="yellow-callout">→ ✅ Yes, and we should!</div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <h4>🚀 Task:</h4>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Design a <code>UserOrganization</code> entity with fields:{" "}
            <code>userId</code>, <code>organizationId</code>, <code>role</code>
          </li>
          <li>
            Map it with both <code>User</code> and <code>Organization</code>{" "}
            entities using <code>@ManyToOne</code>
          </li>
          <li>
            Add a service method: <code>assignUserToOrganization()</code>
          </li>
          <li>
            Expose a controller method:{" "}
            <code>
              POST /organizations/{"{orgId}"}/users/{"{userId}"}
            </code>
          </li>
        </ul>

        <div style={{ marginTop: "1rem" }}>
          <strong>💡 Bonus:</strong>
          <br />
          Add a <code>@PreAuthorize</code> rule so <strong>only Admins</strong>{" "}
          can assign users!
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UserOrganization entity</td>
            <td>Manages user-org mappings with roles</td>
          </tr>
          <tr>
            <td>Many-to-many relationship</td>
            <td>Allows users in multiple orgs</td>
          </tr>
          <tr>
            <td>Role field</td>
            <td>Enables fine-grained permissions</td>
          </tr>
          <tr>
            <td>Access filtering</td>
            <td>Prevents users from accessing other orgs</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic7Subtopic0Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    userEntity: `@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "USER"; // Default role

    private boolean enabled = true;

    // Optional: createdAt, updatedAt, email, etc.

    // Constructors
    public User() {}

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
}`,
  };

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(codeBlocks[codeId]);
      setCopied((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const fieldsTable = [
    ["id", "Primary key for user table"],
    ["username", "Unique identifier for login"],
    ["password", "Hashed password using BCrypt (covered in 7.4)"],
    ["role", "Defines access level (e.g., USER or ADMIN)"],
    ["enabled", "Can be used to activate/deactivate an account"],
  ];

  const summaryTable = [
    ["User Entity", "Represents each user in the system"],
    ["@Entity", "Declares it as a JPA entity"],
    ["Unique fields", "username must be unique"],
    ["Secure fields", "Passwords should always be encrypted"],
    ["Role Field", "Allows simple role-based authorization"],
  ];

  const tryItTasks = [
    "Create a User entity with fields: id, username, password, role, and enabled",
    "Make username unique and required",
    "Set default role as USER",
    "Add constructors, getters, and setters",
  ];

  const bonusTasks = [
    "Add fields like email, createdAt",
    "Try setting up a @ManyToOne relation with Organization (optional for now)",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>👤 7.1 – User Entity Design</h2>
      <hr />

      <div className="yellow-callout">
        In this section, we'll define the User entity — the foundation of
        authentication in your application. This entity will store user
        credentials, roles, and potentially relationships to organizations or
        other components.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Is the User Entity Important?
      </h3>
      <div className="blue-card-section">
        <b>Without a proper user model, your application can't:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Authenticate users (login)</li>
          <li>Track who created what</li>
          <li>Securely manage passwords</li>
          <li>Apply role-based access control (e.g., USER vs ADMIN)</li>
          <li>Associate users with organizations or specific data</li>
        </ul>
        <b>
          A well-designed User entity is key to building secure and maintainable
          authentication logic.
        </b>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Creating the User Entity
      </h3>
      <div className="blue-card-section">
        Let's define a simple yet extensible User entity using JPA annotations.
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.userEntity ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.userEntity, "userEntity")}
          >
            {copied.userEntity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.userEntity}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🏗️ Fields Breakdown
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {fieldsTable.map(([field, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{field}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="yellow-callout" style={{ marginTop: "1.5rem" }}>
        <b>💡 Later on, you can extend this with fields like:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">
              email, phone, createdAt, updatedAt
            </span>
            , etc.
          </li>
          <li>Relationships to organizations or roles</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛡️ Constraints and Validations
      </h3>
      <div className="blue-card-section">
        <b>
          Spring will automatically enforce constraints based on annotations:
        </b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">@Column(nullable = false)</span>{" "}
            → Required fields
          </li>
          <li>
            <span className="blue-inline-code">@Column(unique = true)</span> →
            Prevent duplicate usernames
          </li>
        </ul>

        <b>
          You can add validation logic in DTOs or controller layers to ensure:
        </b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Passwords are strong enough</li>
          <li>Username meets format requirements</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>💡 Entity Tips</h3>
      <div className="blue-card-section">
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>Always store only hashed passwords.</li>
          <li>
            Use <span className="blue-inline-code">enabled</span> for account
            activation or soft delete.
          </li>
          <li>
            Make username case-insensitive using normalization or DB collation
            (optional).
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Interactive Mini Quiz
      </h3>
      <div className="blue-card-section">
        <b>❓ Short Answers</b>
        <div style={{ marginTop: "0.7rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <b>Q1: Why should username be unique?</b>
            <button
              style={{
                marginLeft: "1rem",
                padding: "0.2rem 0.5rem",
                fontSize: "0.8rem",
                backgroundColor: "#1769aa",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setDiscussionVisible(!discussionVisible)}
            >
              {discussionVisible ? "Hide" : "Show"} Answers
            </button>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To prevent account conflicts and ensure login
                works reliably.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: Why do we store role in the User entity?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To control what actions a user can perform
                (authorization).
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: Why avoid storing plain-text passwords?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Plain-text passwords are vulnerable to theft —
                always hash them.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: What is the default strategy for ID generation here?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> GenerationType.IDENTITY – database handles
                auto-incrementing.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Task:</b>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>

        <b style={{ marginTop: "1rem", display: "block" }}>💡 Bonus:</b>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([concept, desc], idx) => (
            <tr key={idx}>
              <td>{concept}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic7Subtopic0Content;

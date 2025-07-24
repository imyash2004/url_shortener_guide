import React, { useState } from "react";
import "./CustomSectionStyles.css";

const discussionQA = [
  {
    q: "Why not use plain @ManyToMany?",
    a: "Because we want extra fields like role, createdAt, etc.",
  },
  {
    q: "What does the @PrePersist annotation do?",
    a: "Automatically sets the createdAt timestamp when saving.",
  },
  {
    q: "What kind of field is role?",
    a: "A string that stores access level like ADMIN, MEMBER, etc.",
  },
  {
    q: "How is UserOrganization linked to User and Organization?",
    a: "With @ManyToOne and @JoinColumn annotations.",
  },
];

const Topic9Subtopic1Content = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [copied, setCopied] = useState(false);
  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const code = `package com.url_shortener.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOrganization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Link to User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 🔗 Link to Organization
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    // 👤 Role of the user inside this organization
    @Column(nullable = false)
    private String role;  // e.g., "ADMIN", "MEMBER"

    // 🕒 Timestamp of when they were added
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🏗️ 9.1 – UserOrganization Entity</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll design and implement the{" "}
        <strong>UserOrganization</strong> entity, which represents a
        many-to-many relationship with additional fields like roles.
        <br />
        <br />
        This is commonly called a <strong>join entity</strong> or{" "}
        <strong>association entity</strong> — and it's a best practice when you
        need more than just linking two tables.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Do We Need It?
      </h3>
      <div className="blue-card-section">
        <ul className="custom-bullet-list">
          <li>✅ Users in multiple organizations</li>
          <li>✅ Organizations having multiple users</li>
          <li>
            ✅ Each user having a role in the organization (like Admin, Member)
          </li>
        </ul>
        <div style={{ margin: "1rem 0" }}>
          You can’t do this with a plain <code>@ManyToMany</code> — you need a
          middle table with its own fields. Hence, the{" "}
          <strong>UserOrganization</strong> entity.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Entity Design
      </h3>
      <ul className="custom-bullet-list">
        <li>
          <code>@ManyToOne</code> mappings to both User and Organization
        </li>
        <li>
          A <code>role</code> field to represent the user's authority within the
          org
        </li>
        <li>
          A <code>createdAt</code> timestamp
        </li>
      </ul>

      <h4 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Code: <code>UserOrganization.java</code>
      </h4>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={copyToClipboard}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{code}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Relationship Summary
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Relationship</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User</td>
            <td>@ManyToOne</td>
            <td>Many mappings → one user</td>
          </tr>
          <tr>
            <td>Organization</td>
            <td>@ManyToOne</td>
            <td>Many mappings → one organization</td>
          </tr>
          <tr>
            <td>role</td>
            <td>@Column</td>
            <td>Custom field to define authority level</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧠 Key Notes</h3>
      <ul className="custom-bullet-list">
        <li>
          You can later convert <code>role</code> into an enum for safety.
        </li>
        <li>
          You can extend this entity with fields like <code>status</code>{" "}
          (active/invited), <code>invitedByUser</code>, <code>permissions</code>
        </li>
        <li>
          This design is easily extendable and robust for real-world usage.
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >{`Q${idx + 1}: ${item.q}`}</div>
            <button
              className="reveal-btn"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`answer-${idx}`}
            >
              {openIdx === idx ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openIdx === idx && (
              <div className="yellow-callout" id={`answer-${idx}`}>
                → {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <h4>🧩 Task:</h4>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Create <code>UserOrganization.java</code>
          </li>
          <li>
            Add fields: <code>user</code>, <code>organization</code>,{" "}
            <code>role</code>, <code>createdAt</code>
          </li>
          <li>
            Annotate with <code>@Entity</code> and use Lombok for simplicity
          </li>
          <li>
            Map to User and Organization with <code>@ManyToOne</code>
          </li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <strong>💡 Bonus:</strong>
          <br />
          Make <code>role</code> an Enum (<code>Role.ADMIN</code>,{" "}
          <code>Role.MEMBER</code>)
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>user</td>
            <td>Links to the user</td>
          </tr>
          <tr>
            <td>organization</td>
            <td>Links to the organization</td>
          </tr>
          <tr>
            <td>role</td>
            <td>Defines access level (e.g., Admin)</td>
          </tr>
          <tr>
            <td>createdAt</td>
            <td>Timestamp of assignment</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Subtopic1Content;

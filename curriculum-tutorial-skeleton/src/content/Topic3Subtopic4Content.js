import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  createUrlRequest: `package com.example.urlshortener.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;
import java.time.LocalDateTime;
import jakarta.validation.constraints.Future;

public class CreateUrlRequest {

    @NotBlank(message = "Original URL cannot be blank")
    @URL(message = "Must be a valid URL")
    @Size(max = 2048, message = "URL length cannot exceed 2048 characters")
    private String originalUrl;

    @Future(message = "Expiration date must be in the future")
    private LocalDateTime expiresAt;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    // Getters and Setters

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}`,
  updateUrlRequest: `package com.example.urlshortener.dto;

import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;
import java.time.LocalDateTime;
import jakarta.validation.constraints.Future;

public class UpdateUrlRequest {

    @URL(message = "Must be a valid URL")
    @Size(max = 2048, message = "URL length cannot exceed 2048 characters")
    private String originalUrl;

    @Future(message = "Expiration date must be in the future")
    private LocalDateTime expiresAt;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    // Getters and Setters

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}`,
};

const learningOutcomes = [
  "Understand the purpose of Request DTOs in API design",
  "Learn how to create Request DTO classes for create/update operations",
  "Apply validation annotations to enforce data correctness",
  "Separate entity model from external API contracts",
  "Improve security and maintainability through strict input control",
];

const whyDTOs = [
  [
    "Exposing internal database structure",
    "Hide database details behind API contracts",
  ],
  [
    "Risk of clients sending invalid or excess data",
    "Validate and sanitize incoming requests",
  ],
  [
    "Entities can get tightly coupled to clients",
    "Clear separation of concerns",
  ],
  [
    "Hard to evolve API without breaking clients",
    "Easy to add/remove fields without DB changes",
  ],
];

const fields = [
  ["originalUrl", "The full URL to shorten", "@NotBlank, @URL"],
  ["expiresAt", "Optional expiration timestamp", "@Future"],
  ["description", "Optional text description", "@Size(max=255)"],
];

const tryItTasks = [
  "Define a CreateUrlRequest class with proper validation",
  "Define an UpdateUrlRequest class allowing partial updates",
  "Test sending invalid data and observe validation errors",
  "Add custom validation if needed (e.g., URL format check)",
  "Experiment with adding new fields without touching the Entity",
];

const discussionPrompts = [
  {
    q: "Why not use Entity classes directly for incoming requests?",
    a: "Entities often have sensitive or internal fields that shouldn’t be exposed. They also contain DB-specific logic and aren’t designed for input validation or flexibility.",
  },
  {
    q: "How do validation annotations help in Request DTOs?",
    a: "They ensure the data adheres to expected rules before hitting business logic, preventing errors and bad data from entering the system.",
  },
  {
    q: "Can Request DTOs contain business logic?",
    a: "No. DTOs should be simple data holders. Business logic belongs in the Service layer.",
  },
  {
    q: "How do Request DTOs improve API versioning?",
    a: "By decoupling API contracts from database models, you can add or deprecate fields in DTOs without affecting your Entities or database.",
  },
];

const bestPractices = [
  ["Use validation annotations", "Early input validation"],
  ["Keep DTOs simple and focused", "Easy to maintain and understand"],
  ["Avoid exposing sensitive fields", "Security best practice"],
  [
    "Use different DTOs for create/update",
    "Supports different validation requirements",
  ],
  ["Map DTOs to Entities in Service", "Clear separation of concerns"],
];

const summaryTable = [
  ["Purpose", "Define structure and validation of API inputs"],
  ["Typical Annotations", "@NotBlank, @Size, @URL, @Future"],
  ["Layer", "Input layer, before business logic"],
  ["Benefits", "Security, validation, decoupling, flexibility"],
];

const Topic3Subtopic4Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

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

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 3.4 – Request DTOs</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Structuring Incoming Data Safely</b>
        <br />
        In any API, clients send data to the backend to create or update
        resources. But directly exposing your <b>Entity</b> classes for incoming
        data is a bad practice — it can lead to security risks, tight coupling,
        and unclear contracts.
        <br />
        <br />
        That’s why we use <b>Request DTOs (Data Transfer Objects)</b> — simple,
        dedicated classes that define exactly what data your API expects from
        clients when they send requests.
        <br />
        <br />
        <i>
          Think of Request DTOs as <b>custom forms</b> that only accept the
          fields you want clients to send — no more, no less.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 Why Use Request DTOs?
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Problem Without Request DTOs</th>
            <th>How DTOs Solve It</th>
          </tr>
        </thead>
        <tbody>
          {whyDTOs.map(([p, s], i) => (
            <tr key={i}>
              <td>{p}</td>
              <td>{s}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Request DTOs in Action: URL Shortener
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            Create a new shortened URL (original URL, optional expiration date,
            optional description)
          </li>
          <li>
            Update an existing URL (fields like original URL, expiration date,
            description)
          </li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Request DTOs define exactly which fields can be sent in these
          requests.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Typical Fields in URL Request DTOs
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Purpose</th>
            <th>Validation Example</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(([f, p, v], i) => (
            <tr key={i}>
              <td>{f}</td>
              <td>{p}</td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ul>
          {tryItTasks.map((t, i) => (
            <li key={i}>🔹 {t}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points (With Answers)
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {item.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{item.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([p, r], i) => (
            <tr key={i}>
              <td>✅ {p}</td>
              <td>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Summary Table
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([a, d], i) => (
            <tr key={i}>
              <td>{a}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Code Implementation
      </h3>
      <div className="blue-card-section">
        <b>CreateUrlRequest.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.createUrlRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.createUrlRequest, "createUrlRequest")
            }
          >
            {copied.createUrlRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.createUrlRequest}</code>
          </pre>
        </div>
        <b>UpdateUrlRequest.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.updateUrlRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.updateUrlRequest, "updateUrlRequest")
            }
          >
            {copied.updateUrlRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.updateUrlRequest}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Topic3Subtopic4Content;

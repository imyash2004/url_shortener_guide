import React, { useState } from "react";
import "../App.css";

const Topic2Subtopic1Content = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);
  const [copiedCode, setCopiedCode] = useState({});

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopiedCode((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <div className="key-idea-box">
        <h3 style={{ marginTop: "0", color: "#1769aa" }}>
          🏗️{" "}
          <span style={{ color: "#1769aa" }}>
            Overview: Laying the Foundation of Your Data Model
          </span>
        </h3>
        <p>
          Before your application can serve or store data, it must understand{" "}
          <strong>what kind of data</strong> it is dealing with. That
          understanding starts here — with the <strong>Entity</strong>.
        </p>
        <p>
          In this section, you'll create the <code>Url</code> entity — the core
          data model of your URL Shortener application. This class will be
          mapped to a database table using{" "}
          <strong>JPA (Java Persistence API)</strong>, which lets Spring Boot
          manage database interactions through <strong>Java objects</strong>,
          not SQL.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <strong>
            Think of an Entity like a blueprint for how your data is stored in
            the database.
          </strong>{" "}
          It defines what fields (columns) the database table should have.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 <span style={{ color: "#1769aa" }}>Learning Outcomes</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand the purpose and structure of a JPA Entity
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Create the <code>Url</code> entity and map it to a database table
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use JPA annotations like <code>@Entity</code>, <code>@Id</code>,{" "}
          <code>@Column</code>, <code>@GeneratedValue</code>
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Learn how Spring Boot creates tables automatically from entities
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Explore real-world relevance of table mapping
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘{" "}
        <span style={{ color: "#1769aa" }}>
          What is an Entity in Spring Boot?
        </span>
      </h3>
      <p>
        An <strong>Entity</strong> is a <strong>Java class</strong> that is
        mapped to a <strong>table in a database</strong>.
      </p>
      <ul className="topic-bullets">
        <li>
          Each <strong>field</strong> becomes a <strong>column</strong>
        </li>
        <li>
          Each <strong>object</strong> becomes a <strong>row</strong>
        </li>
        <li>
          You use <strong>JPA annotations</strong> to control how the table and
          fields behave (e.g., make a column unique or auto-generated)
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 <span style={{ color: "#1769aa" }}>Key Annotations</span>
      </h3>
      <div className="topic-funfact example-block">
        <b>🔧 JPA Annotations Reference</b>
        <div className="topic-funfact-block">
          <div>
            <strong>@Entity:</strong> Declares the class as a database entity
          </div>
          <div>
            <strong>@Id:</strong> Marks the primary key
          </div>
          <div>
            <strong>@GeneratedValue:</strong> Auto-generates the ID value
          </div>
          <div>
            <strong>@Column:</strong> (Optional) Customize column behavior like
            nullable, unique, length
          </div>
          <div>
            <strong>@Table (optional):</strong> Customize table name if
            different from class name
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍{" "}
        <span style={{ color: "#1769aa" }}>
          Real-World Examples: Why Table Mapping Matters
        </span>
      </h3>

      <div className="topic-funfact example-block">
        <b>🏢 1. Blueprints vs. Buildings</b>
        <div className="topic-funfact-block">
          <div>
            Your entity is like a <strong>blueprint</strong>, and the database
            table is the <strong>building</strong>. You define the design once
            and use it to create many objects (rows).
          </div>
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>📇 2. Contact App Example</b>
        <div className="topic-funfact-block">
          <div>
            You create a <code>Contact</code> entity — and magically, a{" "}
            <code>contact</code> table appears in your H2 database. You no
            longer need to write <code>CREATE TABLE</code> statements.
          </div>
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>📦 3. Amazon Orders</b>
        <div className="topic-funfact-block">
          <div>
            Every Amazon order is a row in a table. Backend developers define an{" "}
            <code>Order</code> entity that maps to the DB automatically — that's
            how they manage millions of orders efficiently.
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📝 <span style={{ color: "#1769aa" }}>Designing the `Url` Entity</span>
      </h3>
      <p>Let's decide what fields your shortener app needs:</p>

      <div className="topic-funfact example-block">
        <b>🔧 URL Entity Field Design</b>
        <div className="topic-funfact-block">
          <div>
            <strong>id:</strong> Unique ID (primary key)
          </div>
          <div>
            <strong>originalUrl:</strong> Full original URL
          </div>
          <div>
            <strong>shortUrl:</strong> Shortened version of the URL
          </div>
          <div>
            <strong>createdAt:</strong> When it was created
          </div>
          <div>
            <strong>expiresAt:</strong> When it will expire (optional)
          </div>
          <div>
            <strong>clickCount:</strong> Number of times this short URL was used
            (optional)
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 <span style={{ color: "#1769aa" }}>Implementation: `Url.java`</span>
      </h3>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.java ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `package com.example.urlshortener.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2048)
    private String originalUrl;

    @Column(unique = true, nullable = false)
    private String shortUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private Long clickCount;
}`,
                "java"
              )
            }
          >
            {copiedCode.java ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.java ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`package com.example.urlshortener.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2048)
    private String originalUrl;

    @Column(unique = true, nullable = false)
    private String shortUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private Long clickCount;
}`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 <span style={{ color: "#1769aa" }}>Explanation of Each Field</span>
      </h3>

      <div className="topic-funfact example-block">
        <b>📋 Field-by-Field Breakdown</b>
        <div className="topic-funfact-block">
          <div>
            <strong>@Id:</strong> Primary key of the table
          </div>
          <div>
            <strong>@GeneratedValue:</strong> Automatically increment the ID
          </div>
          <div>
            <strong>originalUrl:</strong> Full-length URL input by user
          </div>
          <div>
            <strong>shortUrl:</strong> Unique code (e.g., "abc123") used to
            redirect
          </div>
          <div>
            <strong>createdAt:</strong> Used for analytics and data freshness
          </div>
          <div>
            <strong>expiresAt:</strong> (Optional) Used to disable old links
          </div>
          <div>
            <strong>clickCount:</strong> (Optional) Used to track popularity of
            URLs
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 <span style={{ color: "#1769aa" }}>Try It Yourself</span>
      </h3>

      <div className="topic-funfact example-block">
        <b>✅ Step-by-step:</b>
        <div className="topic-funfact-block">
          <div>
            1. Create a package: <code>com.example.urlshortener.entity</code>
          </div>
          <div>
            2. Add the <code>Url</code> class with the fields shown above
          </div>
          <div>3. Run your Spring Boot app</div>
          <div>
            4. Access H2 Console at:{" "}
            <code>http://localhost:8080/h2-console</code>
          </div>
          <div style={{ marginLeft: "1rem" }}>
            • JDBC URL: <code>jdbc:h2:mem:testdb</code>
            <br />• User: <code>sa</code>, Password: <em>(leave blank)</em>
          </div>
          <div>
            5. Click "Connect" → You'll see the table named <code>URL</code>{" "}
            created automatically
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬{" "}
        <span style={{ color: "#1769aa" }}>
          Discussion Points (With Answers)
        </span>
      </h3>

      <div className="topic-funfact example-block">
        <b>1. Q: Why is the `@Entity` annotation important?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer1(!showAnswer1)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer1 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> It tells Spring Boot to treat the class as a
              table. Without it, Spring Data won't recognize the class during DB
              operations.
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>2. Q: Why is `shortUrl` marked as `unique = true`?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer2(!showAnswer2)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer2 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Each shortened link must be unique. If two
              users receive the same short code, one URL will overwrite the
              other — which is a major bug!
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>3. Q: What happens if we don't use `@GeneratedValue`?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer3(!showAnswer3)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer3 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> You would need to manually assign IDs to each
              new entry. This leads to more code, and potential ID conflicts.
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>4. Q: Why use `LocalDateTime` instead of `Date`?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer4(!showAnswer4)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer4 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> <code>LocalDateTime</code> is:
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Immutable and thread-safe</li>
                <li>More precise and cleaner to use</li>
                <li>Supported well by JPA</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 <span style={{ color: "#1769aa" }}>Best Practices</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use <code>@Column(nullable = false)</code> for required fields to
          enforce data integrity
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use <code>@Builder</code> and <code>@AllArgsConstructor</code> (via
          Lombok) to simplify object creation
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Keep IDs as <code>Long</code> or <code>UUID</code> for scalability
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Avoid exposing <code>id</code> in API responses directly — use DTOs
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪{" "}
        <span style={{ color: "#1769aa" }}>Bonus: Seed Data Automatically</span>
      </h3>
      <p>Want test data to show up automatically on app startup?</p>
      <p>
        Create <code>src/main/resources/data.sql</code>:
      </p>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.sql ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `INSERT INTO url (original_url, short_url, created_at) VALUES
('https://example.com', 'abc123', CURRENT_TIMESTAMP),
('https://spring.io', 'spring456', CURRENT_TIMESTAMP);`,
                "sql"
              )
            }
          >
            {copiedCode.sql ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.sql ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`INSERT INTO url (original_url, short_url, created_at) VALUES
('https://example.com', 'abc123', CURRENT_TIMESTAMP),
('https://spring.io', 'spring456', CURRENT_TIMESTAMP);`}</code>
          </pre>
        </div>
      </div>

      <p>
        Spring Boot auto-loads this file and inserts the records into the{" "}
        <code>url</code> table at runtime.
      </p>
    </div>
  );
};

export default Topic2Subtopic1Content;

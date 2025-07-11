import React, { useState } from "react";
import "../App.css";

const Topic2Content = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);

  return (
    <div className="topic-animated-content">
      <h2 className="section-title">
        <span role="img" aria-label="checkmark">
          ✅
        </span>{" "}
        <span style={{ color: "#1769aa" }}>
          2. First API – List URLs (Without Pagination)
        </span>
      </h2>
      <hr className="section-underline" />

      <div className="key-idea-box">
        <h3 style={{ marginTop: "0", color: "#1769aa" }}>
          🌐{" "}
          <span style={{ color: "#1769aa" }}>
            Overview: Let's Build Our First Working API!
          </span>
        </h3>
        <p>
          Congratulations — your environment is ready, your IDE is powered up,
          and your project is structured. It's time to take your first real step
          into <strong>building a functional backend</strong>.
        </p>
        <p>
          In this section, you'll learn how to{" "}
          <strong>design and build your first API endpoint</strong> that returns
          a list of all shortened URLs — no pagination or filters yet, just a
          clean and working list.
        </p>
        <p>
          This will introduce you to the{" "}
          <strong>classic 4-layer Spring Boot architecture</strong>:
        </p>
        <div
          style={{
            background: "#e3f2fd",
            padding: "1rem",
            borderRadius: "8px",
            margin: "1rem 0",
            border: "2px solid #2196f3",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          <strong>Controller → Service → Repository → Entity</strong>
        </div>
        <p>
          Each layer plays a distinct role, and together, they form the core of
          every scalable application.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <strong>
            Think of this section as your first real conversation between the
            database and the outside world
          </strong>{" "}
          through your backend.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 <span style={{ color: "#1769aa" }}>Learning Outcomes</span>
      </h3>
      <p>By the end of this section, you will:</p>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand how a basic <strong>REST API flow</strong> works in Spring
          Boot
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Learn about the{" "}
          <strong>Entity-Repository-Service-Controller (ERSC)</strong> pattern
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand how to separate concerns between layers
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Know how to return data in <strong>JSON format</strong> using DTOs
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Prepare to test your API using tools like <strong>Postman</strong> or{" "}
          <code>curl</code>
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 <span style={{ color: "#1769aa" }}>Key Concepts</span>
      </h3>
      <div className="topic-funfact example-block">
        <b>🔧 Architecture Components</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Entity:</strong> A Java class mapped to a database table
            using JPA annotations
          </div>
          <div>
            <strong>Repository:</strong> An interface that provides built-in
            methods for database operations
          </div>
          <div>
            <strong>Service:</strong> Contains the business logic – acts as a
            middleman between Controller and Repository
          </div>
          <div>
            <strong>Controller:</strong> Defines the REST endpoints and handles
            incoming HTTP requests
          </div>
          <div>
            <strong>DTO (Data Transfer Object):</strong> A plain object used to
            send safe and structured data to the frontend or clients
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
        <b>
          1. Q: Why is it important to separate the logic between Controller,
          Service, and Repository?
        </b>
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
              <strong>A:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>It makes the code more modular, readable, and testable</li>
                <li>
                  You can change or improve one layer without affecting others
                </li>
                <li>Encourages clean architecture and scalability</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>
          2. Q: What format is typically used to return data in REST APIs, and
          why?
        </b>
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
              <strong>A:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <strong>JSON (JavaScript Object Notation)</strong>
                </li>
                <li>
                  It's lightweight, human-readable, and easily parsed by
                  frontend applications
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>
          3. Q: Why use a Response DTO instead of returning the Entity directly?
        </b>
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
              <strong>A:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  To <strong>control what data is exposed</strong>
                </li>
                <li>
                  To hide sensitive fields or database-related fields (like
                  internal IDs or timestamps)
                </li>
                <li>
                  Allows future-proofing by shaping the response without
                  modifying the database model
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topic2Content;

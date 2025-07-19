import React, { useState } from "react";
import "../App.css";

const Topic2Subtopic4Content = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
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
            Overview: Clean Communication Between Layers
          </span>
        </h3>
        <p>
          Now that your repository is ready to fetch and save <code>Url</code>{" "}
          entities, it's time to introduce a best practice:{" "}
          <strong>DTOs</strong> (Data Transfer Objects).
        </p>
        <p>
          DTOs help you{" "}
          <strong>control what data flows in and out of your APIs</strong>,
          without directly exposing your internal entity classes.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <strong>
            Think of a DTO as a wrapper or filter — it only contains the
            information you want to send or receive from the client.
          </strong>
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
          Understand what a DTO is and why it matters
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Learn the difference between&nbsp; <strong>Entity</strong>&nbsp; and{" "}&nbsp;
          <strong>DTO</strong>
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Create basic DTOs for responses and requests
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Explore use-cases for mapping data between Entity and DTO
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use Lombok to simplify boilerplate
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 <span style={{ color: "#1769aa" }}>What is a DTO?</span>
      </h3>
      <p>
        A <strong>DTO (Data Transfer Object)</strong> is a{" "}
        <strong>simple Java class</strong> used to{" "}
        <strong>transfer data</strong> between processes or layers — typically:
      </p>
      <ul className="topic-bullets">
        <li>
          From <strong>Client → Controller → Service → Entity</strong>
        </li>
        <li>
          From <strong>Entity → Service → Controller → Client</strong>
        </li>
      </ul>
      <p>It helps:</p>
      <ul className="topic-bullets">
        <li>✅ Control what fields are exposed</li>
        <li>✅ Improve security and performance</li>
        <li>✅ Prevent over-posting or under-posting</li>
        <li>✅ Make APIs version-friendly</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 <span style={{ color: "#1769aa" }}>Entity vs DTO</span>
      </h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Entity</th>
            <th>DTO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Purpose</td>
            <td>Database structure</td>
            <td>Communication format (API payload)</td>
          </tr>
          <tr>
            <td>Contains</td>
            <td>All DB fields</td>
            <td>Only required/requested fields</td>
          </tr>
          <tr>
            <td>Auto-mapped</td>
            <td>Yes, by JPA</td>
            <td>No, you define structure manually</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>May expose internal structure</td>
            <td>Safe – includes only what you want</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱{" "}
        <span style={{ color: "#1769aa" }}>
          Example: <code>UrlResponseDto.java</code>
        </span>
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.response ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `package com.example.urlshortener.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlResponseDto {
    private String shortUrl;
    private String originalUrl;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private Long clickCount;
}`,
                "response"
              )
            }
          >
            {copiedCode.response ? (
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
            {copiedCode.response ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`package com.example.urlshortener.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlResponseDto {
    private String shortUrl;
    private String originalUrl;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private Long clickCount;
}`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧾{" "}
        <span style={{ color: "#1769aa" }}>
          Example: <code>UrlRequestDto.java</code>
        </span>
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.request ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `package com.example.urlshortener.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlRequestDto {
    private String originalUrl;
    private LocalDateTime expiresAt;
}`,
                "request"
              )
            }
          >
            {copiedCode.request ? (
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
            {copiedCode.request ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`package com.example.urlshortener.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlRequestDto {
    private String originalUrl;
    private LocalDateTime expiresAt;
}`}</code>
          </pre>
        </div>
      </div>
      <div className="topic-callout" style={{ marginTop: "1rem" }}>
        <span role="img" aria-label="no-entry">
          🚫
        </span>{" "}
        <strong>
          We do <u>not</u> allow users to send <code>shortUrl</code> or{" "}
          <code>clickCount</code> — those are generated internally.
        </strong>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁{" "}
        <span style={{ color: "#1769aa" }}>Mapping Between Entity and DTO</span>
      </h3>
      <p>In your service layer, map like this:</p>
      <h4 style={{ color: "#1769aa", marginTop: "1rem" }}>
        ✅ Entity → DTO (for response)
      </h4>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.entityToDto ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `UrlResponseDto dto = UrlResponseDto.builder()
        .shortUrl(url.getShortUrl())
        .originalUrl(url.getOriginalUrl())
        .createdAt(url.getCreatedAt())
        .expiresAt(url.getExpiresAt())
        .clickCount(url.getClickCount())
        .build();`,
                "entityToDto"
              )
            }
          >
            {copiedCode.entityToDto ? (
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
            {copiedCode.entityToDto ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`UrlResponseDto dto = UrlResponseDto.builder()
        .shortUrl(url.getShortUrl())
        .originalUrl(url.getOriginalUrl())
        .createdAt(url.getCreatedAt())
        .expiresAt(url.getExpiresAt())
        .clickCount(url.getClickCount())
        .build();`}</code>
          </pre>
        </div>
      </div>
      <h4 style={{ color: "#1769aa", marginTop: "1rem" }}>
        ✅ DTO → Entity (for create)
      </h4>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.dtoToEntity ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `Url url = Url.builder()
        .originalUrl(requestDto.getOriginalUrl())
        .expiresAt(requestDto.getExpiresAt())
        .createdAt(LocalDateTime.now())
        .clickCount(0L)
        .build();`,
                "dtoToEntity"
              )
            }
          >
            {copiedCode.dtoToEntity ? (
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
            {copiedCode.dtoToEntity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`Url url = Url.builder()
        .originalUrl(requestDto.getOriginalUrl())
        .expiresAt(requestDto.getExpiresAt())
        .createdAt(LocalDateTime.now())
        .clickCount(0L)
        .build();`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚀 <span style={{ color: "#1769aa" }}>Use with Controller</span>
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.controller ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `@PostMapping("/create")
public ResponseEntity<UrlResponseDto> createUrl(@RequestBody UrlRequestDto requestDto) {
    UrlResponseDto response = urlService.createShortUrl(requestDto);
    return ResponseEntity.ok(response);
}`,
                "controller"
              )
            }
          >
            {copiedCode.controller ? (
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
            {copiedCode.controller ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`@PostMapping("/create")
public ResponseEntity<UrlResponseDto> createUrl(@RequestBody UrlRequestDto requestDto) {
    UrlResponseDto response = urlService.createShortUrl(requestDto);
    return ResponseEntity.ok(response);
}`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓ <span style={{ color: "#1769aa" }}>Discussion Points</span>
      </h3>
      <div className="topic-funfact example-block">
        <b>Q1: Why not expose the Entity directly in the controller?</b>
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
              <strong>A:</strong> It could expose sensitive fields, make
              breaking changes harder, and increase API complexity.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>Q2: Can DTOs be reused for both request and response?</b>
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
              <strong>A:</strong> It’s possible, but not recommended. Keep them
              separate for clarity and control.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>Q3: How to avoid repetitive mapping code?</b>
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
              <strong>A:</strong> You can use mapping libraries like:
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <strong>ModelMapper</strong>
                </li>
                <li>
                  <strong>MapStruct</strong>
                </li>
                <li>
                  Or write helper classes like <code>UrlMapper.java</code>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪{" "}
        <span style={{ color: "#1769aa" }}>Try It Yourself: Step-by-step</span>
      </h3>
      <div className="topic-funfact example-block">
        <b>✅ Step-by-step Practice</b>
        <div className="topic-funfact-block">
          <div>
            1. Create a package: <code>com.example.urlshortener.dto</code>
          </div>
          <div>2. Add:</div>
          <div style={{ marginLeft: "1rem" }}>
            <code>UrlRequestDto.java</code>
            <br />
            <code>UrlResponseDto.java</code>
          </div>
          <div>3. In your service layer, implement conversion logic</div>
          <div>4. In controller, return DTOs instead of entities</div>
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
          Always use DTOs for controller I/O
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use Lombok to reduce boilerplate
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Keep DTOs flat and lightweight
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Separate DTOs for request and response
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use <code>@Valid</code> and <code>@NotNull</code> in request DTOs
          (will add in section 3.5)
        </li>
      </ul>
    </div>
  );
};

export default Topic2Subtopic4Content;

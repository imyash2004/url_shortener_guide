import React, { useState } from "react";
import "../App.css";

const codeBlocks = {
  baseResponse: `package com.example.urlshortener.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> {
    private boolean success;
    private String message;
    private T data;
}`,
  before: `return ResponseEntity.ok(urlResponseDto);`,
  after: `BaseResponse<UrlResponseDto> response = BaseResponse.<UrlResponseDto>builder()
        .success(true)
        .message("Short URL created successfully")
        .data(urlResponseDto)
        .build();

return ResponseEntity.ok(response);`,
  list: `List<UrlResponseDto> urlList = urlService.getAllUrls();

BaseResponse<List<UrlResponseDto>> response = BaseResponse.<List<UrlResponseDto>>builder()
        .success(true)
        .message("Fetched all URLs")
        .data(urlList)
        .build();

return ResponseEntity.ok(response);`,
  error: `BaseResponse<Object> errorResponse = BaseResponse.builder()
        .success(false)
        .message("URL not found")
        .data(null)
        .build();

return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);`,
  json: `{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "shortUrl": "abc123",
    "originalUrl": "https://example.com",
    "createdAt": "...",
    "expiresAt": "...",
    "clickCount": 0
  }
}`,
};

const Topic2Subtopic5Content = () => {
  const [copied, setCopied] = useState({});
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);

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
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 2.5 – Response DTOs</h2>
      <hr />
      <div className="key-idea-box">
        <h3 style={{ marginTop: 0, color: "#1769aa" }}>
          🏗️ Overview: Sending Clean, Consistent, and Helpful API Responses
        </h3>
        <p>
          Now that you're using <strong>DTOs to shape your data</strong>, it's
          time to structure your <strong>API responses</strong> more
          consistently and professionally.
          <br />
          Instead of returning plain DTOs or entities, it’s good practice to{" "}
          <strong>wrap responses</strong> inside a standard response format.
          This ensures that every response your API gives contains:
        </p>
        <ul>
          <li>✅ status info</li>
          <li>✅ human-readable messages</li>
          <li>✅ actual data (DTOs)</li>
        </ul>
        <div className="topic-callout">
          <span role="img" aria-label="envelope">
            ✉️
          </span>{" "}
          Think of a <strong>Response DTO</strong> as a professional envelope:
          it wraps your message in a clear, branded way.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Understand why structured responses are important</li>
        <li>
          ✅ Create a&nbsp; <code>BaseResponse</code>&nbsp; DTO
        </li>
        <li>✅ Learn how to use generics for flexible return types</li>
        <li>
          ✅ Use&nbsp; <code>ResponseEntity</code>&nbsp; with status codes and body
        </li>
        <li>✅ Improve error responses in future sections</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 Why Use a Response Wrapper DTO?
      </h3>
      <ul className="topic-bullets">
        <li>✅ Consistency across all APIs</li>
        <li>✅ Easier to debug for clients</li>
        <li>✅ Better frontend integration</li>
        <li>✅ Helps with API documentation (e.g., Swagger)</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Create: <code>BaseResponse.java</code>
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.baseResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.baseResponse, "baseResponse")
            }
          >
            {copied.baseResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.baseResponse}</code>
          </pre>
        </div>
      </div>
      <div
        style={{
          background: "#fffde7",
          borderLeft: "5px solid #ffe082",
          borderRadius: "7px",
          padding: "1rem 1.2rem",
          fontSize: "1.08rem",
          color: "#444",
          margin: "1.2rem 0 1.2rem 0",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.03)",
        }}
      >
        This is a <strong>generic response class</strong>. You can use it to
        wrap any type of data (like <code>UrlResponseDto</code>, list of URLs,
        etc.).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Example Usage in Controller
      </h3>
      <b>✅ Before</b>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.before ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.before, "before")}
          >
            {copied.before ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.before}</code>
          </pre>
        </div>
      </div>
      <b>✅ After (Using BaseResponse)</b>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.after ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.after, "after")}
          >
            {copied.after ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.after}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Using with Lists
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.list ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.list, "list")}
          >
            {copied.list ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.list}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛑 What About Errors?
      </h3>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.error ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.error, "error")}
          >
            {copied.error ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.error}</code>
          </pre>
        </div>
      </div>
      <p>
        You can return structured errors in the same format (we'll improve this
        in <strong>2.8 Exception Handling Basics</strong>).
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓ Discussion Points
      </h3>
      <div className="topic-funfact example-block">
        <b>Q1: Can we skip BaseResponse and return DTO directly?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA1(!showA1)}
            style={{ marginBottom: "1rem" }}
          >
            {showA1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA1 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Yes, but it’s not recommended for real-world
              APIs. BaseResponse provides uniformity and makes client-side
              parsing easy.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>
          Q2: Why use generics (<code>&lt;T&gt;</code>) in BaseResponse?
        </b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA2(!showA2)}
            style={{ marginBottom: "1rem" }}
          >
            {showA2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA2 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> To allow flexibility — so you can return any
              data type (single object, list, map, etc.) in one unified format.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>Q3: Should all controllers use this wrapper?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA3(!showA3)}
            style={{ marginBottom: "1rem" }}
          >
            {showA3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA3 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Ideally, yes. It makes your API more
              predictable and professional.
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself: Step-by-step
      </h3>
      <div
        style={{
          background: "linear-gradient(135deg, #e3f0fd 0%, #f8fbff 100%)",
          border: "2px solid #4fc3f7",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(33, 150, 243, 0.08)",
          padding: "1.5rem 2rem 1.5rem 2rem",
          margin: "2rem 0 2.5rem 0",
          position: "relative",
          animation: "fadeInSlideUp 0.8s ease-out forwards",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.1rem",
          }}
        >
          <span
            style={{
              fontSize: "1.6rem",
              color: "#43a047",
              marginRight: "0.7rem",
            }}
          >
            ✅
          </span>
          <span
            style={{ fontWeight: 600, color: "#2196f3", fontSize: "1.18rem" }}
          >
            Step-by-step Practice
          </span>
        </div>
        <ol
          style={{
            color: "#1769aa",
            fontSize: "1.08rem",
            margin: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li style={{ marginBottom: "1.1rem" }}>
            Create a package:{" "}
            <code
              style={{
                background: "#e3eefd",
                color: "#1769aa",
                borderRadius: "6px",
                padding: "0.2rem 0.6rem",
                fontWeight: 500,
              }}
            >
              com.example.urlshortener.dto
            </code>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Add:
            <br />
            <span style={{ display: "inline-block", marginTop: "0.5rem" }}>
              <code
                style={{
                  background: "#e3eefd",
                  color: "#1769aa",
                  borderRadius: "6px",
                  padding: "0.2rem 0.6rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "0.3rem",
                  width: "fit-content",
                }}
              >
                UrlRequestDto.java
              </code>
              <code
                style={{
                  background: "#e3eefd",
                  color: "#1769aa",
                  borderRadius: "6px",
                  padding: "0.2rem 0.6rem",
                  fontWeight: 500,
                  display: "block",
                  width: "fit-content",
                }}
              >
                UrlResponseDto.java
              </code>
            </span>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            In your service layer, implement conversion logic
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            In controller, return DTOs instead of entities
          </li>
        </ol>
      </div>
      <p>Expected format:</p>
      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copied.json ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.json, "json")}
          >
            {copied.json ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.json}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <ul className="topic-checklist">
        <li>✅ Use BaseResponse for all responses (success or error)</li>
        <li>
          ✅ Include <code>success</code>, <code>message</code>, and{" "}
          <code>data</code> always
        </li>
        <li>
          ✅ Keep <code>data</code> as <code>null</code> for error responses
        </li>
        <li>
          ✅ Define specific error codes later for more control (coming in
          section 8)
        </li>
      </ul>
    </div>
  );
};

export default Topic2Subtopic5Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  blogPutRequest: `PUT /api/blogs/15`,
  blogPutBody: `{
  "title": "Mastering Spring Boot",
  "content": "Updated content with advanced examples"
}`,
  blogPutResponse: `{
  "postId": 15,
  "message": "Blog post updated successfully"
}`,
  urlPutRequest: `PUT /api/urls/{shortCode}`,
  urlPutHeaders: `Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json`,
  urlPutBody: `{
  "originalUrl": "https://updated-example.com",
  "description": "Updated link for demo",
  "expiresAt": "2025-12-31T23:59:59"
}`,
  urlPutResponse: `{
  "shortCode": "xYz123",
  "originalUrl": "https://updated-example.com",
  "description": "Updated link for demo",
  "createdAt": "2025-06-01T12:30:45",
  "expiresAt": "2025-12-31T23:59:59"
}`,
  updateUrlRequest: `public class UpdateUrlRequest {
    private String originalUrl;
    private String description;
    private LocalDateTime expiresAt;

    // Getters and setters
}`,
  urlResponse: `public class UrlResponse {
    private String shortCode;
    private String originalUrl;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    // Constructor, Getters and Setters
}`,
  urlController: `@PutMapping("/urls/{shortCode}")
public ResponseEntity<UrlResponse> updateUrl(
        @PathVariable String shortCode,
        @RequestBody UpdateUrlRequest request,
        @AuthenticationPrincipal UserPrincipal user) {

    UrlResponse response = urlService.updateUrl(shortCode, request, user.getId());
    return ResponseEntity.ok(response);
}`,
  urlService: `public UrlResponse updateUrl(String shortCode, UpdateUrlRequest request, Long userId) {
    Url url = urlRepository.findByShortCode(shortCode)
            .orElseThrow(() -> new ResourceNotFoundException("Short URL not found"));

    if (!url.getUser().getId().equals(userId)) {
        throw new UnauthorizedException("You cannot update this URL");
    }

    if (request.getOriginalUrl() != null) {
        url.setOriginalUrl(request.getOriginalUrl());
    }
    if (request.getDescription() != null) {
        url.setDescription(request.getDescription());
    }
    if (request.getExpiresAt() != null) {
        url.setExpiresAt(request.getExpiresAt());
    }

    urlRepository.save(url);

    return new UrlResponse(
            url.getShortCode(),
            url.getOriginalUrl(),
            url.getDescription(),
            url.getCreatedAt(),
            url.getExpiresAt()
    );
}`,
};

const learningOutcomes = [
  "Use PUT or PATCH requests to update resources",
  "Accept @PathVariable and @RequestBody in a controller",
  "Perform validations before updating",
  "Return meaningful response messages",
  "Handle errors like 'Record Not Found'",
];

const realWorldScenarios = [
  ["🎓 Update Student Info", "Modify course or email of a student"],
  ["📚 Update Book Details", "Change a book’s category or availability"],
  ["✍️ Edit Blog Post", "Update title or content after publishing"],
  ["📦 Update Order Address", "Change delivery location before dispatch"],
  ["🔗 Update Shortened URL", "Modify original URL or title"],
  ["👤 Update User Profile", "Change username, bio, or profile picture"],
];

const tryItTasks = [
  "Update a student’s course by ID. Fields: course, email.",
  "Allow users to update the title and content of a post.",
  "Change available field (true/false) and category of a book.",
  "Reschedule an event by updating venue or date.",
  "Let users change their bio, profilePictureUrl, and status.",
];

const bestPractices = [
  ["Validate inputs", "Avoid bad data entering your DB"],
  ["Use PATCH for partial updates", "More efficient than full replace"],
  ["Handle missing ID gracefully", "Don't crash the app"],
  ["Return useful responses", "Helps the frontend UX"],
  ["Never allow ID updates", "IDs should remain fixed"],
];

const summaryTable = [
  ["Method Used", "PUT / PATCH"],
  ["Input", "JSON body + PathVariable ID"],
  ["Output", "Success or error message"],
  ["Common Use Cases", "Update blog, student info, books, URLs, etc."],
  ["Spring Boot Tip", "Use DTOs and validations for clean updates"],
];

const Topic3Subtopic2Content = () => {
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
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 3.2 – Update API</h2>
      <hr />
      <div className="yellow-callout">
        <b>What is an Update API?</b>
        <br />
        An <b>Update API</b> allows clients to <b>modify existing data</b>{" "}
        stored on the server. For example, if a student changes their email
        address or a user edits their blog post, you'll use this API.
        <br />
        <br />
        There are two common HTTP methods to update:
        <br />
        <ul>
          <li>
            <b>PUT</b> → Replaces the full resource with new data.
          </li>
          <li>
            <b>PATCH</b> → Partially updates fields of a resource.
          </li>
        </ul>
        <span role="img" aria-label="info">
          📌
        </span>{" "}
        Most real-world apps prefer{" "}
        <span className="blue-inline-code">PATCH</span> when only a few fields
        change.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 What You'll Learn in This Section
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Real-World Scenarios for Update APIs
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Use Case</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {realWorldScenarios.map(([use, desc], i) => (
            <tr key={i}>
              <td>{use}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 How an Update API Works – Step-by-Step
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Client sends a <b>PUT or PATCH</b> request to an endpoint like{" "}
            <span className="blue-inline-code">
              /api/students/&#123;id&#125;
            </span>
          </li>
          <li>
            The server:
            <ul>
              <li>
                Locates the record using the{" "}
                <span className="blue-inline-code">id</span>
              </li>
              <li>Validates that the record exists</li>
              <li>Updates one or more fields from the input</li>
              <li>Saves changes to the database</li>
              <li>
                Returns a <b>success message</b> or an <b>error</b>
              </li>
            </ul>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Example (Real-World – Blog Post Editor)
      </h3>
      <div className="blue-card-section">
        <b>Problem:</b> Update an existing blog post’s title and content.
        <ul>
          <li>
            <b>Request:</b>
          </li>
        </ul>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.blogPutRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.blogPutRequest, "blogPutRequest")
            }
          >
            {copied.blogPutRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.blogPutRequest}</code>
          </pre>
        </div>
        <b>Request Body:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.blogPutBody ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.blogPutBody, "blogPutBody")
            }
          >
            {copied.blogPutBody ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.blogPutBody}</code>
          </pre>
        </div>
        <b>Response:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.blogPutResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.blogPutResponse, "blogPutResponse")
            }
          >
            {copied.blogPutResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.blogPutResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself – Update API Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ul>
          {tryItTasks.map((t, i) => (
            <li key={i}>🔹 {t}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 URL Shortener – Update API
      </h3>
      <div className="blue-card-section">
        <b>Use Case:</b> The user wants to update the <b>original URL</b> after
        creating a short link.
      </div>

      <h4 style={{ marginTop: "1.2rem", color: "#1769aa" }}>📥 Request:</h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlPutRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlPutRequest, "urlPutRequest")
            }
          >
            {copied.urlPutRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlPutRequest}</code>
          </pre>
        </div>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlPutHeaders ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlPutHeaders, "urlPutHeaders")
            }
          >
            {copied.urlPutHeaders ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlPutHeaders}</code>
          </pre>
        </div>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlPutBody ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlPutBody, "urlPutBody")}
          >
            {copied.urlPutBody ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlPutBody}</code>
          </pre>
        </div>
      </div>

      <h4 style={{ marginTop: "1.2rem", color: "#1769aa" }}>📤 Response:</h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlPutResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlPutResponse, "urlPutResponse")
            }
          >
            {copied.urlPutResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlPutResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Code Implementation
      </h3>
      <div className="blue-card-section">
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
        <b>UrlResponse.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlResponse, "urlResponse")
            }
          >
            {copied.urlResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlResponse}</code>
          </pre>
        </div>
        <b>UrlController.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlController ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlController, "urlController")
            }
          >
            {copied.urlController ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlController}</code>
          </pre>
        </div>
        <b>UrlService.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlService ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlService, "urlService")}
          >
            {copied.urlService ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlService}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Example Output
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlPutResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlPutResponse, "urlPutResponse")
            }
          >
            {copied.urlPutResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlPutResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Try It Yourself (📝)
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✨ Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Tip</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([tip, why], i) => (
            <tr key={i}>
              <td>✅ {tip}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📌 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([c, d], i) => (
            <tr key={i}>
              <td>{c}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic3Subtopic2Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  urlController: `@DeleteMapping("/urls/{shortCode}")
public ResponseEntity<Map<String, String>> deleteUrl(
        @PathVariable String shortCode,
        @AuthenticationPrincipal UserPrincipal user) {

    urlService.deleteUrl(shortCode, user.getId());
    return ResponseEntity.ok(Map.of("message", "Short URL deleted successfully."));
}`,
  urlService: `public void deleteUrl(String shortCode, Long userId) {
    Url url = urlRepository.findByShortCode(shortCode)
            .orElseThrow(() -> new ResourceNotFoundException("Short URL not found"));

    if (!url.getUser().getId().equals(userId)) {
        throw new UnauthorizedException("You are not allowed to delete this URL");
    }

    urlRepository.delete(url);
}`,
  urlRepository: `public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);
}`,
  response200: `{
  "message": "Short URL deleted successfully."
}`,
  response404: `{
  "error": "Short URL not found"
}`,
  response403: `{
  "error": "You are not allowed to delete this URL"
}`,
};

const learningOutcomes = [
  "Understand the purpose of DELETE HTTP method",
  "Implement secure deletion with user authentication",
  "Handle 'not found' and 'unauthorized' error scenarios",
  "Learn to return meaningful success or error responses",
  "Apply best practices for safely deleting data",
];

const whyDelete = [
  ["User removes obsolete links", "Keeps database clean and relevant"],
  ["GDPR / privacy compliance", "Allows users to remove personal data"],
  [
    "Managing storage and system resources",
    "Deletes unwanted or duplicate entries",
  ],
  [
    "Business rules enforcement",
    "Prevents access to invalid or unauthorized data",
  ],
];

const realWorld = [
  "Deleting a student record when they graduate",
  "Removing an expired promotional coupon",
  "Deleting a blog post or comment",
  "Removing a shortened URL from your personal dashboard",
  "Unsubscribing a user from a mailing list",
];

const tryItTasks = [
  "Delete a short URL you created and verify it’s removed",
  "Attempt to delete a URL that does not exist (expect 404)",
  "Try deleting a URL owned by another user (expect 403)",
  "Delete a URL and confirm it no longer redirects",
  "Attempt to delete the same URL multiple times to test idempotency",
];

const responses = [
  ["200", codeBlocks.response200, "Successful deletion"],
  ["404", codeBlocks.response404, "Short code does not exist"],
  ["403", codeBlocks.response403, "User unauthorized to delete"],
];

const discussionPrompts = [
  {
    q: "Why should deletion be restricted to the owner of the URL?",
    a: "To protect data integrity and privacy. Allowing anyone to delete URLs could lead to misuse, accidental deletions, and security issues.",
  },
  {
    q: "What is the meaning of idempotency in DELETE?",
    a: "Deleting the same resource multiple times results in the same outcome. The first delete removes the resource, subsequent deletes respond with 'not found' but do not cause errors.",
  },
  {
    q: "How should the system respond if the URL to delete does not exist?",
    a: "The server should respond with a 404 Not Found status and an appropriate error message to inform the client.",
  },
  {
    q: "Can DELETE requests contain a request body?",
    a: "Technically, HTTP allows it, but it's uncommon and generally discouraged. Usually, all necessary data is sent via the URL and authentication tokens.",
  },
];

const bestPractices = [
  ["Verify ownership before deleting", "Prevents unauthorized data loss"],
  ["Return clear messages", "Helps clients handle responses gracefully"],
  [
    "Use proper HTTP status codes",
    "200, 403, 404 for clear client-server communication",
  ],
  [
    "Keep DELETE operations idempotent",
    "Consistent behavior regardless of repeated calls",
  ],
  ["Log deletions", "Audit trail for security and debugging"],
];

const Topic3Subtopic3Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3.3 – Delete API</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Removing Data Safely</b>
        <br />
        Deleting data is a common operation but requires care — once deleted,
        the data is gone. The <b>Delete API</b> provides a secure way to remove
        records (in this case, shortened URLs) when they’re no longer needed.
        <br />
        <br />
        <i>
          Think of it as deleting a file on your computer — it should only be
          done by the owner and with proper confirmation.
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
        📚 Why Delete APIs Matter
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {whyDelete.map(([s, e], i) => (
            <tr key={i}>
              <td>{s}</td>
              <td>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🌐 HTTP DELETE Method
      </h3>
      <div className="blue-card-section">
        The HTTP <span className="blue-inline-code">DELETE</span> method is
        designed to delete a resource identified by a URI.
        <br />
        <br />
        <ul>
          <li>
            <b>Idempotent</b>: Calling DELETE multiple times on the same
            resource yields the same result.
          </li>
          <li>
            <b>Safe with caution</b>: It changes data — so authentication and
            authorization are crucial.
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Real-World Examples
      </h3>
      <ul>
        {realWorld.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📝 Delete URL API Endpoint
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>HTTP Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>/api/urls/&#123;shortCode&#125;</td>
            <td>DELETE</td>
            <td>
              Delete the short URL by{" "}
              <span className="blue-inline-code">shortCode</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🛠️ How It Works</h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Client sends a <span className="blue-inline-code">DELETE</span>{" "}
            request with the <span className="blue-inline-code">shortCode</span>{" "}
            path variable
          </li>
          <li>Server verifies if URL exists</li>
          <li>Server checks if the authenticated user owns the URL</li>
          <li>Server deletes the URL if authorized</li>
          <li>Server returns success or error response accordingly</li>
        </ol>
      </div>

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
        🔧 Code Implementation
      </h3>
      <div className="blue-card-section">
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
        <b>UrlRepository.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlRepository ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlRepository, "urlRepository")
            }
          >
            {copied.urlRepository ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlRepository}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📤 Example Responses
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Response Body</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {responses.map(([status, body, desc], i) => (
            <tr key={i}>
              <td>{status}</td>
              <td>
                <div
                  className="topic-codeblock code-with-copy"
                  style={{ margin: 0 }}
                >
                  <button
                    className={`copy-button ${
                      copied["resp" + status] ? "copied" : ""
                    }`}
                    onClick={() => copyToClipboard(body, "resp" + status)}
                  >
                    {copied["resp" + status] ? "Copied!" : "Copy"}
                  </button>
                  <pre>
                    <code>{body}</code>
                  </pre>
                </div>
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default Topic3Subtopic3Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  entity: `@Entity
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalUrl;
    private String shortCode;
    private String organizationShortName;

    private LocalDateTime createdAt;

    private LocalDateTime expiryDate; // 🆕 Expiration field

    // Getters, Setters, Constructors
}`,
  dto: `public class CreateUrlRequest {

    @NotBlank
    private String originalUrl;

    private String customCode;

    private LocalDateTime expiryDate; // Optional field
}`,
  redirectLogic: `@GetMapping("/{orgShortName}/{shortCode}")
public void redirectToOriginal(
    @PathVariable String orgShortName,
    @PathVariable String shortCode,
    HttpServletRequest request,
    HttpServletResponse response
) throws IOException {

    Url url = urlService.findByShortCode(orgShortName, shortCode);

    if (url != null) {
        if (url.getExpiryDate() != null && url.getExpiryDate().isBefore(LocalDateTime.now())) {
            // URL expired ⛔
            response.sendError(HttpServletResponse.SC_GONE, "Link has expired");
            return;
        }

        // Log and Redirect ✅
        urlHitService.logHit(orgShortName, shortCode, request.getRemoteAddr());
        response.sendRedirect(url.getOriginalUrl());
    } else {
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "URL not found");
    }
}`,
  defaultExpiry: `if (request.getExpiryDate() == null) {
    url.setExpiryDate(LocalDateTime.now().plusDays(30));
}`,
};

const summaryTable = [
  ["expiryDate", "Controls lifespan of a short link"],
  ["410 Gone", "Indicates the resource is intentionally unavailable"],
  ["Optional Default", "Prevent links from staying alive forever"],
  ["Expiry Check", "Done during redirection logic"],
];

const discussionQA = [
  {
    question: "What field controls whether a URL is expired?",
    answer: "expiryDate in the Url entity.",
  },
  {
    question: "What HTTP status should be returned for expired links?",
    answer: "410 Gone (not 404).",
  },
  {
    question: "What happens if expiry is not set?",
    answer:
      "You can choose to allow it forever, or assign a default (like +30 days).",
  },
  {
    question: "Is expiry enforced in DB or code?",
    answer: "Handled in application logic (service/controller).",
  },
];

const tryItTasks = [
  "Add an expiryDate field to your database.",
  "Accept this field in URL creation.",
  "Modify the redirect logic to return 410 if expired.",
  "Optional: Create a /api/expired endpoint to list expired URLs.",
];

const bonusTasks = [
  "Add a background job to archive/delete expired URLs nightly.",
];

const Topic10Subtopic0Content = () => {
  const [copied, setCopied] = useState({});
  const [openIdx, setOpenIdx] = useState(null);

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

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>⏰ 10.1 – URL Expiration</h2>
      <hr />
      <div className="yellow-callout">
        <b>In this section, we'll learn how to:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Add an expiry field to short links</li>
          <li>Prevent redirection if the link has expired</li>
          <li>Respond with a proper HTTP status (410 Gone)</li>
          <li>Handle expiration transparently for the user</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Why URL Expiration?
      </h3>
      <div className="blue-card-section">
        <b>Businesses often run:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Flash sales</li>
          <li>Early access promotions</li>
          <li>Temporary landing pages</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <b>They don't want those links to work forever.</b>
          <br />
          Expiration protects users from outdated or invalid pages, and avoids
          misuse of public links later.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Update the Url Entity
      </h3>
      <div className="blue-card-section">
        <b>
          Add an <span className="blue-inline-code">expiryDate</span> field to
          your Url model.
        </b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.entity ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.entity, "entity")}
          >
            {copied.entity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.entity}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📥 Update DTOs</h3>
      <div className="blue-card-section">
        <b>Make sure to accept expiry dates in your Create URL DTO:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.dto ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.dto, "dto")}
          >
            {copied.dto ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.dto}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Update the Redirect Logic
      </h3>
      <div className="blue-card-section">
        <b>
          Update your redirect controller to check if the link has expired
          before sending the redirect:
        </b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.redirectLogic ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.redirectLogic, "redirectLogic")
            }
          >
            {copied.redirectLogic ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.redirectLogic}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📆 Optional: Set Default Expiry
      </h3>
      <div className="blue-card-section">
        <b>You can default the expiry to 30 days if not set:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.defaultExpiry ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.defaultExpiry, "defaultExpiry")
            }
          >
            {copied.defaultExpiry ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.defaultExpiry}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          This avoids creating forever-valid links, especially for anonymous or
          free-tier users.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Update URL Service Layer
      </h3>
      <div className="blue-card-section">
        Make sure your <span className="blue-inline-code">UrlService</span> and
        repository allow setting and filtering by expiry dates if needed.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>
          ❓ Short Answers:
        </h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}>
              Q{idx + 1}: {item.question}
            </div>
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
                → {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Task:</b>
        <ul style={{ margin: "0.5rem 0 1rem 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
        <b>💡 Bonus:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{feature}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic10Subtopic0Content;

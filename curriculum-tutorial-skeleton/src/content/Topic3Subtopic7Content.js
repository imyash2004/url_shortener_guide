import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  enhancedService: `@Service
@Transactional
@Slf4j  // Lombok annotation for logger
public class UrlService {

    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public Url getUrlByShortCode(String shortUrl) {
        log.info("Fetching URL for short code: {}", shortUrl);
        Url url = urlRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> new UrlNotFoundException("Short URL not found: " + shortUrl));

        if (url.getExpiresAt() != null && url.getExpiresAt().isBefore(LocalDateTime.now())) {
            log.warn("URL {} has expired", shortUrl);
            throw new UrlExpiredException("This URL has expired");
        }

        url.setClickCount(url.getClickCount() == null ? 1 : url.getClickCount() + 1);
        urlRepository.save(url);
        log.info("Click count incremented for URL: {}", shortUrl);

        return url;
    }

    // Other service methods...
}`,
};

const learningOutcomes = [
  "Understand the role of the service layer in a layered architecture",
  "Add exception handling and custom exception throwing in services",
  "Use transactional annotations for consistency and rollback",
  "Implement logging for debugging and monitoring",
  "Integrate additional logic like click count increment or URL expiration checks",
];

const whyEnhance = [
  ["Logic scattered or duplicated", "Clear centralized business rules"],
  ["No error handling leads to crashes", "Robust error detection and handling"],
  ["No transaction management", "Data consistency with rollback on failure"],
  ["Difficult to debug issues", "Logs provide insight into runtime behavior"],
  ["Limited features", "New features (like analytics) added seamlessly"],
];

const enhancements = [
  [
    "Custom Exceptions",
    "Throw exceptions like UrlNotFoundException when URL is missing",
  ],
  ["Transaction Management", "Use @Transactional to ensure atomic operations"],
  ["Logging", "Use logging frameworks (e.g., SLF4J) to trace actions"],
  ["Business Logic", "Increment clickCount, check if URL expired"],
  ["Input Sanitization", "Further validate or normalize input if needed"],
];

const tryItTasks = [
  "Modify service methods to throw custom exceptions for invalid cases",
  "Annotate service class or methods with @Transactional where needed",
  "Add logging statements for method entry, exit, and important events",
  "Implement logic to increment clickCount whenever a URL is accessed",
  "Add expiration check logic to prevent redirecting expired URLs",
];

const discussionPrompts = [
  {
    q: "Why throw exceptions in the service layer instead of returning null?",
    a: "Exceptions clearly communicate errors and simplify error handling in upper layers.",
  },
  {
    q: "What benefits does @Transactional provide?",
    a: "It ensures that all DB operations in a method succeed or fail as a unit, preserving data integrity.",
  },
  {
    q: "How does logging help in the service layer?",
    a: "It provides visibility into the app’s behavior for debugging and monitoring in production.",
  },
  {
    q: "Why add logic like click count increment in the service instead of the controller?",
    a: "Keeping business logic in the service layer maintains separation of concerns and keeps controllers thin.",
  },
];

const bestPractices = [
  ["Use custom exceptions", "Clear and manageable error signaling"],
  [
    "Annotate with @Transactional",
    "Ensure data consistency and rollback support",
  ],
  ["Use SLF4J or similar for logging", "Standardized, configurable logging"],
  ["Keep business logic in services", "Maintain clean, testable code"],
  [
    "Write unit tests for service logic",
    "Ensure correctness and catch regressions",
  ],
];

const summaryTable = [
  ["Exception Handling", "Throw meaningful exceptions, not null returns"],
  ["Transaction Management", "Use @Transactional for atomic operations"],
  ["Logging", "Log method calls and important state changes"],
  ["Business Logic", "Manage click counts, expiration, input sanitization"],
  ["Code Location", "Service layer only — controllers stay thin"],
];

const Topic3Subtopic7Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3.7 – Service Layer Enhancements</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Strengthening Business Logic and Service Features</b>
        <br />
        The <b>Service Layer</b> is the heart of your application’s business
        logic — the place where data flows are controlled, validations beyond
        simple checks occur, and complex operations are managed. Once you have
        the basic CRUD functionality, it’s time to{" "}
        <b>enhance your service layer</b> by adding improvements that make your
        URL shortener more robust, maintainable, and feature-rich.
        <br />
        <br />
        In this section, you will learn how to improve your service
        implementation with better exception handling, transactional management,
        logging, and integration with other components.
        <br />
        <br />
        <i>
          Think of the service layer as the <b>command center</b> where requests
          are processed intelligently before reaching the database or the
          client.
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
        📚 Why Enhance the Service Layer?
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Without Enhancements</th>
            <th>With Enhancements</th>
          </tr>
        </thead>
        <tbody>
          {whyEnhance.map(([w, e], i) => (
            <tr key={i}>
              <td>{w}</td>
              <td>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Common Enhancements in a URL Shortener Service
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Enhancement</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {enhancements.map(([e, d], i) => (
            <tr key={i}>
              <td>{e}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 How to Enhance Your Service Layer
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            <b>Exception Handling:</b> Throw specific exceptions in service
            methods instead of returning null or empty values.
          </li>
          <li>
            <b>Transaction Management:</b> Use{" "}
            <span className="blue-inline-code">@Transactional</span> to manage
            DB transactions, especially when multiple DB operations occur in one
            method.
          </li>
          <li>
            <b>Logging:</b> Inject a logger and add info/debug/error logs to
            important service events (like URL creation, update, or
            redirection).
          </li>
          <li>
            <b>Additional Logic:</b> Implement logic such as increasing click
            counts on redirection or checking if the URL has expired before
            returning.
          </li>
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
        🔧 Example Snippet: Enhanced Service Layer
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.enhancedService ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.enhancedService, "enhancedService")
            }
          >
            {copied.enhancedService ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.enhancedService}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Topic3Subtopic7Content;

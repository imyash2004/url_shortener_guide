import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  customException: `public class UrlNotFoundException extends RuntimeException {
    public UrlNotFoundException(String message) {
        super(message);
    }
}`,
  globalHandler: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UrlNotFoundException.class)
    public ResponseEntity<?> handleUrlNotFound(UrlNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("validationErrors", errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherExceptions(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Something went wrong. Please try again."));
    }
}`,
  triggerException: `public Url getUrlByCode(String code) {
    return urlRepository.findByCode(code)
            .orElseThrow(() -> new UrlNotFoundException("No URL found for code: " + code));
}`,
  outputJson: `{
  "error": "No URL found for code: xyz123"
}`,
  statusCode: `404 Not Found`,
};

const tryItTasks = [
  {
    task: "1️⃣",
    desc: "Create a custom exception: ShortCodeAlreadyExistsException",
  },
  { task: "2️⃣", desc: "Add a handler that returns 409 Conflict and a message" },
  {
    task: "3️⃣",
    desc: "Simulate it by inserting duplicate short code manually",
  },
  { task: "4️⃣", desc: "Add a timestamp field in all error responses" },
  {
    task: "5️⃣",
    desc: "Bonus: Style the error JSON with error, timestamp, and statusCode",
  },
];

const faqs = [
  {
    q: "Why should you avoid exposing stack traces to the frontend?",
    a: (
      <div className="yellow-callout">
        <b>A:</b> Stack traces may contain sensitive info like file paths, class
        names, or DB logic that can be exploited by attackers.
      </div>
    ),
  },
  {
    q: "What’s the difference between throwing and handling an exception?",
    a: (
      <div className="yellow-callout">
        <b>A:</b> <b>Throwing</b> means signaling something went wrong.{" "}
        <b>Handling</b> means catching and responding to that problem
        gracefully.
      </div>
    ),
  },
  {
    q: "When would you return 409 vs 400?",
    a: (
      <div className="yellow-callout">
        <b>A:</b> Use{" "}
        <span className="blue-inline-code">400 (Bad Request)</span> when user
        input is wrong (like missing fields). Use{" "}
        <span className="blue-inline-code">409 (Conflict)</span> when the
        request is valid but causes a conflict (like duplicate entries).
      </div>
    ),
  },
  {
    q: "How would you handle exceptions in a microservice architecture?",
    a: (
      <div className="yellow-callout">
        <b>A:</b> You can use centralized logging tools (like ELK stack),
        structured JSON error formats, and HTTP status mapping for services to
        communicate clearly.
      </div>
    ),
  },
];

const Topic2Subtopic8Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(Array(faqs.length).fill(false));

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
      <h2 style={{ color: "#1769aa" }}>🔹 2.8 – Exception Handling Basics</h2>
      <hr />
      <div className="yellow-callout">
        <b>Imagine you're building a URL shortening service.</b> What happens if
        a user asks for a short URL that doesn’t exist? Or submits a blank URL?
        If these situations aren't handled properly, users could see technical
        errors or even security-related information.
        <br />
        <br />
        <b>Spring Boot provides powerful exception-handling features</b> to
        catch and respond to such issues in a clean, structured, and{" "}
        <span className="blue-inline-code">user-friendly way</span> — keeping
        your application professional and reliable.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Understand the need for handling exceptions</li>
        <li>✅ Create and throw custom exceptions</li>
        <li>
          ✅ Use <span className="blue-inline-code">@RestControllerAdvice</span>{" "}
          for global error handling
        </li>
        <li>✅ Return clean, secure, and helpful error responses</li>
        <li>✅ Map exceptions to correct HTTP status codes</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🌍 Real-World Scenarios
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>🔄 Situation</th>
            <th>🔁 Expected Response</th>
            <th>📦 Status Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User asks for a short URL that’s missing</td>
            <td>No URL found for code: xyz123</td>
            <td>404 Not Found</td>
          </tr>
          <tr>
            <td>User submits a blank original URL</td>
            <td>Original URL is required</td>
            <td>400 Bad Request</td>
          </tr>
          <tr>
            <td>Duplicate short code generation</td>
            <td>Short code already exists. Try another.</td>
            <td>409 Conflict</td>
          </tr>
          <tr>
            <td>Server failure (e.g., DB timeout)</td>
            <td>Something went wrong. Please try again.</td>
            <td>500 Internal</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Hands-on Code Walkthrough
      </h3>
      <div className="blue-card-section">
        <b>✅ Step 1: Create a Custom Exception</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.customException ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.customException, "customException")
            }
          >
            {copied.customException ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.customException}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>✅ Step 2: Global Exception Handler</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.globalHandler ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.globalHandler, "globalHandler")
            }
          >
            {copied.globalHandler ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.globalHandler}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>✅ Step 3: Trigger the Exception in Service</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.triggerException ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.triggerException, "triggerException")
            }
          >
            {copied.triggerException ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.triggerException}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        👨‍💻 Try It Yourself: Mini Example
      </h3>
      <div className="blue-card-section">
        <b>❓Problem:</b> A user visits{" "}
        <span className="blue-inline-code">/api/url/xyz123</span>, but{" "}
        <span className="blue-inline-code">xyz123</span> does not exist.
        <br />
        <br />
        <b>🔧 Output:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.outputJson ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.outputJson, "outputJson")}
          >
            {copied.outputJson ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.outputJson}</code>
          </pre>
        </div>
        <b>📋 Status Code:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.statusCode ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.statusCode, "statusCode")}
          >
            {copied.statusCode ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.statusCode}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 In-Class Discussion + Answers
      </h3>
      <div className="blue-card-section">
        {faqs.map((item, idx) => (
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
            {openFAQ[idx] && item.a}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <ul className="topic-checklist">
        <li>
          Use <span className="blue-inline-code">@RestControllerAdvice</span> +{" "}
          <span className="blue-inline-code">@ExceptionHandler</span> to
          centralize your error responses
        </li>
        <li>Create custom exceptions for meaningful error messages</li>
        <li>Map exceptions to appropriate HTTP codes</li>
        <li>
          Hide internal errors from users to keep the app secure and
          professional
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>What to Do</th>
            </tr>
          </thead>
          <tbody>
            {tryItTasks.map((t, i) => (
              <tr key={i}>
                <td>{t.task}</td>
                <td>{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topic2Subtopic8Content;

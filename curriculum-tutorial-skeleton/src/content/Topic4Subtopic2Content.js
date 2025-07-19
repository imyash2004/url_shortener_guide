import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controllerExample: `@GetMapping("/urls")\npublic Page<UrlDTO> getAllUrls(Pageable pageable) {\n    return urlService.getAllUrls(pageable);\n}`,
  getRequest: `GET /urls?page=0&size=5&sort=createdAt,desc`,
};

const paramTable = [
  ["page", "Index of the page to be returned (zero-based by default)"],
  ["size", "Number of items per page"],
  [
    "sort",
    "Sorting criteria in the format: property,[asc|desc] (e.g., createdAt,desc)",
  ],
];

const bestPractices = [
  [
    "✅ Always use zero-based indexing for page",
    "Matches backend pagination logic and avoids confusion.",
  ],
  [
    "✅ Set sensible default size in configuration",
    "Prevents accidentally fetching too much data in one request.",
  ],
  ["✅ Limit maximum size", "Protects server from performance issues."],
  [
    "✅ Support sorting via multiple fields",
    "Gives API consumers flexibility in displaying data.",
  ],
  [
    "✅ Validate or sanitize inputs",
    "Prevents invalid or malicious pagination/sorting parameters.",
  ],
];

const discussionPrompts = [
  {
    q: "Why is the page parameter zero-based?",
    a: (
      <>
        It's consistent with programming conventions (like arrays), starting
        from index 0 for simplicity in calculations.
      </>
    ),
  },
  {
    q: "What happens if you don’t send any page or size in the request?",
    a: (
      <>
        Spring uses the default values (usually <b>page = 0</b>,{" "}
        <b>size = 20</b>) unless overridden via configuration.
      </>
    ),
  },
  {
    q: "Can you sort by multiple fields in Pageable?",
    a: (
      <>
        Yes! Use:{" "}
        <span className="blue-inline-code">
          sort=field1,asc&amp;sort=field2,desc
        </span>
        .
      </>
    ),
  },
];

const tryItTasks = [
  "Make a GET request to /urls?page=1&size=10",
  "Try sorting: /urls?sort=shortUrl,asc",
  "Try passing no pagination and see the default behavior",
  "Try multiple sorts like: sort=createdAt,desc&sort=clicks,asc",
];

const Topic4Subtopic2Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.3 – Pageable Parameters</h2>
      <hr />
      <div className="yellow-callout">
        In Spring Data, the <span className="blue-inline-code">Pageable</span>{" "}
        interface allows you to send pagination and sorting information directly
        through <b>query parameters in API requests</b>.<br />
        <br />
        This eliminates the need to manually handle page logic — Spring does it
        for you. By passing page-related details like{" "}
        <span className="blue-inline-code">page</span>,{" "}
        <span className="blue-inline-code">size</span>, and{" "}
        <span className="blue-inline-code">sort</span>, you can control what
        part of the data gets returned and in what order.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Understand how query parameters like{" "}
          <span className="blue-inline-code">?page=0&size=5</span> work with
          Spring Data
        </li>
        <li>
          ✅ Learn how <span className="blue-inline-code">Pageable</span> is
          used in controller methods
        </li>
        <li>
          ✅ Know how to pass <span className="blue-inline-code">sort</span>{" "}
          parameters for ordering results
        </li>
        <li>
          ✅ Be able to write paginated endpoints with clean, minimal code
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 What Pageable Accepts
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {paramTable.map(([param, desc], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{param}</span>
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧑‍💻 How Pageable Works in the Controller
      </h3>
      <div className="blue-card-section">
        Spring Boot automatically maps query parameters to a{" "}
        <span className="blue-inline-code">Pageable</span> object.
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.controllerExample ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(codeBlocks.controllerExample, "controllerExample")
            }
          >
            {copied.controllerExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.controllerExample}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          <b>Example request:</b>
          <div
            className="topic-codeblock code-with-copy"
            style={{ marginTop: 8 }}
          >
            <button
              className={`copy-button ${copied.getRequest ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(codeBlocks.getRequest, "getRequest")
              }
            >
              {copied.getRequest ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.getRequest}</code>
            </pre>
          </div>
        </div>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Spring will automatically inject these into the{" "}
          <span className="blue-inline-code">Pageable</span> object!
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {faq.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{faq.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([practice, why], idx) => (
            <tr key={idx}>
              <td>{practice}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic4Subtopic2Content;

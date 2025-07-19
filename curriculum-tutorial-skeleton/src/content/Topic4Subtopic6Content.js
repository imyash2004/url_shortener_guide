import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controllerSorting: `@GetMapping
public PageResponse<UrlDTO> getAllUrls(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String sortDir) {

    Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                                : Sort.by(sortBy).descending();

    Pageable pageable = PageRequest.of(page, size, sort);
    Page<UrlDTO> urlPage = urlService.getAllUrls(pageable);

    return new PageResponse<>(
        urlPage.getContent(),
        urlPage.getNumber(),
        urlPage.getSize(),
        urlPage.getTotalElements(),
        urlPage.getTotalPages(),
        urlPage.isLast()
    );
}`,
};

const bestPractices = [
  [
    "✅ Provide default sorting field + direction",
    "Ensures consistent results even if user skips query params",
  ],
  [
    "✅ Validate sortBy fields",
    "Prevents invalid input and application errors",
  ],
  [
    "✅ Use enums/constants for sort fields",
    "Makes code readable and maintainable",
  ],
  [
    "✅ Document accepted sorting fields in Swagger",
    "Helps API consumers understand how to use your API",
  ],
];

const discussionPrompts = [
  {
    q: "Can users sort on any field?",
    a: (
      <>
        Yes, but only if that field exists in the entity. Always <b>validate</b>{" "}
        or <b>document</b> allowed fields.
      </>
    ),
  },
  {
    q: "What if user passes an invalid sortBy field?",
    a: (
      <>
        It will throw an error. You can handle this gracefully using exception
        handling or a whitelist of fields.
      </>
    ),
  },
  {
    q: "Why support both asc and desc?",
    a: (
      <>
        Different users prefer different orders — e.g., oldest-first vs.
        newest-first for logs.
      </>
    ),
  },
];

const tryItTasks = [
  "Add support for sorting users by name, email, or createdAt",
  "Validate and restrict allowed sortBy fields (for safety)",
  "In Postman, test: /api/urls?sortBy=clickCount&sortDir=asc and /api/urls?sortBy=createdAt&sortDir=desc",
];

const explanationTable = [
  [
    '@RequestParam("sortBy")',
    "Accepts the field to sort on, e.g., createdAt, clickCount, etc.",
  ],
  ["sortDir", "Accepts direction – 'asc' or 'desc'"],
  ["Sort.by(...).ascending()", "Spring way to apply ascending sort"],
  [
    "PageRequest.of(...) ",
    "Combines page, size, and sort into a single pagination request",
  ],
];

const Topic4Subtopic6Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.7 – Sorting Implementation</h2>
      <hr />
      <div className="yellow-callout">
        Pagination helps you fetch a limited number of items. But what if the{" "}
        <b>order of those items matters</b>?<br />
        <br />
        Sorting allows users to:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            View <b>latest URLs</b> first (by{" "}
            <span className="blue-inline-code">createdAt</span>)
          </li>
          <li>
            Sort <b>alphabetically</b> (by{" "}
            <span className="blue-inline-code">originalUrl</span>)
          </li>
          <li>
            See most clicked links first (by{" "}
            <span className="blue-inline-code">clickCount</span>)
          </li>
        </ul>
        Without sorting, data would be returned in <b>default DB order</b>,
        which is neither predictable nor user-friendly.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Understand how sorting works with Spring’s{" "}
          <span className="blue-inline-code">Pageable</span>
        </li>
        <li>
          ✅ Accept dynamic <span className="blue-inline-code">sortBy</span> and{" "}
          <span className="blue-inline-code">direction</span> (ASC/DESC) in
          requests
        </li>
        <li>
          ✅ Apply sorting in{" "}
          <span className="blue-inline-code">PageRequest.of(...)</span>
        </li>
        <li>✅ Improve user experience by letting them control ordering</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Real-Life Analogy – Netflix Browsing 🍿
      </h3>
      <div className="blue-card-section">
        Think of browsing Netflix. Would you scroll through 10,000 movies{" "}
        <b>randomly</b>?<br />
        <br />
        No! You sort by:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>Most Popular</b>
          </li>
          <li>
            <b>Recently Added</b>
          </li>
          <li>
            <b>A-Z</b>
          </li>
        </ul>
        That’s what sorting adds to your pagination — <b>control and clarity</b>
        .
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Code Snippet – Sorting in URL Controller
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.controllerSorting ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.controllerSorting, "controllerSorting")
          }
        >
          {copied.controllerSorting ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.controllerSorting}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Explanation of Key Parts
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {explanationTable.map(([part, desc], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{part}</span>
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔚 Summary</h3>
      <div className="blue-card-section">
        Sorting enhances your API by giving users more{" "}
        <b>control over how they consume data</b>. When paired with pagination,
        it becomes a powerful combo to fetch only <b>what matters</b>, in the
        order that matters.
      </div>
    </div>
  );
};

export default Topic4Subtopic6Content;

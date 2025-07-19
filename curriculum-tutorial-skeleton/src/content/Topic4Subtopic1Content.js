import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  repoMethod: `@Repository\npublic interface UrlRepository extends JpaRepository<ShortUrl, Long> {\n    Page<ShortUrl> findAll(Pageable pageable);\n}`,
  methodSignature: `Page<ShortUrl> findAll(Pageable pageable);`,
};

const keyConcepts = [
  [
    "Pageable",
    "Interface for pagination input: includes page number, size, and sort order",
  ],
  [
    "Page<T>",
    "Interface representing a paginated result, includes the content and metadata",
  ],
  [
    "Slice<T>",
    "Like Page<T>, but with less metadata (used when total count isn't needed)",
  ],
];

const bestPractices = [
  [
    "✅ Use Page<T> when you need full metadata (total count, pages, etc.)",
    "Helps UI show pagination controls and total result info like pages and count.",
  ],
  [
    "✅ Set default values for page and size to avoid errors",
    "Prevents runtime errors if client doesn’t send any pagination input.",
  ],
  [
    "✅ Avoid requesting very large pages (limit size for performance)",
    "Reduces server load and prevents long response times.",
  ],
  [
    "✅ Document the pagination options for API consumers",
    "Ensures front-end teams and external users know how to use pagination properly.",
  ],
];

const discussionPrompts = [
  {
    q: "Why is Page<T> preferred over just returning List<T>?",
    a: (
      <>
        Because <b>Page&lt;T&gt;</b> includes important pagination metadata
        (like total pages and total records), not just the data.
      </>
    ),
  },
  {
    q: "Can Spring auto-populate Pageable from request parameters?",
    a: (
      <>
        Yes. Spring Boot can map <b>page</b> and <b>size</b> parameters directly
        to a <b>Pageable</b> object using{" "}
        <span className="blue-inline-code">@PageableDefault</span>.
      </>
    ),
  },
  {
    q: "What happens if a user requests a page number that doesn’t exist?",
    a: (
      <>
        Spring will return an <b>empty list</b>, and the metadata will show that
        no data exists for that page.
      </>
    ),
  },
];

const tryItTasks = [
  "Modify a repository method in your project to use Pageable and Page<T>",
  "Send a request with different values of page and size — observe the changes",
  "Try with size=0 or page=-1 and handle edge cases",
];

const Topic4Subtopic1Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.2 – Spring Data Pagination</h2>
      <hr />
      <div className="yellow-callout">
        Spring Data JPA provides <b>built-in support for pagination</b> using
        the <span className="blue-inline-code">Pageable</span> and{" "}
        <span className="blue-inline-code">Page</span> interfaces. You don't
        need to write complex SQL or logic to paginate results — it’s handled by
        the framework.
        <br />
        <br />
        With just a few adjustments to your repository interface, you can:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Accept pagination input from the client</li>
          <li>Return paginated data automatically</li>
          <li>Access useful metadata (total pages, total elements, etc.)</li>
        </ul>
        <div style={{ marginTop: "0.7rem" }}>
          <i>
            Spring Data makes pagination clean, elegant, and production-ready.
          </i>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Use <span className="blue-inline-code">Pageable</span> as a
          parameter in repository methods
        </li>
        <li>
          ✅ Retrieve paginated results using{" "}
          <span className="blue-inline-code">Page&lt;T&gt;</span> return type
        </li>
        <li>✅ Understand how Spring handles pagination behind the scenes</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧠 Key Concepts</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {keyConcepts.map(([term, desc], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{term}</span>
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Repository Method with Pagination
      </h3>
      <div className="blue-card-section">
        Spring Data JPA allows you to declare a method like this:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.methodSignature ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.methodSignature, "methodSignature")
            }
          >
            {copied.methodSignature ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.methodSignature}</code>
          </pre>
        </div>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Accept <span className="blue-inline-code">page</span> and{" "}
            <span className="blue-inline-code">size</span> as parameters
            (automatically from request)
          </li>
          <li>
            Return only the requested page of{" "}
            <span className="blue-inline-code">ShortUrl</span> entities
          </li>
          <li>Include metadata like total pages, total elements, etc.</li>
        </ul>
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
        🔧 Real Example – URL Shortener Repository
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.repoMethod ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.repoMethod, "repoMethod")}
        >
          {copied.repoMethod ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.repoMethod}</code>
        </pre>
      </div>
      <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
        <b>Here:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">findAll()</span> will now return
            paginated results
          </li>
          <li>Spring will handle the underlying pagination logic in SQL</li>
          <li>
            The controller can pass a{" "}
            <span className="blue-inline-code">Pageable</span> object directly
            from request params
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topic4Subtopic1Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  curlSample: `curl \"http://localhost:8080/api/urls?page=0&size=5&sortBy=createdAt&sortDir=desc\"`,
  jsonSample: `{
  "content": [
    { "id": 101, "originalUrl": "...", "shortUrl": "...", "createdAt": "2025-07-19" },
    ...
  ],
  "pageNumber": 0,
  "pageSize": 5,
  "totalElements": 32,
  "totalPages": 7,
  "lastPage": false
}`,
};

const bestPractices = [
  [
    "✅ Validate input params (`page`, `size`, `sortBy`)",
    "Avoids server errors and improves reliability",
  ],
  [
    "✅ Return consistent structure with metadata",
    "Helps frontend display pagination easily",
  ],
  [
    "✅ Handle empty or invalid inputs gracefully",
    "Prevents crashes and improves UX",
  ],
  [
    "✅ Document behavior (e.g., defaults, limits)",
    "Saves time for API consumers",
  ],
];

const discussionPrompts = [
  {
    q: "How do I know pagination works properly?",
    a: (
      <>
        <ul>
          <li>✅ Page size matches</li>
          <li>✅ Sorted field is in correct order</li>
          <li>✅ Total elements/pages look reasonable</li>
        </ul>
      </>
    ),
  },
  {
    q: "What if page is out of range?",
    a: (
      <>
        A well-structured API should <b>return an empty list</b>, not throw a
        500 error.
      </>
    ),
  },
  {
    q: "Should I write unit tests for pagination?",
    a: (
      <>
        Yes, especially for edge cases and integration. But Postman testing
        gives <b>immediate confidence</b> for manual testing.
      </>
    ),
  },
];

const tryItTasks = [
  "Test the following in Postman:",
  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
    <li>/api/urls?page=1&size=10</li>
    <li>/api/urls?sortBy=clickCount&sortDir=desc</li>
    <li>/api/urls?sortBy=name (invalid)</li>
    <li>/api/urls?page=-1 (negative)</li>
  </ul>,
  "Add Swagger documentation for page, size, sortBy, and sortDir",
  "Test with size=0 and observe behavior",
];

const Topic4Subtopic7Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.8 – Testing Paginated APIs</h2>
      <hr />
      <div className="yellow-callout">
        Pagination with sorting isn't just about writing backend logic —{" "}
        <b>testing it ensures it behaves as expected</b> across different
        combinations of page numbers, sizes, and sorting directions.
        <br />
        <br />
        You need to verify:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Correct <b>page size</b> and <b>page number</b>
          </li>
          <li>Total elements and pages</li>
          <li>Sorting works as intended</li>
          <li>Boundary conditions (e.g., page &gt; max, size = 0)</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Send GET requests with pagination and sorting parameters</li>
        <li>
          ✅ Verify that <span className="blue-inline-code">PageResponse</span>{" "}
          contains correct values
        </li>
        <li>✅ Test both valid and edge-case scenarios</li>
        <li>✅ Use Postman or curl to test REST endpoints manually</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🍕 Real-Life Analogy – Food Delivery Menu
      </h3>
      <div className="blue-card-section">
        Imagine a food delivery app:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            You scroll <b>pages</b> of restaurants.
          </li>
          <li>
            You <b>sort</b> by ratings, distance, or price.
          </li>
          <li>
            You expect to see 10 items per page.
            <br />
            If page 5 is empty or not sorted, you'd feel something’s broken!
          </li>
        </ul>
        That’s why we must <b>test the full experience</b> – not just the logic.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Test Case Examples
      </h3>
      <div className="blue-card-section">
        Let’s say you’ve built the following endpoint:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.curlSample ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.curlSample, "curlSample")}
          >
            {copied.curlSample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.curlSample}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Expected JSON Output
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.jsonSample ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.jsonSample, "jsonSample")}
        >
          {copied.jsonSample ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.jsonSample}</code>
        </pre>
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧾 Summary</h3>
      <div className="blue-card-section">
        Pagination testing is <b>not just about data size</b>, but about the{" "}
        <b>entire UX of consuming APIs</b>. Ensuring your backend behaves
        correctly with pagination, sorting, and edge inputs makes your API more{" "}
        <b>robust and production-ready</b>.
      </div>
    </div>
  );
};

export default Topic4Subtopic7Content;

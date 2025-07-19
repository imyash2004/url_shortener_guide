import React, { useState } from "react";
import "./CustomSectionStyles.css";

const learningOutcomes = [
  "Understand the key terms: page number, page size, total elements, and total pages",
  "Learn how clients request specific pages of data",
  "Recognize the importance of metadata (e.g., total records) in paginated responses",
  "Get introduced to sorting concepts often paired with pagination",
];

const keyTerms = [
  [
    "Page Number",
    "The index of the page requested by the client (often 0 or 1 based)",
  ],
  ["Page Size", "The number of items (URLs) to include on one page"],
  ["Total Elements", "Total number of items available in the dataset"],
  ["Total Pages", "The total number of pages available based on the page size"],
  ["Sorting", "Ordering the data by one or more fields (e.g., date created)"],
];

const whyEssential = [
  "Prevents overloading the client with too much data at once",
  "Reduces response time and memory usage on both client and server",
  "Allows easy navigation through data using pages",
  "Enables efficient data caching and querying on the backend",
];

const tryItTasks = [
  "Explore some popular websites or apps and notice how they paginate lists (e.g., Google search results, YouTube videos)",
  "Consider how page number and size affect the data shown",
  "Think about what metadata you’d need to build a pagination UI",
];

const discussionPrompts = [
  {
    q: "What would happen if you didn’t paginate a large dataset?",
    a: "The server might slow down or crash due to too much data processing; the client could get overwhelmed with data.",
  },
  {
    q: "Why do clients need total elements or total pages in the response?",
    a: "So they can build navigation controls (like page numbers, next/previous buttons) for a better user experience.",
  },
  {
    q: "How is sorting related to pagination?",
    a: "Sorting defines the order of items within each page, making the displayed data more meaningful and consistent.",
  },
];

const bestPractices = [
  [
    "Use zero-based page numbering",
    "Common convention in APIs and programming",
  ],
  [
    "Set default and maximum page sizes",
    "Prevents overly large or empty pages",
  ],
  [
    "Include pagination metadata",
    "Helps frontend properly display and navigate pages",
  ],
  ["Support sorting with pagination", "Gives users control over data ordering"],
];

const Topic4Subtopic0Content = () => {
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 4.1 – Pagination Concepts</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Understanding the Basics of Pagination</b>
        <br />
        When dealing with large datasets in your application — like thousands of
        URLs — returning all records in a single API response is inefficient and
        impractical.
        <br />
        <br />
        <b>Pagination</b> breaks down this large data into{" "}
        <b>smaller, manageable chunks (pages)</b> that can be requested and
        viewed one at a time. This approach enhances performance, reduces server
        load, and improves the user experience.
        <br />
        <br />
        <i>
          Think of pagination like browsing a book: you don’t read all pages at
          once; you turn one page at a time.
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
        📚 Key Terms Explained
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {keyTerms.map(([term, desc], i) => (
            <tr key={i}>
              <td>
                <b>{term}</b>
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Pagination is Essential
      </h3>
      <ul className="topic-bullets">
        {whyEssential.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

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
    </div>
  );
};

export default Topic4Subtopic0Content;

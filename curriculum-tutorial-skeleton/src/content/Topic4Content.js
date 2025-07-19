import React, { useState } from "react";
import "./CustomSectionStyles.css";

const learningOutcomes = [
  "Understand the concepts and benefits of pagination",
  "Use Spring Data’s Pageable interface to handle pagination parameters",
  "Customize page size and page number from client requests",
  "Return paginated responses with total counts and metadata",
  "Implement sorting alongside pagination for better data ordering",
];

const whyPagination = [
  [
    "Slow response times with large data",
    "Fast responses with smaller data chunks",
  ],
  ["High memory and bandwidth usage", "Efficient resource utilization"],
  [
    "Poor user experience with endless scrolling",
    "Easy navigation and UI control",
  ],
  [
    "Difficult backend performance optimization",
    "Backend can optimize queries and caching",
  ],
];

const keyConcepts = [
  [
    "Page Number",
    "Which page of results to retrieve (0-based or 1-based index)",
  ],
  ["Page Size", "How many items to return per page"],
  ["Total Elements", "Total number of records available"],
  ["Total Pages", "Total number of pages available based on size"],
  ["Sorting", "Ordering results by one or more fields"],
];

const springDataSupport = [
  [
    "Use Pageable interface",
    "Accept pagination parameters (page, size, sort) automatically",
  ],
  ["Return Page<T> object", "Contains content and metadata"],
  ["Support sorting via Sort", "Parameter inside Pageable"],
  [
    "Clients specify query params",
    "/api/urls?page=0&size=10&sort=createdAt,desc",
  ],
];

const implSteps = [
  ["Controller", "Accept Pageable as method parameter"],
  ["Service", "Call repository method returning Page<Url>"],
  ["Repository", "Use built-in findAll(Pageable pageable)"],
  ["Response DTO", "Create a paginated response DTO including metadata"],
  ["Frontend/Client", "Send page, size, sort query params in requests"],
];

const tryItTasks = [
  "Modify your URL list API to accept pagination parameters",
  "Return a paginated response including total pages and total elements",
  "Add sorting by creation date or click count",
  "Test your paginated API with Postman or curl using different page and size values",
  "Experiment with large datasets to observe performance benefits",
];

const discussionPrompts = [
  {
    q: "How does Spring Data’s Pageable interface simplify pagination?",
    a: "It abstracts pagination parameters, automatically maps query params, and provides metadata with results.",
  },
  {
    q: "Why is it important to return pagination metadata?",
    a: "Metadata helps clients display navigation controls like next/previous buttons and total page counts.",
  },
  {
    q: "Can you combine sorting with pagination? How?",
    a: "Yes, by including sort parameters (e.g., sort=createdAt,desc) which Spring Data applies along with pagination.",
  },
  {
    q: "What issues might arise if you don’t paginate large datasets?",
    a: "Slow responses, server crashes, high bandwidth use, and poor user experience.",
  },
];

const bestPractices = [
  [
    "Set sensible default page size",
    "Prevent excessive data transfer by default",
  ],
  ["Limit maximum page size", "Protect server from large payload requests"],
  ["Include pagination metadata", "Provide clients with context for UI/UX"],
  ["Allow flexible sorting", "Improve data usability and user control"],
  [
    "Validate pagination parameters",
    "Avoid invalid page or size values causing errors",
  ],
];

const Topic4Content = () => {
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="topic-content">
      <h2 className="section-title">4. List with Pagination</h2>
      <hr className="section-underline" />
      <div className="yellow-callout">
        <b>Overview: Handling Large Data Sets Gracefully</b>
        <br />
        When your URL shortener scales and users have hundreds or thousands of
        URLs, <b>returning all records at once becomes inefficient and slow</b>.
        <br />
        Pagination solves this problem by{" "}
        <b>splitting data into manageable pages</b> — sending only a subset of
        records per request. This improves performance, user experience, and
        reduces server load.
        <br />
        <br />
        <i>
          Think of pagination as flipping through a book, page by page, instead
          of seeing all pages at once.
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
        📚 Why Pagination Matters
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Without Pagination</th>
            <th>With Pagination</th>
          </tr>
        </thead>
        <tbody>
          {whyPagination.map(([w, c], i) => (
            <tr key={i}>
              <td>{w}</td>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Key Concepts in Pagination
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {keyConcepts.map(([k, d], i) => (
            <tr key={i}>
              <td>{k}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 How Spring Data Supports Pagination
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {springDataSupport.map(([f, d], i) => (
            <tr key={i}>
              <td>{f}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📝 Implementing Pagination in URL Shortener
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {implSteps.map(([s, d], i) => (
            <tr key={i}>
              <td>{s}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default Topic4Content;
 
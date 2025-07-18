import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  urlRepository: `package com.example.urlshortener.repository;

import com.example.urlshortener.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Find URL by short code using derived query
    Optional<Url> findByShortUrl(String shortUrl);

    // Find URLs created after a certain date using derived query
    List<Url> findByCreatedAtAfter(LocalDateTime date);

    // Count expired URLs using JPQL query
    @Query("SELECT COUNT(u) FROM Url u WHERE u.expiresAt < CURRENT_TIMESTAMP")
    long countExpiredUrls();

    // Fetch only original URLs using JPQL query
    @Query("SELECT u.originalUrl FROM Url u")
    List<String> findAllOriginalUrls();

    // Find top 5 URLs by click count using native query
    @Query(value = "SELECT * FROM url ORDER BY click_count DESC LIMIT 5", nativeQuery = true)
    List<Url> findTop5ByClickCount();
}
`,
};

const learningOutcomes = [
  "Understand how Spring Data derives queries from method names",
  "Write custom query methods in the repository interface",
  "Use JPQL or native SQL with @Query annotation for complex queries",
  "Optimize queries for your URL shortener use cases",
  "Return custom projections or DTOs directly from queries",
];

const whyCustom = [
  [
    "Limited to default CRUD operations",
    "Ability to fetch filtered, sorted, or aggregated data",
  ],
  ["Repetitive or inefficient queries", "Cleaner, reusable query methods"],
  [
    "Logic pushed into service layer or SQL",
    "Cleaner separation of concerns and maintainability",
  ],
  [
    "Difficulty in handling complex conditions",
    "Custom queries handle complex logic at DB level",
  ],
];

const howSpringData = [
  [
    "Derived Queries",
    "Define methods following naming conventions like findByShortUrl(String shortUrl) — Spring generates the query automatically",
  ],
  ["JPQL Queries", "Use @Query with JPQL for flexible and complex queries"],
  ["Native Queries", "Use @Query(nativeQuery = true) for raw SQL if needed"],
  [
    "Projections",
    "Return only specific columns or DTOs instead of entire entities",
  ],
];

const useCases = [
  [
    "Find URL by its short code",
    "Optional<Url> findByShortUrl(String shortUrl);",
  ],
  [
    "Find URLs created after a certain date",
    "List<Url> findByCreatedAtAfter(LocalDateTime date);",
  ],
  [
    "Count URLs that have expired",
    '@Query("SELECT COUNT(u) FROM Url u WHERE u.expiresAt < CURRENT_TIMESTAMP") long countExpiredUrls();',
  ],
  [
    "Retrieve only original URLs for export",
    '@Query("SELECT u.originalUrl FROM Url u") List<String> findAllOriginalUrls();',
  ],
];

const tryItTasks = [
  "Add a method to find a URL by its shortUrl in your repository",
  "Write a JPQL query to find URLs created within the last 7 days",
  "Create a method to count how many URLs have expired",
  "Write a native query to fetch the top 5 most clicked URLs",
  "Test these methods by calling them from your service layer",
];

const discussionPrompts = [
  {
    q: "How does Spring Data JPA create queries from method names?",
    a: "It parses method names to understand intent and automatically generates SQL queries accordingly.",
  },
  {
    q: "When should you use @Query instead of derived queries?",
    a: "Use @Query for complex queries that cannot be expressed easily with method names or require joins/aggregations.",
  },
  {
    q: "What are projections, and why are they useful?",
    a: "Projections allow fetching only necessary fields instead of entire entities, improving performance and reducing data transfer.",
  },
  {
    q: "Can native SQL queries affect database portability?",
    a: "Yes, because native queries are specific to the database dialect, they might reduce portability across different DBs.",
  },
];

const bestPractices = [
  ["Use derived queries for simple lookups", "Quick and readable code"],
  ["Use @Query for complex scenarios", "Greater flexibility and control"],
  [
    "Avoid fetching unnecessary columns",
    "Improve performance and reduce memory usage",
  ],
  [
    "Test custom queries thoroughly",
    "Prevent runtime errors and unexpected results",
  ],
  [
    "Document custom methods clearly",
    "Ease maintenance and team collaboration",
  ],
];

const summaryTable = [
  ["Feature", "Description"],
  ["Derived Queries", "Methods named to auto-generate queries"],
  ["JPQL Queries", "Flexible, object-oriented queries with @Query"],
  ["Native Queries", "Raw SQL queries for complex or optimized needs"],
  ["Projections", "Partial data retrieval for efficiency"],
];

const Topic3Subtopic8Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3.8 – Repository Custom Methods</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Extending Data Access with Custom Queries</b>
        <br />
        Your <b>Repository layer</b> is the gateway to your database. Spring
        Data JPA provides many built-in methods (like{" "}
        <span className="blue-inline-code">save()</span>,{" "}
        <span className="blue-inline-code">findById()</span>,{" "}
        <span className="blue-inline-code">findAll()</span>), but sometimes you
        need to <b>go beyond the basics</b>.<br />
        <br />
        In this section, you will learn how to <b>
          add custom query methods
        </b>{" "}
        to your repository interfaces — enabling more powerful, tailored
        database queries specific to your URL shortener’s needs.
        <br />
        <br />
        <i>
          Think of custom repository methods as <b>specialized search tools</b>{" "}
          that let your app find exactly what it needs, efficiently.
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
        📚 Why Custom Repository Methods Matter
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Without Custom Methods</th>
            <th>With Custom Methods</th>
          </tr>
        </thead>
        <tbody>
          {whyCustom.map(([w, c], i) => (
            <tr key={i}>
              <td>{w}</td>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 How Spring Data JPA Supports Custom Queries
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {howSpringData.map(([t, d], i) => (
            <tr key={i}>
              <td>{t}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Example Use Cases in URL Shortener
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Use Case</th>
            <th>Repository Method Signature</th>
          </tr>
        </thead>
        <tbody>
          {useCases.map(([u, s], i) => (
            <tr key={i}>
              <td>{u}</td>
              <td>
                <span className="blue-inline-code">{s}</span>
              </td>
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Summary Table
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([f, d], i) => (
            <tr key={i}>
              <td>{f}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Example Repository Interface:{" "}
        <span className="blue-inline-code">UrlRepository.java</span>
      </h3>
      <div className="blue-card-section">
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
    </div>
  );
};

export default Topic3Subtopic8Content;

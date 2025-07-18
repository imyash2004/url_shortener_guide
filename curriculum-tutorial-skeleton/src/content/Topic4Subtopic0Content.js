import React, { useState } from "react";
import "../App.css";

export default function Topic4Subtopic0Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);

  return (
    <div className="topic-content">
      <div className="key-idea-box">
        <h3>🧭 Overview: Handling Large Data Sets Gracefully</h3>
        <p>
          When your URL shortener scales and users have hundreds or thousands of
          URLs,{" "}
          <b>returning all records at once becomes inefficient and slow</b>.
          <br />
          Pagination solves this problem by{" "}
          <b>splitting data into manageable pages</b> — sending only a subset of
          records per request. This improves performance, user experience, and
          reduces server load.
        </p>
        <div className="topic-callout" style={{ marginTop: "1rem" }}>
          <b>
            Think of pagination as flipping through a book, page by page,
            instead of seeing all pages at once.
          </b>
        </div>
      </div>

      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>✅ Understand the concepts and benefits of pagination</li>
        <li>
          ✅ Use Spring Data’s <code>Pageable</code> interface to handle
          pagination parameters
        </li>
        <li>✅ Customize page size and page number from client requests</li>
        <li>✅ Return paginated responses with total counts and metadata</li>
        <li>
          ✅ Implement sorting alongside pagination for better data ordering
        </li>
      </ul>

      <h3>📚 Why Pagination Matters</h3>
      <table className="boundaries-table">
        <thead>
          <tr>
            <th>Without Pagination</th>
            <th>With Pagination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Slow response times with large data</td>
            <td>Fast responses with smaller data chunks</td>
          </tr>
          <tr>
            <td>High memory and bandwidth usage</td>
            <td>Efficient resource utilization</td>
          </tr>
          <tr>
            <td>Poor user experience with endless scrolling</td>
            <td>Easy navigation and UI control</td>
          </tr>
          <tr>
            <td>Difficult backend performance optimization</td>
            <td>Backend can optimize queries and caching</td>
          </tr>
        </tbody>
      </table>

      <h3>🔍 Key Concepts in Pagination</h3>
      <ul className="topic-bullets">
        <li>
          <b>Page Number:</b> Which page of results to retrieve (0-based or
          1-based index)
        </li>
        <li>
          <b>Page Size:</b> How many items to return per page
        </li>
        <li>
          <b>Total Elements:</b> Total number of records available
        </li>
        <li>
          <b>Total Pages:</b> Total number of pages available based on size
        </li>
        <li>
          <b>Sorting:</b> Ordering results by one or more fields
        </li>
      </ul>

      <div
        className="topic-callout"
        style={{
          background: "#e3f2fd",
          borderLeft: "5px solid #2196f3",
          marginTop: "1.5rem",
        }}
      >
        <h4 style={{ margin: 0 }}>🧱 How Spring Data Supports Pagination</h4>
        <ul>
          <li>
            Use <code>Pageable</code> interface to accept pagination parameters
            (<code>page</code>, <code>size</code>, <code>sort</code>)
            automatically
          </li>
          <li>
            Return a <code>Page&lt;T&gt;</code> object containing content and
            metadata
          </li>
          <li>
            Support sorting via <code>Sort</code> parameter inside{" "}
            <code>Pageable</code>
          </li>
          <li>
            Clients specify pagination info via query parameters (e.g.,{" "}
            <code>/api/urls?page=0&amp;size=10&amp;sort=createdAt,desc</code>)
          </li>
        </ul>
      </div>

      <div
        className="topic-callout"
        style={{
          background: "#e3f2fd",
          borderLeft: "5px solid #2196f3",
          marginTop: "1.5rem",
        }}
      >
        <h4 style={{ margin: 0 }}>
          📝 Implementing Pagination in URL Shortener
        </h4>
        <table className="boundaries-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Controller</td>
              <td>
                Accept <code>Pageable</code> as method parameter
              </td>
            </tr>
            <tr>
              <td>Service</td>
              <td>
                Call repository method returning <code>Page&lt;Url&gt;</code>
              </td>
            </tr>
            <tr>
              <td>Repository</td>
              <td>
                Use built-in <code>findAll(Pageable pageable)</code>
              </td>
            </tr>
            <tr>
              <td>Response DTO</td>
              <td>Create a paginated response DTO including metadata</td>
            </tr>
            <tr>
              <td>Frontend/Client</td>
              <td>Send page, size, sort query params in requests</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>🧪 Try It Yourself Tasks</h3>
      <div
        className="topic-callout"
        style={{ background: "#e3f2fd", borderLeft: "5px solid #2196f3" }}
      >
        <ul className="topic-bullets">
          <li>Modify your URL list API to accept pagination parameters</li>
          <li>
            Return a paginated response including total pages and total elements
          </li>
          <li>Add sorting by creation date or click count</li>
          <li>
            Test your paginated API with Postman or curl using different page
            and size values
          </li>
          <li>
            Experiment with large datasets to observe performance benefits
          </li>
        </ul>
      </div>

      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>
            Q: How does Spring Data’s <code>Pageable</code> interface simplify
            pagination?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            A: It abstracts pagination parameters, automatically maps query
            params, and provides metadata with results.
          </div>
        )}
        <div className="topic-faq-q">
          <b>Q: Why is it important to return pagination metadata?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            A: Metadata helps clients display navigation controls like
            next/previous buttons and total page counts.
          </div>
        )}
        <div className="topic-faq-q">
          <b>Q: Can you combine sorting with pagination? How?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
            A: Yes, by including sort parameters (e.g.,{" "}
            <code>sort=createdAt,desc</code>) which Spring Data applies along
            with pagination.
          </div>
        )}
        <div className="topic-faq-q">
          <b>
            Q: What issues might arise if you don’t paginate large datasets?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA4((v) => !v)}>
          {showA4 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA4 && (
          <div className="topic-faq-a">
            A: Slow responses, server crashes, high bandwidth use, and poor user
            experience.
          </div>
        )}
      </div>

      <h3>🧼 Best Practices</h3>
      <table className="boundaries-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>✅ Set sensible default page size</td>
            <td>Prevent excessive data transfer by default</td>
          </tr>
          <tr>
            <td>✅ Limit maximum page size</td>
            <td>Protect server from large payload requests</td>
          </tr>
          <tr>
            <td>✅ Include pagination metadata</td>
            <td>Provide clients with context for UI/UX</td>
          </tr>
          <tr>
            <td>✅ Allow flexible sorting</td>
            <td>Improve data usability and user control</td>
          </tr>
          <tr>
            <td>✅ Validate pagination parameters</td>
            <td>Avoid invalid page or size values causing errors</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

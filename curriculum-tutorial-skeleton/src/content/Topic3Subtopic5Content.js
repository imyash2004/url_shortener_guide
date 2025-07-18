import React, { useState } from "react";
import "./CustomSectionStyles.css";

const validationAnnotations = [
  ["@NotBlank", "Field must not be null or empty"],
  ["@Size(min, max)", "String length constraints"],
  ["@URL", "Valid URL format"],
  ["@Future", "Date/time must be in the future"],
  ["@Pattern", "Regex pattern validation"],
  ["@Email", "Valid email format"],
];

const learningOutcomes = [
  "Understand the importance of input validation in APIs",
  "Learn about standard validation annotations in Spring Boot / Jakarta Validation",
  "Configure your controllers to trigger validation automatically",
  "Handle validation errors gracefully and return meaningful responses",
  "Understand how validation prevents bugs and security vulnerabilities",
];

const whyValidate = [
  [
    "Invalid or malformed data crashes logic",
    "Prevents bad data from reaching business layers",
  ],
  [
    "Security vulnerabilities (e.g., SQL Injection)",
    "Stops injection or malicious inputs early",
  ],
  [
    "Poor user experience with unclear errors",
    "Returns clear, actionable error messages",
  ],
  [
    "Data inconsistency in your database",
    "Ensures data integrity and consistency",
  ],
];

const tryItTasks = [
  "Add validation annotations to your Request DTOs (CreateUrlRequest, UpdateUrlRequest)",
  "Use @Valid in your controller methods accepting these DTOs",
  "Test sending invalid requests and observe error responses",
  "Create a global exception handler using @ControllerAdvice to customize validation error messages",
  "Enhance user feedback by returning field-specific error details",
];

const discussionPrompts = [
  {
    q: "What happens if validation annotations are missing on DTO fields?",
    a: "No automatic input checking occurs, so invalid or malicious data can reach the service or database, potentially causing errors or security issues.",
  },
  {
    q: "How does Spring Boot know when to validate?",
    a: "Validation triggers when controller method parameters are annotated with @Valid or @Validated.",
  },
  {
    q: "Can you customize the error response when validation fails?",
    a: "Yes. Using @ControllerAdvice and exception handler methods, you can format error responses with clear messages and status codes.",
  },
  {
    q: "Why is validation important for security?",
    a: "It prevents malformed inputs that could exploit vulnerabilities like injection attacks or cause unexpected behavior.",
  },
];

const bestPractices = [
  ["Validate all incoming API data", "Protects backend and data integrity"],
  ["Use built-in annotations first", "Covers most common validation needs"],
  [
    "Implement global error handling",
    "Consistent and clear API error responses",
  ],
  ["Provide helpful error messages", "Improves client experience"],
  ["Keep validation rules in DTOs", "Centralizes input constraints"],
];

const summaryTable = [
  ["Validation Location", "On DTOs via annotations"],
  ["Trigger Point", "@Valid annotation on controller params"],
  [
    "Failure Handling",
    "Spring throws exceptions, customizable via @ControllerAdvice",
  ],
  ["Common Annotations", "@NotBlank, @Size, @URL, @Future, etc."],
  ["Outcome", "Clean, safe, and user-friendly API inputs"],
];

const Topic3Subtopic5Content = () => {
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 3.5 – Validation</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Ensuring Data Integrity at the API Boundary</b>
        <br />
        Validation is the critical gatekeeper that ensures your application only
        processes <b>correct, meaningful, and safe data</b>. When users or
        clients send requests to your API, validation helps catch mistakes early
        — before data reaches your business logic or database.
        <br />
        <br />
        In this section, you'll learn how to enforce validation rules on your{" "}
        <b>Request DTOs</b> so the system can automatically check incoming data
        and respond with clear errors when inputs are invalid.
        <br />
        <br />
        <i>
          Think of validation as the <b>quality control</b> that guarantees only
          good data gets through.
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
        📚 Why Validate Input?
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Risk Without Validation</th>
            <th>Benefit of Validation</th>
          </tr>
        </thead>
        <tbody>
          {whyValidate.map(([r, b], i) => (
            <tr key={i}>
              <td>{r}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Common Validation Annotations
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Annotation</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {validationAnnotations.map(([a, p], i) => (
            <tr key={i}>
              <td>
                <span className="blue-inline-code">{a}</span>
              </td>
              <td>{p}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 How Validation Works in Spring Boot
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>Apply validation annotations on DTO fields</li>
          <li>
            Use <span className="blue-inline-code">@Valid</span> annotation on
            controller method parameters to trigger validation
          </li>
          <li>
            Spring Boot automatically checks inputs before method logic runs
          </li>
          <li>
            If validation fails, Spring throws{" "}
            <span className="blue-inline-code">
              MethodArgumentNotValidException
            </span>
          </li>
          <li>
            Customize error handling by defining a{" "}
            <span className="blue-inline-code">@ControllerAdvice</span> class
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Example Scenario: Validating{" "}
        <span className="blue-inline-code">CreateUrlRequest</span>
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <span className="blue-inline-code">originalUrl</span> must not be
            blank and must be a valid URL
          </li>
          <li>
            <span className="blue-inline-code">expiresAt</span> (if provided)
            must be a future date/time
          </li>
          <li>
            <span className="blue-inline-code">description</span> must not
            exceed max length
          </li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          If any rule is violated, the API should respond with a{" "}
          <b>400 Bad Request</b> and an error message explaining the problem.
        </div>
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
    </div>
  );
};

export default Topic3Subtopic5Content;

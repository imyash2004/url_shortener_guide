import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  globalExceptionHandler: `package com.example.urlshortener.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        ApiError apiError = new ApiError(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(),
                "Validation Failed", errors.toString(), request.getDescription(false));
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    // Handle URL not found exception
    @ExceptionHandler(UrlNotFoundException.class)
    public ResponseEntity<Object> handleUrlNotFoundException(UrlNotFoundException ex, WebRequest request) {
        ApiError apiError = new ApiError(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(),
                "URL Not Found", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    // Handle duplicate short URL exception
    @ExceptionHandler(DuplicateShortUrlException.class)
    public ResponseEntity<Object> handleDuplicateShortUrlException(DuplicateShortUrlException ex, WebRequest request) {
        ApiError apiError = new ApiError(LocalDateTime.now(), HttpStatus.CONFLICT.value(),
                "Conflict", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(apiError, HttpStatus.CONFLICT);
    }

    // Handle generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        ApiError apiError = new ApiError(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error occurred", "An unexpected error occurred", request.getDescription(false));
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Inner class for error response structure
    public static class ApiError {
        private LocalDateTime timestamp;
        private int status;
        private String error;
        private String message;
        private String path;

        public ApiError(LocalDateTime timestamp, int status, String error, String message, String path) {
            this.timestamp = timestamp;
            this.status = status;
            this.error = error;
            this.message = message;
            this.path = path;
        }

        // Getters and setters omitted for brevity
    }
}
`,
};

const learningOutcomes = [
  "Understand different types of errors your API can encounter",
  "Learn how to use Spring Boot’s exception handling features",
  "Create centralized error handling using @ControllerAdvice",
  "Structure standardized error response formats",
  "Handle validation, resource not found, and unexpected errors effectively",
];

const whyErrorHandling = [
  [
    "Clients receive unclear or inconsistent errors",
    "Clients get clear, consistent, and actionable messages",
  ],
  [
    "Stack traces or sensitive info exposed",
    "Sensitive internal details are hidden",
  ],
  ["Difficult to debug or support issues", "Easier to track and fix problems"],
  [
    "Poor user experience and frustrated API users",
    "Users understand what went wrong and how to fix it",
  ],
];

const errorTypes = [
  ["Validation Errors", "Invalid input data", "400 Bad Request"],
  ["Resource Not Found", "URL or entity does not exist", "404 Not Found"],
  [
    "Duplicate Resource",
    "Attempt to create an already existing short URL",
    "409 Conflict",
  ],
  [
    "Unauthorized / Forbidden",
    "Access control violation",
    "401 Unauthorized / 403 Forbidden",
  ],
  ["Server Errors", "Unexpected exceptions", "500 Internal Server Error"],
];

const tryItTasks = [
  "Create a global exception handler class annotated with @ControllerAdvice",
  "Handle MethodArgumentNotValidException to format validation errors",
  "Handle custom exceptions like UrlNotFoundException and DuplicateShortUrlException",
  "Design a consistent error response format (fields like timestamp, status, error, message, path)",
  "Test your API by triggering various errors and verify responses",
];

const discussionPrompts = [
  {
    q: "Why centralize error handling instead of catching exceptions in each controller method?",
    a: "Centralized handling reduces code duplication, ensures consistent responses, and makes maintenance easier.",
  },
  {
    q: "What is the role of @ControllerAdvice in error handling?",
    a: "It allows you to define global exception handling logic that applies across all controllers.",
  },
  {
    q: "How can detailed error responses improve client experience?",
    a: "They provide clients with actionable information to fix their requests and handle errors gracefully.",
  },
  {
    q: "Should internal error details like stack traces be exposed in error responses?",
    a: "No. These should be logged internally but hidden from clients to prevent security risks.",
  },
];

const bestPractices = [
  ["Use global error handling", "Consistency and cleaner controller code"],
  ["Return standardized JSON responses", "Easier client parsing and debugging"],
  ["Provide clear, actionable messages", "Improve API usability"],
  ["Log detailed errors internally", "Support debugging without exposing info"],
  ["Handle common exceptions explicitly", "Cover typical API error scenarios"],
];

const summaryTable = [
  [
    "Error Handling Scope",
    "Validation, Not Found, Conflict, Unauthorized, Server Errors",
  ],
  ["Spring Features", "@ExceptionHandler, @ControllerAdvice"],
  [
    "Response Format",
    "JSON with fields like timestamp, status, error, message, path",
  ],
  ["Goal", "Clear, secure, consistent error communication"],
];

const Topic3Subtopic6Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3.6 – Error Handling</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Managing Errors Gracefully in Your API</b>
        <br />
        When building APIs, things don’t always go as planned — users may send
        invalid data, resources might be missing, or unexpected server issues
        may occur. Proper <b>error handling</b> is crucial to ensure your API
        communicates these issues clearly and reliably to clients.
        <br />
        <br />
        In this section, you’ll learn how to implement{" "}
        <b>robust error handling</b> for your URL shortener backend so that
        users get meaningful, consistent error responses instead of confusing
        stack traces or generic messages.
        <br />
        <br />
        <i>
          Think of error handling as your app’s{" "}
          <b>way to gracefully say “Oops! Here’s what went wrong”</b>, rather
          than crashing silently or exposing sensitive details.
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
        📚 Why Proper Error Handling Matters
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Without Good Error Handling</th>
            <th>With Proper Error Handling</th>
          </tr>
        </thead>
        <tbody>
          {whyErrorHandling.map(([w, p], i) => (
            <tr key={i}>
              <td>{w}</td>
              <td>{p}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Common Error Types in a URL Shortener API
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Error Type</th>
            <th>Cause</th>
            <th>Typical Response Code</th>
          </tr>
        </thead>
        <tbody>
          {errorTypes.map(([type, cause, code], i) => (
            <tr key={i}>
              <td>{type}</td>
              <td>{cause}</td>
              <td>{code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 How Error Handling Works in Spring Boot
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            Use <span className="blue-inline-code">@ExceptionHandler</span>{" "}
            methods to catch specific exceptions
          </li>
          <li>
            Create a global error handler class annotated with{" "}
            <span className="blue-inline-code">@ControllerAdvice</span>
          </li>
          <li>
            Customize error responses with meaningful messages, timestamps, and
            status codes
          </li>
          <li>
            Return structured JSON error responses instead of default HTML error
            pages
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Example Scenario: Handling Not Found and Validation Errors
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            When a client requests a non-existent short URL, respond with a{" "}
            <span className="blue-inline-code">404 Not Found</span> and message
            like "Short URL not found."{" "}
          </li>
          <li>
            When validation fails, respond with{" "}
            <span className="blue-inline-code">400 Bad Request</span> and
            detailed messages for each invalid field.
          </li>
          <li>
            When a duplicate short URL creation is attempted, respond with{" "}
            <span className="blue-inline-code">409 Conflict</span> and an
            explanatory message.
          </li>
        </ul>
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Sample Global Exception Handler
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.globalExceptionHandler ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(
                codeBlocks.globalExceptionHandler,
                "globalExceptionHandler"
              )
            }
          >
            {copied.globalExceptionHandler ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.globalExceptionHandler}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Topic3Subtopic6Content;

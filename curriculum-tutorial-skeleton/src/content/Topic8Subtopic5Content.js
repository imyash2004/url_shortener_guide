import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  securityUtil: `package com.url_shortener.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class SecurityUtil {

    // Get logged-in user's email
    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (authentication != null && authentication.isAuthenticated())
                ? authentication.getName()
                : null;
    }

    // Get roles of current user
    public static List<String> getCurrentUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    // Check if user has a specific role
    public static boolean hasRole(String role) {
        return getCurrentUserRoles().contains("ROLE_" + role);
    }

    // Check if user is authenticated
    public static boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getName());
    }
}`,
  createShortUrl: `public void createShortUrl(UrlRequestDto dto) {
    String createdBy = SecurityUtil.getCurrentUserEmail(); // Who created it
    // Save in DB...
}`,
  conditionalAccess: `if (SecurityUtil.hasRole("ADMIN")) {
    // Perform admin action
}`,
  task1: `System.out.println("Request from user: " + SecurityUtil.getCurrentUserEmail());`,
  task2: `if (SecurityUtil.hasRole("ADMIN")) {
    System.out.println("Admin is performing this action.");
}`,
};

const summaryTable = [
  ["getCurrentUserEmail()", "Fetches the logged-in user's email"],
  ["getCurrentUserRoles()", "Returns list of roles"],
  ['hasRole("ADMIN")', "Checks if user has a specific role"],
  ["isLoggedIn()", "Verifies if user is authenticated"],
  ["SecurityContextHolder", "Global context holding security info"],
];

const discussionPrompts = [
  {
    q: "What is the purpose of SecurityUtil.getCurrentUserEmail()?",
    a: "To get the email of the currently authenticated user.",
  },
  {
    q: "Why is SecurityContextHolder used?",
    a: "It holds the authentication context for the current request.",
  },
  {
    q: "Why prefix ROLE_ in hasRole()?",
    a: "Because Spring adds ROLE_ to authorities internally.",
  },
  {
    q: "Is it safe to use this utility in services?",
    a: "✅ Yes — as long as you've validated JWTs before.",
  },
];

const tryItTasks = [
  {
    title: "Log user info on every request",
    description: "Add this line to any controller method:",
    code: codeBlocks.task1,
    instructions: "Run the app and test with JWT headers.",
  },
  {
    title: "Conditional Role Logic",
    description: "In a service:",
    code: codeBlocks.task2,
    instructions: "Try calling it with an admin token and a user token.",
  },
];

const Topic8Subtopic5Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🧰 8.5 – Security Utilities</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll build a utility class to:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>Retrieve the currently logged-in user's email</li>
          <li>Access their roles (authorities)</li>
          <li>Check if a user is authenticated</li>
          <li>Centralize and simplify security logic across the app</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Security Utilities?
      </h3>
      <div className="blue-card-section">
        <p>While writing services and controllers, you'll often need:</p>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            The <b>logged-in user's identity</b>
          </li>
          <li>
            Their <b>roles</b> to authorize behavior
          </li>
          <li>
            To <b>avoid copying JWT parsing logic everywhere</b>
          </li>
        </ul>
        <p>
          Instead of duplicating this code, we'll create a{" "}
          <span className="blue-inline-code">SecurityUtil</span> class. This is
          also safer — because JWT parsing is <b>already handled</b> by{" "}
          <span className="blue-inline-code">SecurityContextHolder</span>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Create <span className="blue-inline-code">SecurityUtil</span> Class
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.securityUtil ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.securityUtil, "securityUtil")
            }
          >
            {copied.securityUtil ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.securityUtil}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Example Usage in a Service
      </h3>
      <div className="blue-card-section">
        <p>Let's say you want to log which user created a short URL:</p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.createShortUrl ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.createShortUrl, "createShortUrl")
            }
          >
            {copied.createShortUrl ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.createShortUrl}</code>
          </pre>
        </div>

        <p>Or maybe conditionally allow access:</p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.conditionalAccess ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(codeBlocks.conditionalAccess, "conditionalAccess")
            }
          >
            {copied.conditionalAccess ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.conditionalAccess}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
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
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section">
        {tryItTasks.map((task, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <h4>
              🚀 Task {idx + 1}: {task.title}
            </h4>
            <p>{task.description}</p>

            <div
              className="topic-codeblock code-with-copy"
              style={{ margin: "0.7rem 0" }}
            >
              <button
                className={`copy-button ${
                  copied[`task${idx}`] ? "copied" : ""
                }`}
                onClick={() => copyToClipboard(task.code, `task${idx}`)}
              >
                {copied[`task${idx}`] ? "Copied!" : "Copy"}
              </button>
              <pre>
                <code>{task.code}</code>
              </pre>
            </div>

            <p>{task.instructions}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{row[0]}</span>
              </td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Subtopic5Content;

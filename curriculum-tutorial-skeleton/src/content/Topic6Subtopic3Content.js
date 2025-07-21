import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  servlet: `@GetMapping("/{orgShortName}/{shortCode}")
public void redirect(
    @PathVariable String orgShortName,
    @PathVariable String shortCode,
    HttpServletResponse response
) throws IOException {
    String originalUrl = urlMappingService.getOriginalUrl(orgShortName, shortCode);
    
    if (originalUrl != null) {
        response.sendRedirect(originalUrl); // sends 302 redirect
    } else {
        response.sendError(HttpServletResponse.SC_NOT_FOUND, "URL Not Found");
    }
}`,
  responseEntity: `@GetMapping("/{orgShortName}/{shortCode}")
public ResponseEntity<Void> redirect(@PathVariable String orgShortName,
                                     @PathVariable String shortCode) {
    String originalUrl = urlMappingService.getOriginalUrl(orgShortName, shortCode);
    
    if (originalUrl != null) {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(originalUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND); // 302
    } else {
        return ResponseEntity.notFound().build();
    }
}`,
};

const statusTable = [
  [
    "302 Found",
    "Temporary Redirect",
    "Default, when the redirect might change later",
  ],
  [
    "301 Moved Permanently",
    "Permanent Redirect",
    "SEO-friendly, when the short code always points to the same destination",
  ],
];

const summaryTable = [
  ["Redirect", "Tells browser to open another URL"],
  ["302", "Temporary redirect (default)"],
  ["301", "Permanent, SEO-friendly redirect"],
  ["sendRedirect()", "Direct method to send 302"],
  ["ResponseEntity", "More flexible, lets you control headers"],
];

const discussionPrompts = [
  {
    q: "What status code is used for a temporary redirect?",
    a: <>302 Found</>,
  },
  {
    q: "What status code is ideal for SEO and permanent redirection?",
    a: <>301 Moved Permanently</>,
  },
  {
    q: "What happens if the original URL is null?",
    a: <>Return 404 Not Found</>,
  },
  {
    q: "What Spring class is used to manually redirect?",
    a: (
      <>
        HttpServletResponse or ResponseEntity with HttpHeaders.setLocation(...)
      </>
    ),
  },
];

const tryItTasks = [
  "Create an endpoint like: GET /{org}/{code}",
  "If a valid URL is found, send a 302 redirect",
  "Else return 404 with an error message",
  "Bonus: Try returning 301 if isPermanent flag is true!",
];

const Topic6Subtopic3Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(codeBlocks[codeId]);
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
      <h2 style={{ color: "#1769aa" }}>🔁 6.4 – HTTP Redirect Response</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll deeply understand how to redirect users from a
        short URL to the original full URL using Spring Boot. We’ll learn about{" "}
        <b>HTTP status codes</b>, how browsers handle them, and how to implement
        this in a <b>clean and secure way</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚦 What is an HTTP Redirect?
      </h3>
      <div className="blue-card-section">
        When a user accesses a short URL like:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/flipkart/sale24</code>
          </pre>
        </div>
        Your backend looks up the original URL (say{" "}
        <span className="blue-inline-code">
          https://flipkart.com/big-billion-sale
        </span>
        ) and sends a <b>redirect response</b> to the browser.
        <br />
        <br />
        👉 The browser <b>never sees the logic</b>. It simply follows the
        redirect.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔢 Types of Redirects
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Status Code</th>
            <th>Name</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          {statusTable.map(([code, name, use], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{code}</span>
              </td>
              <td>{name}</td>
              <td>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
        For our use-case, <b>302</b> is ideal, unless you want SEO optimization,
        in which case <b>301</b> is better.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Implementing Redirect in Spring Boot
      </h3>
      <div className="blue-card-section">
        <b>Using HttpServletResponse</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.servlet ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.servlet, "servlet")}
          >
            {copied.servlet ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.servlet}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>Using ResponseEntity</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.responseEntity ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.responseEntity, "responseEntity")
            }
          >
            {copied.responseEntity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.responseEntity}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛡️ Why Is This Important?
      </h3>
      <ul className="topic-checklist">
        <li>
          Helps <b>hide backend logic</b>
        </li>
        <li>
          Offers <b>brand-based shortening</b> like{" "}
          <span className="blue-inline-code">short.ly/zomato/offer2025</span>
        </li>
        <li>
          Is essential for <b>analytics tracking</b>
        </li>
        <li>
          Allows for <b>SEO optimization</b> via 301
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Key Tip: Use URI not String
      </h3>
      <div className="yellow-callout">
        Make sure to wrap the URL with{" "}
        <span className="blue-inline-code">URI.create(...)</span> to avoid
        malformed URL issues.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {faq.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() =>
                setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)))
              }
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
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧾 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([concept, desc], idx) => (
            <tr key={idx}>
              <td>{concept}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic6Subtopic3Content;

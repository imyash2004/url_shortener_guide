import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controller: `@GetMapping("/{orgShortName}/{shortCode}")
public ResponseEntity<?> redirectToOriginalUrl(
    @PathVariable String orgShortName,
    @PathVariable String shortCode
) {
    // Logic to redirect
}`,
  realExample: `@PathVariable String orgShortName = "youtube";
@PathVariable String shortCode = "freeTrial";`,
  sql: `SELECT original_url
FROM url_mapping
WHERE org_short_name = 'youtube' AND short_code = 'freeTrial';`,
  multiVar: `@GetMapping("/{category}/{orgShortName}/{shortCode}")`,
  customVar: `@GetMapping("/{x}/{y}")
public void test(@PathVariable("x") String org, @PathVariable("y") String code)`,
  quiz: `@GetMapping("/{org}/{code}")
public String show(@PathVariable("org") String o, @PathVariable("code") String c) {
    return o + "-" + c;
}`,
};

const summaryTable = [
  ["Path Variables", "Parts of the URL passed dynamically"],
  ["Usage", "@PathVariable in Spring"],
  ["Example", "/{orgShortName}/{shortCode}"],
  ["Benefit", "Clean, RESTful URL handling"],
  ["Key Tip", "Match variable names exactly unless explicitly mapped"],
];

const mistakesTable = [
  [
    "Mismatch in variable name",
    "@PathVariable shortCode but URL says {short_code} (underscore vs camelCase)",
  ],
  ["Missing @PathVariable annotation", "Spring doesn’t bind the variable"],
  [
    "Forgetting to mark method as @GetMapping",
    "The method won’t respond to GET requests",
  ],
];

const tryItTasks = [
  "Create an endpoint /testOrg/testCode",
  "Extract both values as path variables",
  "Print them in the console",
  "Return a simple message",
];

const Topic6Subtopic2Content = () => {
  const [copied, setCopied] = useState({});

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

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🔗 6.3 – Path Variable Handling</h2>
      <hr />
      <div className="yellow-callout">
        <b>What Are Path Variables?</b>
        <br />
        <i>Path variables</i> are parts of a URL that act as{" "}
        <b>dynamic placeholders</b>. In the URL:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/zomato/offer50</code>
          </pre>
        </div>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>zomato</b> is the <b>organization short name</b>
          </li>
          <li>
            <b>offer50</b> is the <b>short code</b>
          </li>
        </ul>
        We need to <b>capture both</b> these values in our controller method so
        we can process and redirect accordingly.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📍 Why Use Path Variables?
      </h3>
      <ul className="topic-checklist">
        <li>
          They make your URL <b>clean and RESTful</b>
        </li>
        <li>Easy to extract and use in backend logic</li>
        <li>
          They allow <b>dynamic routing</b>, meaning you don’t have to hardcode
          every possible link
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Defining Path Variables in Spring Boot
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.controller ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.controller, "controller")}
        >
          {copied.controller ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.controller}</code>
        </pre>
      </div>
      <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
        <b>This means:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            If a user accesses{" "}
            <span className="blue-inline-code">/amazon/prime2025</span>
          </li>
          <li>
            Then: <br />
            <span className="blue-inline-code">orgShortName = "amazon"</span>
            <br />
            <span className="blue-inline-code">shortCode = "prime2025"</span>
          </li>
        </ul>
        These values are automatically injected into your method by Spring.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Real Example Breakdown
      </h3>
      <div className="blue-card-section">
        <b>URL hit:</b>
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/youtube/freeTrial</code>
          </pre>
        </div>
        <b>Inside the controller:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.realExample ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.realExample, "realExample")
            }
          >
            {copied.realExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.realExample}</code>
          </pre>
        </div>
        <b>Backend SQL:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.sql ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.sql, "sql")}
          >
            {copied.sql ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.sql}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📂 Using Multiple Path Variables
      </h3>
      <div className="blue-card-section">
        You can have <b>any number</b> of path variables. For example:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.multiVar ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.multiVar, "multiVar")}
          >
            {copied.multiVar ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.multiVar}</code>
          </pre>
        </div>
        But in our case, we <b>only need two</b>: organization and code.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✍️ Customizing Path Variable Names
      </h3>
      <div className="blue-card-section">
        By default, the variable name in the method must match the one in the
        URL pattern:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.customVar ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.customVar, "customVar")}
          >
            {copied.customVar ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.customVar}</code>
          </pre>
        </div>
        <b>
          Matching names is cleaner, but you can rename them internally if
          needed.
        </b>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚫 Common Mistakes
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Mistake</th>
            <th>Problem</th>
          </tr>
        </thead>
        <tbody>
          {mistakesTable.map(([mistake, problem], idx) => (
            <tr key={idx}>
              <td>{mistake}</td>
              <td>{problem}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Interactive Mini Quiz
      </h3>
      <div className="blue-card-section">
        <b>Q1: What will be the output of this call?</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.quiz ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.quiz, "quiz")}
          >
            {copied.quiz ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.quiz}</code>
          </pre>
        </div>
        <b>
          If the URL is{" "}
          <span className="blue-inline-code">/netflix/welcome</span>
        </b>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          <b>Answer:</b>{" "}
          <span className="blue-inline-code">netflix-welcome</span>
        </div>
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
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

export default Topic6Subtopic2Content;

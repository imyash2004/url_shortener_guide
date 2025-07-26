import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic12Subtopic5Content = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAnswers, setShowAnswers] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
  });

  const toggleAnswer = (questionKey) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionKey]: !prev[questionKey],
    }));
  };

  const qualityGateAreas = [
    [
      "🐞 Bugs",
      "Logic issues, potential crashes",
      "Eliminate all critical bugs",
    ],
    [
      "🔐 Vulnerabilities",
      "Security flaws exploitable by attackers",
      "Block any potential threats",
    ],
    [
      "🧹 Code Smells",
      "Bad design and readability problems",
      "Improve maintainability",
    ],
    ["📈 Coverage", "Untested parts of codebase", "Ensure reliable testing"],
    [
      "♻️ Duplication",
      "Copy-pasted or repeated logic",
      "Improve DRYness and clarity",
    ],
  ];

  const summaryTable = [
    ["Bugs", "Nulls, bad logic, return errors", "Refactor, test"],
    [
      "Vulnerabilities",
      "Inputs, encryption, SQL injection",
      "OWASP, Validation",
    ],
    [
      "Code Smells",
      "Long methods, poor names, unused code",
      "Refactor, design patterns",
    ],
    ["Coverage", "Untested code, edge cases", "JUnit, Mockito, JaCoCo"],
    ["Duplication", "Repeated logic", "Utility methods, DRY"],
  ];

  const developerHabits = [
    "Run Sonar locally before pushing",
    "Fix issues as you develop – not later",
    "Never commit without unit tests",
    'Prioritize "New Code" in Sonar reports',
    "Keep libraries and frameworks updated",
  ];

  const whyItMatters = [
    "Boosts developer confidence",
    "Prevents costly production bugs",
    "Keeps the codebase scalable and maintainable",
    "Ensures compliance with security standards",
    "Increases customer and stakeholder trust",
  ];

  const bugFixingTips = [
    "Check for nulls and defaults",
    "Ensure all switch cases have break",
    "Avoid ignoring return values",
    "Always close file/network resources",
    "Validate input types and boundaries",
  ];

  const vulnerabilityTips = [
    "Never trust client-side data — always validate inputs",
    "Use BCrypt or PBKDF2 for passwords",
    "Avoid hardcoded credentials in code",
    "Use parameterized queries to prevent SQL injection",
    "Keep libraries and dependencies up to date",
  ];

  const codeSmellTips = [
    "Split large functions into smaller ones",
    "Use meaningful names for variables/methods",
    "Avoid deep nesting",
    "Delete unused code or dead comments",
    "Follow SOLID principles",
  ];

  const coverageTips = [
    "Use JUnit for unit tests",
    "Use Mockito to mock services and repositories",
    "Test both positive and negative cases",
    "Cover edge cases and exception flows",
    "Avoid testing only trivial code like getters/setters",
  ];

  const duplicationTips = [
    "Extract common logic into utility methods",
    "Use abstract classes or interfaces",
    "Apply DRY and KISS principles",
    "Use Java Streams where applicable",
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="topic-content">
      <h2
        style={{
          color: "#1769aa",
          borderBottom: "3px solid #1769aa",
          paddingBottom: "10px",
        }}
      >
        🛠️ 12.5 – Improving Code Quality & Fixing Issues
      </h2>

      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          marginBottom: "1.5rem",
        }}
      >
        In this section, we'll walk through{" "}
        <b>practical and actionable techniques</b> to improve your project's
        SonarQube scores across all quality gates — including bugs,
        vulnerabilities, code smells, test coverage, and duplications.
      </p>

      <div className="yellow-callout">
        <i>
          This is not just about fixing what's broken, but about writing clean,
          secure, and future-proof code.
        </i>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>🎯 Why It Matters</h3>
      <div className="blue-card-section">
        <p>Improving your code quality:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {whyItMatters.map((benefit, index) => (
            <li key={index}>✅ {benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📊 SonarQube Quality Gate Areas
      </h3>
      <div className="blue-card-section">
        <p>We'll break down best practices by category:</p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {qualityGateAreas.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>🐞 Fixing Bugs</h3>
      <div className="blue-card-section">
        <p>
          Bugs are runtime issues like null pointer exceptions, wrong
          conditions, or forgotten return values.
        </p>

        <h4>
          <b>✅ Tips to Fix:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bugFixingTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Example:</b>
        </h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Bug Fix</span>
            <button
              className="copy-btn"
              onClick={() =>
                copyToClipboard(`// ❌ Bug: Division by zero
int result = 10 / denominator;

// ✅ Fix
if (denominator != 0) {
    int result = 10 / denominator;
}`)
              }
            >
              Copy
            </button>
          </div>
          <pre>
            {`// ❌ Bug: Division by zero
int result = 10 / denominator;

// ✅ Fix
if (denominator != 0) {
    int result = 10 / denominator;
}`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔐 Eliminating Vulnerabilities
      </h3>
      <div className="blue-card-section">
        <p>Vulnerabilities expose your app to hacking or misuse.</p>

        <h4>
          <b>✅ Tips to Fix:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {vulnerabilityTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Example:</b>
        </h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Security Fix</span>
            <button
              className="copy-btn"
              onClick={() =>
                copyToClipboard(`// ❌ Risky: SQL Injection
String query = "SELECT * FROM users WHERE email = '" + input + "'";

// ✅ Safe
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");
stmt.setString(1, input);`)
              }
            >
              Copy
            </button>
          </div>
          <pre>
            {`// ❌ Risky: SQL Injection
String query = "SELECT * FROM users WHERE email = '" + input + "'";

// ✅ Safe
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");
stmt.setString(1, input);`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧹 Cleaning Code Smells
      </h3>
      <div className="blue-card-section">
        <p>Code smells are signs of poor design, redundancy, or complexity.</p>

        <h4>
          <b>✅ Tips to Fix:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {codeSmellTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Example:</b>
        </h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Code Smell Refactor</span>
            <button
              className="copy-btn"
              onClick={() =>
                copyToClipboard(`// ❌ Smelly
public void handle() {
    if (a > b) {
        if (c > d) {
            if (e == f) {
                // logic
            }
        }
    }
}

// ✅ Refactored
public void handle() {
    if (isEligible()) {
        // logic
    }
}`)
              }
            >
              Copy
            </button>
          </div>
          <pre>
            {`// ❌ Smelly
public void handle() {
    if (a > b) {
        if (c > d) {
            if (e == f) {
                // logic
            }
        }
    }
}

// ✅ Refactored
public void handle() {
    if (isEligible()) {
        // logic
    }
}`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📈 Increasing Code Coverage
      </h3>
      <div className="blue-card-section">
        <p>Coverage shows how much of your code is actually tested.</p>

        <h4>
          <b>✅ Tips to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {coverageTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Example:</b>
        </h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Unit Test Example</span>
            <button
              className="copy-btn"
              onClick={() =>
                copyToClipboard(`@Test
void testCalculateTaxForSeniorCitizen() {
    double tax = calculator.calculateTax(75000, true);
    assertEquals(0, tax);
}`)
              }
            >
              Copy
            </button>
          </div>
          <pre>
            {`@Test
void testCalculateTaxForSeniorCitizen() {
    double tax = calculator.calculateTax(75000, true);
    assertEquals(0, tax);
}`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ♻️ Reducing Code Duplication
      </h3>
      <div className="blue-card-section">
        <p>Duplication makes your code harder to maintain and error-prone.</p>

        <h4>
          <b>✅ Tips to Refactor:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {duplicationTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Example:</b>
        </h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Duplication Refactor</span>
            <button
              className="copy-btn"
              onClick={() =>
                copyToClipboard(`// ❌ Duplicated logic
if (email == null || email.isEmpty()) {...}
if (username == null || username.isEmpty()) {...}

// ✅ Utility
ValidationUtils.requireNonEmpty(email, "Email");
ValidationUtils.requireNonEmpty(username, "Username");`)
              }
            >
              Copy
            </button>
          </div>
          <pre>
            {`// ❌ Duplicated logic
if (email == null || email.isEmpty()) {...}
if (username == null || username.isEmpty()) {...}

// ✅ Utility
ValidationUtils.requireNonEmpty(email, "Email");
ValidationUtils.requireNonEmpty(username, "Username");`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔄 Automate Fixes in CI/CD
      </h3>
      <div className="blue-card-section">
        <div className="yellow-callout">
          <b>💡 Pro Tip:</b> Automate code quality checks on every pull request:
        </div>

        <ul style={{ margin: "1rem 0 0 1.2rem" }}>
          <li>Use Sonar Maven/Gradle plugin</li>
          <li>Add GitHub Actions or GitLab CI to run sonar:analyze</li>
          <li>Block merge if quality gate fails</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Developer Habits That Help
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {developerHabits.map((habit, index) => (
            <li key={index}>{habit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧠 Discussion Questions
      </h3>
      <div className="blue-card-section">
        <div
          style={{
            color: "#d32f2f",
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          ❓ Short Answers:
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Q1: Why isn't 100% code coverage always useful?</strong>
          </div>
          <button
            onClick={() => toggleAnswer("q1")}
            style={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              border: "1px solid #1976d2",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            {showAnswers.q1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswers.q1 && (
            <div
              style={{
                backgroundColor: "#fff8e1",
                border: "none",
                borderLeft: "4px solid #ffc107",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "0 4px 4px 0",
              }}
            >
              → Because it may cover only the execution flow, not logical
              correctness. Focus on meaningful coverage.
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Q2: Why fix minor code smells?</strong>
          </div>
          <button
            onClick={() => toggleAnswer("q2")}
            style={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              border: "1px solid #1976d2",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            {showAnswers.q2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswers.q2 && (
            <div
              style={{
                backgroundColor: "#fff8e1",
                border: "none",
                borderLeft: "4px solid #ffc107",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "0 4px 4px 0",
              }}
            >
              → Over time, smells compound and create technical debt, slowing
              future development.
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Q3: What's the risk of ignoring duplication?</strong>
          </div>
          <button
            onClick={() => toggleAnswer("q3")}
            style={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              border: "1px solid #1976d2",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            {showAnswers.q3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswers.q3 && (
            <div
              style={{
                backgroundColor: "#fff8e1",
                border: "none",
                borderLeft: "4px solid #ffc107",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "0 4px 4px 0",
              }}
            >
              → Bugs fixed in one place might remain in others — and future
              changes become inconsistent.
            </div>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Q4: Can you trust auto-generated code quality?</strong>
          </div>
          <button
            onClick={() => toggleAnswer("q4")}
            style={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              border: "1px solid #1976d2",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            {showAnswers.q4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswers.q4 && (
            <div
              style={{
                backgroundColor: "#fff8e1",
                border: "none",
                borderLeft: "4px solid #ffc107",
                padding: "12px",
                marginTop: "8px",
                borderRadius: "0 4px 4px 0",
              }}
            >
              → Not always. Framework-generated code is usually fine, but your
              custom logic still needs reviews and testing.
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>🎯 Challenge:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Run a SonarQube scan on your project</li>
          <li>Identify 3 bugs, 2 vulnerabilities, and 3 code smells</li>
          <li>Write unit tests to improve code coverage</li>
          <li>Refactor any duplicate logic</li>
          <li>Rerun Sonar and compare scores</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>📘 Summary Table</h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Problem Type</th>
            <th>What to Fix</th>
            <th>Tool or Practice</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, index) => (
            <tr key={index}>
              <td>
                <b>{row[0]}</b>
              </td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic12Subtopic5Content;

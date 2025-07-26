import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic12Subtopic4Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);

  const bugExamples = [
    "Dereferencing a possibly null pointer",
    "Using an uninitialized variable",
    "Infinite loop or unreachable code",
  ];

  const vulnerabilityExamples = [
    "Using outdated cryptographic algorithms",
    "SQL injection risks",
    "Not sanitizing user inputs in a REST controller",
  ];

  const codeSmellExamples = [
    "Large methods with too many lines",
    "Deeply nested logic or loops",
    "Duplicated blocks of code",
    "Unused variables or classes",
  ];

  const duplicationExamples = [
    "Copy-paste of the same logic across classes",
    "Repeating the same if-else structures",
  ];

  const maintainabilityRatings = [
    ["A", "Low technical debt"],
    ["B", "Minor technical debt"],
    ["C", "Moderate technical debt"],
    ["D", "High technical debt"],
    ["E", "Very hard to maintain"],
  ];

  const reliabilityRatings = [
    ["A", "0 bugs"],
    ["B", "At least 1 minor bug"],
    ["C", "At least 1 major bug"],
    ["D", "At least 1 critical bug"],
    ["E", "At least 1 blocker bug"],
  ];

  const securityRatings = [
    ["A", "0 vulnerabilities"],
    ["B", "At least 1 minor vulnerability"],
    ["C", "At least 1 major vulnerability"],
    ["D", "At least 1 critical vulnerability"],
    ["E", "At least 1 blocker vulnerability"],
  ];

  const summaryTable = [
    ["Bugs", "Logic errors in code", "Affects correctness"],
    ["Vulnerabilities", "Security flaws", "Risk of exploit and data breach"],
    ["Code Smells", "Maintainability issues", "Adds to technical debt"],
    ["Coverage", "% code tested", "Helps catch bugs early"],
    ["Duplications", "Repeated code", "Harder to maintain and refactor"],
    [
      "Technical Debt",
      "Time to fix quality issues",
      "Measures long-term health",
    ],
    [
      "Ratings (A-E)",
      "Quick indicator of code quality",
      "Useful for monitoring improvements",
    ],
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        📊 12.4 – Understanding SonarQube Metrics
      </h2>
      <hr />

      <div className="yellow-callout">
        SonarQube is not just a tool that scans your code for bugs — it's a{" "}
        <b>complete code quality platform</b>. To make the most of it,
        developers and teams must understand the <i>metrics</i> it provides.
        These metrics offer a window into your code's <b>reliability</b>,{" "}
        <b>maintainability</b>, <b>security</b>, <b>coverage</b>, and{" "}
        <b>overall health</b>.
      </div>

      <p>
        This section will explore <b>every major metric category</b> reported by
        SonarQube — explaining <b>what it means</b>, <b>how it's calculated</b>,{" "}
        <b>why it matters</b>, and <b>how to improve it</b>.
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔹 1. Bugs</h3>
      <div className="blue-card-section">
        <h4>
          <b>📘 What Are Bugs?</b>
        </h4>
        <p>
          In SonarQube, a <b>Bug</b> is defined as code that is{" "}
          <b>either broken or incorrect</b> and{" "}
          <b>will behave incorrectly at runtime</b>.
        </p>

        <div className="yellow-callout">
          <i>
            "A bug is a coding mistake likely to produce an error or unexpected
            behavior in your application."
          </i>
        </div>

        <h4>
          <b>🔍 Examples:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bugExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          Bugs affect the <b>correctness and stability</b> of your application.
          They're high-priority issues that must be fixed before production.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Use proper unit testing and null checks</li>
          <li>Leverage compiler warnings and SonarQube suggestions</li>
          <li>
            Review bug-prone areas like conditionals, loops, and exception
            handling
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 2. Vulnerabilities
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>🔐 What Are Vulnerabilities?</b>
        </h4>
        <p>
          Vulnerabilities are <b>security-related weaknesses</b> that could be
          exploited by attackers.
        </p>

        <div className="yellow-callout">
          <i>
            "A vulnerability is a point in your application where security is
            weak or compromised."
          </i>
        </div>

        <h4>
          <b>🔍 Examples:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {vulnerabilityExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          Leaving vulnerabilities unpatched can expose your system to{" "}
          <b>data breaches</b>, <b>hacks</b>, or <b>malicious access</b>.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Follow OWASP security guidelines</li>
          <li>Use strong authentication and input validation</li>
          <li>Keep dependencies updated</li>
          <li>Integrate security testing tools with your CI/CD pipeline</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 3. Code Smells
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>🧹 What Are Code Smells?</b>
        </h4>
        <p>
          Code smells are <b>maintainability issues</b> — patterns that might
          not break your app, but make your code harder to read, test, or
          extend.
        </p>

        <div className="yellow-callout">
          <i>
            "A code smell is a design flaw that indicates the code needs to be
            cleaned up."
          </i>
        </div>

        <h4>
          <b>🔍 Examples:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {codeSmellExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          Over time, code smells lead to <b>technical debt</b>. They slow down
          new development and make bugs more likely.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Refactor regularly (e.g., Extract Method, Remove Duplication)</li>
          <li>Follow SOLID principles</li>
          <li>Keep methods short and cohesive</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔹 4. Coverage</h3>
      <div className="blue-card-section">
        <h4>
          <b>🧪 What Is Code Coverage?</b>
        </h4>
        <p>
          Coverage measures <b>how much of your code is tested</b> by automated
          tests. It's shown as a percentage:{" "}
          <b>Coverage = (Lines Covered) / (Total Lines) × 100</b>
        </p>

        <div className="yellow-callout">
          <i>
            "High coverage doesn't guarantee quality, but low coverage
            definitely exposes risk."
          </i>
        </div>

        <h4>
          <b>🎯 Coverage Goals:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>80%+</b> for mission-critical applications
          </li>
          <li>
            <b>70%+</b> for standard business logic
          </li>
          <li>
            <b>50%+</b> minimum for any production code
          </li>
        </ul>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          Tests catch bugs early and give confidence when refactoring. Uncovered
          code is essentially <b>"untested in production"</b>.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Add unit tests for business logic</li>
          <li>Focus on edge cases and error handling</li>
          <li>Use integration tests for workflows</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 5. Duplications
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>♻️ What Is Duplication?</b>
        </h4>
        <p>
          Duplicated code is when the <b>same or very similar code blocks</b>{" "}
          appear multiple times in your codebase.
        </p>

        <div className="yellow-callout">
          <i>"Duplication = % of code blocks that are repeated elsewhere"</i>
        </div>

        <h4>
          <b>🔍 Examples:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {duplicationExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          Duplication increases <b>maintenance cost</b>. If you fix a bug in one
          place, you must find and fix it everywhere else it appears.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Use reusable functions or classes</li>
          <li>Apply DRY (Don't Repeat Yourself) principle</li>
          <li>Use design patterns like Template Method or Strategy</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 6. Maintainability Rating
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>📚 What Is Maintainability Rating?</b>
        </h4>
        <p>
          SonarQube assigns a grade (A to E) to reflect how{" "}
          <b>easy it is to maintain</b> your code.
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {maintainabilityRatings.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="yellow-callout">
          <i>
            "Maintainability = Based on number of code smells and estimated
            remediation time"
          </i>
        </div>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          High maintainability ensures your team can add new features or fix
          issues <b>quickly and safely</b>.
        </p>

        <h4>
          <b>🛠 How to Improve:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Refactor smelly code</li>
          <li>Reduce complexity in methods and classes</li>
          <li>Address SonarQube's "code smell" issues</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 7. Reliability Rating
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>🛡️ What Is Reliability Rating?</b>
        </h4>
        <p>
          This rating is based on the number and severity of <b>bugs</b>. It
          follows a letter grading system:
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {reliabilityRatings.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="yellow-callout">
          <i>
            "Reliability = Likelihood that your application runs without
            crashing or malfunctioning"
          </i>
        </div>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          A poor reliability rating means users may{" "}
          <b>encounter crashes, errors, or wrong results</b>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 8. Security Rating
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>🔒 What Is Security Rating?</b>
        </h4>
        <p>
          Similar to reliability, this metric reflects how many{" "}
          <b>vulnerabilities</b> exist in the code:
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {securityRatings.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="yellow-callout">
          <i>
            "Security = Risk of your application being exploited by attackers"
          </i>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔹 9. Technical Debt
      </h3>
      <div className="blue-card-section">
        <h4>
          <b>🧾 What Is Technical Debt?</b>
        </h4>
        <p>
          Technical debt estimates{" "}
          <b>how long it would take to fix all code issues</b> reported by
          SonarQube (bugs, smells, duplication, etc.)
        </p>

        <div className="yellow-callout">
          <i>
            "Technical Debt = Estimated time (in minutes/hours/days) to improve
            code quality"
          </i>
        </div>

        <h4>
          <b>✅ Why It Matters?</b>
        </h4>
        <p>
          This metric gives teams a <b>quantitative sense of code health</b> and
          helps prioritize refactoring.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>🚀 Task:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Analyze your project on SonarQube</li>
          <li>
            <b>Explore each metric:</b>
            <ul style={{ margin: "0.3rem 0 0 1.2rem" }}>
              <li>Bugs</li>
              <li>Vulnerabilities</li>
              <li>Code Smells</li>
              <li>Duplications</li>
              <li>Coverage</li>
            </ul>
          </li>
          <li>Improve one category (e.g., fix a few code smells)</li>
          <li>Re-run the analysis and note the improvement in scores</li>
        </ul>

        <div className="yellow-callout">
          <b>💡 Challenge:</b> Try to achieve an 'A' rating in at least one
          category!
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Discussion & Q&A
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <button
            style={{
              background: "#2196f3",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setDiscussionVisible(!discussionVisible)}
          >
            {discussionVisible ? "Hide" : "Show"} Answers
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <b>Q1: Why are code smells not treated as bugs?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Because code smells don't cause immediate
                failures. However, they hint at poor design and can lead to bugs
                if left unaddressed.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q2: What's the difference between a bug and a vulnerability in
              SonarQube?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> A <b>bug</b> affects application logic or
                functionality. A <b>vulnerability</b> exposes security flaws
                that could be exploited.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: How does technical debt affect team velocity?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> The more technical debt, the harder and slower it
                is to add new features. Developers spend time managing messy
                code instead of delivering value.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Can a project with 100% code coverage still be buggy?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Yes! Coverage means lines are <i>executed</i>,
                not necessarily that logic is <i>validated</i>. You need
                meaningful assertions and test cases, not just coverage.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Meaning</th>
            <th>Importance</th>
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
}

export default Topic12Subtopic4Content;

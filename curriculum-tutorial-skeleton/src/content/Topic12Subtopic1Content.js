import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic12Subtopic1Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);

  const qualityBenefits = [
    [
      "Easy to read",
      "Self-documenting code that new team members can understand",
    ],
    ["Safe to change", "Modifications don't break existing functionality"],
    ["Robust under pressure", "Handles edge cases and high load gracefully"],
    ["Efficient to run", "Optimized performance without unnecessary overhead"],
    ["Secure by design", "Built-in protection against common vulnerabilities"],
  ];

  const sonarQubeMetrics = [
    ["🐞 Bugs", "Logic errors that could cause crashes or incorrect behavior"],
    [
      "🔒 Vulnerabilities",
      "Security flaws like hardcoded passwords, SQL injection risks",
    ],
    [
      "🧼 Code Smells",
      "Maintainability issues like huge methods, duplicate blocks",
    ],
    ["🧪 Test Coverage", "Percentage of code tested by unit/integration tests"],
    ["♻️ Duplications", "Amount of copy-pasted code in your project"],
    ["⏳ Technical Debt", "Time estimate to fix all code quality issues"],
  ];

  const sonarQubeBenefits = [
    ["🚨 Early Bug Detection", "Catch logic flaws before code goes live"],
    ["🔐 Secure Code", "Find vulnerabilities before attackers do"],
    ["📈 Better Collaboration", "Common coding standards across teams"],
    [
      "📊 Insights for Managers",
      "Dashboards to track technical debt & team health",
    ],
    [
      "✅ Confidence in Releases",
      "Know that your code meets quality benchmarks",
    ],
  ];

  const summaryTable = [
    ["Code Quality", "Foundation of scalable, maintainable software"],
    ["SonarQube", "Tool for analyzing code health and risks"],
    ["Bugs & Smells", "Issues that hurt reliability and clarity"],
    ["Coverage", "Confidence your code works as expected"],
    ["Technical Debt", "Time cost of ignoring code issues today"],
  ];

  const poorQualitySymptoms = [
    "Is hard to understand without someone explaining it",
    "Has long functions doing too many things",
    "Is full of duplicated logic",
    "Lacks proper error handling",
    "Has little or no tests",
  ];

  const sonarQubeIssues = [
    "Code smells (bad design patterns)",
    "Bugs (like null pointer risks)",
    "Vulnerabilities (security gaps)",
    "Duplicates (copy-paste everywhere)",
    "Poor test coverage",
  ];

  const sonarQubeProcess = [
    ["Static Analysis", "Scans your code without running it"],
    ["Rule Engine", "Applies language-specific rules and quality profiles"],
    [
      "Report Generation",
      "Produces dashboards with grades (A-F), metrics, and detailed issues",
    ],
    [
      "Quality Gate Evaluation",
      "Fails your pipeline if your code violates thresholds (e.g., < 80% coverage)",
    ],
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🔍 12.1 – Introduction to Code Quality & SonarQube
      </h2>
      <hr />

      <div className="yellow-callout">
        Welcome to one of the most crucial but often underestimated pillars of
        software development — <b>code quality</b>. Whether you're building a
        small personal project or a large-scale enterprise application, how your
        code is written, organized, and maintained directly affects its
        long-term success.
      </div>

      <p>
        In this section, we'll explore the what, why, and how of code quality
        and introduce a powerful tool called{" "}
        <span className="blue-inline-code">SonarQube</span>, which helps you
        keep your codebase healthy, clean, and production-ready — at all times.
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📌 What is Code Quality?
      </h3>
      <div className="blue-card-section">
        <p>Code Quality is the practice of writing code that is:</p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Quality Aspect</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {qualityBenefits.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: "1rem" }}>
          Good code quality is like good architecture — it doesn't just make
          things look nice, it makes them work well, last longer, and be easier
          to improve over time. It's what separates quick hacks from
          professional software engineering.
        </p>

        <div className="yellow-callout">
          <b>💡 Analogy:</b> Just as a well-built bridge is designed to handle
          stress, traffic, and time — a high-quality codebase should be built to
          withstand change, scaling, and multiple developers working on it.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚠️ Common Symptoms of Poor Code Quality
      </h3>
      <div className="blue-card-section">
        <p>
          Let's face it — we've all seen codebases that look like spaghetti 🍝.
          If your code:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {poorQualitySymptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          ...then chances are, your code quality needs serious attention. These
          issues don't just slow you down — they introduce bugs, increase costs,
          frustrate teams, and lead to outages in production.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔥 Why Code Quality Matters
      </h3>
      <div className="blue-card-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <div
            style={{
              padding: "1rem",
              border: "2px solid #f44336",
              borderRadius: "8px",
              background: "#ffebee",
            }}
          >
            <h4 style={{ color: "#d32f2f", margin: "0 0 0.5rem 0" }}>
              😰 Poor Quality Reality
            </h4>
            <p>Imagine working on a team where:</p>
            <ul>
              <li>You're scared to make changes</li>
              <li>You don't know which part of the code breaks what</li>
              <li>You keep fixing the same bug in multiple places</li>
              <li>
                Your review cycles are endless because the code isn't readable
              </li>
            </ul>
          </div>

          <div
            style={{
              padding: "1rem",
              border: "2px solid #4caf50",
              borderRadius: "8px",
              background: "#e8f5e8",
            }}
          >
            <h4 style={{ color: "#388e3c", margin: "0 0 0.5rem 0" }}>
              ✨ High Quality Benefits
            </h4>
            <p>Now flip that. Imagine:</p>
            <ul>
              <li>✅ Writing tests gives you confidence</li>
              <li>✅ Code reviewers understand your logic in seconds</li>
              <li>✅ Bugs are rare because edge cases are already handled</li>
              <li>✅ New teammates onboard quickly</li>
            </ul>
          </div>
        </div>

        <div className="yellow-callout">
          That's the power of investing in quality early on. And that's what
          SonarQube helps you track and improve.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ What is SonarQube?
      </h3>
      <div className="blue-card-section">
        <p>
          SonarQube is an open-source platform that analyzes your source code,
          finds problems, and provides clear, actionable feedback. It helps
          development teams ensure code:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Follows best practices</li>
          <li>Has no major bugs or vulnerabilities</li>
          <li>Is covered by tests</li>
          <li>Has low technical debt</li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          It works by scanning your code statically (without running it) and
          reporting issues like:
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {sonarQubeIssues.map((issue, index) => (
            <li key={index}>
              <b>{issue}</b>
            </li>
          ))}
        </ul>

        <div className="yellow-callout">
          <b>🧠 Think of it like:</b> A smart reviewer that never sleeps —
          constantly checking your code behind the scenes. 💻
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧮 What SonarQube Tracks (Key Metrics)
      </h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>What It Means</th>
            </tr>
          </thead>
          <tbody>
            {sonarQubeMetrics.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: "1rem" }}>
          Each of these tells a story about your code health, and over time,
          SonarQube helps you maintain a high standard with quality gates
          (pass/fail rules).
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💼 Real-World Developer Scenario
      </h3>
      <div className="blue-card-section">
        <p>
          <b>🚀 Phase 1 - Fast Development:</b>
        </p>
        <p>
          You're working on a Spring Boot backend for a startup. You're writing
          fast — pushing code, shipping features. It all works, but behind the
          scenes:
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Some methods are 100+ lines long</li>
          <li>You've repeated the same error handler in five classes</li>
          <li>You've skipped unit testing on new APIs</li>
          <li>You hardcoded a secret token for a quick test</li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>💥 Phase 2 - Reality Check (Two months later):</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem", color: "#d32f2f" }}>
          <li>
            A junior developer makes a change and unknowingly breaks the flow
          </li>
          <li>An API leaks sensitive info due to weak validation</li>
          <li>Refactoring becomes a nightmare</li>
        </ul>

        <div className="yellow-callout">
          <b>✅ With SonarQube:</b> Integrated into your CI/CD or IDE, you'd
          catch these issues instantly — before they make it to production.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧰 How SonarQube Works
      </h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sonarQubeProcess.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>
                    {index + 1}. {row[0]}
                  </b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: "1rem" }}>
          It supports over 30 programming languages, integrates with Maven,
          Gradle, Docker, and works with GitHub Actions, Jenkins, etc.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔑 Key Benefits of Using SonarQube
      </h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Benefit</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sonarQubeBenefits.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>{row[0]}</b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>📝 Task:</b>
        </p>
        <p>Pick any module from your Spring Boot project.</p>

        <p style={{ marginTop: "1rem" }}>
          <b>🔍 Identify:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>One potential bug</li>
          <li>One duplicated logic</li>
          <li>One untested service method</li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          Note how these could be caught or flagged by SonarQube.
        </p>

        <div className="yellow-callout">
          <b>💡 Bonus:</b> Think of how low-quality code might impact your next
          teammate.
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
            <b>
              Q1: What's the difference between code quality and code
              functionality?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Code functionality is about whether your code
                works correctly right now. Code quality is about how well your
                code is designed, structured, and maintained for the long term.
                Functional code might work today but be impossible to modify
                safely tomorrow if quality is poor.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: Is SonarQube only for large enterprise teams?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Not at all! SonarQube offers a free Community
                Edition that's perfect for small teams and personal projects.
                Even solo developers benefit from automated code quality checks
                and learning best practices.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: How does SonarQube differ from IDE warnings?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> IDE warnings focus on syntax errors and basic
                issues. SonarQube provides deeper analysis including security
                vulnerabilities, code smells, technical debt calculation, test
                coverage tracking, and language-specific best practices.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Can SonarQube replace code reviews?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> SonarQube complements but doesn't replace code
                reviews. It catches technical issues automatically, allowing
                reviewers to focus on business logic, architecture decisions,
                and overall design rather than syntax problems.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, index) => (
            <tr key={index}>
              <td>
                <b>{row[0]}</b>
              </td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic12Subtopic1Content;

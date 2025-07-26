import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic12Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);

  const summaryTable = [
    ["SonarQube", "Tool for measuring code quality"],
    ["Coverage", "% of code tested by unit tests"],
    ["Code Smells", "Poor design or style choices"],
    ["Bugs & Vulnerabilities", "Potentially broken or insecure code"],
    ["Technical Debt", "Estimated effort to fix quality issues"],
  ];

  const goalsTable = [
    ["🎯 Install SonarQube", "Set up SonarQube locally using Docker"],
    [
      "🔌 Integrate It with Spring Boot",
      "Connect your project with SonarScanner",
    ],
    [
      "📈 Run Code Analysis",
      "Get a full health report: coverage %, bugs, smells",
    ],
    ["🛠️ Fix Issues", "Act on feedback to improve your codebase"],
    ["🧪 Track Code Coverage", "See what % of your code is covered by tests"],
  ];

  const toolsList = [
    "SonarQube – the core analysis platform",
    "SonarScanner CLI or Maven plugin",
    "Jacoco – for generating test coverage reports",
    "Docker – to run SonarQube locally",
    "(Optional) SonarCloud – cloud-based version with GitHub integration",
  ];

  const learningOutcomes = [
    'Understand what makes code "good quality"',
    "Be able to run full SonarQube scans on your code",
    "Improve test coverage and track it visually",
    "Know how to fix, suppress, or manage flagged issues",
    "Integrate SonarQube into your team workflow",
  ];

  const sectionBreakdown = [
    {
      number: "12.1.",
      title: "Introduction to Code Quality & SonarQube",
      description:
        "Concepts of code health, technical debt, and static analysis",
    },
    {
      number: "12.2.",
      title: "Setting Up SonarQube Locally with Docker",
      description:
        "Launch SonarQube with one Docker command & access the dashboard",
    },
    {
      number: "12.3.",
      title: "Integrating SonarQube with Spring Boot",
      description: "Install scanner and generate reports",
    },
    {
      number: "12.4.",
      title: "Understanding SonarQube Metrics",
      description: "What coverage %, smells, bugs, and duplication mean",
    },
    {
      number: "12.5.",
      title: "Improving Code Quality & Fixing Issues",
      description: "Clean up code and build healthy habits",
    },
  ];

  const poorQualityIssues = [
    "Increases maintenance cost",
    "Slows down new features",
    "Introduces hidden bugs and vulnerabilities",
    "Makes onboarding harder for new devs",
    'Often leads to burnout due to "spaghetti code"',
  ];

  const sonarQubeFeatures = [
    "Static code analysis: without running your app",
    "Coverage reports: how much of your code is tested",
    "Bug & vulnerability detection",
    "Code smell detection: bad design or poor coding practices",
    "Technical debt estimation: how long it'll take to fix issues",
  ];

  const fitnessTrackerAnalogy = [
    "Where it's weak (low coverage)",
    "Where you're over-exerting (duplicated code)",
    "What needs rehab (technical debt)",
    "Whether it's healthy enough for production 🚀",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🚀 Section 12: Code Coverage & Quality Tools
      </h2>
      <hr />

      <div className="yellow-callout">
        In this section, we'll take your Spring Boot application to the next
        level by introducing tools that{" "}
        <b>analyze, measure, and ensure code health</b> — just like how doctors
        check a patient's vitals.
        <p style={{ marginTop: "1rem" }}>
          Our hero for this section? <b>SonarQube</b>. 🛡️
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Why Does Code Quality Matter?
      </h3>
      <div className="blue-card-section">
        <p>
          Even if your application is working fine today,{" "}
          <b>poor quality code</b>:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {poorQualityIssues.map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          This is where <b>SonarQube</b> steps in like a senior developer who
          reviews every single line of your code, flags issues, suggests
          improvements, and gives you visibility into how good (or bad) your
          codebase is.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔬 What Is SonarQube?
      </h3>
      <div className="blue-card-section">
        <p>
          SonarQube is an{" "}
          <b>open-source platform for continuous inspection of code quality</b>.
          It performs:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {sonarQubeFeatures.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📊 What Will You Learn in This Section?
      </h3>
      <div className="blue-card-section">
        <p>
          <b>You'll learn to:</b>
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {goalsTable.map(([goal, description], idx) => (
              <tr key={idx}>
                <td>
                  <b>{goal}</b>
                </td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧱 Tools Used</h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {toolsList.map((tool, idx) => (
            <li key={idx}>{tool}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Real-World Analogy
      </h3>
      <div className="blue-card-section">
        <p>
          Think of <b>SonarQube like a fitness tracker for your codebase</b>. It
          doesn't just say "the app runs" — it tells you:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {fitnessTrackerAnalogy.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎓 Learning Outcomes
      </h3>
      <div className="blue-card-section">
        <p>
          <b>By the end of this section, you'll:</b>
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {learningOutcomes.map((outcome, idx) => (
            <li key={idx}>✅ {outcome}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 What's Next?</h3>
      <div className="blue-card-section">
        <p>
          <b>Here's a breakdown of what we'll cover:</b>
        </p>

        <div style={{ marginTop: "1rem" }}>
          {sectionBreakdown.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <h4 style={{ color: "#1769aa", marginBottom: "0.3rem" }}>
                {section.number} {section.title}
              </h4>
              <p style={{ marginLeft: "1rem", color: "#666" }}>
                → {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>Task:</b> By the end of this section, try generating a code
          coverage report and reduce your "code smells" by 30%. 🧼
        </p>

        <p style={{ marginTop: "1rem" }}>
          <b>Bonus:</b> Create a custom "Quality Gate" that enforces 80%+ test
          coverage.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([term, meaning], idx) => (
            <tr key={idx}>
              <td>
                <b>{term}</b>
              </td>
              <td>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic12Content;

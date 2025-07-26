import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);

  const whatToTestData = [
    ["🔗 URL shortening logic", "unit test"],
    ["🔐 Login and registration APIs", "controller + integration test"],
    ["📊 Analytics endpoints", "integration test"],
    ["🧠 Validation and exception handling", "unit + controller test"],
    ["📦 Security filters and JWT validation", "mocked in controller test"],
    ["⚙️ Configuration", "checking if correct beans are loaded"],
  ];

  const summaryTable = [
    ["Unit Testing", "Verify isolated business logic (fast, focused)"],
    [
      "Integration Testing",
      "Test how your real app components behave together",
    ],
    ["Controller Testing", "Simulate HTTP requests/responses using MockMvc"],
    ["Test Configuration", "Keep tests clean, isolated, and reproducible"],
    [
      "Code Coverage Tools",
      "Show what's tested, what's not — and improve overall quality",
    ],
  ];

  const practiceTasksList = [
    "Write a unit test for your short code generator or JWT token provider using @Mock and @InjectMocks",
    "Use @SpringBootTest and H2 database to test your UrlController + UrlService + Repository end-to-end",
    "Create a MockMvc test for your login endpoint and validate different request scenarios (valid login, wrong password, missing fields)",
    "Add Jacoco plugin to your Maven pom.xml and generate an HTML coverage report",
    'Use a separate application-test.yml for test configs and activate it with @ActiveProfiles("test")',
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🧪 Section 11 – Testing & Quality (Full Overview)
      </h2>
      <hr />

      <div className="yellow-callout">
        You've built a robust and feature-rich URL shortener system — it
        shortens links, authenticates users, handles redirection, tracks
        analytics, and manages organizations. But how do you ensure{" "}
        <b>it continues to work correctly over time</b>? How do you{" "}
        <b>catch errors before users do</b> and feel confident deploying your
        code to production?
        <br />
        <br />
        This is where <b>automated testing and quality assurance</b> come in —
        they're <b>non-negotiable</b> in modern backend development.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Why Is Testing So Important?
      </h3>
      <div className="blue-card-section">
        <b>
          Testing isn't just about checking if your code "works." It's about
          verifying:
        </b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            That it <b>works correctly under different conditions</b>
          </li>
          <li>
            That it <b>still works when changes are made</b>
          </li>
          <li>
            That you can <b>refactor, extend, or debug</b> without fear of
            breaking something
          </li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          Think of testing like a <b>safety net</b>. Whether you're pushing a
          small change or releasing a major feature, tests help you move fast
          without losing stability.
        </p>

        <b>In the real world, testing:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Helps catch <b>bugs before production</b>
          </li>
          <li>
            Prevents <b>breaking existing features</b> after code changes
          </li>
          <li>
            Makes you <b>more confident</b> when deploying
          </li>
          <li>
            Serves as <b>living documentation</b> for how your system behaves
          </li>
          <li>
            Improves <b>developer productivity and code maintainability</b>
          </li>
        </ul>

        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          If your project is a rocket, <b>testing is your mission control</b> —
          it makes launches safer, faster, and smarter. 🚀
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 What Does This Section Include?
      </h3>
      <div className="blue-card-section">
        <p>
          This section focuses on writing meaningful and structured tests for
          all core parts of your backend system. Here's the optimized breakdown:
        </p>

        <div style={{ marginTop: "1rem" }}>
          <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
            ✅ 11.1. Unit Testing with JUnit & Mockito
          </h4>
          <p style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            We'll start with unit testing — testing small units of logic in
            isolation. This is where you test individual methods like the one
            that generates a short code, encrypts a password, or calculates
            total hits. You'll learn how to use <b>JUnit 5</b> and{" "}
            <b>Mockito</b> to mock dependencies and verify expected outcomes.
          </p>

          <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
            ✅ 11.2. Integration Testing with @SpringBootTest
          </h4>
          <p style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            Here, we'll test how multiple parts of your app work together — like
            your controller, service, and database. You'll load the Spring Boot
            application context and test real interactions with in-memory
            databases like <b>H2</b>, making it feel like the real application
            is running.
          </p>

          <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
            ✅ 11.3. Controller Layer Testing with MockMvc
          </h4>
          <p style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            We'll simulate actual HTTP requests using <b>MockMvc</b>. This
            allows you to test your API endpoints as if they were called by a
            frontend, validating things like response status codes, JSON
            structure, and error messages — without needing to run the full app.
          </p>

          <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
            ✅ 11.4. Test Configuration & Setup
          </h4>
          <p style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            Here, we'll look at how to properly configure your test environment.
            You'll use separate profiles like{" "}
            <span className="blue-inline-code">test</span>, mock sensitive
            dependencies (e.g., email services or JWT filters), and load
            test-specific application properties. This is crucial for test{" "}
            <b>isolation</b> and <b>repeatability</b>.
          </p>

          <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
            ✅ 11.5. Code Coverage & Quality Tools
          </h4>
          <p style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
            Finally, we'll integrate tools like <b>Jacoco</b> to measure how
            much of your code is covered by tests. You'll learn how to generate{" "}
            <b>HTML coverage reports</b>, view untested code paths, and set{" "}
            <b>coverage thresholds</b> to keep your codebase healthy and
            production-ready.
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 What Parts of Your App Should Be Tested?
      </h3>
      <div className="blue-card-section">
        <b>In this project, you'll benefit most from testing:</b>
        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Test Type</th>
            </tr>
          </thead>
          <tbody>
            {whatToTestData.map(([component, testType], idx) => (
              <tr key={idx}>
                <td>{component}</td>
                <td>
                  <span className="blue-inline-code">{testType}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>❓ Quick Review Questions:</b>
          <button
            style={{
              marginLeft: "1rem",
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
              backgroundColor: "#1769aa",
              color: "white",
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
              Q1: What's the difference between unit and integration testing?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Unit tests target a single method/class in
                isolation. Integration tests check how multiple components work
                together in a real Spring context.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: Why use MockMvc for controller testing?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> MockMvc allows you to simulate HTTP requests to
                your API and verify status codes, headers, and responses —
                without starting a real server.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: How does Jacoco help?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Jacoco tracks which lines/methods are tested and
                generates coverage reports to improve overall test quality.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Why do we use test profiles?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To avoid polluting real databases or sending
                emails during tests, and to use mock/test configurations safely.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🛠️ Practice Tasks:</b>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {practiceTasksList.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([area, description], idx) => (
            <tr key={idx}>
              <td>
                <b>{area}</b>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic11Content;

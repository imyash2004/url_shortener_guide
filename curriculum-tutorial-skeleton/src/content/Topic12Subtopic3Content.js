import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic12Subtopic3Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [key]: true });
      setTimeout(() => setCopied({ ...copied, [key]: false }), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const codeBlocks = {
    mavenPlugin: `<build>
    <plugins>
        <!-- SonarQube plugin -->
        <plugin>
            <groupId>org.sonarsource.scanner.maven</groupId>
            <artifactId>sonar-maven-plugin</artifactId>
            <version>3.9.1.2184</version>
        </plugin>
    </plugins>
</build>`,
    gradlePlugin: `plugins {
    id "org.sonarqube" version "4.3.0.3225"
}`,
    sonarProperties: `sonar.projectKey=my-springboot-app
sonar.host.url=http://localhost:9000
sonar.login=your_authentication_token_here
sonar.java.binaries=target/classes
sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.test.binaries=target/test-classes
sonar.junit.reportPaths=target/surefire-reports
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml`,
    mavenCommand: `mvn clean verify sonar:sonar \\
  -Dsonar.projectKey=my-springboot-app \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.login=your_authentication_token_here`,
    gradleCommand: `./gradlew sonarqube \\
  -Dsonar.projectKey=my-springboot-app \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.login=your_authentication_token_here`,
  };

  const whyIntegrate = [
    ["Early Detection", "Find issues early before deployment"],
    ["Quality Gates", "Enforce quality standards automatically"],
    ["Team Collaboration", "Share consistent feedback on code health"],
    ["Continuous Improvement", "Monitor trends and progress over time"],
  ];

  const prerequisites = [
    "Have SonarQube server installed and running (local or cloud)",
    "Have the SonarQube project key and authentication token ready",
    "Ensure your Spring Boot project uses a build tool such as Maven or Gradle",
  ];

  const dashboardMetrics = [
    "Bugs, Vulnerabilities, and Code Smells",
    "Code Coverage and Duplications",
    "Complexity and Documentation",
    "Test Execution and Results",
  ];

  const summaryTable = [
    ["SonarQube plugin", "Integrates scanning into build process"],
    ["sonar-project.properties", "Configures analysis parameters"],
    ["Authentication token", "Secures communication with SonarQube"],
    ["Build integration", "Enables continuous quality checks"],
    ["Dashboard", "Visualizes code health and trends"],
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🔗 12.3 – Integrating SonarQube with Your Spring Boot Project
      </h2>
      <hr />

      <div className="yellow-callout">
        Integrating SonarQube into your Spring Boot project is essential for
        continuous code quality monitoring. It helps you identify bugs,
        vulnerabilities, code smells, and maintainability issues as part of your
        development lifecycle.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Integrate SonarQube?
      </h3>
      <div className="blue-card-section">
        <p>
          SonarQube works best when it's part of your automated build and
          deployment pipeline. By integrating SonarQube:
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Benefit</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {whyIntegrate.map((row, index) => (
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
        🛠️ Prerequisites
      </h3>
      <div className="blue-card-section">
        <p>Before integration:</p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {prerequisites.map((prereq, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              {prereq}
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Step 1: Add SonarQube Plugin to Your Build Tool
      </h3>
      <div className="blue-card-section">
        <p>
          <b>For Maven</b>, add the SonarQube plugin to your{" "}
          <span className="blue-inline-code">pom.xml</span>:
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.mavenPlugin ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.mavenPlugin, "mavenPlugin")
            }
          >
            {copied.mavenPlugin ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.mavenPlugin}</code>
          </pre>
        </div>

        <p>
          <b>For Gradle</b>, add the plugin in{" "}
          <span className="blue-inline-code">build.gradle</span>:
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.gradlePlugin ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.gradlePlugin, "gradlePlugin")
            }
          >
            {copied.gradlePlugin ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.gradlePlugin}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Step 2: Configure SonarQube Properties
      </h3>
      <div className="blue-card-section">
        <p>
          Create a{" "}
          <span className="blue-inline-code">sonar-project.properties</span>{" "}
          file at your project root or configure properties in the{" "}
          <span className="blue-inline-code">pom.xml</span>/
          <span className="blue-inline-code">build.gradle</span> file.
        </p>

        <p>
          <b>Example sonar-project.properties:</b>
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.sonarProperties ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.sonarProperties, "sonarProperties")
            }
          >
            {copied.sonarProperties ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.sonarProperties}</code>
          </pre>
        </div>

        <div className="yellow-callout">
          <b>💡 Key Configuration Points:</b>
          <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
            <li>
              <b>sonar.projectKey:</b> Unique identifier for your project
            </li>
            <li>
              <b>sonar.host.url:</b> Your SonarQube server URL
            </li>
            <li>
              <b>sonar.login:</b> Authentication token for secure access
            </li>
            <li>
              <b>sonar.sources:</b> Location of your source code
            </li>
            <li>
              <b>sonar.tests:</b> Location of your test files
            </li>
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Step 3: Run SonarQube Analysis
      </h3>
      <div className="blue-card-section">
        <p>Run the analysis command from your project root:</p>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Maven:</b>
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.mavenCommand ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.mavenCommand, "mavenCommand")
            }
          >
            {copied.mavenCommand ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.mavenCommand}</code>
          </pre>
        </div>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Gradle:</b>
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.gradleCommand ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.gradleCommand, "gradleCommand")
            }
          >
            {copied.gradleCommand ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.gradleCommand}</code>
          </pre>
        </div>

        <div className="yellow-callout">
          <b>⚡ Pro Tip:</b> You can also store these properties in environment
          variables or CI/CD pipeline secrets for better security!
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Step 4: Review Results in SonarQube Dashboard
      </h3>
      <div className="blue-card-section">
        <p>
          Once analysis completes, navigate to your SonarQube dashboard URL (
          <span className="blue-inline-code">http://localhost:9000</span> or
          cloud URL), login, and explore your project.
        </p>

        <p>
          <b>You'll see detailed metrics on:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {dashboardMetrics.map((metric, index) => (
            <li key={index} style={{ marginBottom: "0.3rem" }}>
              {metric}
            </li>
          ))}
        </ul>

        <div className="yellow-callout">
          <b>🎯 Quality Gates:</b> SonarQube can automatically fail your build
          if quality standards aren't met, ensuring only high-quality code gets
          deployed.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>🚀 Task:</b>
        </p>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Add SonarQube plugin and configure your Spring Boot project as shown
            above
          </li>
          <li>Run the SonarQube analysis</li>
          <li>Explore your project's dashboard</li>
          <li>
            Share the report with your team and discuss potential improvements
          </li>
        </ol>

        <div className="yellow-callout">
          <b>💡 Challenge:</b> Try setting up a quality gate that fails the
          build if code coverage is below 80%!
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
              Q1: Why is it important to run SonarQube analysis as part of the
              build process?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Running SonarQube during the build process
                ensures that code quality checks happen automatically with every
                build. This reduces the chances of shipping problematic code and
                provides instant feedback to developers, allowing quick fixes
                before deployment.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q2: How does SonarQube use the authentication token during
              analysis?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> The authentication token authorizes your
                project's analysis requests to the SonarQube server, ensuring
                only trusted clients upload data. This secures your project and
                prevents unauthorized access or data manipulation.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: What is the role of the sonar-project.properties file?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> This file defines project-specific settings such
                as project key, source directories, binaries, test paths, and
                report locations. SonarQube uses it to correctly locate and
                analyze your code and test data.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: How can integrating SonarQube improve team collaboration?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> By centralizing code quality reports, SonarQube
                helps teams track issues, enforce standards, and monitor
                improvements collectively. This transparency fosters better
                communication and shared responsibility for code health.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
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

export default Topic12Subtopic3Content;

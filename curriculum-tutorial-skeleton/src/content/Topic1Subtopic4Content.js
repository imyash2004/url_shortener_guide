import React, { useState } from "react";
import "../App.css";

const codeBlocks = {
  dependencies: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>`,
  mvnClean: "mvn clean install",
  mvnCompile: "mvn clean compile",
};

export default function Topic1Subtopic4Content() {
  const [copied, setCopied] = useState({});
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);

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

  return (
    <div className="topic-animated-content">
      <div className="key-idea-box">
        <h3 style={{ marginTop: 0, color: "#1769aa" }}>
          📦 Overview: Managing Dependencies with Maven
        </h3>
        <p>
          Dependencies are like ingredients in a recipe — you need the right
          ones, in the right versions, for your app to work! Maven makes it easy
          to add, update, and manage these dependencies.
        </p>
        <p>
          In this section, you’ll learn how to configure your{" "}
          <code>pom.xml</code>, add essential dependencies, and understand what
          each one does.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Understand what dependencies are and how Maven manages them</li>
        <li>
          ✅ Add necessary Spring Boot dependencies like <b>Security</b>,{" "}
          <b>JWT</b>, and <b>MySQL</b>
        </li>
        <li>
          ✅ Learn how Maven resolves <b>conflicts</b> between multiple
          libraries
        </li>
        <li>
          ✅ Run basic Maven commands to build, clean, and verify your project
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 What is Maven? Why Should You Care?
      </h3>
      <div className="topic-funfact example-block">
        <b>🔧 Maven is Your Project's Best Friend</b>
        <div className="topic-funfact-block">
          <div>
            <strong>🔧 Your toolbox</strong> → It fetches the right tools
            (dependencies)
          </div>
          <div>
            <strong>🧱 Your construction crew</strong> → It builds your app
          </div>
          <div>
            <strong>📋 Your planner</strong> → It follows a lifecycle to keep
            everything clean and consistent
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Key Terms You'll See in pom.xml
      </h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;dependency&gt;</code>
            </td>
            <td>Adds a new library or feature to your project</td>
          </tr>
          <tr>
            <td>
              <code>&lt;groupId&gt;</code> / <code>&lt;artifactId&gt;</code>
            </td>
            <td>Identifiers for the library you're including</td>
          </tr>
          <tr>
            <td>
              <code>&lt;version&gt;</code>
            </td>
            <td>The specific version of the library</td>
          </tr>
          <tr>
            <td>
              <code>&lt;scope&gt;</code>
            </td>
            <td>
              When the dependency should be used (compile/test/provided/etc.)
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Step-by-Step: Add and Manage Dependencies
      </h3>
      <div className="topic-funfact example-block">
        <b>📄 Open and Configure Your pom.xml</b>
        <div className="topic-funfact-block">
          <div>
            <strong>1.</strong> Open your project's <code>pom.xml</code> file
          </div>
          <div>
            <strong>2.</strong> Add common dependencies:
          </div>
          <div className="topic-codeblock code-with-copy">
            <button
              className={`copy-button ${copied.dependencies ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(codeBlocks.dependencies, "dependencies")
              }
            >
              {copied.dependencies ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.dependencies}</code>
            </pre>
          </div>
          <div>
            <strong>3.</strong> Run this to refresh:
          </div>
          <div className="topic-codeblock code-with-copy">
            <button
              className={`copy-button ${copied.mvnClean ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.mvnClean, "mvnClean")}
            >
              {copied.mvnClean ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.mvnClean}</code>
            </pre>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div
        style={{
          background: "linear-gradient(135deg, #e3f0fd 0%, #f8fbff 100%)",
          border: "2px solid #4fc3f7",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(33, 150, 243, 0.08)",
          padding: "1.5rem 2rem 1.5rem 2rem",
          margin: "2rem 0 2.5rem 0",
          position: "relative",
          animation: "fadeInSlideUp 0.8s ease-out forwards",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.1rem",
          }}
        >
          <span
            style={{
              fontSize: "1.6rem",
              color: "#43a047",
              marginRight: "0.7rem",
            }}
          >
            ✅
          </span>
          <span
            style={{ fontWeight: 600, color: "#2196f3", fontSize: "1.18rem" }}
          >
            Step-by-step Practice
          </span>
        </div>
        <ol
          style={{
            color: "#1769aa",
            fontSize: "1.08rem",
            margin: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li style={{ marginBottom: "1.1rem" }}>
            Add the following dependencies to your{" "}
            <code
              style={{
                background: "#e3eefd",
                color: "#1769aa",
                borderRadius: "6px",
                padding: "0.2rem 0.6rem",
                fontWeight: 500,
              }}
            >
              pom.xml
            </code>{" "}
            file.
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Create a new Maven profile for production.
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Build the project using:
            <div
              className="topic-codeblock code-with-copy"
              style={{ marginTop: "0.7rem" }}
            >
              <button
                className={`copy-button ${copied.mvnCompile ? "copied" : ""}`}
                onClick={() =>
                  copyToClipboard(codeBlocks.mvnCompile, "mvnCompile")
                }
              >
                {copied.mvnCompile ? "Copied!" : "Copy"}
              </button>
              <pre>
                <code>{codeBlocks.mvnCompile}</code>
              </pre>
            </div>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points
      </h3>
      <div className="topic-funfact example-block">
        <b>Q: Why should you enable annotation processing in your IDE?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA1(!showA1)}
            style={{ marginBottom: "1rem" }}
          >
            {showA1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA1 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Tools like <b>Lombok</b> use annotations like{" "}
              <code>@Getter</code>, <code>@Setter</code>, <code>@Builder</code>,
              etc.
              <br />
              These generate code <b>at compile time</b>, and enabling
              annotation processing ensures your IDE understands and displays
              this code correctly. Without it, you may see false errors or red
              lines.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>Q: How does using an IDE improve your development speed?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA2(!showA2)}
            style={{ marginBottom: "1rem" }}
          >
            {showA2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA2 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> IDEs provide:
              <ul>
                <li>
                  <b>Intelligent suggestions (code completion)</b> 💡
                </li>
                <li>
                  <b>Live error highlighting</b>
                </li>
                <li>
                  <b>Real-time debugging tools</b>
                </li>
                <li>
                  <b>Integrated terminal, version control, and Maven</b>
                </li>
              </ul>
              You write faster, make fewer mistakes, and see results instantly.
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>Q: What's the difference between 'Run' and 'Debug' in IDEs?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA3(!showA3)}
            style={{ marginBottom: "1rem" }}
          >
            {showA3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA3 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong>
              <table className="topic-table">
                <thead>
                  <tr>
                    <th>Run</th>
                    <th>Debug</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Starts the app normally</td>
                    <td>Starts with debugging tools enabled</td>
                  </tr>
                  <tr>
                    <td>No breakpoints</td>
                    <td>Stops at breakpoints and lets you inspect variables</td>
                  </tr>
                  <tr>
                    <td>Ideal for final testing</td>
                    <td>Ideal for finding and fixing bugs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>
          Q: Why should you install plugins like Lombok, Spring Assistant, etc.?
        </b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowA4(!showA4)}
            style={{ marginBottom: "1rem" }}
          >
            {showA4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showA4 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> These plugins enhance your IDE with:
              <ul>
                <li>Live previews for Spring annotations</li>
                <li>Easy navigation to beans/controllers</li>
                <li>Cleaner code through Lombok</li>
                <li>Faster dependency analysis with Maven Helper</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🌟 Best Practices
      </h3>
      <ul className="topic-checklist">
        <li>✅ Use version control inside the IDE (e.g., Git integration)</li>
        <li>✅ Use light themes when coding long hours to reduce eye strain</li>
        <li>
          ✅ Get comfortable with keyboard shortcuts (boost your coding speed!)
        </li>
        <li>✅ Use the built-in terminal for Maven, Git, and other tools</li>
      </ul>
    </div>
  );
}

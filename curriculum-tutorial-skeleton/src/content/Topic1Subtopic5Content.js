import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic5Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);

  return (
    <div className="topic-animated-content">
      <div className="key-idea-box">
        <h3>🛠️ Overview: Setting Up Your IDE for Success</h3>
        <p>
          Your IDE (like IntelliJ, Eclipse, or VS Code) is your main tool for
          writing, running, and debugging code. A good setup saves you hours and
          helps you catch mistakes early.
        </p>
        <p>
          In this section, you’ll configure your IDE for Java, install helpful
          plugins, and learn shortcuts to boost your productivity.
        </p>
      </div>

      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>✅ Set up your preferred IDE for Java + Spring Boot development</li>
        <li>
          ✅ Enable features like code suggestions, syntax highlighting, and
          auto-imports
        </li>
        <li>
          ✅ Use &nbsp;<b>plugins</b>&nbsp; to support Maven, Lombok, Spring, and more
        </li>
        <li>✅ Run your application from the IDE with just one click</li>
        <li>✅ Debug and inspect running apps in real-time</li>
      </ul>

      <h3>💻 Popular IDEs for Spring Boot</h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>IDE</th>
            <th>Why It's Awesome 💥</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>IntelliJ IDEA</b> (recommended)
            </td>
            <td>Deep Spring Boot integration, smart code analysis</td>
          </tr>
          <tr>
            <td>
              <b>Eclipse</b>
            </td>
            <td>Lightweight, open-source, good Maven support</td>
          </tr>
          <tr>
            <td>
              <b>VS Code</b>
            </td>
            <td>Great for microservices, customizable with extensions</td>
          </tr>
        </tbody>
      </table>

      <h3>🛠️ Step-by-Step: IntelliJ Setup (Most Popular)</h3>
      <div className="topic-funfact example-block">
        <b>🚀 Complete IntelliJ Configuration</b>
        <div className="topic-funfact-block">
          <div>
            <strong>1.</strong>{" "}
            <b>Download & Install IntelliJ IDEA Community Edition</b> (if not
            already)
          </div>
          <div>
            👉{" "}
            <a
              href="https://www.jetbrains.com/idea"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.jetbrains.com/idea
            </a>
          </div>

          <div>
            <strong>2.</strong> <b>Import Your Spring Boot Project</b>
          </div>
          <ul>
            <li>
              Open IntelliJ → File → Open → Select your project folder (with{" "}
              <code>pom.xml</code>)
            </li>
            <li>IntelliJ will detect Maven and auto-import dependencies</li>
          </ul>

          <div>
            <strong>3.</strong> <b>Enable Annotation Processing</b>
          </div>
          <ul>
            <li>
              File → Settings → Build, Execution, Deployment → Compiler →
              Annotation Processors → ✅ Enable
            </li>
          </ul>

          <div>
            <strong>4.</strong> <b>Install Useful Plugins</b>
          </div>
          <ul>
            <li>Lombok</li>
            <li>Spring Assistant</li>
            <li>Rainbow Brackets (for fun and clarity 🌈)</li>
            <li>Maven Helper</li>
          </ul>

          <div>
            <strong>5.</strong> <b>Run the Application</b>
          </div>
          <ul>
            <li>
              Right-click <code>UrlShortenerApplication.java</code> → Run
            </li>
            <li>
              Watch your console — look for{" "}
              <code>Tomcat started on port 8080</code> ✅
            </li>
          </ul>

          <div>
            <strong>6.</strong> <b>Set Up Debugging</b>
          </div>
          <ul>
            <li>Add a breakpoint (click left of the line number)</li>
            <li>Right-click → Debug → Step through your code</li>
          </ul>
        </div>
      </div>

      <h3>📘 If You're Using Eclipse</h3>
      <div className="topic-funfact example-block">
        <b>🌙 Eclipse Setup Guide</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Download:</strong>{" "}
            <a
              href="https://www.eclipse.org/downloads/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.eclipse.org/downloads/
            </a>
          </div>
          <div>
            <strong>Use the Eclipse IDE for Enterprise Java package</strong>
          </div>
          <div>
            <strong>
              Go to File &gt; Import &gt; Maven &gt; Existing Maven Project
            </strong>
          </div>
          <div>
            <strong>Install:</strong>
          </div>
          <ul>
            <li>
              <b>Lombok plugin</b>
            </li>
            <li>
              <b>Spring Tools</b>
            </li>
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself: Step-by-step
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
            Create a package:{" "}
            <code
              style={{
                background: "#e3eefd",
                color: "#1769aa",
                borderRadius: "6px",
                padding: "0.2rem 0.6rem",
                fontWeight: 500,
              }}
            >
              com.example.urlshortener.dto
            </code>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Add:
            <br />
            <span style={{ display: "inline-block", marginTop: "0.5rem" }}>
              <code
                style={{
                  background: "#e3eefd",
                  color: "#1769aa",
                  borderRadius: "6px",
                  padding: "0.2rem 0.6rem",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "0.3rem",
                  width: "fit-content",
                }}
              >
                UrlRequestDto.java
              </code>
              <code
                style={{
                  background: "#e3eefd",
                  color: "#1769aa",
                  borderRadius: "6px",
                  padding: "0.2rem 0.6rem",
                  fontWeight: 500,
                  display: "block",
                  width: "fit-content",
                }}
              >
                UrlResponseDto.java
              </code>
            </span>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            In your service layer, implement conversion logic
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            In controller, return DTOs instead of entities
          </li>
        </ol>
      </div>

      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>Q: Why should you enable annotation processing in your IDE?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            <strong>A:</strong> Tools like <b>Lombok</b> use annotations like{" "}
            <code>@Getter</code>, <code>@Setter</code>, <code>@Builder</code>,
            etc.
            <br />
            These generate code <b>at compile time</b>, and enabling annotation
            processing ensures your IDE understands and displays this code
            correctly. Without it, you may see false errors or red lines.
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: How does using an IDE improve your development speed?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
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

        <div className="topic-faq-q">
          <b>Q: What's the difference between 'Run' and 'Debug' in IDEs?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
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

        <div className="topic-faq-q">
          <b>
            Q: Why should you install plugins like Lombok, Spring Assistant,
            etc.?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA4((v) => !v)}>
          {showA4 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA4 && (
          <div className="topic-faq-a">
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

      <h3>🌟 Best Practices</h3>
      <ul className="topic-checklist">
        <li>✅ Use version control inside the IDE (e.g., Git integration)</li>
        <li>✅ Use light themes when coding long hours to reduce eye strain</li>
        <li>
          ✅ Get comfortable with keyboard shortcuts (boost your coding speed!)
        </li>
        <li>✅ Use the built-in terminal for Maven, Git, and other tools</li>
      </ul>

      <h3>🎁 Pro Tip</h3>
      <div
        className="topic-callout"
        style={{ background: "#fff3e0", borderLeft: "5px solid #ff9800" }}
      >
        <span role="img" aria-label="lightbulb">
          💡
        </span>{" "}
        Use the <b>"Navigate to Class"</b> shortcut:
        <br />
        <strong>IntelliJ:</strong> <code>Cmd + O</code> (Mac) /{" "}
        <code>Ctrl + N</code> (Windows)
        <br />
        🔍 Instantly find any file/class in your project — no more manual
        scrolling!
      </div>

      <h3>🚀 Ready to Get Started?</h3>
      <div
        className="topic-callout"
        style={{ background: "#e8f5e8", borderLeft: "5px solid #4caf50" }}
      >
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        Ready? Now your IDE is fully geared up like Iron Man's suit 🦾
        <br />
        You're officially ready to start coding like a pro!
      </div>
    </div>
  );
}

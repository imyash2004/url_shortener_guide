import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic6Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState({});

  const copyToClipboard = async (text, commandId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommands((prev) => ({ ...prev, [commandId]: true }));
      setTimeout(() => {
        setCopiedCommands((prev) => ({ ...prev, [commandId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <h3>🧪✨ Step 1: Hands-On Assignment – Project Setup & Foundation</h3>
      <p>
        Let's put everything you've learned to the test! These three hands-on
        tasks will help you <b>apply</b> your knowledge and ensure your
        environment is fully ready for development.
      </p>

      <h3>✅ Challenge 1: Create and Run Your Spring Boot Project</h3>
      <div className="topic-funfact example-block">
        <b>
          🎯 Objective: Set up a basic Spring Boot application using Spring
          Initializr
        </b>
        <div className="topic-funfact-block">
          <div>
            <strong>📝 Tasks:</strong>
          </div>
          <ul>
            <li>
              Create a project named <code>urlshortener</code>
            </li>
            <li>
              Add dependencies: Spring Web, Spring Data JPA, H2 Database,
              Lombok, Validation
            </li>
            <li>Import it into your IDE</li>
            <li>Run the application and verify that it starts successfully</li>
          </ul>
          <div>
            <strong>💡 Hint:</strong> You should see{" "}
            <code>Tomcat started on port 8080</code> in your terminal. If not,
            check your <code>pom.xml</code> and try{" "}
            <code>mvn clean install</code>.
          </div>
        </div>
      </div>

      <h3>✅ Challenge 2: Set Up Git & Push to GitHub</h3>
      <div className="topic-funfact example-block">
        <b>
          🎯 Objective: Initialize version control and back up your code online
        </b>
        <div className="topic-funfact-block">
          <div>
            <strong>📝 Tasks:</strong>
          </div>
          <ul>
            <li>Initialize Git in your project directory</li>
            <li>
              Create a <code>.gitignore</code> file and exclude{" "}
              <code>target/</code>, <code>.idea/</code>, and <code>.iml</code>{" "}
              files
            </li>
            <li>
              Make your first commit with message:{" "}
              <code>"Initial Spring Boot setup"</code>
            </li>
            <li>
              Create a GitHub repo and push your code to the <code>main</code>{" "}
              branch
            </li>
          </ul>
          <div>
            <strong>💡 Hint:</strong> If you're getting an error when pushing,
            check if you created a new branch with{" "}
            <code>git branch -M main</code>.
          </div>
        </div>
      </div>

      <h3>✅ Challenge 3: Explore the Project Structure & Test Debugging</h3>
      <div className="topic-funfact example-block">
        <b>
          🎯 Objective: Understand how the project is structured and test
          debugging in your IDE
        </b>
        <div className="topic-funfact-block">
          <div>
            <strong>📝 Tasks:</strong>
          </div>
          <ul>
            <li>Create the following packages:</li>
          </ul>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`com.example.urlshortener
├── controller
├── service
├── repository
├── entity
└── dto`}</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.packages ? "copied" : ""
              }`}
              onClick={() =>
                copyToClipboard(
                  `com.example.urlshortener
├── controller
├── service
├── repository
├── entity
└── dto`,
                  "packages"
                )
              }
            >
              {copiedCommands.packages ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <ul>
            <li>
              Add a simple controller with <code>/hello</code> endpoint
              returning <code>"Hello, Spring!"</code>
            </li>
            <li>
              Add a <b>breakpoint</b> in the controller method and run the app
              in <b>debug mode</b>
            </li>
            <li>Inspect variable values in the debugger</li>
          </ul>
          <div>
            <strong>💡 Hint:</strong> You can right-click a file and choose{" "}
            <b>Debug</b> instead of Run in IntelliJ or Eclipse.
          </div>
        </div>
      </div>

      <h3>🏁 Goal</h3>
      <div
        className="topic-callout"
        style={{ background: "#e8f5e8", borderLeft: "5px solid #4caf50" }}
      >
        <span role="img" aria-label="trophy">
          🏆
        </span>{" "}
        By completing these 3 challenges, you'll have:
        <ul>
          <li>A fully functional Spring Boot project</li>
          <li>Version control integrated with GitHub</li>
          <li>A structured, debuggable, and cleanly configured codebase</li>
        </ul>
      </div>

      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>Q: What should I do if my Spring Boot app doesn't start?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            <strong>A:</strong> Check these common issues:
            <ul>
              <li>
                <b>Port conflict:</b> Another app might be using port 8080.
                Change it in <code>application.properties</code>
              </li>
              <li>
                <b>Missing dependencies:</b> Run <code>mvn clean install</code>{" "}
                to refresh dependencies
              </li>
              <li>
                <b>Java version:</b> Ensure you're using Java 17+ for Spring
                Boot 3.x
              </li>
              <li>
                <b>IDE issues:</b> Try running from terminal with{" "}
                <code>mvn spring-boot:run</code>
              </li>
            </ul>
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: How do I know if my Git setup is working correctly?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            <strong>A:</strong> Run these commands to verify:
            <pre className="topic-codeblock">
              <code>{`git status          # Should show clean working directory
git log --oneline  # Should show your commit
git remote -v      # Should show your GitHub repo URL`}</code>
            </pre>
            If you see your commit and GitHub URL, everything is working!
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: What's the difference between Run and Debug mode in my IDE?</b>
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
                  <th>Run Mode</th>
                  <th>Debug Mode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>App runs normally</td>
                  <td>App stops at breakpoints</td>
                </tr>
                <tr>
                  <td>No variable inspection</td>
                  <td>Inspect variables, step through code</td>
                </tr>
                <tr>
                  <td>Faster execution</td>
                  <td>Slower but more control</td>
                </tr>
                <tr>
                  <td>Good for testing</td>
                  <td>Perfect for bug hunting</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <h3>🌟 Pro Tips for Success</h3>
      <ul className="topic-checklist">
        <li>
          ✅ <b>Take your time</b> — these challenges build your foundation
        </li>
        <li>
          ✅ <b>Test each step</b> before moving to the next
        </li>
        <li>
          ✅ <b>Use the hints</b> if you get stuck
        </li>
        <li>
          ✅ <b>Commit frequently</b> to save your progress
        </li>
        <li>
          ✅ <b>Ask for help</b> if you're stuck for more than 15 minutes
        </li>
      </ul>

      <h3>🎯 Ready to Begin?</h3>
      <div
        className="topic-callout"
        style={{ background: "#fff3e0", borderLeft: "5px solid #ff9800" }}
      >
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        <strong>Start with Challenge 1</strong> and work through them
        systematically. Each challenge builds on the previous one, so don't skip
        ahead!
        <br />
        <br />
        <strong>Remember:</strong> The goal isn't just to complete the tasks —
        it's to understand <i>why</i> each step matters for your Spring Boot
        journey! 💪
      </div>
    </div>
  );
}

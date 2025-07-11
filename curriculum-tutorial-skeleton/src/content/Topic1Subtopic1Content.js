import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic1Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);
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
      <h3>🚀 Overview: Why Version Control is Your Superpower</h3>
      <p>
        Imagine writing an essay and making 100 edits over a week — but you
        can’t undo a change or see what you changed yesterday. Scary, right? 😬
        <br />
        That’s what coding without <b>version control</b> feels like.
      </p>
      <p>
        With <b>Git</b>, you can:
      </p>
      <ul className="topic-checklist">
        <li>🕓 Travel back in time (revert to a working version)</li>
        <li>
          🧪 Experiment fearlessly (try new features without breaking anything)
        </li>
        <li>🤝 Work with your team (without stepping on each other’s toes)</li>
      </ul>
      <h3>💡 Real-World Examples</h3>
      <div className="topic-funfact example-block">
        <b>🧱 Example 1: Undo Mistakes</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Scenario:</strong> You accidentally delete an important
            service file.
          </div>
          <div>
            <strong>Solution:</strong>
          </div>
          <div>
            ✅ <code>git restore &lt;filename&gt;</code> brings it back
            instantly.
          </div>
          <div>
            ✅ <code>git checkout &lt;commit-id&gt;</code> takes you back to a
            stable version.
          </div>
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>🌿 Example 2: Parallel Development</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Scenario:</strong> You and your teammate both work on
            different features.
          </div>
          <div>
            <strong>Solution:</strong>
          </div>
          <div>
            🧑‍💻 You create a branch: <code>feature/login</code>
          </div>
          <div>
            🧑‍💻 They create: <code>feature/dashboard</code>
          </div>
          <div>
            ✅ Later, you merge both features into <code>main</code> without
            conflicts.
          </div>
        </div>
      </div>
      <div className="topic-funfact example-block">
        <b>🧠 Example 3: Blame Game (Productively 😉)</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Scenario:</strong> The app crashes and you need to debug.
          </div>
          <div>
            <strong>Solution:</strong>
          </div>
          <div>Check who last changed the problematic file:</div>
          <pre className="topic-codeblock">
            <code>git blame Application.java</code>
          </pre>
          <div>
            ✅ It shows <i>who last changed each line</i> — great for debugging
            or asking teammates.
          </div>
        </div>
      </div>

      <h3>🔒 Version Control Boundaries & Responsibilities</h3>
      <table className="boundaries-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>What Git Tracks</th>
            <th>What Git Ignores</th>
            <th>Best Practices</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Source Code</strong>
            </td>
            <td className="responsibility">
              ✅ All .java, .js, .html, .css files
              <br />
              ✅ Configuration files (.properties, .yml)
              <br />✅ Documentation (.md, .txt)
            </td>
            <td className="boundary">
              ❌ Compiled files (target/, build/)
              <br />
              ❌ IDE settings (.idea/, .vscode/)
              <br />❌ OS files (.DS_Store, Thumbs.db)
            </td>
            <td>
              • Commit frequently with meaningful messages
              <br />
              • Use .gitignore for generated files
              <br />• Keep commits atomic and focused
            </td>
          </tr>
          <tr>
            <td>
              <strong>Dependencies</strong>
            </td>
            <td className="responsibility">
              ✅ Dependency definitions (pom.xml, package.json)
              <br />✅ Version specifications
            </td>
            <td className="boundary">
              ❌ Actual dependency files (node_modules/, .m2/)
              <br />❌ Lock files (unless team policy requires)
            </td>
            <td>
              • Specify exact versions for stability
              <br />
              • Document why dependencies are needed
              <br />• Review dependencies regularly
            </td>
          </tr>
          <tr>
            <td>
              <strong>Configuration</strong>
            </td>
            <td className="responsibility">
              ✅ Application config templates
              <br />✅ Environment-specific examples
            </td>
            <td className="boundary">
              ❌ Actual credentials and secrets
              <br />
              ❌ Production database URLs
              <br />❌ API keys and tokens
            </td>
            <td>
              • Use environment variables for secrets
              <br />
              • Provide example config files
              <br />• Document required environment setup
            </td>
          </tr>
          <tr>
            <td>
              <strong>Build Artifacts</strong>
            </td>
            <td className="responsibility">
              ✅ Build scripts and CI/CD configs
              <br />✅ Docker files and deployment configs
            </td>
            <td className="boundary">
              ❌ Generated JAR/WAR files
              <br />
              ❌ Compiled classes
              <br />❌ Temporary build files
            </td>
            <td>
              • Automate builds with CI/CD
              <br />
              • Version your releases properly
              <br />• Keep build scripts in version control
            </td>
          </tr>
        </tbody>
      </table>
      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>🛠 Initialize Git in your project</li>
        <li>
          🧼 Configure <code>.gitignore</code> to skip unnecessary files
        </li>
        <li>💾 Make commits to save work versions</li>
        <li>☁️ Push your project to GitHub</li>
        <li>🌿 Work with branches for features and bug fixes</li>
      </ul>
      <h3>🔑 Key Concepts with Visuals</h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>What It Means</th>
            <th>Emoji Shortcut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>git init</code>
            </td>
            <td>Start tracking changes in a project</td>
            <td>🟢</td>
          </tr>
          <tr>
            <td>
              <code>.gitignore</code>
            </td>
            <td>
              Tell Git what <b>not</b> to track
            </td>
            <td>🚫</td>
          </tr>
          <tr>
            <td>
              <code>commit</code>
            </td>
            <td>Save a snapshot of your code</td>
            <td>💾</td>
          </tr>
          <tr>
            <td>
              <code>push</code>
            </td>
            <td>Upload changes to GitHub</td>
            <td>☁️</td>
          </tr>
          <tr>
            <td>
              <code>branch</code>
            </td>
            <td>Work on features separately</td>
            <td>🌿</td>
          </tr>
        </tbody>
      </table>
      <h3>🛠️ Step-by-Step Setup</h3>
      <div className="animated-codeblock example-block">
        <b>🚀 Complete Git Setup for Your URL Shortener Project</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Step 1:</strong> Initialize version control in your project
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>git init</code>
            </pre>
            <button
              className={`copy-button ${copiedCommands.step1 ? "copied" : ""}`}
              onClick={() => copyToClipboard("git init", "step1")}
            >
              {copiedCommands.step1 ? (
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

          <div>
            <strong>Step 2:</strong> Create a .gitignore file to skip
            unnecessary files
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>touch .gitignore</code>
            </pre>
            <button
              className={`copy-button ${copiedCommands.step2 ? "copied" : ""}`}
              onClick={() => copyToClipboard("touch .gitignore", "step2")}
            >
              {copiedCommands.step2 ? (
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

          <div>
            <strong>Step 3:</strong> Add all files and make your first commit
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`git add .
git commit -m "Initial commit: Spring Boot setup"`}</code>
            </pre>
            <button
              className={`copy-button ${copiedCommands.step3 ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(
                  `git add .
git commit -m "Initial commit: Spring Boot setup"`,
                  "step3"
                )
              }
            >
              {copiedCommands.step3 ? (
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

          <div>
            <strong>Step 4:</strong> Create a remote repo on GitHub and link it
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`git remote add origin https://github.com/yourusername/urlshortener.git
git branch -M main
git push -u origin main`}</code>
            </pre>
            <button
              className={`copy-button ${copiedCommands.step4 ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(
                  `git remote add origin https://github.com/yourusername/urlshortener.git
git branch -M main
git push -u origin main`,
                  "step4"
                )
              }
            >
              {copiedCommands.step4 ? (
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

          <div>
            <strong>Step 5:</strong> Create a new branch for feature development
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>git checkout -b feature/add-login-api</code>
            </pre>
            <button
              className={`copy-button ${copiedCommands.step5 ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(
                  "git checkout -b feature/add-login-api",
                  "step5"
                )
              }
            >
              {copiedCommands.step5 ? (
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
        </div>
      </div>
      <h3>🧪 Practice Time</h3>
      <ul className="topic-checklist">
        <li>✅ Initialize Git</li>
        <li>
          ✅ Create a <code>.gitignore</code>
        </li>
        <li>✅ Make your first 3 commits</li>
        <li>✅ Push to GitHub</li>
        <li>✅ Create a branch for your next task</li>
      </ul>
      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>Q: Why do developers say "commit early, commit often"?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            Frequent commits help:
            <ul>
              <li>Track small changes</li>
              <li>Make debugging easier</li>
              <li>Safely roll back without losing hours of work</li>
            </ul>
          </div>
        )}
        <div className="topic-faq-q">
          <b>
            Q: What happens if I forget <code>.gitignore</code>?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            You might accidentally push:
            <ul>
              <li>
                Your compiled files (<code>target/</code>)
              </li>
              <li>
                IDE settings (<code>.idea/</code>)
              </li>
              <li>Credentials (❌ dangerous!)</li>
            </ul>
            Which can clutter your repo or leak sensitive info.
          </div>
        )}
        <div className="topic-faq-q">
          <b>Q: What’s the purpose of branching in Git?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
            <ul>
              <li>
                Develop features in isolation (<code>feature/add-search</code>)
              </li>
              <li>
                Fix bugs safely without affecting production code (
                <code>bugfix/url-404</code>)
              </li>
              <li>Test things freely without fear of breaking the main app</li>
            </ul>
          </div>
        )}
        <div className="topic-faq-q">
          <b>Q: Can Git help in debugging?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA4((v) => !v)}>
          {showA4 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA4 && (
          <div className="topic-faq-a">
            Yes!
            <ul>
              <li>
                Use <code>git log</code> to see the history of changes
              </li>
              <li>
                Use <code>git diff</code> to see <i>what exactly</i> changed
                between versions
              </li>
              <li>
                Use <code>git revert</code> to undo a commit safely
              </li>
            </ul>
          </div>
        )}
      </div>
      <h3>🎁 Fun Fact</h3>
      <div
        className="topic-callout"
        style={{ background: "#e6f7ff", borderLeft: "5px solid #2196f3" }}
      >
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        NASA uses Git to track software for space missions. If it’s good enough
        for rockets, it’s great for your project!
      </div>
      <h3>🌟 Pro Tips</h3>
      <ul className="topic-bullets">
        <li>Use GitHub Desktop if you prefer a GUI.</li>
        <li>
          Follow commit message conventions:
          <br />
          <code>feat: add login API</code>
          <br />
          <code>fix: correct null pointer issue in controller</code>
        </li>
        <li>Always pull before pushing to avoid merge conflicts.</li>
      </ul>
    </div>
  );
}
